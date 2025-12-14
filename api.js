// Initialize Supabase
const SUPABASE_URL = 'https://ndltocdmovuoebacnoum.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbHRvY2Rtb3Z1b2ViYWNub3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzc4NjIsImV4cCI6MjA3OTcxMzg2Mn0.JnD_bmiJIJusKp2Aw2y9V6N8jCO9uixONddtT4PIIRY';
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
        detectSessionInUrl: false,
        persistSession: true,
        autoRefreshToken: true
    }
}) : null;

if (!supabase) {
    console.error('Supabase client could not be initialized. Check if supabase.js is loaded.');
    alert('Critical Error: Database connection failed. Please restart the app.');
}

// Realtime subscriptions tracker
const realtimeSubscriptions = {};

class ApiClient {
    constructor() {
        this.token = localStorage.getItem('sb-access-token');
    }

    // Helper to normalize phone numbers (digits only)
    _normalizePhone(phone) {
        return phone.toString().trim().replace(/\D/g, '');
    }

    // Helper to convert phone to email (since Supabase defaults to email auth)
    _toEmail(phone) {
        const cleanPhone = this._normalizePhone(phone);
        const email = `${cleanPhone}@nearseva.test`;
        console.log(`[API] Generated email: ${email} from phone: ${phone}`);
        return email;
    }

    async login(phone, password) {
        if (!supabase) throw new Error("Supabase client not initialized");

        const email = this._toEmail(phone);
        console.log(`[API] Attempting login for ${email} with password: ${password}`);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("[API] Login Error:", error);
            throw error;
        }

        // Fetch profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) {
            // Profile missing? This shouldn't happen in normal flow, but possible if signup failed halfway.
            // We could throw an error or try to recreate it.
            // For now, let's throw a clear error.
            throw new Error("Profile not found. Please contact support or try registering again.");
        }

        if (profile.status === 'pending') {
            throw new Error("Account pending approval. Please contact Super Admin.");
        }

        if (profile.banned === true) {
            throw new Error("Your account has been banned. Please contact Admin.");
        }

        return { user: profile, session: data.session };
    }

    async signup(userData) {
        if (!supabase) throw new Error("Supabase client not initialized");

        const email = this._toEmail(userData.phone);
        const cleanPhone = this._normalizePhone(userData.phone);
        console.log(`[API] Attempting signup for ${email}`);

        let authUser = null;
        let session = null;

        // 1. Sign Up Auth User
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: 'password123', // Default password for MVP
        });

        if (error) {
            // If user exists, try to login to recover account/profile
            if (error.message.includes("already registered") || error.message.includes("User already exists")) {
                console.log("[API] User exists, attempting to recover...");

                const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: 'password123'
                });

                if (loginError) {
                    console.error("[API] Recovery login failed:", loginError);
                    throw new Error("User already exists. Please Login.");
                }

                authUser = loginData.user;
                session = loginData.session;
            } else {
                console.error("[API] Signup Auth Error:", error);
                throw error;
            }
        } else {
            authUser = data.user;
            session = data.session;
        }

        if (!authUser) throw new Error("Authentication failed");

        // 2. Check if Profile Exists
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .maybeSingle();

        if (existingProfile) {
            // Profile exists, so this is truly a duplicate registration attempt
            throw new Error("User already exists! Please Login.");
        }

        // 3. Create Profile (if missing)
        console.log("[API] Creating missing profile...");
        const status = userData.role === 'admin' ? 'pending' : 'approved';

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .insert([{
                id: authUser.id,
                phone: cleanPhone,
                name: userData.name,
                role: userData.role,
                status: status
            }])
            .select()
            .single();

        if (profileError) throw profileError;
        return { user: profile, session: session };
    }

    async verifyLoginOtp(phone, otp) {
        // For MVP, we are simulating OTP by just logging in with the default password
        // In a real production app with Phone Auth, this would be verifyOtp
        return this.login(phone, 'password123');
    }

    async logout() {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Supabase SignOut Error:", error);
    }

    async getMe() {
        if (!supabase) throw new Error("Supabase client not initialized");

        // Create a timeout promise
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Network timeout")), 5000)
        );

        // Race between fetch and timeout
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            if (error) throw error;
            if (!profile) return null;

            // Check if user is banned
            if (profile.banned === true) {
                throw new Error("Your account has been banned. Please contact Admin.");
            }

            return { user: profile, session: null };
        };

        try {
            return await Promise.race([fetchUser(), timeout]);
        } catch (error) {
            console.error("getMe failed:", error);
            throw error;
        }
    }

    // --- Data Methods ---

    async getProviderData(providerPhone) {
        const cleanPhone = this._normalizePhone(providerPhone);
        // Get Provider ID from Profile
        const { data: provider } = await supabase.from('profiles').select('id').eq('phone', cleanPhone).single();
        if (!provider) throw new Error("Provider not found");

        // Parallel Fetch
        const [customers, products, deliveries, extraRequests] = await Promise.all([
            supabase.from('customers').select('*').eq('provider_id', provider.id),
            supabase.from('products').select('*').eq('provider_id', provider.id),
            supabase.from('daily_logs').select('*').eq('provider_id', provider.id),
            supabase.from('extra_requests').select('*').eq('provider_id', provider.id)
        ]);

        if (customers.error) throw customers.error;
        if (products.error) throw products.error;
        if (deliveries.error) throw deliveries.error;
        if (extraRequests.error) throw extraRequests.error;

        // Fetch profiles for these customers to get vacation_mode
        const customerPhones = customers.data.map(c => c.phone);
        const { data: customerProfiles, error: profilesError } = await supabase
            .from('profiles')
            .select('phone, vacation_mode')
            .in('phone', customerPhones);

        if (profilesError) console.warn("Could not fetch customer profiles:", profilesError);

        // Map extra requests to include customer name and formatted date
        const mappedRequests = extraRequests.data.map(req => {
            const customer = customers.data.find(c => c.phone === req.customer_phone);
            return {
                ...req,
                customerName: customer ? customer.name : 'Unknown',
                date: new Date(req.created_at).toLocaleDateString()
            };
        });

        return {
            customers: customers.data,
            products: products.data,
            deliveries: deliveries.data,
            extraRequests: mappedRequests,
            customerProfiles: customerProfiles || []
        };
    }

    async getCustomerData(customerPhone) {
        const cleanPhone = this._normalizePhone(customerPhone);
        console.log('[API] getCustomerData for phone:', cleanPhone);

        // Find all customer records for this phone (may have multiple providers)
        const { data: customerRecords, error: custError } = await supabase
            .from('customers')
            .select('*')
            .eq('phone', cleanPhone);

        console.log('[API] customerRecords:', customerRecords, 'Error:', custError);

        if (custError) throw custError;

        // Get delivery logs for this customer
        const { data: deliveryLogs, error: logsError } = await supabase
            .from('daily_logs')
            .select('*')
            .eq('customer_phone', cleanPhone);

        if (logsError) throw logsError;

        // Get provider info for each customer record
        const providerIds = [...new Set(customerRecords?.map(c => c.provider_id) || [])];
        const { data: providers, error: provError } = await supabase
            .from('profiles')
            .select('id, name, phone')
            .in('id', providerIds);

        if (provError) throw provError;

        // Get products for these providers
        const { data: products, error: prodError } = await supabase
            .from('products')
            .select('*')
            .in('provider_id', providerIds);

        if (prodError) throw prodError;

        return {
            customerRecords: customerRecords || [],
            deliveryLogs: deliveryLogs || [],
            providers: providers || [],
            products: products || []
        };
    }

    async calculateWeeklyEarnings() {
        const me = await this.getMe();
        if (!me) return { weeklyEarnings: 0, deliveryCount: 0 };
        const providerId = me.user.id;

        console.log('[EARNINGS DEBUG] Provider ID:', providerId);

        // Get last 7 days
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];

        console.log('[EARNINGS DEBUG] Fetching logs from:', weekAgoStr);

        // Fetch delivered logs from last 7 days
        const { data: logs, error: logsError } = await supabase
            .from('daily_logs')
            .select('customer_phone, date')
            .eq('provider_id', providerId)
            .eq('status', 'delivered')
            .gte('date', weekAgoStr);

        console.log('[EARNINGS DEBUG] Delivered logs:', logs);
        if (logsError) {
            console.error('[EARNINGS DEBUG] Logs error:', logsError);
            throw logsError;
        }
        if (!logs || logs.length === 0) {
            console.log('[EARNINGS DEBUG] No delivered logs found');
            return { weeklyEarnings: 0, deliveryCount: 0 };
        }

        // Get all customers to map phone to subscription price
        const { data: customers, error: custError } = await supabase
            .from('customers')
            .select('phone, subscriptions')
            .eq('provider_id', providerId);

        console.log('[EARNINGS DEBUG] Customers:', customers);
        if (custError) {
            console.error('[EARNINGS DEBUG] Customers error:', custError);
            throw custError;
        }

        // Get products for price lookup
        const { data: products, error: prodError } = await supabase
            .from('products')
            .select('*')
            .eq('provider_id', providerId);

        console.log('[EARNINGS DEBUG] Products:', products);
        if (prodError) {
            console.error('[EARNINGS DEBUG] Products error:', prodError);
            throw prodError;
        }

        // Calculate total
        let total = 0;
        const customerMap = {};

        // Create customer phone -> price map
        customers?.forEach(cust => {
            let dailyPrice = 0;
            console.log('[EARNINGS DEBUG] Processing customer:', cust.phone, 'subscriptions:', cust.subscriptions);

            if (cust.subscriptions && cust.subscriptions.length > 0) {
                cust.subscriptions.forEach(sub => {
                    console.log('[EARNINGS DEBUG] Looking for product with id:', sub.productId);
                    const product = products?.find(p => p.id == sub.productId);
                    console.log('[EARNINGS DEBUG] Found product:', product);
                    if (product) dailyPrice += product.price;
                });
            }
            customerMap[cust.phone] = dailyPrice;
            console.log('[EARNINGS DEBUG] Customer', cust.phone, 'daily price:', dailyPrice);
        });

        console.log('[EARNINGS DEBUG] Customer price map:', customerMap);

        // Sum up earnings
        logs.forEach(log => {
            const price = customerMap[log.customer_phone] || 0;
            console.log('[EARNINGS DEBUG] Log for', log.customer_phone, 'adds:', price);
            total += price;
        });

        console.log('[EARNINGS DEBUG] Final total:', total, 'deliveries:', logs.length);

        return { weeklyEarnings: total, deliveryCount: logs.length };
    }

    async addCustomer(customerData) {
        // Map frontend structure to DB structure
        const me = await this.getMe();
        console.log('[DEBUG] getMe result:', me);
        console.log('[DEBUG] provider_id will be:', me.user.id);

        const cleanPhone = this._normalizePhone(customerData.phone);

        const dbData = {
            provider_id: me.user.id, // Current user is provider
            name: customerData.name,
            phone: cleanPhone,
            address: customerData.address,
            location: customerData.location,
            subscriptions: customerData.subscriptions,
            joined_date: customerData.joinedDate
        };

        console.log('[DEBUG] Inserting customer with data:', dbData);
        const { data, error } = await supabase.from('customers').insert([dbData]).select();
        if (error) {
            console.error('[DEBUG] Insert error:', error);
            throw error;
        }
        console.log('[DEBUG] Insert success:', data);
        return data;
    }

    async addProduct(productData) {
        const me = await this.getMe();
        console.log('[DEBUG] Adding product for provider:', me.user.id);

        const dbData = {
            provider_id: me.user.id,
            name: productData.name,
            price: productData.price,
            type: productData.type || 'general'
        };

        console.log('[DEBUG] Inserting product:', dbData);
        const { data, error } = await supabase.from('products').insert([dbData]).select();
        if (error) {
            console.error('[DEBUG] Product insert error:', error);
            throw error;
        }
        console.log('[DEBUG] Product insert success:', data);
        return data;
    }

    async deleteProduct(productId) {
        const { error } = await supabase.from('products').delete().eq('id', productId);
        if (error) throw error;
        return true;
    }

    async updateCustomer(id, customerData) {
        if (customerData.phone) {
            customerData.phone = this._normalizePhone(customerData.phone);
        }

        const { data, error } = await supabase
            .from('customers')
            .update(customerData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data;
    }

    async deleteCustomer(id) {
        const { error } = await supabase.from('customers').delete().eq('id', id);
        if (error) throw error;
        return true;
    }

    async markDelivered(customerId) {
        const me = await this.getMe();
        // Get customer phone to log it correctly
        const { data: customer } = await supabase.from('customers').select('phone').eq('id', customerId).single();
        if (!customer) throw new Error("Customer not found");

        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase.from('daily_logs').insert([{
            provider_id: me.user.id,
            customer_phone: customer.phone,
            date: today,
            status: 'delivered'
        }]).select();

        if (error) {
            if (error.code === '23505') throw new Error("Already marked delivered today"); // Unique violation
            throw error;
        }
        return data;
    }

    async toggleVacation(isActive) {
        const me = await this.getMe();
        if (!me) return;

        const { error } = await supabase
            .from('profiles')
            .update({ vacation_mode: isActive })
            .eq('id', me.user.id);

        if (error) {
            console.error("Vacation mode update failed:", error);
            throw error;
        }
    }

    async skipDelivery(dateStr, providerId) {
        const me = await this.getMe();
        if (!me) return;

        // Check if log already exists
        const { data: existing } = await supabase
            .from('daily_logs')
            .select('id')
            .eq('date', dateStr)
            .eq('provider_id', providerId)
            .eq('customer_phone', me.user.phone) // Match by phone
            .single();

        if (existing) {
            // Update existing
            const { error } = await supabase
                .from('daily_logs')
                .update({ status: 'skipped' })
                .eq('id', existing.id);
            if (error) throw error;
        } else {
            // Insert new
            const { error } = await supabase
                .from('daily_logs')
                .insert([{
                    date: dateStr,
                    provider_id: providerId,
                    customer_phone: me.user.phone, // Use phone for matching
                    status: 'skipped'
                }]);
            if (error) throw error;
        }
    }

    async requestExtra(item, providerId) {
        const session = await this.getMe();
        let targetProviderId = providerId;

        // If no providerId passed, try to find one (legacy behavior)
        if (!targetProviderId) {
            const cleanPhone = this._normalizePhone(session.phone);
            const { data: customerRecord } = await supabase.from('customers').select('provider_id').eq('phone', cleanPhone).single();
            if (!customerRecord) throw new Error("No provider linked to your account");
            targetProviderId = customerRecord.provider_id;
        }

        // Use RPC to bypass RLS insert issues and ensure phone matches profile
        const { data, error } = await supabase.rpc('submit_extra_request', {
            p_item: item,
            p_provider_id: targetProviderId
        });

        if (error) throw error;
        return data;
    }

    async updateRequestStatus(requestId, status, charge = 0) {
        const { data, error } = await supabase
            .from('extra_requests')
            .update({ status, charge })
            .eq('id', requestId)
            .select()
            .select();

        if (error) throw error;
        return data;
    }

    // --- Super Admin Methods ---

    async getPendingAdmins() {
        if (!supabase) throw new Error("Supabase client not initialized");

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'admin')
            .eq('status', 'pending');

        if (error) throw error;
        return data || [];
    }

    async getAllUsers() {
        if (!supabase) throw new Error("Supabase client not initialized");

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async approveAdmin(adminId) {
        return this.approveUser(adminId);
    }

    async approveUser(userId) {
        const cleanId = userId.trim();
        console.log('[DEBUG] Approving user:', cleanId);

        // 1. Verify existence and visibility
        const { data: checkData, error: checkError } = await supabase
            .from('profiles')
            .select('id, role, status')
            .eq('id', cleanId)
            .single();

        console.log('[DEBUG] Pre-fetch check:', checkData, checkError);

        if (checkError || !checkData) {
            console.error('[DEBUG] User not found or not visible:', checkError);
            throw new Error("Cannot find user profile. Check permissions.");
        }

        // 2. Attempt Update
        const { data, error } = await supabase
            .from('profiles')
            .update({ status: 'approved' })
            .eq('id', cleanId)
            .select();

        console.log('[DEBUG] Approve response:', data, error);

        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Update failed: Record found but not updated. This is likely an RLS (Permission) issue in Supabase.");
        }
        return data;
    }

    async banUser(phone) {
        console.log('[DEBUG] Banning user:', phone);
        const { data, error } = await supabase
            .from('profiles')
            .update({ banned: true })
            .eq('phone', phone)
            .select();

        console.log('[DEBUG] Ban response:', data, error);

        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Ban failed: No record updated. Check permissions or phone number.");
        }
        return data;
    }

    async unbanUser(phone) {
        console.log('[DEBUG] Unbanning user:', phone);
        const { data, error } = await supabase
            .from('profiles')
            .update({ banned: false })
            .eq('phone', phone)
            .select();

        console.log('[DEBUG] Unban response:', data, error);

        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Unban failed: No record updated. Check permissions or phone number.");
        }
        return data;
    }

    // --- Realtime Methods ---

    subscribeToProfiles(callback) {
        if (!supabase) return null;

        const channel = supabase
            .channel('profiles-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'profiles' },
                (payload) => {
                    console.log('[Realtime] Profile change:', payload);
                    callback(payload);
                }
            )
            .subscribe();

        realtimeSubscriptions['profiles'] = channel;
        return channel;
    }

    subscribeToCustomers(providerId, callback) {
        if (!supabase) return null;

        const channel = supabase
            .channel('customers-changes')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'customers',
                    filter: `provider_id=eq.${providerId}`
                },
                (payload) => {
                    console.log('[Realtime] Customer change:', payload);
                    callback(payload);
                }
            )
            .subscribe();

        realtimeSubscriptions['customers'] = channel;
        return channel;
    }

    subscribeToDailyLogs(providerId, callback) {
        if (!supabase) return null;

        const channel = supabase
            .channel('dailylogs-changes')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'daily_logs',
                    filter: `provider_id=eq.${providerId}`
                },
                (payload) => {
                    console.log('[Realtime] Daily log change:', payload);
                    callback(payload);
                }
            )
            .subscribe();

        realtimeSubscriptions['daily_logs'] = channel;
        return channel;
    }

    unsubscribeAll() {
        if (!supabase) return;

        Object.keys(realtimeSubscriptions).forEach(key => {
            const channel = realtimeSubscriptions[key];
            if (channel) {
                supabase.removeChannel(channel);
                console.log(`[Realtime] Unsubscribed from ${key}`);
            }
        });

        // Clear the tracker
        Object.keys(realtimeSubscriptions).forEach(key => delete realtimeSubscriptions[key]);
    }
}

const API = new ApiClient();
