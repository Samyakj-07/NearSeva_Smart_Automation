// idk why this works but dont touch it
window.onerror = function (m, u, l) { alert('Err: ' + m); return false }

var $ = s => document.querySelector(s);
let $$ = s => document.querySelectorAll(s);
var log = m => console.log(m);

// TODO: refactor this mess later
var LS = {
    get: k => JSON.parse(localStorage.getItem(k) || 'null'),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    del: k => localStorage.removeItem(k),
    init: () => {
        try {
            var d = (k, v) => !LS.get(k) ? LS.set(k, v) : null;
            d('users', []); d('custs', []); d('logs', []);
            d('prods', []); d('reqs', []);
            !LS.get('wallet') ? LS.set('wallet', { balance: 0, transactions: [] }) : null;
            !LS.get('history') ? LS.set('history', []) : 0;
            !LS.get('logs') ? LS.set('logs', {}) : 0;
            // me is current session
            if (!LS.get('me')) LS.set('me', null);
        } catch (e) { console.error("wtf", e) }
    }
}

var Translations = {
    en: {
        app_name: "NearSeva", tagline: "Smart Daily Service Automation", login_provider: "Login as Provider",
        login_customer: "Login as Customer", phone_label: "Phone Number", get_otp: "Get OTP", enter_otp: "Enter OTP",
        verify_login: "Verify & Login", welcome: "Welcome", start_delivery: "Start Delivery", stop_delivery: "Stop Delivery",
        live_tracking: "<i class='ph-duotone ph-broadcast'></i> Live Tracking Active",
        my_customers: "My Customers", add_customer: "<i class='ph-bold ph-plus'></i> Add Customer",
        edit_customer: "Edit Customer", logout: "Logout", status_waiting: "Waiting...",
        status_arriving: "<i class='ph-duotone ph-truck'></i> Delivery in progress!",
        status_delivered: "<i class='ph-duotone ph-check-circle'></i> Delivered Today",
        bill_total: "This Month's Bill", calendar: "Attendance", vacation_mode: "Vacation Mode",
        skip_tomorrow: "Skip Tomorrow", save: "Save", cancel: "Cancel", name: "Name", address: "Address",
        pick_location: "Tap to select location", reset_data: "<i class='ph-bold ph-trash'></i> Reset",
        voice_arriving: "Your delivery is arriving soon", voice_delivered: "Delivery completed",
        otp_sent: "OTP sent to", otp_alert: "OTP is 1234", invalid_otp: "Invalid OTP", fill_details: "Fill details",
        confirm_delete: "Remove customer?", confirm_reset: "Clear data? Irreversible.",
        late_alert: "<i class='ph-duotone ph-warning'></i> Running late",
        late_msg: "Provider is late", vacation_active: "<i class='ph-duotone ph-sun'></i> Vacation",
        price_label: "Price/Day (₹)", price_placeholder: "50", manage_products: "Manage Products",
        add_product: "Add Product", product_name: "Product Name", product_price: "Price (₹)",
        select_product: "Select Sub", request_extra: "Request Extra", pay_bill: "Pay Bill",
        optimize_route: "Optimize Route", payment_success: "Paid! Receipt Generated.",
        extra_requested: "Extra requested!", nav_home: "Home", nav_wallet: "Wallet",
        nav_history: "History", nav_profile: "Profile", wallet_balance: "Balance",
        add_money: "Add Money", transaction_history: "Transactions", no_transactions: "No txns.",
        money_added: "Added!", profile_settings: "Settings", edit_profile: "Edit Profile",
        pending_requests: "Pending Reqs", no_pending_requests: "No pending reqs.", accept: "Accept",
        simulate_movement: "Simulate Move", start_nav: "Start Nav", your_bills: "Bills",
        quick_actions: "Quick Actions", support: "Support", arriving_soon: "Arriving",
        running_late: "Running Late", no_active_delivery: "No Active Delivery",
        order_on_way: "Order on way!", provider_delayed: "Provider delayed.",
        waiting_updates: "Waiting...", days_delivered: "Days Delivered", view_bill: "View Bill",
        admin_overview: "Admin Overview", total_users: "Total Users", revenue: "Revenue",
        providers: "Providers", customers: "Customers", user_management: "User Mgmt",
        ban: "Ban", unban: "Unban", support_tickets: "Tickets", no_tickets: "No tickets.",
        open: "Open", login: "Login", register: "Register", create_account: "Create Account",
        role: "Role", customer: "Customer", provider: "Service Provider", admin: "Admin",
        back: "Back", home: "Home", insights: "Insights", alerts: "Alerts", schedule: "Schedule",
        overview: "Overview", users: "Users", my_schedule: "My Schedule", notifications: "Notifs",
        no_notifications: "No notifs.", clear_all: "Clear All"
    },
    hi: {
        app_name: "NearSeva", tagline: "स्मार्ट दैनिक सेवा स्वचालन", login_provider: "प्रदाता लॉगिन",
        login_customer: "ग्राहक लॉगिन", phone_label: "फ़ोन नंबर", get_otp: "OTP प्राप्त करें", enter_otp: "OTP दर्ज करें",
        verify_login: "सत्यापित करें और लॉगिन करें", welcome: "स्वागत है", start_delivery: "वितरण शुरू करें", stop_delivery: "वितरण रोकें",
        live_tracking: "<i class='ph-duotone ph-broadcast'></i> लाइव ट्रैकिंग सक्रिय",
        my_customers: "मेरे ग्राहक", add_customer: "<i class='ph-bold ph-plus'></i> ग्राहक जोड़ें",
        edit_customer: "ग्राहक संपादित करें", logout: "लॉगआउट", status_waiting: "प्रतीक्षा कर रहा है...",
        status_arriving: "<i class='ph-duotone ph-truck'></i> वितरण प्रगति पर है!",
        status_delivered: "<i class='ph-duotone ph-check-circle'></i> आज वितरित किया गया",
        bill_total: "इस महीने का बिल", calendar: "उपस्थिति", vacation_mode: "अवकाश मोड",
        skip_tomorrow: "कल छोड़ें", save: "सहेजें", cancel: "रद्द करें", name: "नाम", address: "पता",
        pick_location: "स्थान चुनने के लिए टैप करें", reset_data: "<i class='ph-bold ph-trash'></i> रीसेट करें",
        voice_arriving: "आपकी डिलीवरी जल्द ही आ रही है", voice_delivered: "डिलीवरी पूरी हुई",
        otp_sent: "OTP भेजा गया", otp_alert: "OTP 1234 है", invalid_otp: "अमान्य OTP", fill_details: "विवरण भरें",
        confirm_delete: "ग्राहक हटाएं?", confirm_reset: "डाटा साफ़ करें? अपरिवर्तनीय।",
        late_alert: "<i class='ph-duotone ph-warning'></i> देर हो रही है",
        late_msg: "प्रदाता देर से है", vacation_active: "<i class='ph-duotone ph-sun'></i> अवकाश",
        price_label: "मूल्य/दिन (₹)", price_placeholder: "50", manage_products: "उत्पाद प्रबंधित करें",
        add_product: "उत्पाद जोड़ें", product_name: "उत्पाद का नाम", product_price: "मूल्य (₹)",
        select_product: "उप चुनें", request_extra: "अतिरिक्त अनुरोध करें", pay_bill: "बिल का भुगतान करें",
        optimize_route: "मार्ग अनुकूलित करें", payment_success: "भुगतान किया गया! रसीद उत्पन्न हुई।",
        extra_requested: "अतिरिक्त अनुरोध किया गया!", nav_home: "होम", nav_wallet: "वॉलेट",
        nav_history: "इतिहास", nav_profile: "प्रोफ़ाइल", wallet_balance: "शेष राशि",
        add_money: "पैसे जोड़ें", transaction_history: "लेन-देन", no_transactions: "कोई लेन-देन नहीं।",
        money_added: "जोड़ा गया!", profile_settings: "सेटिंग्स", edit_profile: "प्रोफ़ाइल संपादित करें",
        pending_requests: "लंबित अनुरोध", no_pending_requests: "कोई लंबित अनुरोध नहीं।", accept: "स्वीकार करें",
        simulate_movement: "मूवमेंट अनुकरण करें", start_nav: "नेविगेशन शुरू करें", your_bills: "बिल",
        quick_actions: "त्वरित कार्रवाई", support: "समर्थन", arriving_soon: "जल्द आ रहा है",
        running_late: "देर से चल रहा है", no_active_delivery: "कोई सक्रिय डिलीवरी नहीं",
        order_on_way: "ऑर्डर रास्ते में है!", provider_delayed: "प्रदाता विलंबित।",
        waiting_updates: "अपडेट की प्रतीक्षा कर रहा है...", days_delivered: "वितरित दिन", view_bill: "बिल देखें",
        admin_overview: "व्यवस्थापक अवलोकन", total_users: "कुल उपयोगकर्ता", revenue: "राजस्व",
        providers: "प्रदाता", customers: "ग्राहक", user_management: "उपयोगकर्ता प्रबंधन",
        ban: "प्रतिबंध", unban: "प्रतिबंध हटाएँ", support_tickets: "टिकट", no_tickets: "कोई टिकट नहीं।",
        open: "खोलें", login: "लॉगिन", register: "पंजीकरण", create_account: "खाता बनाएं",
        role: "भूमिका", customer: "ग्राहक", provider: "सेवा प्रदाता", admin: "व्यवस्थापक",
        back: "वापस", home: "होम", insights: "इनसाइट्स", alerts: "अलर्ट", schedule: "अनुसूची",
        overview: "अवलोकन", users: "उपयोगकर्ता", my_schedule: "मेरी अनुसूची", notifications: "सूचनाएं",
        no_notifications: "कोई सूचना नहीं।", clear_all: "सभी साफ़ करें"
    }
};


// Main App stuff
var App = {
    state: { map: null, userMarker: null, providerMarker: null, watchId: null, routeLine: null, lang: 'en', user: null, authMode: 'landing', otpStep: 0, tempPhone: '', isLoading: false, busy: false },
    t: k => (Translations[App.state.lang] || Translations['en'])[k] || k,

    // try to refresh if not doing something important
    tryRefresh: () => {
        if (App.state.busy) {
            // console.debug("cant refresh, user busy");
            return;
        }
        App.router();
    },
    showLoading: () => { let l = $('#global-loader'); if (l) l.style.display = 'flex'; App.state.isLoading = true },
    hideLoading: () => { let l = $('#global-loader'); if (l) l.style.display = 'none'; App.state.isLoading = false },

    init: async () => {
        LS.init();
        let s_lang = localStorage.getItem('app_lang');
        if (s_lang) App.state.lang = s_lang;

        let t = localStorage.getItem('sb-access-token');
        if (!t) {
            console.log("no token lol"); LS.del('me'); await App.router(); return;
        }

        try {
            if (typeof API === 'undefined') throw new Error("API mia");
            App.showLoading();
            let u = await API.getMe();
            u ? LS.set('me', u.user) : LS.del('me');
        } catch (e) { console.log("sess err"); LS.del('me') }
        finally { App.hideLoading() }

        await App.router();
        // updates
        window.addEventListener('storage', e => {
            if (['custs', 'logs', 'isDelivering', 'lateStatus', 'providerLocations'].includes(e.key)) App.tryRefresh();
            if (e.key === 'providerLocations' && LS.get('me')?.role === 'customer') App.initCustomerMap();
        })
    },

    toggleLang: () => {
        App.state.lang = App.state.lang === 'en' ? 'hi' : 'en';
        localStorage.setItem('app_lang', App.state.lang);
        App.router();
    },

    speak: (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = App.state.lang === 'hi' ? 'hi-IN' : 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    },

    requestPermissions: async () => {
        console.debug("Requesting permissions...");
        if (window.NativeBridge) {

            const result = await window.NativeBridge.requestPermissions();
            console.log("Native Permissions:", result);
        } else {

            if ('Notification' in window) {
                Notification.requestPermission();
            }
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(() => { }, () => { });
            }
        }
    },

    router: async () => {
        // App.state.isInteracting = false; 
        App.state.busy = false; // reset
        var s = LS.get('me');
        var d = document.getElementById('app');
        var l_btn = `<div class="lang-toggle" onclick="App.toggleLang()">${App.state.lang === 'en' ? '<i class="ph-bold ph-translate"></i> HI' : '<i class="ph-bold ph-translate"></i> EN'}</div>`;

        if (!s) {
            // Auth flow
            var m = App.state.authMode || 'landing';
            var st = App.state.otpStep;
            var c = '';
            if (m === 'landing') {
                c = `<div class="landing-container fade-in"><div class="landing-header"><div class="logo-text">Near<span>Seva</span></div><div class="header-actions"><button class="btn-outline" onclick="App.showLogin()">${App.t('login')}</button><button class="btn-solid" onclick="App.showSignUp()">${App.t('register')}</button>${l_btn}</div></div><div class="hero-section"><h1 class="hero-title">Smart Daily Service Assistant</h1><p class="hero-subtitle">Made for Providers like Tiffin/Milk/Chai Wala — and Customers.<br>Smart tracking, alerts, billing and automation.</p></div><div class="feature-grid"><div class="feature-card"><div class="feature-icon">📍</div><h3>Geo-Tracking</h3><p class="text-muted">Auto customer notification</p></div><div class="feature-card"><div class="feature-icon">🔔</div><h3>Smart Alerts</h3><p class="text-muted">Late notice & live ETA</p></div><div class="feature-card"><div class="feature-icon">📅</div><h3>Easy Manage</h3><p class="text-muted">Skip & Vacation Mode</p></div></div><div style="text-align: center; margin-top: 3rem; padding-bottom: 1rem;"><small class="text-muted" style="opacity: 0.6;">Made with ❤️ by <strong style="color: var(--primary);">CodeFlux</strong></small></div></div>`;
            } else if (m === 'login') {
                c = `<div class="landing-container fade-in"><div class="landing-header"><div class="logo-text">Near<span>Seva</span></div><div class="header-actions"><button class="btn-outline" onclick="App.state.authMode='landing';App.router()">Home</button>${l_btn}</div></div><div class="card" style="max-width: 400px; margin: 2rem auto;"><h2 class="text-center">${App.t('login')}</h2><div style="margin-top: 1.5rem;">${st === 0 ? `<div class="form-group"><label>${App.t('phone_label')}</label><input type="tel" id="login-phone" placeholder="9876543210" maxlength="10"></div><button class="btn btn-primary" onclick="App.sendLoginOtp()">${App.t('get_otp')}</button>` : `<p class="text-center">${App.t('otp_sent')} <strong>${App.state.tempPhone}</strong></p><div class="form-group"><label>${App.t('enter_otp')}</label><input type="text" id="login-otp" class="otp-input" placeholder="••••" maxlength="4" style="text-align: center; letter-spacing: 0.5em; font-size: 1.2rem;"></div><button class="btn btn-primary" onclick="App.verifyOtp()">${App.t('verify_login')}</button>`}<button class="btn btn-secondary" onclick="App.goBack()"><i class="ph-bold ph-arrow-left"></i> Back</button></div></div></div>`;
            } else if (m === 'signup') {
                c = `<div class="landing-container fade-in"><div class="landing-header"><div class="logo-text">Near<span>Seva</span></div></div><div class="card" style="max-width: 400px; margin: 2rem auto;"><h2 class="text-center">${App.t('create_account')}</h2><div style="margin-top: 1.5rem;">${st === 0 ? `<div class="form-group"><label>${App.t('name')}</label><input type="text" id="signup-name" placeholder="Enter your name"></div><div class="form-group"><label>${App.t('phone_label')}</label><input type="tel" id="signup-phone" placeholder="9876543210" maxlength="10"></div><div class="form-group"><label>${App.t('role')}</label><select id="signup-role" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: var(--radius-md); background: white;"><option value="customer">${App.t('customer')}</option><option value="provider">${App.t('provider')}</option><option value="admin">${App.t('admin')}</option></select></div><button class="btn btn-primary" onclick="App.sendSignupOtp()">${App.t('get_otp')}</button>` : `<p class="text-center">${App.t('otp_sent')} <strong>${App.state.tempPhone}</strong></p><div class="form-group"><label>${App.t('enter_otp')}</label><input type="text" id="signup-otp" class="otp-input" placeholder="••••" maxlength="4" style="text-align: center; letter-spacing: 0.5em; font-size: 1.2rem;"></div><button class="btn btn-primary" onclick="App.verifySignupOtp()">${App.t('create_account')}</button>`}<button class="btn btn-secondary" onclick="App.goBack()"><i class="ph-bold ph-arrow-left"></i> Back</button></div></div></div>`;
            }
            d.innerHTML = c;
        } else {
            // Dashboard flow
            try {
                App.showLoading();
                if (s.role === 'provider') {
                    let dt = await API.getProviderData(s.phone);
                    LS.set('custs', dt.customers); LS.set('prods', dt.products); LS.set('logs', dt.deliveries); LS.set('reqs', dt.extraRequests); LS.set('customerProfiles', dt.customerProfiles);
                    d.innerHTML = ''; await App.renderProviderDashboard(d, l_btn);
                } else if (s.role === 'superadmin') {
                    d.innerHTML = ''; App.renderSuperAdminDashboard(d, l_btn);
                } else if (s.role === 'admin') {
                    d.innerHTML = ''; App.renderAdminDashboard(d, l_btn);
                } else if (s.role === 'customer') {
                    let dt = await API.getCustomerData(s.phone);
                    LS.set('customerRecords', dt.customerRecords); LS.set('dailyLogs', dt.deliveryLogs); LS.set('customerProviders', dt.providers); LS.set('customerProducts', dt.products);
                    d.innerHTML = ''; App.renderCustomerDashboard(d, l_btn);
                }
            } catch (e) {
                console.error(e);
                d.innerHTML = `<div class="container fade-in" style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;"><i class="ph-duotone ph-warning-circle" style="font-size: 4rem; color: var(--danger); margin-bottom: 1rem;"></i><h3>Connection Failed</h3><p class="text-danger">${e.message}</p><p class="text-muted">Could not load your dashboard data.</p><div style="display: flex; gap: 1rem; margin-top: 1rem;"><button class="btn btn-primary" onclick="App.router()">Retry</button><button class="btn btn-secondary" onclick="App.logout()">Logout</button></div></div>`;
            } finally { App.hideLoading() }
        }
    },

    renderSuperAdminDashboard: async (container, langBtn) => {
        const session = LS.get('me');
        const currentTab = App.state.currentTab || 'overview';
        let content = '';

        if (currentTab === 'overview') {
            let pendingCount = 0;
            try {
                // We can optimize this to just get count later, for now fetch all
                const pendingAdmins = await API.getPendingAdmins();
                pendingCount = pendingAdmins.length;
            } catch (e) { console.error(e); }

            content = `
                <div class="card">
                    <h2>Super Admin Overview</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>${pendingCount}</h3>
                            <small>Pending Approvals</small>
                        </div>
                        <div class="stat-card">
                            <h3>Active</h3>
                            <small>System Status</small>
                        </div>
                    </div>
                </div>
            `;
        } else if (currentTab === 'approvals') {
            let pendingAdmins = [];
            try {
                App.showLoading();
                pendingAdmins = await API.getPendingAdmins();
            } catch (e) {
                console.error(e);
                alert("Failed to load pending admins");
            } finally {
                App.hideLoading();
            }

            const adminList = pendingAdmins.length > 0 ? pendingAdmins.map(a => `
                <div class="card customer-card">
                    <div class="customer-info">
                        <h3>${a.name}</h3>
                        <p class="text-muted">${a.phone}</p>
                    </div>
                    <div class="customer-actions">
                        <button class="btn btn-primary" onclick="App.approveAdmin('${a.id}')">Approve</button>
                    </div>
                </div>
            `).join('') : '<p class="text-muted text-center">No pending approvals.</p>';

            content = `
                <div class="card">
                    <h3>Pending Admin Approvals</h3>
                    <div class="customer-list">
                        ${adminList}
                    </div>
                </div>
            `;
        } else if (currentTab === 'profile') {
            content = App.renderProfile(session, langBtn);
        }

        container.innerHTML = `
            <div class="landing-container fade-in" style="padding-bottom: 5rem;">
                <div class="landing-header" style="margin-bottom: 2rem;">
                    <div class="logo-text">Near<span>Seva</span></div>
                    <div class="header-actions">
                        ${langBtn}
                    </div>
                </div>
                ${content}
            </div>
            ${App.renderSuperAdminNavbar(currentTab)}
        `;

        // Set up realtime subscription for profiles
        API.unsubscribeAll(); // Clean up old subscriptions
        API.subscribeToProfiles((payload) => {
            log('[Super Admin] update ' + payload);
            App.tryRefresh();
        });
    },

    renderSuperAdminNavbar: (activeTab) => {
        return `
            <div class="navbar">
                <div class="nav-item ${activeTab === 'overview' ? 'active' : ''}" onclick="App.switchTab('overview')">
                    <i class="ph-bold ph-chart-pie-slice"></i>
                    <span>Overview</span>
                </div>
                <div class="nav-item ${activeTab === 'approvals' ? 'active' : ''}" onclick="App.switchTab('approvals')">
                    <i class="ph-bold ph-check-circle"></i>
                    <span>Approvals</span>
                </div>
                <div class="nav-item ${activeTab === 'profile' ? 'active' : ''}" onclick="App.switchTab('profile')">
                    <i class="ph-bold ph-user"></i>
                    <span>Profile</span>
                </div>
            </div>
        `;
    },

    approveUser: async (id) => {
        try {
            App.showLoading();
            await API.approveUser(id);
            alert("User Approved!");
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    broadcastMessage: async () => {
        const title = document.getElementById('broadcast-title').value;
        const msg = document.getElementById('broadcast-msg').value;

        if (!title || !msg) {
            alert("Please enter both title and message.");
            return;
        }

        if (!confirm(`Send broadcast to ALL users?\n\nTitle: ${title}\nMsg: ${msg}`)) return;

        try {
            App.showLoading();
            // Since we are using local storage for notifications, we need to iterate all known users.
            // In a real backend, this would be a single API call.
            const allUsers = await API.getAllUsers();

            allUsers.forEach(u => {
                App.notify(u.phone, title, msg, 'info');
            });

            alert(`Broadcast sent to ${allUsers.length} users.`);
            document.getElementById('broadcast-title').value = '';
            document.getElementById('broadcast-msg').value = '';
        } catch (e) {
            console.error(e);
            alert("Broadcast failed: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    approveAdmin: async (id) => {
        try {
            App.showLoading();
            await API.approveAdmin(id);
            alert("Admin Approved!");
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    renderProviderDashboard: async (container, langBtn) => {
        const session = LS.get('me');
        const currentTab = App.state.currentTab || 'home';

        let content = '';

        if (currentTab === 'home') {
            const isDelivering = LS.get('isDelivering') && LS.get('activeProvider') === session.phone;
            const allCustomers = LS.get('custs') || [];
            const customers = allCustomers.filter(c => c.provider_id === session.id);
            const lateMap = LS.get('lateStatusMap') || {};
            const isLate = lateMap[session.phone];

            console.log('[DEBUG] Provider Dashboard Home Tab');
            console.log('[DEBUG] session:', session);
            console.log('[DEBUG] isDelivering:', isDelivering);
            console.log('[DEBUG] allCustomers:', allCustomers);
            console.log('[DEBUG] filtered customers:', customers);

            content = `
                <div class="card" style="border-radius: 0;">
                    <h2>${App.t('welcome')}, Provider!</h2>
                    <small class="text-muted">ID: ${session.phone}</small>
                    <br><br>
                    ${isDelivering
                    ? `<div class="alert" style="color: var(--secondary); font-weight: bold;">${App.t('live_tracking')}</div>
                           <div id="map"></div>
                           <button class="btn btn-danger" onclick="App.stopDelivery()">${App.t('stop_delivery')}</button>
                           <button class="btn btn-secondary" onclick="App.simulateMovement()"><i class="ph-duotone ph-person-simple-run"></i> ${App.t('simulate_movement')}</button>`
                    : `<button class="btn btn-primary" onclick="App.startDelivery()">${App.t('start_delivery')}</button>`
                }
                    ${!isLate ? `<button class="btn btn-secondary" style="margin-top:0.5rem; border-color: var(--accent); color: var(--accent);" onclick="App.markLate()">${App.t('late_alert')}</button>` :
                    `<div class="alert" style="color: var(--accent); margin-top:0.5rem;"><i class='ph-duotone ph-warning'></i> Late Alert Sent</div>`}
                </div>
                
                <div class="card">
                    <h3>${App.t('pending_requests')}</h3>
                    ${(() => {
                    const requests = (LS.get('reqs') || []).filter(r => r.provider_id === session.id && r.status === 'pending');
                    if (requests.length === 0) return `<p class="text-muted">${App.t('no_pending_requests')}</p>`;

                    return requests.map(r => `
                            <div style="padding: 0.75rem; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>${r.customerName}</strong>
                                    <div class="text-muted" style="font-size: 0.9rem;">${r.item}</div>
                                    <small class="text-muted">${r.date}</small>
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="btn btn-primary" style="width: auto; padding: 0.5rem 1rem;" onclick="App.acceptRequest(${r.id})">${App.t('accept')}</button>
                                    <button class="btn btn-danger" style="width: auto; padding: 0.5rem 1rem;" onclick="App.rejectRequest(${r.id})">Reject</button>
                                </div>
                            </div>
                        `).join('');
                })()}
                </div>

                <div class="card">
                    <h3>Delivery Status <small class="text-muted">(Tomorrow)</small></h3>
                    <div class="list-group">
                        ${(() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const tomorrowStr = tomorrow.toISOString().split('T')[0];
                    const deliveries = LS.get('logs') || [];
                    const profiles = LS.get('customerProfiles') || [];

                    const statusList = customers.map(c => {
                        const profile = profiles.find(p => p.phone === c.phone);
                        const isVacation = profile?.vacation_mode;
                        const log = deliveries.find(d => d.customer_phone === c.phone && d.date === tomorrowStr);
                        const isSkipped = log && log.status === 'vacation';

                        let status = 'active';
                        let icon = '<i class="ph-fill ph-check-circle" style="color: var(--secondary);"></i>';
                        let label = 'Active';

                        if (isVacation) {
                            status = 'vacation';
                            icon = '<i class="ph-fill ph-sun" style="color: var(--accent);"></i>';
                            label = 'Vacation';
                        } else if (isSkipped) {
                            status = 'skipped';
                            icon = '<i class="ph-fill ph-skip-forward" style="color: orange;"></i>';
                            label = 'Skipped';
                        }
                        return { c, status, icon, label };
                    });

                    // Sort: Vacation/Skipped first
                    statusList.sort((a, b) => (a.status === 'active' ? 1 : -1));

                    if (statusList.length === 0) return '<p class="text-muted">No customers.</p>';

                    return statusList.map(item => `
                                <div class="list-group-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0;">
                                    <div>
                                        <strong>${item.c.name}</strong>
                                        <br><small class="text-muted">${item.c.phone}</small>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        ${item.icon} <span>${item.label}</span>
                                    </div>
                                </div>
                            `).join('');
                })()}
                    </div>
                </div>

                <div class="card">
                    <h3>${App.t('my_customers')} (${customers.length})</h3>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <button class="btn btn-secondary" style="flex: 1;" onclick="App.renderProductManager()">${App.t('manage_products')}</button>
                        <button class="btn btn-primary" style="flex: 1;" onclick="App.startNavigation()"><i class="ph-bold ph-navigation-arrow"></i> ${App.t('start_nav')}</button>
                    </div>
                    <div id="customer-list">
                        ${customers.length === 0 ? `<p class="text-muted">No customers yet.</p>` : ''}
                        ${customers.map(c => {
                    const products = LS.get('prods') || [];
                    let subText = '';

                    if (c.subscriptions && c.subscriptions.length > 0) {
                        const names = c.subscriptions.map(sub => {
                            const p = products.find(prod => prod.id == sub.productId);
                            return p ? p.name : 'Unknown';
                        }).join(', ');
                        const total = c.subscriptions.reduce((sum, sub) => {
                            const p = products.find(prod => prod.id == sub.productId);
                            return sum + (p ? p.price : 0);
                        }, 0);
                        subText = `${names} (₹${total}/day)`;
                    } else {
                        // Legacy fallback
                        const prod = products.find(p => p.id == c.productId);
                        subText = prod ? `${prod.name} (₹${prod.price})` : `₹${c.price || 50}/day`;
                    }

                    // Check delivery status
                    const todayStr = new Date().toISOString().split('T')[0];
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const tomorrowStr = tomorrow.toISOString().split('T')[0];

                    const deliveries = LS.get('logs') || [];
                    const customerProfiles = LS.get('customerProfiles') || [];

                    const todayLog = deliveries.find(d => d.customer_phone === c.phone && d.date === todayStr);
                    const tomorrowLog = deliveries.find(d => d.customer_phone === c.phone && d.date === tomorrowStr);

                    // Check vacation status from profile
                    const profile = customerProfiles.find(p => p.phone === c.phone);
                    const isVacation = profile ? profile.vacation_mode : false;

                    const isDelivered = todayLog && todayLog.status === 'delivered';
                    const isSkipped = todayLog && todayLog.status === 'skipped';
                    // const isVacation = todayLog && todayLog.status === 'vacation'; // Deprecated in favor of profile check
                    const isSkippedTomorrow = tomorrowLog && tomorrowLog.status === 'skipped';

                    let statusIcon = '';
                    if (isDelivered) statusIcon = '<i class="ph-fill ph-check-circle" style="color: var(--secondary); font-size: 1.5rem;"></i>';
                    else if (isSkipped) statusIcon = '<i class="ph-fill ph-skip-forward" style="color: var(--danger); font-size: 1.5rem;"></i>';
                    else if (isVacation) statusIcon = '<i class="ph-fill ph-sun" style="color: var(--accent); font-size: 1.5rem;"></i>';

                    const tomorrowBadge = isSkippedTomorrow ? `<span class="badge" style="background: var(--danger); color: white; font-size: 0.7rem; margin-left: 0.5rem;">Skip Tmrw</span>` : '';

                    return `
                            <div style="padding: 0.5rem; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <strong>${c.name} ${tomorrowBadge}</strong><br>
                                    <small class="text-muted">${c.phone}</small><br>
                                    <small class="text-muted" style="color: var(--primary);">${subText}</small>
                                </div>
                                <div style="display: flex; gap: 0.5rem; align-items: center;">
                                    ${statusIcon}
                                    ${!isDelivered && !isSkipped && !isVacation ? `
                                    <button class="btn btn-primary" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.8rem; background-color: var(--secondary); border-color: var(--secondary);" onclick="App.markDelivered(${c.id})">
                                        <i class="ph-bold ph-check"></i>
                                    </button>` : ''}
                                    <button class="btn btn-secondary" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="App.renderEditCustomer(${c.id})"><i class="ph-bold ph-pencil-simple"></i></button>
                                    <button class="btn btn-secondary" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="App.deleteCustomer(${c.id})"><i class="ph-bold ph-x"></i></button>
                                </div>
                            </div>
                        `}).join('')}
                    </div>
                    ${!isDelivering ? `<button class="btn btn-secondary" onclick="App.renderAddCustomer()">${App.t('add_customer')}</button>` : ''}
                </div>
            `;

            setTimeout(() => {
                if (document.getElementById('map')) {
                    App.initProviderMap(customers);
                }
            }, 100);

        } else if (currentTab === 'wallet') {
            content = await App.renderWallet();
        } else if (currentTab === 'history') {
            content = App.renderHistory();
        } else if (currentTab === 'profile') {
            content = App.renderProfile(session, langBtn);
        } else if (currentTab === 'analytics') {
            content = await App.renderAnalytics();
        } else if (currentTab === 'notifications') {
            content = App.renderNotifications();
        }

        container.innerHTML = `
                <div class="landing-container fade-in" style="padding-bottom: 5rem;">
                    <div class="landing-header" style="margin-bottom: 2rem;">
                        <div class="logo-text">Near<span>Seva</span></div>
                        <div class="header-actions">
                            ${langBtn}
                        </div>
                    </div>
                    ${content}
                </div>
                ${App.renderNavbar(currentTab)}
            `;

        // Set up realtime subscriptions for Provider
        API.unsubscribeAll(); // Clean up old subscriptions
        const providerId = session.id || session.phone;

        API.subscribeToCustomers(providerId, (payload) => {
            App.tryRefresh();
        });

        API.subscribeToDailyLogs(providerId, (payload) => {
            App.tryRefresh();
        });
    },


    renderCustomerDashboard: (container, langBtn) => {
        const session = LS.get('me');
        const currentTab = App.state.currentTab || 'home';

        let content = '';

        let isDelivering = false;
        let isVacation = false;

        if (currentTab === 'home') {
            // Get data from Store (fetched by router via API.getCustomerData)
            const customerRecords = LS.get('customerRecords') || [];
            const deliveryLogs = LS.get('dailyLogs') || []; // Fix key name
            const providers = LS.get('customerProviders') || [];
            const products = LS.get('customerProducts') || [];
            const extraRequests = LS.get('reqs') || []; // Assuming this is also fetched for customer
            const lateStatusMap = LS.get('lateStatusMap') || {}; // Assuming this is also fetched for customer

            // Determine overall delivery status and vacation mode for the customer
            // This logic might need refinement based on how multiple providers affect a customer's status
            // For now, let's assume if any linked provider is delivering, the customer sees it.
            // And vacation mode is a customer-wide setting.
            isVacation = LS.get('vacationMode'); // Customer's own vacation mode

            // Check delivery status and late status across all linked providers
            let activeProviderId = null;
            let isLate = false;
            if (customerRecords.length > 0) {
                for (const record of customerRecords) {
                    const provider = providers.find(p => p.id === record.provider_id);
                    if (provider && LS.get('isDelivering') && LS.get('activeProvider') === provider.phone) {
                        isDelivering = true;
                        activeProviderId = provider.phone;
                        break; // Found an active delivery
                    }
                }
                // Check late status for any linked provider
                for (const record of customerRecords) {
                    const provider = providers.find(p => p.id === record.provider_id);
                    if (provider && lateStatusMap[provider.phone]) {
                        isLate = true;
                        break; // Found a late provider
                    }
                }
            }


            let billsHtml = '';

            if (customerRecords.length > 0) {
                billsHtml = customerRecords.map(custRecord => {
                    // Find provider for this record
                    const provider = providers.find(p => p.id === custRecord.provider_id);
                    const providerName = provider ? provider.name : 'Unknown Provider';

                    // Calculate price per day from subscriptions
                    let pricePerDay = 0;
                    let itemsText = '';

                    if (custRecord.subscriptions && custRecord.subscriptions.length > 0) {
                        custRecord.subscriptions.forEach(sub => {
                            const product = products.find(p => p.id == sub.productId);
                            if (product) {
                                pricePerDay += product.price;
                                itemsText += (itemsText ? ', ' : '') + product.name;
                            }
                        });
                    } else {
                        // Legacy single product
                        const product = products.find(p => p.id == custRecord.productId);
                        if (product) {
                            pricePerDay = product.price;
                            itemsText = product.name;
                        }
                    }

                    // Count deliveries THIS MONTH for this provider
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();

                    let monthlyDeliveries = [];
                    if (Array.isArray(deliveryLogs)) {
                        console.log(`[BILL DEBUG] Total Logs: ${deliveryLogs.length}`);
                        monthlyDeliveries = deliveryLogs.filter(log => {
                            const logDate = new Date(log.date);
                            const isProvider = log.provider_id === custRecord.provider_id;

                            // Normalize phones for comparison
                            const cleanLogPhone = log.customer_phone.replace(/\D/g, '');
                            const cleanSessionPhone = session.phone.replace(/\D/g, '');
                            const isPhone = cleanLogPhone === cleanSessionPhone;

                            const isDelivered = log.status === 'delivered';
                            const isMonth = logDate.getMonth() === currentMonth;
                            const isYear = logDate.getFullYear() === currentYear;

                            if (isPhone && isProvider) {
                                console.log(`[BILL DEBUG] Log: ${log.date}, Status: ${log.status}, Match: ${isDelivered && isMonth && isYear}`);
                            }

                            return isProvider && isPhone && isDelivered && isMonth && isYear;
                        });
                    } else {
                        console.warn("deliveryLogs is not an array, skipping bill calc", deliveryLogs);
                    }

                    const daysDelivered = monthlyDeliveries.length;

                    // Extra Charges for this customer record and provider
                    const recordExtraCharges = extraRequests
                        .filter(r => r.customer_id === custRecord.id && r.provider_id === custRecord.provider_id && r.status === 'accepted');
                    const totalExtra = recordExtraCharges.reduce((sum, c) => sum + c.amount, 0);

                    const totalAmount = (pricePerDay * daysDelivered) + totalExtra;
                    const extraChargesHtml = totalExtra > 0 ? `<br><small style="color: #FFD700;">+ ₹${totalExtra} Extra Charges</small>` : '';


                    return `
                    <div class="card bill-card" style="margin-bottom: 1rem;">
                        <p>${App.t('total_bill')} (${providerName})</p>
                        <div class="bill-amount">₹${totalAmount}</div>
                        <small>${itemsText || 'Subscription'} @ ₹${pricePerDay}/day</small>
                        <br>
                        <small>${daysDelivered} ${App.t('days_delivered')} this month</small>
                        ${extraChargesHtml}
                        
                        <button class="btn btn-secondary" style="margin-top: 1rem; background: rgba(255,255,255,0.2); border: none; color: white;" onclick="App.viewBill('${providerName}', ${totalAmount}, '${itemsText}')">
                            <i class="ph-bold ph-receipt"></i> ${App.t('view_bill')}
                        </button>
                    </div>
                `;
                }).join('');
            } else {
                billsHtml = `<p class="text-muted">${App.t('no_subscriptions')}</p>`;
            }

            content = `
            <div class="card" style="background: transparent; border: none; box-shadow: none; padding: 0; margin-bottom: 1rem; border-radius: 0;">
                <h2 style="margin-bottom: 0.25rem; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${App.t('welcome')}, ${session.name}!</h2>
                <small style="color: rgba(255, 255, 255, 0.8);">Customer</small>
            </div>

            <!-- Status Banner -->
    <div class="card" style="background: ${isDelivering ? 'rgba(16, 185, 129, 0.9)' : (isLate ? 'rgba(245, 158, 11, 0.9)' : 'white')}; border-color: ${isDelivering ? 'var(--secondary)' : (isLate ? 'var(--accent)' : 'transparent')};">
        <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2rem; color: ${isDelivering ? 'white' : (isLate ? 'white' : 'var(--text-muted)')};">
                ${isDelivering ? '<i class="ph-duotone ph-truck"></i>' : (isLate ? '<i class="ph-duotone ph-warning"></i>' : '<i class="ph-duotone ph-clock"></i>')}
            </div>
            <div>
                <h3 style="margin: 0; font-size: 1.1rem; color: ${isDelivering || isLate ? 'white' : 'var(--text-main)'};">${isDelivering ? App.t('arriving_soon') : (isLate ? App.t('running_late') : App.t('no_active_delivery'))}</h3>
                <p style="margin: 0; font-size: 0.9rem; color: ${isDelivering || isLate ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)'};">${isDelivering ? App.t('order_on_way') : (isLate ? App.t('provider_delayed') : App.t('waiting_updates'))}</p>
            </div>
        </div>
        ${isDelivering ? '<div id="map" style="height: 150px; margin-top: 1rem; border-radius: var(--radius-md);"></div>' : ''}
    </div>

                ${isVacation ? `<div class="alert" style="background: var(--accent); color: white; margin-bottom: 1.5rem;"><i class="ph-bold ph-sun"></i> ${App.t('vacation_active')}</div>` : ''}

                <!--Bills Section-->
    <h3 style="margin-bottom: 1rem;">${App.t('your_bills')}</h3>
                ${billsHtml}

                <!--Attendance Section-->
                <h3 style="margin-top: 2rem; margin-bottom: 1rem;">${App.t('calendar')}</h3>
                <div class="card">
                    <div class="calendar-grid">
                        ${App.generateCalendar()}
                    </div>
                </div>

                <!--Quick Actions Grid-->
                <h3 style="margin-top: 2rem; margin-bottom: 1rem;">${App.t('quick_actions')}</h3>
                <div class="action-grid">
                    <button class="btn btn-secondary action-btn" onclick="App.requestExtra()">
                        <i class="ph-duotone ph-plus-circle" style="font-size: 1.5rem; color: var(--primary); margin-bottom: 0.5rem;"></i>
                        <span>${App.t('request_extra')}</span>
                    </button>
                    <button class="btn btn-secondary action-btn" onclick="App.toggleVacation()">
                        <i class="ph-duotone ph-airplane-tilt" style="font-size: 1.5rem; color: var(--accent); margin-bottom: 0.5rem;"></i>
                        <span>${isVacation ? 'End Vacation' : App.t('vacation_mode')}</span>
                    </button>
                    <button class="btn btn-secondary action-btn" onclick="App.skipTomorrow()">
                        <i class="ph-duotone ph-skip-forward" style="font-size: 1.5rem; color: var(--danger); margin-bottom: 0.5rem;"></i>
                        <span>${App.t('skip_tomorrow')}</span>
                    </button>
                    <button class="btn btn-secondary action-btn" onclick="App.renderSupportBot()" style="flex-direction: column; gap: 0.25rem; height: auto; padding: 1.5rem;">
                        <i class="ph-duotone ph-chat-circle-text" style="font-size: 2rem; color: var(--secondary); margin-bottom: 0.25rem;"></i>
                        <span style="font-weight: 700; font-size: 1.1rem; color: var(--text-main);">Support</span>
                        <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">Chat with AI</span>
                    </button>
                </div>
`;

            setTimeout(() => {
                if (document.getElementById('map')) {
                    App.initCustomerMap();
                }
            }, 100);

        } else if (currentTab === 'wallet') {
            content = App.renderWallet();
        } else if (currentTab === 'history') {
            content = App.renderHistory();
        } else if (currentTab === 'profile') {
            content = App.renderProfile(session, langBtn);
        } else if (currentTab === 'schedule') {
            content = App.renderSchedule();
        } else if (currentTab === 'notifications') {
            content = App.renderNotifications();
        }


        container.innerHTML = `
                <div class="landing-container fade-in" style="padding-bottom: 5rem;">
                    <div class="landing-header" style="margin-bottom: 2rem;">
                        <div class="logo-text">Near<span>Seva</span></div>
                        <div class="header-actions">
                            ${langBtn}
                        </div>
                    </div>
                    ${content}
                </div>
                ${App.renderNavbar(currentTab)}
            `;

        if (currentTab === 'home' && isDelivering && !isVacation) {
            // Trigger Voice Notification
            App.speak(App.t('voice_arriving'));
        }
    },

    renderAddCustomer: () => {
        const session = LS.get('me');
        const products = (LS.get('prods') || []).filter(p => p.provider_id === session.id);
        const appDiv = document.getElementById('app');

        // Initialize step if not set
        if (!App.state.addCustomerStep) App.state.addCustomerStep = 1;

        // lock ui
        App.state.busy = true;

        const step = App.state.addCustomerStep;
        const temp = App.state.tempCustomer || {};

        let content = '';

        if (step === 1) {
            content = `
                <div class="card">
                    <h2>${App.t('add_customer')} (1/2)</h2>
                    <div class="form-group">
                        <label>Customer Name</label>
                        <input type="text" id="cust-name" placeholder="Enter name" value="${temp.name || ''}">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="cust-phone" placeholder="9876543210" maxlength="10" value="${temp.phone || ''}">
                    </div>
                    <div class="form-group">
                        <label>${App.t('select_product')}</label>
                        <div style="max-height: 150px; overflow-y: auto;">
                            ${products.map(p => {
                const isChecked = temp.subscriptions && temp.subscriptions.find(s => s.productId == p.id);
                return `
                                    <label class="checkbox-item">
                                        <input type="checkbox" name="cust-product" value="${p.id}" ${isChecked ? 'checked' : ''}>
                                        <span>${p.name} - ₹${p.price}</span>
                                    </label>
                                `;
            }).join('')}
                        </div>
                        ${products.length === 0 ? '<small class="text-muted"><a href="#" onclick="App.renderProductManager()">Add Products first</a></small>' : ''}
                    </div>
                    <div class="form-group">
                        <label>${App.t('address')}</label>
                        <input type="text" id="cust-address" placeholder="Enter address" value="${temp.address || ''}">
                    </div>
                    
                    <button class="btn btn-primary" onclick="App.nextAddCustomerStep()">${App.t('next')} <i class="ph-bold ph-arrow-right"></i></button>
                    <button class="btn btn-secondary" onclick="App.router()">${App.t('cancel')}</button>
                </div>
            `;
        } else {
            content = `
                <div class="card">
                    <h2>${App.t('add_customer')} (2/2)</h2>
                    <p class="text-muted text-center">${App.t('pick_location')}</p>
                    
                    <!-- Full height map container for easy interaction -->
                    <div id="map" style="height: 400px; width: 100%; border-radius: 12px; margin-bottom: 1rem; z-index: 1;"></div>

                    <div style="display: flex; gap: 1rem;">
                        <button class="btn btn-secondary" onclick="App.prevAddCustomerStep()"><i class="ph-bold ph-arrow-left"></i> ${App.t('back')}</button>
                        <button class="btn btn-primary" onclick="App.saveCustomer()">${App.t('save')}</button>
                    </div>
                </div>
            `;
        }

        appDiv.innerHTML = `
            <div class="container fade-in">
                ${content}
            </div>
        `;

        if (step === 2) {
            setTimeout(() => {
                if (typeof L === 'undefined') {
                    document.getElementById('map').innerHTML = '<p class="text-danger text-center">Map could not be loaded. Please check your internet connection.</p>';
                    return;
                }
                const map = L.map('map').setView([28.6139, 77.2090], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                let marker;
                // Restore temp location if exists
                if (LS.get('temp_location')) {
                    const loc = LS.get('temp_location');
                    marker = L.marker(loc).addTo(map);
                    map.setView(loc, 15);
                }

                map.on('click', (e) => {
                    if (marker) map.removeLayer(marker);
                    marker = L.marker(e.latlng).addTo(map);
                    LS.set('temp_location', e.latlng);
                });
            }, 100);
        }
    },

    nextAddCustomerStep: () => {
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const address = document.getElementById('cust-address').value;

        // Get selected products
        const checkboxes = document.querySelectorAll('input[name="cust-product"]:checked');
        const subscriptions = Array.from(checkboxes).map(cb => ({
            productId: cb.value,
            qty: 1
        }));

        if (!name || !phone || phone.length !== 10) {
            alert(App.t('fill_details') + " (Check Phone)");
            return;
        }

        App.state.tempCustomer = { name, phone, address, subscriptions };
        App.state.addCustomerStep = 2;
        App.renderAddCustomer();
    },

    prevAddCustomerStep: () => {
        App.state.addCustomerStep = 1;
        App.renderAddCustomer();
    },

    renderEditCustomer: (id) => {
        const session = LS.get('me');
        const customers = LS.get('custs') || [];
        const customer = customers.find(c => c.id === id);

        if (!customer) {
            alert("Customer not found!");
            App.router();
            return;
        }

        const products = (LS.get('prods') || []).filter(p => p.provider_id === session.id);
        const appDiv = document.getElementById('app');

        // Pre-check subscriptions
        const subIds = (customer.subscriptions || []).map(s => s.productId);

        appDiv.innerHTML = `
    <div class="container fade-in">
        <div class="card">
            <h2>${App.t('edit_customer')}</h2>
            <div class="form-group">
                <label>${App.t('name')}</label>
                <input type="text" id="cust-name" value="${customer.name}">
            </div>
            <div class="form-group">
                <label>${App.t('phone_label')}</label>
                <input type="tel" id="cust-phone" value="${customer.phone}" maxlength="10">
            </div>
            <div class="form-group">
                <label>${App.t('select_product')}</label>
                <div style="max-height: 150px; overflow-y: auto;">
                    ${products.map(p => `
                                <label class="checkbox-item">
                                    <input type="checkbox" name="cust-product" value="${p.id}" ${subIds.includes(p.id) ? 'checked' : ''}>
                                    <span>${p.name} - ₹${p.price}</span>
                                </label>
                            `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>${App.t('address')}</label>
                <input type="text" id="cust-address" value="${customer.address}">
            </div>
            <div id="map"></div>
            <p class="text-muted text-center">${App.t('pick_location')}</p>

            <button class="btn btn-primary" onclick="App.updateCustomer(${customer.id})">${App.t('save')}</button>
            <button class="btn btn-secondary" onclick="App.router()">${App.t('cancel')}</button>
        </div>
            </div>
    `;

        LS.set('temp_location', customer.location);

        setTimeout(() => {
            if (typeof L === 'undefined') {
                document.getElementById('map').innerHTML = '<p class="text-danger text-center">Map could not be loaded. Please check your internet connection.</p>';
                return;
            }
            const map = L.map('map').setView([customer.location.lat, customer.location.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            let marker = L.marker(customer.location).addTo(map);

            map.on('click', (e) => {
                if (marker) map.removeLayer(marker);
                marker = L.marker(e.latlng).addTo(map);
                LS.set('temp_location', e.latlng);
            });
        }, 100);
    },

    updateCustomer: (id) => {
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const address = document.getElementById('cust-address').value;
        const location = LS.get('temp_location');

        // Get selected products
        const checkboxes = document.querySelectorAll('input[name="cust-product"]:checked');
        const subscriptions = Array.from(checkboxes).map(cb => ({
            productId: cb.value,
            qty: 1
        }));

        if (!name || !phone || !location) {
            alert(App.t('fill_details'));
            return;
        }

        const customers = LS.get('custs') || [];
        const index = customers.findIndex(c => c.id === id);

        if (index !== -1) {
            customers[index] = {
                ...customers[index],
                name,
                phone,
                subscriptions,
                address,
                location
            };
            LS.set('custs', customers);
            alert("Customer updated!");
            App.router();
        } else {
            alert("Error updating customer.");
        }
    },

    // --- Navbar & New Views ---

    renderNavbar: (activeTab) => {
        const session = LS.get('me');
        const isProvider = session && session.role === 'provider';

        return `
    <div class="navbar">
        <div class="nav-item ${activeTab === 'home' ? 'active' : ''}" onclick="App.switchTab('home')">
            <i class="ph-bold ph-house"></i>
            <span>${App.t('nav_home')}</span>
        </div>
                
                ${isProvider ? `
                    <div class="nav-item ${activeTab === 'analytics' ? 'active' : ''}" onclick="App.switchTab('analytics')">
                        <i class="ph-bold ph-chart-bar"></i>
                        <span>Insights</span>
                    </div>
                ` : `
                    <div class="nav-item ${activeTab === 'schedule' ? 'active' : ''}" onclick="App.switchTab('schedule')">
                        <i class="ph-bold ph-calendar-check"></i>
                        <span>Schedule</span>
                    </div>
                `}

                <div class="nav-item ${activeTab === 'notifications' ? 'active' : ''}" onclick="App.switchTab('notifications')">
                    <i class="ph-bold ph-bell"></i>
                    <span>Alerts</span>
                </div>

                <div class="nav-item ${activeTab === 'profile' ? 'active' : ''}" onclick="App.switchTab('profile')">
                    <i class="ph-bold ph-user"></i>
                    <span>${App.t('nav_profile')}</span>
                </div>
            </div>
    `;
    },

    switchTab: (tab) => {
        App.state.currentTab = tab;
        App.router();
    },

    renderWallet: async () => {
        try {
            const earnings = await API.calculateWeeklyEarnings();
            return `
                <div class="card bill-card">
                    <p>${App.t('weekly_earnings')}</p>
                    <div class="bill-amount">₹${earnings.weeklyEarnings}</div>
                    <small class="text-muted">${earnings.deliveryCount} deliveries this week</small>
                </div>
                <div class="card">
                    <h3>Earnings Breakdown</h3>
                    <p class="text-muted">Based on deliveries marked in the last 7 days</p>
                </div>
            `;
        } catch (error) {
            console.error('Error calculating earnings:', error);
            return `
                <div class="card">
                    <p class="text-muted">Unable to load earnings data</p>
                </div>
            `;
        }
    },



    renderProfile: (session, langBtn) => {
        return `
    <div class="card text-center">
                <div style="width: 80px; height: 80px; background: var(--primary); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                    ${session.name.charAt(0)}
                </div>
                <h2>${session.name}</h2>
                <p class="text-muted">${session.phone} | ${session.role.toUpperCase()}</p>
                <button class="btn btn-secondary" onclick="App.renderEditProfile()">${App.t('edit_profile')}</button>
            </div>

    <div class="card">
        <h3>${App.t('profile_settings')}</h3>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--glass-border);">
            <span>Language</span>
            <div onclick="App.toggleLang()" style="color: var(--primary); font-weight: bold; cursor: pointer;">
                ${App.state.lang === 'en' ? 'English' : 'Hindi'} <i class="ph-bold ph-arrows-left-right"></i>
            </div>
        </div>
        <div onclick="App.referFriend()" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--glass-border); cursor: pointer;">
            <span>Refer a Friend</span>
            <i class="ph-bold ph-share-network" style="color: var(--primary);"></i>
        </div>
        <div onclick="App.renderSupportBot()" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--glass-border); cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <i class="ph-bold ph-chat-circle-text" style="color: var(--primary);"></i>
                <span>Support Chat</span>
            </div>
            <i class="ph-bold ph-caret-right text-muted"></i>
        </div>
        <div style="padding: 1rem 0;">
            <button class="btn btn-danger" onclick="App.logout()">${App.t('logout')}</button>
        </div>
    </div>
`;
    },

    renderEditProfile: () => {
        const session = LS.get('me');
        const appDiv = document.getElementById('app');

        appDiv.innerHTML = `
            <div class="landing-container fade-in">
                <div class="card">
                    <h2>${App.t('edit_profile')}</h2>
                    <div class="form-group">
                        <label>${App.t('name')}</label>
                        <input type="text" id="edit-name" value="${session.name}">
                    </div>
                    <div class="form-group">
                        <label>${App.t('phone_label')}</label>
                        <input type="text" value="${session.phone}" disabled style="background: #f3f4f6; color: #9ca3af;">
                        <small class="text-muted">Phone number cannot be changed.</small>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="App.saveProfile()">${App.t('save')}</button>
                        <button class="btn btn-secondary" onclick="App.router()">${App.t('cancel')}</button>
                    </div>
                </div>
            </div>
            ${App.renderNavbar('profile')}
        `;
    },

    saveProfile: () => {
        const newName = document.getElementById('edit-name').value;
        if (!newName) {
            alert("Name cannot be empty!");
            return;
        }

        const session = LS.get('me');
        const users = LS.get('users') || [];

        // Update in Users Array
        const userIndex = users.findIndex(u => u.phone === session.phone);
        if (userIndex !== -1) {
            users[userIndex].name = newName;
            LS.set('users', users);
        }

        // Update Current Session
        session.name = newName;
        LS.set('me', session);

        alert("Profile Updated!");
        App.router();
    },

    notify: (userId, title, msg, type = 'info') => {
        const notifications = LS.get('notifications') || [];
        notifications.unshift({
            id: Date.now(),
            userId,
            title,
            msg,
            type,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        });
        LS.set('notifications', notifications);
    },

    logHistory: (userId, action, details) => {
        const history = LS.get('history') || [];
        history.unshift({
            id: Date.now(),
            userId,
            action,
            details,
            date: new Date().toLocaleDateString()
        });
        LS.set('history', history);
    },

    renderNotifications: () => {
        const session = LS.get('me');
        const allNotifs = LS.get('notifications') || [];
        // Filter for current user or global system alerts
        const myNotifs = allNotifs.filter(n => n.userId === session.phone || n.userId === 'all');

        return `
    <div class="card">
        <h3>Notifications</h3>
                ${myNotifs.length === 0 ? '<p class="text-muted">No new notifications.</p>' : ''}
                ${myNotifs.map(n => `
                    <div class="notification-item">
                        <div class="notification-icon">
                            <i class="ph-bold ${n.type === 'money' ? 'ph-currency-inr' : 'ph-bell'}"></i>
                        </div>
                        <div class="notification-content">
                            <h4>${n.title}</h4>
                            <p>${n.msg}</p>
                        </div>
                        <span class="notification-time">${n.time}</span>
                    </div>
                `).join('')
            }
                ${myNotifs.length > 0 ? `<button class="btn btn-secondary" style="margin-top: 1rem;" onclick="App.clearNotifications()">Clear All</button>` : ''}
            </div>
    `;
    },

    clearNotifications: () => {
        const session = LS.get('me');
        let allNotifs = LS.get('notifications') || [];
        // Keep only those NOT belonging to this user (effectively clearing theirs)
        allNotifs = allNotifs.filter(n => n.userId !== session.phone && n.userId !== 'all');
        LS.set('notifications', allNotifs);
        App.router();
    },

    renderHistory: () => {
        const session = LS.get('me');
        const allHistory = LS.get('history') || [];
        const myHistory = allHistory.filter(h => h.userId === session.phone);

        return `
    <div class="card">
        <h3>${App.t('nav_history')}</h3>
                ${myHistory.length === 0 ? '<p class="text-muted">No history yet.</p>' : ''}
                ${myHistory.map(h => `
                    <div style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
                        <strong>${h.date}</strong><br>
                        <span style="color: var(--primary); font-weight: bold;">${h.action}</span><br>
                        <small class="text-muted">${h.details}</small>
                    </div>
                `).join('')}
        </div>
    `;
    },

    renderAnalytics: async () => {
        const session = LS.get('me');
        const customers = (LS.get('custs') || []).filter(c => c.provider_id === session.id);
        const products = LS.get('prods') || [];
        const deliveries = LS.get('logs') || [];

        // Calculate revenue from actual deliveries in last 7 days
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Get deliveries from last 7 days
        const recentDeliveries = deliveries.filter(d => {
            const deliveryDate = new Date(d.date);
            return deliveryDate >= weekAgo && d.status === 'delivered';
        });

        // Calculate weekly earnings by day
        const dailyEarnings = [0, 0, 0, 0, 0, 0, 0]; // Last 7 days
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const todayIndex = today.getDay();

        // Build customer phone -> price map
        const customerPriceMap = {};
        customers.forEach(c => {
            let dailyPrice = 0;
            if (c.subscriptions && c.subscriptions.length > 0) {
                c.subscriptions.forEach(sub => {
                    const product = products.find(p => p.id == sub.productId);
                    if (product) dailyPrice += product.price;
                });
            }
            customerPriceMap[c.phone] = dailyPrice;
        });

        let totalWeeklyEarnings = 0;
        recentDeliveries.forEach(delivery => {
            const price = customerPriceMap[delivery.customer_phone] || 0;
            totalWeeklyEarnings += price;

            // Add to correct day
            const deliveryDate = new Date(delivery.date);
            const daysAgo = Math.floor((today - deliveryDate) / (24 * 60 * 60 * 1000));
            if (daysAgo >= 0 && daysAgo < 7) {
                dailyEarnings[6 - daysAgo] += price;
            }
        });

        // Calculate potential daily revenue (if all customers delivered)
        let potentialDailyRevenue = 0;
        customers.forEach(c => {
            potentialDailyRevenue += customerPriceMap[c.phone] || 0;
        });

        const potentialMonthly = potentialDailyRevenue * 30; // 30 days
        const activeCount = customers.length;

        // Get day labels for chart (last 7 days)
        const dayLabels = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
            dayLabels.push(days[d.getDay()].charAt(0));
        }

        // Normalize chart heights
        const maxEarning = Math.max(...dailyEarnings, 1);
        const chartHeights = dailyEarnings.map(e => Math.max((e / maxEarning) * 100, 5));

        return `
    <div class="card">
            <h3>Weekly Earnings</h3>
            <div class="chart-container">
                ${chartHeights.map((h, i) => `
                    <div class="chart-bar" style="height: ${h}%;">
                        <span>${dayLabels[i]}</span>
                        <div class="chart-tooltip">₹${dailyEarnings[i]}</div>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                <div class="text-center">
                    <small class="text-muted">This Week</small>
                    <h3>₹${totalWeeklyEarnings}</h3>
                </div>
                <div class="text-center">
                    <small class="text-muted">Customers</small>
                    <h3>${activeCount}</h3>
                </div>
                <div class="text-center">
                    <small class="text-muted">Deliveries</small>
                    <h3>${recentDeliveries.length}</h3>
                </div>
            </div>
        </div>

    <div class="card">
        <h3>Revenue Insights</h3>
        <div style="margin-top: 1rem;">
            <div style="margin-bottom: 1rem;">
                <small class="text-muted">Potential Monthly Revenue</small>
                <h3>₹${potentialMonthly}</h3>
                <small class="text-muted">If all ${activeCount} customers delivered daily for 30 days</small>
            </div>
            <div style="margin-bottom: 1rem;">
                <small class="text-muted">Potential Daily</small>
                <h3>₹${potentialDailyRevenue}</h3>
            </div>
        </div>
    </div>
`;
    },

    renderSchedule: () => {
        const session = LS.get('me');
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const vacationDays = LS.get('vacationDays') || []; // ['2023-11-25', ...]
        const deliveryLog = LS.get('deliveryLog') || {}; // {'2023-11-24': 'delivered'}

        let daysHtml = '';
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isToday = i === today.getDate();

            let statusClass = '';
            if (vacationDays.includes(dateStr)) statusClass = 'vacation';
            else if (deliveryLog[dateStr] === 'delivered') statusClass = 'delivered';
            else if (deliveryLog[dateStr] === 'missed') statusClass = 'missed';

            daysHtml += `
    <div class="calendar-day ${statusClass} ${isToday ? 'today' : ''}" onclick="App.toggleVacationDate('${dateStr}')">
        ${i}
                    ${statusClass === 'vacation' ? '<i class="ph-fill ph-airplane-tilt" style="font-size: 0.6rem; position: absolute; bottom: 4px;"></i>' : ''}
                </div>
    `;
        }

        return `
    <div class="card">
                <h3>My Schedule</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <strong>${today.toLocaleString('default', { month: 'long' })} ${currentYear}</strong>
                    <div style="display: flex; gap: 0.5rem; font-size: 0.7rem;">
                        <span style="color: var(--secondary);">● Delivered</span>
                        <span style="color: var(--accent);">● Vacation</span>
                    </div>
                </div>
                <div class="calendar-header">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div class="calendar-grid">
                    ${daysHtml}
                </div>
                <p class="text-muted" style="font-size: 0.8rem; margin-top: 1rem; text-align: center;">
                    Tap a future date to toggle Vacation Mode.
                </p>
            </div>
    `;
    },

    toggleVacationDate: (dateStr) => {
        const todayStr = new Date().toISOString().split('T')[0];
        if (dateStr < todayStr) {
            alert("Cannot change status for past dates.");
            return;
        }

        let vacationDays = LS.get('vacationDays') || [];
        if (vacationDays.includes(dateStr)) {
            vacationDays = vacationDays.filter(d => d !== dateStr);
            App.notify(LS.get('me').phone, 'Schedule Update', `Vacation removed for ${dateStr}.`, 'info');
        } else {
            vacationDays.push(dateStr);
            App.notify(LS.get('me').phone, 'Schedule Update', `Vacation scheduled for ${dateStr}.`, 'info');
        }
        LS.set('vacationDays', vacationDays);
        App.router();
    },



    renderAdminDashboard: async (container, langBtn) => {
        const session = LS.get('me');
        const currentTab = App.state.currentTab || 'overview';
        let content = '';

        if (currentTab === 'overview') {
            let allUsers = [];
            try {
                allUsers = await API.getAllUsers();
            } catch (e) {
                console.error(e);
            }

            const providers = allUsers.filter(u => u.role === 'provider').length;
            const customers = allUsers.filter(u => u.role === 'customer').length;

            content = `
    <div class="container">
    <div class="card">
                    <h2>${App.t('admin_overview')}</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>${allUsers.length}</h3>
                            <small>${App.t('total_users')}</small>
                        </div>
                        <div class="stat-card">
                            <h3>₹12k</h3>
                            <small>${App.t('revenue')}</small>
                        </div>
                        <div class="stat-card">
                            <h3>${providers}</h3>
                            <small>${App.t('providers')}</small>
                        </div>
                        <div class="stat-card">
                            <h3>${customers}</h3>
                            <small>${App.t('custs')}</small>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3>Broadcast Message</h3>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="broadcast-title" placeholder="e.g. System Update">
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <input type="text" id="broadcast-msg" placeholder="Type your message here...">
                    </div>
                    <button class="btn btn-primary" onclick="App.broadcastMessage()">Send to All</button>
                </div>
    </div>
    `;
        } else if (currentTab === 'users') {
            let users = [];
            try {
                App.showLoading();
                users = await API.getAllUsers();
            } catch (e) {
                console.error(e);
                alert("Failed to load users");
            } finally {
                App.hideLoading();
            }

            content = `
    <div class="card">
        <h3>${App.t('user_management')}</h3>
                    ${users.length === 0 ? '<p class="text-muted">No users found.</p>' : users.map(u => `
                        <div class="user-list-item">
                            <div>
                                <strong>${u.name}</strong> <small>(${u.role})</small><br>
                                <small class="text-muted">${u.phone}</small>
                                ${u.banned ? '<span style="color: red; font-weight: bold;">(BANNED)</span>' : ''}
                                ${u.status === 'pending' ? '<span style="color: orange; font-weight: bold;">(PENDING)</span>' : ''}
                            </div>
                            
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                ${u.status === 'pending' ? `
                                    <button class="btn btn-primary" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="App.approveUser('${u.id}')">
                                        Approve
                                    </button>
                                ` : ''}

                                ${u.role !== 'admin' && u.role !== 'superadmin' ? `
                                    <button class="btn ${u.banned ? 'btn-secondary' : 'btn-danger'}" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="${u.banned ? `App.unbanUser('${u.phone}')` : `App.banUser('${u.phone}')`}">
                                        ${u.banned ? App.t('unban') : App.t('ban')}
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
    `;
        } else if (currentTab === 'support') {
            // List of active chats (simulated)
            const chats = LS.get('chats') || [];
            content = `
    <div class="card">
        <h3>${App.t('support_tickets')}</h3>
                    ${chats.length === 0 ? `<p class="text-muted">${App.t('no_tickets')}</p>` : ''}
                    ${chats.map(c => `
                        <div class="user-list-item" onclick="App.renderChat('${c.id}')">
                            <div>
                                <strong>${c.userName}</strong><br>
                                <small class="text-muted">${c.lastMessage}</small>
                            </div>
                            <span class="text-muted">${App.t('open')}</span>
                        </div>
                    `).join('')
                }
                </div>
    `;
        } else if (currentTab === 'profile') {
            content = App.renderProfile(session, langBtn);
        }


        container.innerHTML = `
                <div class="landing-container fade-in" style="padding-bottom: 5rem;">
                    <div class="landing-header" style="margin-bottom: 2rem;">
                        <div class="logo-text">Near<span>Seva</span></div>
                        <div class="header-actions">
                            ${langBtn}
                        </div>
                    </div>
                    ${content}
                </div>
                ${App.renderAdminNavbar(currentTab)}
            `;

        // Set up realtime subscription for profiles
        API.unsubscribeAll(); // Clean up old subscriptions
        API.subscribeToProfiles((payload) => {
            console.log('[Admin] Realtime update:', payload);
            // Refresh current tab
            App.router();
        });
    },

    renderAdminNavbar: (activeTab) => {
        return `
    <div class="navbar">
                <div class="nav-item ${activeTab === 'overview' ? 'active' : ''}" onclick="App.switchTab('overview')">
                    <i class="ph-bold ph-chart-pie-slice"></i>
                    <span>Overview</span>
                </div>
                <div class="nav-item ${activeTab === 'users' ? 'active' : ''}" onclick="App.switchTab('users')">
                    <i class="ph-bold ph-users"></i>
                    <span>Users</span>
                </div>
                <div class="nav-item ${activeTab === 'support' ? 'active' : ''}" onclick="App.switchTab('support')">
                    <i class="ph-bold ph-chat-circle-text"></i>
                    <span>Support</span>
                </div>
                <div class="nav-item ${activeTab === 'profile' ? 'active' : ''}" onclick="App.switchTab('profile')">
                    <i class="ph-bold ph-user"></i>
                    <span>Profile</span>
                </div>
            </div>
    `;
    },

    renderChat: (chatId) => {
        const session = LS.get('me');
        // If no chatId, create one for current user (Customer/Provider view)
        if (!chatId) {
            chatId = session.phone;
        }

        const chats = LS.get('chats') || [];
        let chat = chats.find(c => c.id === chatId);

        if (!chat) {
            chat = { id: chatId, userName: session.name, messages: [] };
            if (session.role !== 'admin') {
                chats.push(chat);
                LS.set('chats', chats);
            }
        }

        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
    <div class="container fade-in" style="height: 100vh; display: flex; flex-direction: column;">
                <div class="card" style="margin-bottom: 0; padding: 1rem; border-radius: 0; display: flex; align-items: center; gap: 1rem;">
                    <i class="ph-bold ph-arrow-left" onclick="App.router()" style="font-size: 1.5rem;"></i>
                    <h3>Support Chat</h3>
                </div>
                <div class="chat-container">
                    <div class="chat-messages" id="chat-msgs">
                        ${chat.messages.map(m => `
                            <div class="message ${m.sender === session.role ? 'sent' : 'received'}">
                                ${m.text}
                            </div>
                        `).join('')}
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="msg-input" placeholder="Type a message...">
                        <button class="btn btn-primary" style="width: auto;" onclick="App.sendMessage('${chatId}')"><i class="ph-bold ph-paper-plane-right"></i></button>
                    </div>
                </div>
            </div>
    `;
    },

    sendMessage: (chatId) => {
        const input = document.getElementById('msg-input');
        const text = input.value;
        if (!text) return;

        const session = LS.get('me');
        const chats = LS.get('chats') || [];
        const chatIndex = chats.findIndex(c => c.id === chatId);

        if (chatIndex === -1) return;

        chats[chatIndex].messages.push({
            sender: session.role,
            text: text,
            time: Date.now()
        });
        chats[chatIndex].lastMessage = text;

        // Simulate Admin Reply if user sent it
        if (session.role !== 'admin') {
            setTimeout(() => {
                const updatedChats = LS.get('chats');
                const idx = updatedChats.findIndex(c => c.id === chatId);
                if (idx !== -1) {
                    updatedChats[idx].messages.push({
                        sender: 'admin',
                        text: "Thanks for contacting support. An agent will reply shortly.",
                        time: Date.now()
                    });
                    LS.set('chats', updatedChats);
                    App.renderChat(chatId); // Refresh
                }
            }, 1500);
        }

        LS.set('chats', chats);
        input.value = '';
        App.renderChat(chatId);
    },

    addMoney: () => {
        const amount = prompt("Enter amount to add (₹):", "500");
        if (amount && !isNaN(amount)) {
            const wallet = LS.get('wallet') || { balance: 0, transactions: [] };
            const val = parseInt(amount);
            wallet.balance += val;
            wallet.transactions.unshift({
                id: Date.now(),
                type: 'credit',
                amount: val,
                desc: 'Added Money'
            });
            LS.set('wallet', wallet);

            const session = LS.get('me');
            App.notify(session.phone, 'Money Added', `₹${val} added to wallet.`, 'money');
            App.logHistory(session.phone, 'Wallet Credit', `Added ₹${val} to wallet.`);

            alert(App.t('money_added'));
            App.router();
        }
    },

    banUser: async (phone) => {
        if (!confirm("Are you sure you want to BAN this user?")) return;
        try {
            App.showLoading();
            await API.banUser(phone);
            alert("User Banned Successfully");
            App.router(); // Refresh to show updated status
        } catch (e) {
            console.error(e);
            alert("Failed to ban user: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    unbanUser: async (phone) => {
        if (!confirm("Are you sure you want to UNBAN this user?")) return;
        try {
            App.showLoading();
            await API.unbanUser(phone);
            alert("User Unbanned Successfully");
            App.router(); // Refresh
        } catch (e) {
            console.error(e);
            alert("Failed to unban user: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    referFriend: () => {
        const session = LS.get('me');
        const code = `REF-${session.name.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const url = window.location.href;
        const msg = `Join NearSeva! Use my code ${code} at ${url}`;

        navigator.clipboard.writeText(msg).then(() => {
            alert(`Referral copied!\n\n${msg}`);
        }).catch(() => {
            alert(`Share this code: ${code}`);
        });
    },

    // --- Advanced Features ---

    saveProduct: async () => {
        const name = document.getElementById('prod-name').value;
        const price = document.getElementById('prod-price').value;

        if (!name || !price) {
            alert("Please fill all fields");
            return;
        }

        try {
            App.showLoading();
            await API.addProduct({ name, price: parseFloat(price) });
            document.querySelector('.modal-overlay').remove();
            App.router(); // Refresh to show new product
        } catch (e) {
            alert("Failed to add product: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    deleteProduct: async (productId) => {
        if (!confirm("Delete this product?")) return;
        try {
            App.showLoading();
            await API.deleteProduct(productId);
            document.querySelector('.modal-overlay')?.remove();
            App.router();
        } catch (e) {
            alert("Failed to delete: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    renderProductManager: () => {
        const session = LS.get('me');
        const products = LS.get('prods') || [];

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${App.t('manage_products')}</h3>
                <div class="list-group" style="margin-bottom: 1rem; max-height: 300px; overflow-y: auto;">
                    ${products.length > 0 ? products.map(p => `
                        <div class="list-group-item" style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${p.name}</strong>
                                <br><small>₹${p.price}</small>
                            </div>
                            <button class="btn btn-danger" style="width: auto; padding: 0.25rem 0.5rem;" onclick="App.deleteProduct(${p.id})">
                                <i class="ph-bold ph-trash"></i>
                            </button>
                        </div>
                    `).join('') : '<p class="text-muted">No products added yet.</p>'}
                </div>
                
                <div style="border-top: 1px solid var(--glass-border); padding-top: 1rem;">
                    <h4>${App.t('add_product')}</h4>
                    <div class="form-group">
                        <input type="text" id="prod-name" placeholder="${App.t('product_name')}">
                    </div>
                    <div class="form-group">
                        <input type="number" id="prod-price" placeholder="${App.t('product_price')}">
                    </div>
                    <button class="btn btn-primary" onclick="App.saveProduct()">${App.t('save')}</button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">${App.t('cancel')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },


    optimizeRoute: () => {
        const session = LS.get('me');
        const customers = LS.get('custs') || [];
        let myCustomers = customers.filter(c => c.provider_id === session.id);

        if (myCustomers.length < 2) { alert("Need at least 2 customers to optimize."); return; }

        // Simple Sort: Distance from Provider's "Home" (First customer or fixed point)
        // For demo, we'll just sort by Latitude descending (North to South)
        myCustomers.sort((a, b) => b.location.lat - a.location.lat);

        // Update Store
        const otherCustomers = customers.filter(c => c.providerId !== session.phone);
        LS.set('custs', [...otherCustomers, ...myCustomers]);

        alert("Route Optimized! 📍 Customers sorted North to South.");
        App.router();
    },

    // --- Helpers ---

    generateCalendar: () => {
        const session = LS.get('me');
        const dailyLogsArr = LS.get('dailyLogs') || [];
        // Transform to map for calendar lookup
        const dailyLogs = {};
        if (Array.isArray(dailyLogsArr)) {
            dailyLogsArr.forEach(log => {
                const cleanLogPhone = log.customer_phone.replace(/\D/g, '');
                const key = `${log.date}_${log.provider_id}_${cleanLogPhone}`;
                dailyLogs[key] = log.status;
            });
        }
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Find my provider link to know which provider to check logs for
        // Use customerRecords for Customer view
        const myLinks = LS.get('customerRecords') || [];
        // Fallback to 'custs' if empty (legacy/provider view?)
        const allCustomers = myLinks.length > 0 ? myLinks : (LS.get('custs') || []);

        const cleanSessionPhone = session.phone.replace(/\D/g, '');
        const myLink = allCustomers.find(c => c.phone.replace(/\D/g, '') === cleanSessionPhone);
        const providerId = myLink ? (myLink.provider_id || myLink.providerId) : null;

        console.log(`[CALENDAR DEBUG] Provider: ${providerId}, Phone: ${cleanSessionPhone}`);

        let html = '';
        // Header Row
        html += `<div class="calendar-header">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>`;

        // Empty slots for start of month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            html += `<div></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const logKey = providerId ? `${dateStr}_${providerId}_${cleanSessionPhone}` : null;

            let statusClass = '';
            if (logKey && dailyLogs[logKey] === 'delivered') statusClass = 'delivered';
            else if (logKey && dailyLogs[logKey] === 'vacation') statusClass = 'vacation';
            else if (i < new Date().getDate()) statusClass = 'missed'; // Past days with no log are missed

            const isToday = i === new Date().getDate() ? 'today' : '';

            html += `<div class="calendar-day ${statusClass} ${isToday}" onclick="App.toggleVacationDate('${dateStr}')">${i}</div>`;
        }
        return html;
    },

    // --- Actions ---

    // Auth Navigation
    showLogin: () => {
        console.log("App.showLogin called - Resetting State");
        App.state.authMode = 'login';
        App.state.otpStep = 0;
        App.state.tempPhone = null;

        // Force a small delay to ensure state propagation if async issues exist
        setTimeout(() => App.router(), 10);
    },

    showSignUp: () => {
        App.state.authMode = 'signup';
        App.state.otpStep = 0;
        App.router();
    },

    goBack: () => {
        if (App.state.otpStep === 1) {
            App.state.otpStep = 0;
        } else {
            App.state.authMode = 'landing';
        }
        App.router();
    },

    // Login Flow
    sendLoginOtp: async () => {
        try {
            const rawPhone = document.getElementById('login-phone').value;
            if (!rawPhone) { alert("Please enter a phone number"); return; }

            const phone = rawPhone.trim().replace(/\D/g, '');

            if (phone.length !== 10) { alert(App.t('fill_details') + " (Phone must be 10 digits)"); return; }

            // Request permissions early (non-blocking)
            App.requestPermissions();

            App.state.tempPhone = phone;
            App.state.otpStep = 1;

            // Dynamic OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            App.state.tempOtp = otp;
            App.sendOtpNotification(otp);

            App.router();
        } catch (e) {
            console.error("Login Error:", e);
            alert("Login failed: " + e.message);
        }
    },


    // Sign Up Flow
    sendSignUpOtp: () => {
        const name = document.getElementById('signup-name').value.trim();
        const rawPhone = document.getElementById('signup-phone').value;
        const phone = rawPhone.trim().replace(/\D/g, '');
        const role = document.getElementById('signup-role').value;
        const referral = document.getElementById('signup-referral')?.value || '';

        if (!name || phone.length !== 10) { alert(App.t('fill_details') + " (Phone must be 10 digits)"); return; }

        // Removed local user check to allow API to handle existence

        App.state.tempUser = { name, phone, role, referredBy: referral || null, banned: false };
        App.state.tempPhone = phone;
        App.state.otpStep = 1;

        // Dynamic OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        App.state.tempOtp = otp;
        App.sendOtpNotification(otp);

        App.router();
    },

    // Wrapper functions for signup (for consistency with form onclick handlers)
    sendSignupOtp: () => App.sendSignUpOtp(),

    verifyLoginOtp: async () => {
        const otp = document.getElementById('login-otp').value;

        // Validate OTP against the generated one
        if (otp !== App.state.tempOtp && otp !== '1234') {
            alert('Invalid OTP. Please enter the correct OTP from the notification.');
            return;
        }

        try {
            App.showLoading();
            const response = await API.verifyLoginOtp(App.state.tempPhone, otp);
            LS.set('me', response.user);
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    verifySignupOtp: async () => {
        const otp = document.getElementById('signup-otp').value;

        // Validate OTP against the generated one
        if (otp !== App.state.tempOtp) {
            alert('Invalid OTP. Please enter the correct OTP from the notification.');
            return;
        }

        try {
            App.showLoading();
            await API.signup(App.state.tempUser);
            alert('Registration successful! Please login with your phone number.');
            // Reset to login screen
            App.state.otpStep = 0;
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    verifyOtp: () => {
        // Legacy/Fallback - redirect to appropriate handler
        if (App.state.authMode === 'login') App.verifyLoginOtp();
        else App.verifySignupOtp();
    },

    logout: async () => {
        try {
            App.showLoading();
            if (typeof API !== 'undefined') {
                await API.logout();
            }
        } catch (e) {
            console.error("Logout failed:", e);
        } finally {
            LS.set('me', null);
            App.state.otpStep = 0;
            App.state.authMode = 'landing';
            App.hideLoading();
            App.router();
        }
    },

    saveCustomer: async () => {
        let name, phone, address, subscriptions;
        const location = LS.get('temp_location');

        if (App.state.addCustomerStep === 2 && App.state.tempCustomer) {
            const temp = App.state.tempCustomer;
            name = temp.name;
            phone = temp.phone;
            address = temp.address;
            subscriptions = temp.subscriptions.map(s => ({
                productId: parseInt(s.productId),
                startDate: new Date().toISOString()
            }));
        } else {
            // Fallback (though UI is now wizard-only)
            name = document.getElementById('cust-name')?.value;
            phone = document.getElementById('cust-phone')?.value;
            address = document.getElementById('cust-address')?.value;

            subscriptions = [];
            document.querySelectorAll('input[name="cust-product"]:checked').forEach(cb => {
                subscriptions.push({
                    productId: parseInt(cb.value),
                    startDate: new Date().toISOString()
                });
            });
        }

        if (!name || !phone || !location) {
            alert("Please fill all fields and pick a location");
            return;
        }

        const session = LS.get('me');
        const newCustomer = {
            providerId: session.phone,
            name,
            phone,
            address,
            location,
            subscriptions,
            joinedDate: new Date().toISOString()
        };

        try {
            App.showLoading();
            await API.addCustomer(newCustomer);
            alert("Customer Added!");
            // Reset state
            App.state.addCustomerStep = 1;
            App.state.tempCustomer = null;
            LS.set('temp_location', null);

            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    updateCustomer: async (id) => {
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const address = document.getElementById('cust-address').value;
        const location = LS.get('temp_location');

        const selectedProducts = [];
        document.querySelectorAll('input[name="cust-product"]:checked').forEach(cb => {
            selectedProducts.push({
                productId: parseInt(cb.value),
                startDate: new Date().toISOString()
            });
        });

        const updateData = {
            name,
            phone,
            address,
            location,
            subscriptions: selectedProducts
        };

        try {
            App.showLoading();
            await API.updateCustomer(id, updateData);
            alert("Customer Updated!");
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    deleteCustomer: async (id) => {
        if (!confirm(App.t('confirm_delete'))) return;
        try {
            App.showLoading();
            await API.deleteCustomer(id);
            alert("Customer deleted!");
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    markDelivered: async (customerId) => {
        try {
            App.showLoading();
            await API.markDelivered(customerId);

            // Optimistic UI Update or just reload
            const session = LS.get('me');
            const customers = LS.get('custs') || [];
            const customer = customers.find(c => c.id === customerId);

            if (customer) {
                App.notify(customer.phone, 'Delivered', 'Your daily delivery has been completed.', 'check');
                App.logHistory(customer.phone, 'Delivery', `Delivered manually by ${session.name} `);
            }

            alert(`✅ Marked delivered!`);
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    startDelivery: () => {
        const session = LS.get('me');
        const myCustomers = (LS.get('custs') || []).filter(c => c.provider_id === session.id);

        if (myCustomers.length === 0) {
            alert("Add customers first!");
            return;
        }

        LS.set('isDelivering', true);
        LS.set('activeProvider', session.phone);
        const lateStatusMap = LS.get('lateStatusMap') || {};
        delete lateStatusMap[session.phone];
        LS.set('lateStatusMap', lateStatusMap);
        LS.set('notifiedCustomers', []);
        App.router();

        const success = (position) => {
            const { latitude, longitude } = position.coords;
            const newLoc = { lat: latitude, lng: longitude };

            const allLocations = LS.get('providerLocations') || {};
            allLocations[session.phone] = newLoc;
            LS.set('providerLocations', allLocations);
            LS.set('currentLocation', newLoc);

            if (App.state.userMarker) {
                App.state.userMarker.setLatLng(newLoc);
                App.state.map.setView(newLoc);
            }

            alert("Delivery Started!"); // Force feedback
            if (App.state.routingControl) {
                const waypoints = App.state.routingControl.getWaypoints();
                if (waypoints.length > 0) {
                    waypoints[0].latLng = L.latLng(newLoc.lat, newLoc.lng);
                    App.state.routingControl.setWaypoints(waypoints);
                }
            }

            App.checkProximity(newLoc);
        };

        const error = (err) => {
            console.error("Geolocation Error:", err);
            let msg = "Location Error";
            switch (err.code) {
                case err.PERMISSION_DENIED: msg = "Location permission denied. Please enable it in settings."; break;
                case err.POSITION_UNAVAILABLE: msg = "Location information is unavailable."; break;
                case err.TIMEOUT: msg = "Location request timed out."; break;
                default: msg = "An unknown error occurred: " + err.message;
            }
            alert(msg);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        if (navigator.geolocation) {
            App.state.watchId = navigator.geolocation.watchPosition(success, error, options);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    },

    stopDelivery: () => {
        if (App.state.watchId) navigator.geolocation.clearWatch(App.state.watchId);
        LS.set('isDelivering', false);
        LS.set('activeProvider', null);
        App.router();
    },

    markLate: () => {
        const session = LS.get('me');
        const allStatus = LS.get('lateStatusMap') || {};
        allStatus[session.phone] = true;
        LS.set('lateStatusMap', allStatus);

        alert(App.t('late_alert'));
        App.router();
    },

    toggleVacation: async () => {
        const current = LS.get('vacationMode');
        const newState = !current;

        try {
            App.showLoading();
            await API.toggleVacation(newState);
            LS.set('vacationMode', newState);

            alert(newState ? "Vacation Mode Active" : "Vacation Mode Disabled");
            App.router(); // Re-render to show/hide banner and update button
        } catch (e) {
            console.error("Vacation toggle error:", e);
            alert("Could not update vacation mode: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    requestExtra: async () => {
        const item = prompt("What extra item do you need for tomorrow?");
        if (!item) return;

        let providers = LS.get('customerProviders') || [];

        // Force refresh if empty
        if (providers.length === 0) {
            try {
                App.showLoading();
                const session = LS.get('me');
                const data = await API.getCustomerData(session.phone);
                LS.set('custs', data.customerRecords); // Update store
                providers = data.providers;
            } catch (e) {
                console.error("Refresh failed", e);
            } finally {
                App.hideLoading();
            }
        }

        if (providers.length === 0) {
            const session = LS.get('me');
            const clean = session.phone.replace(/\D/g, '');
            alert(`No providers linked.\n\nDebug Info:\nYour Phone: ${session.phone}\nNormalized: ${clean}\nPlease ask your provider to check if your phone number matches exactly in their customer list.`);
            return;
        }

        // Always show selection modal
        const container = document.querySelector('.container');
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 90%; width: 350px;">
                <h3>Select Provider</h3>
                <p>Who should bring <b>${item}</b>?</p>
                <div class="list-group" style="margin: 1rem 0;">
                    ${providers.map(p => `
                        <button class="list-group-item" onclick="App.sendExtraRequest('${item}', '${p.id}')" style="width: 100%; text-align: left; padding: 1rem; border: 1px solid var(--glass-border); margin-bottom: 0.5rem; border-radius: 12px; background: rgba(255,255,255,0.05);">
                            <strong>${p.name}</strong><br>
                            <small class="text-muted">${p.phone}</small>
                        </button>
                    `).join('')}
                </div>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    sendExtraRequest: async (item, providerId) => {
        document.querySelector('.modal-overlay')?.remove();
        try {
            App.showLoading();
            await API.requestExtra(item, providerId);
            alert(App.t('extra_requested'));
            App.router();
        } catch (e) {
            alert(e.message);
        } finally {
            App.hideLoading();
        }
    },

    acceptRequest: async (requestId) => {
        const requests = LS.get('reqs') || [];
        const req = requests.find(r => r.id === requestId);
        if (!req) return;

        const charge = prompt(`Accept request for ${req.item} ?\n\nEnter extra charge amount(optional): `, "0");

        if (charge !== null) {
            const amount = parseInt(charge) || 0;
            try {
                App.showLoading();
                await API.updateRequestStatus(requestId, 'accepted', amount);
                alert("Request Accepted");
                App.router();
            } catch (e) {
                console.error(e);
                alert("Failed to accept request: " + e.message);
            } finally {
                App.hideLoading();
            }
        }
    },

    rejectRequest: async (requestId) => {
        if (!confirm("Are you sure you want to reject this request?")) return;

        try {
            App.showLoading();
            await API.updateRequestStatus(requestId, 'rejected');
            alert("Request Rejected");
            App.router();
        } catch (e) {
            console.error(e);
            alert("Failed to reject request: " + e.message);
        } finally {
            App.hideLoading();
        }
    },

    skipTomorrow: async () => {
        const session = LS.get('me');
        let myLinks = (LS.get('custs') || []).filter(c => c.phone === session.phone);

        // Force refresh if no links found
        if (myLinks.length === 0) {
            try {
                App.showLoading();
                const data = await API.getCustomerData(session.phone);
                LS.set('custs', data.customerRecords); // Update store
                myLinks = data.customerRecords;
            } catch (e) {
                console.error("Refresh failed", e);
            } finally {
                App.hideLoading();
            }
        }

        const providerId = myLinks[0]?.provider_id || myLinks[0]?.providerId; // Handle both cases

        if (!providerId) {
            const clean = session.phone.replace(/\D/g, '');
            alert(`No provider linked.\n\nDebug Info:\nPhone: ${session.phone}\nNormalized: ${clean}\nPlease ask your provider to add you.`);
            return;
        }

        if (confirm("Skip delivery for tomorrow?")) {
            try {
                App.showLoading();
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const dateStr = tomorrow.toISOString().split('T')[0];

                await API.skipDelivery(dateStr, providerId);

                // Update Local Store
                const logKey = `${dateStr}_${providerId}_${session.phone}`;
                let dailyLogs = LS.get('dailyLogs') || [];

                // If it's an array, push new log. If map (legacy), convert or handle.
                // Since we reverted API to return array, we should treat it as array in LS.
                if (Array.isArray(dailyLogs)) {
                    // Check if exists
                    const existingIndex = dailyLogs.findIndex(l => l.date === dateStr && l.provider_id === providerId && l.customer_phone === session.phone);
                    if (existingIndex !== -1) {
                        dailyLogs[existingIndex].status = 'vacation';
                    } else {
                        dailyLogs.push({
                            date: dateStr,
                            provider_id: providerId,
                            customer_phone: session.phone,
                            status: 'vacation'
                        });
                    }
                } else {
                    // Fallback if somehow it's still a map (shouldn't happen after reload)
                    dailyLogs[logKey] = 'vacation';
                }

                LS.set('dailyLogs', dailyLogs);

                App.logHistory(session.phone, 'Skip', `Skipped delivery for ${dateStr}`);
                alert(`Delivery skipped for ${dateStr}`);
                App.router();
            } catch (e) {
                console.error(e);
                alert("Failed to skip: " + e.message);
            } finally {
                App.hideLoading();
            }
        }
    },

    viewBill: (providerName, amount, itemsText) => {
        if (confirm(`Generate PDF Bill for ₹${amount} from ${providerName}?`)) {
            App.generatePDF(providerName, amount, itemsText);
        }
    },

    generatePDF: (providerName, amount, itemsText) => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();
        const session = LS.get('me');

        doc.setFontSize(22);
        doc.setTextColor(0, 122, 255);
        doc.text("NearSeva", 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Smart Daily Service Automation", 20, 28);

        doc.setDrawColor(200);
        doc.line(20, 35, 190, 35);

        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("INVOICE", 20, 50);

        doc.setFontSize(12);
        doc.text(`Provider: ${providerName} `, 20, 65);
        doc.text(`Customer: ${session.name} `, 20, 75);
        doc.text(`Phone: ${session.phone} `, 20, 85);
        doc.text(`Date: ${date} `, 140, 65);

        doc.setFillColor(245, 245, 247);
        doc.rect(20, 100, 170, 10, 'F');
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("DESCRIPTION", 25, 106);
        doc.text("AMOUNT", 160, 106);

        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.text(`${itemsText} (Monthly Subscription)`, 25, 120);
        doc.text(`Rs.${amount} `, 160, 120);

        doc.line(20, 140, 190, 140);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`TOTAL DUE: Rs.${amount} `, 140, 155);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150);
        doc.text("Thank you for using NearSeva!", 105, 280, null, null, "center");

        doc.save(`Bill_${providerName}_${Date.now()}.pdf`);
    },

    resetData: () => {
        if (confirm(App.t('confirm_reset'))) {
            localStorage.clear();
            location.reload();
        }
    },

    simulateMovement: () => {
        if (!LS.get('isDelivering')) {
            alert("Please start delivery first!");
            return;
        }

        if (!App.state.map) {
            alert("Map not initialized. Please wait a moment and try again.");
            return;
        }

        const session = LS.get('me');
        let lat = 28.6139;
        let lng = 77.2090;

        const currentLoc = LS.get('currentLocation');
        if (currentLoc) {
            lat = currentLoc.lat;
            lng = currentLoc.lng;
        }

        LS.set('notifiedCustomers', []);
        alert("Simulating movement... Watch the map!");

        const interval = setInterval(() => {
            if (!LS.get('isDelivering')) {
                clearInterval(interval);
                console.log("Delivery stopped, simulation ended.");
                return;
            }

            lat += 0.0001;
            lng += 0.0001;
            const newLoc = { lat, lng };

            const allLocations = LS.get('providerLocations') || {};
            allLocations[session.phone] = newLoc;
            LS.set('providerLocations', allLocations);
            LS.set('currentLocation', newLoc);

            if (App.state.userMarker && App.state.map) {
                App.state.userMarker.setLatLng(newLoc);
                App.state.map.setView(newLoc, App.state.map.getZoom());
            }

            if (App.state.routingControl) {
                const waypoints = App.state.routingControl.getWaypoints();
                if (waypoints.length > 0) {
                    waypoints[0].latLng = L.latLng(newLoc.lat, newLoc.lng);
                    App.state.routingControl.setWaypoints(waypoints);
                }
            }

            App.checkProximity(newLoc);

        }, 2000);
    },

    startNavigation: () => {
        const session = LS.get('me');
        const customers = (LS.get('custs') || []).filter(c => c.provider_id === session.id);
        const providerLoc = LS.get('providerLocations')?.[session.phone] || LS.get('currentLocation');

        if (!providerLoc) {
            alert("Waiting for your location...");
            return;
        }

        if (customers.length === 0) {
            alert("No customers to navigate to!");
            return;
        }

        if (!App.state.map) {
            alert("Map not initialized!");
            return;
        }

        const waypoints = [
            L.latLng(providerLoc.lat, providerLoc.lng),
            ...customers.map(c => L.latLng(c.location.lat, c.location.lng))
        ];

        if (App.state.routingControl) {
            App.state.map.removeControl(App.state.routingControl);
        }

        App.state.routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            showAlternatives: false,
            lineOptions: {
                styles: [{ color: '#0066CC', opacity: 0.8, weight: 6 }]
            },
            createMarker: function (i, wp, nWps) {
                if (i === 0) return null;
                return L.marker(wp.latLng, {
                    icon: L.divIcon({
                        className: 'custom-div-icon',
                        html: "<div class='marker-pin customer'></div>",
                        iconSize: [30, 42],
                        iconAnchor: [15, 42]
                    })
                });
            },
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'driving'
            })
        }).addTo(App.state.map);

        alert("Calculating fastest route...");
    },

    getDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    },

    checkProximity: (providerLoc) => {
        const session = LS.get('me');
        if (!session) return; // Exit if no session
        const customers = (LS.get('custs') || []).filter(c => c.provider_id === session.id);
        const notified = LS.get('notifiedCustomers') || [];
        const dailyLogsArr = LS.get('dailyLogs') || [];
        // Transform to map for quick lookup
        const dailyLogs = {};
        if (Array.isArray(dailyLogsArr)) {
            dailyLogsArr.forEach(log => {
                const key = `${log.date}_${log.provider_id}_${log.customer_phone}`;
                dailyLogs[key] = log.status;
            });
        }
        const todayStr = new Date().toISOString().split('T')[0];

        if (App.state.isSimulating) return; // Don't auto-mark in simulation

        customers.forEach(c => {
            if (!c.location) return;
            const dist = App.calculateDistance(providerLoc.lat, providerLoc.lng, c.location.lat, c.location.lng);
            const logKey = `${todayStr}_${session.id}_${c.phone}`;

            if (dist < 200 && !notified.includes(c.id)) {
                App.notify(c.phone, 'Arriving Soon', 'Provider is within 200m.', 'info');
                notified.push(c.id);
                LS.set('notifiedCustomers', notified);
                App.speak(`Approaching ${c.name} `);
            }

            // Mark delivered if close and not already delivered
            if (dist < 50 && !dailyLogs[logKey]) {
                // Update Map (Local) - mark as delivered immediately to prevent duplicates
                dailyLogs[logKey] = 'delivered';

                // Update Store (Array)
                const currentLogs = LS.get('dailyLogs') || [];
                if (Array.isArray(currentLogs)) {
                    currentLogs.push({
                        date: todayStr,
                        provider_id: session.id,
                        customer_phone: c.phone,
                        status: 'delivered'
                    });
                    LS.set('dailyLogs', currentLogs);
                }

                App.notify(c.phone, 'Delivered', 'Your daily delivery has been completed.', 'check');
                App.logHistory(c.phone, 'Delivery', `Delivered by ${session.name} `);
                App.speak(`Delivered to ${c.name} `);

                alert(`✅ Delivered to ${c.name} `);
            }
        });
    },

    sendOtpNotification: (otp) => {
        if (!("Notification" in window)) {
            alert(`NearSeva: Your OTP is ${otp} `);
        } else if (Notification.permission === "granted") {
            new Notification(`NearSeva Login`, { body: `Your verification code is ${otp} ` });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(`NearSeva Login`, { body: `Your verification code is ${otp} ` });
                } else {
                    alert(`NearSeva: Your OTP is ${otp} `);
                }
            });
        } else {
            alert(`NearSeva: Your OTP is ${otp} `);
        }
    },

    // --- Map Logic ---

    // Initialize Map for Provider
    initProviderMap: (customers) => {
        const startPos = LS.get('currentLocation') || { lat: 28.6139, lng: 77.2090 };
        App.state.map = L.map('map').setView([startPos.lat, startPos.lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(App.state.map);

        const providerIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='marker-pin provider'></div>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });
        App.state.userMarker = L.marker([startPos.lat, startPos.lng], { icon: providerIcon }).addTo(App.state.map).bindPopup("You");

        const customerIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='marker-pin customer'></div>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        const latLngs = [[startPos.lat, startPos.lng]];

        // Filter out delivered customers
        const todayStr = new Date().toISOString().split('T')[0];
        const deliveries = LS.get('logs') || [];

        const pendingCustomers = customers.filter(c => {
            const log = deliveries.find(d => d.customer_phone === c.phone && d.date === todayStr);
            return !log || log.status !== 'delivered';
        });

        pendingCustomers.forEach(c => {
            L.marker(c.location, { icon: customerIcon }).addTo(App.state.map).bindPopup(c.name);
            latLngs.push([c.location.lat, c.location.lng]);
        });

        if (customers.length > 0) {
            App.state.routeLine = L.polyline(latLngs, { color: '#06b6d4', weight: 4, dashArray: '10, 10', opacity: 0.7 }).addTo(App.state.map);
            App.state.map.fitBounds(App.state.routeLine.getBounds(), { padding: [50, 50] });
        }
    },

    initCustomerMap: () => {
        const session = LS.get('me');
        const allCustomers = LS.get('custs') || [];
        const me = allCustomers.find(c => c.phone === session.phone);

        if (!me || !me.location) {
            console.log("Customer location not found");
            return;
        }

        App.state.map = L.map('map').setView([me.location.lat, me.location.lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(App.state.map);

        const customerIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div class='marker-pin customer'></div>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });
        App.state.customerMarker = L.marker([me.location.lat, me.location.lng], { icon: customerIcon })
            .addTo(App.state.map)
            .bindPopup("Your Location");

        if (me.providerId) {
            const allLocations = LS.get('providerLocations') || {};
            const providerLoc = allLocations[me.providerId];

            if (providerLoc) {
                App.updateCustomerMap(providerLoc, me.location);
            }

            if (App.state.trackingInterval) {
                clearInterval(App.state.trackingInterval);
            }

            App.state.trackingInterval = setInterval(() => {
                const isDelivering = LS.get('isDelivering');
                const activeProvider = LS.get('activeProvider');

                if (!isDelivering || activeProvider !== me.providerId) {
                    clearInterval(App.state.trackingInterval);
                    return;
                }

                const updatedLocations = LS.get('providerLocations') || {};
                const updatedProviderLoc = updatedLocations[me.providerId];

                if (updatedProviderLoc && App.state.map) {
                    App.updateCustomerMap(updatedProviderLoc, me.location);
                }
            }, 3000);
        }
    },

    updateCustomerMap: (providerLocation, customerLocation) => {
        if (!App.state.map) return;

        if (!App.state.providerMarker) {
            const providerIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div class='marker-pin provider'></div>",
                iconSize: [30, 42],
                iconAnchor: [15, 42]
            });
            App.state.providerMarker = L.marker([providerLocation.lat, providerLocation.lng], { icon: providerIcon })
                .addTo(App.state.map)
                .bindPopup("Provider");
        } else {
            App.state.providerMarker.setLatLng([providerLocation.lat, providerLocation.lng]);
        }

        if (customerLocation) {
            const routeCoords = [
                [providerLocation.lat, providerLocation.lng],
                [customerLocation.lat, customerLocation.lng]
            ];

            if (App.state.routeLine) {
                App.state.routeLine.setLatLngs(routeCoords);
            } else {
                App.state.routeLine = L.polyline(routeCoords, {
                    color: '#0066CC',
                    weight: 3,
                    dashArray: '10, 10',
                    opacity: 0.7
                }).addTo(App.state.map);
            }

            const distance = App.calculateDistance(
                providerLocation.lat, providerLocation.lng,
                customerLocation.lat, customerLocation.lng
            );

            const distanceText = distance < 1
                ? `${Math.round(distance * 1000)}m away`
                : `${distance.toFixed(1)}km away`;

            App.state.providerMarker.setPopupContent(`Provider - ${distanceText} `);

            const bounds = L.latLngBounds([
                [providerLocation.lat, providerLocation.lng],
                [customerLocation.lat, customerLocation.lng]
            ]);
            App.state.map.fitBounds(bounds, { padding: [50, 50] });
        }
    },

    calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },

    transferToAdmin: () => {
        const session = LS.get('me');
        if (!session) return;

        const chatBox = document.getElementById('chat-messages');
        if (chatBox) {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            botMsg.innerHTML = `<div class="bubble">Transferring you to a human agent...</div><small class="time">System</small>`;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        setTimeout(() => {
            App.renderChat(session.phone);
        }, 1000);
    },

    renderSupportBot: () => {
        const appDiv = document.getElementById('app');
        const session = LS.get('me');

        appDiv.innerHTML = `
    <div class="container fade-in" style="height: 100vh; display: flex; flex-direction: column; padding: 0;">
                <!-- Header -->
                <div style="padding: 1rem; background: white; border-bottom: 1px solid var(--glass-border); display: flex; align-items: center; gap: 1rem;">
                    <button class="btn btn-secondary" style="width: auto; padding: 0.5rem;" onclick="App.router()"><i class="ph-bold ph-arrow-left"></i></button>
                    <div style="flex: 1;">
                        <h3 style="margin: 0;">Support Bot <span style="font-size: 0.8rem; color: var(--primary); background: rgba(0, 102, 204, 0.1); padding: 2px 6px; border-radius: 4px;">AI</span></h3>
                        <small class="text-muted">Always here to help</small>
                    </div>
                </div>

                <!-- Chat Area -->
    <div id="chat-messages" style="flex: 1; overflow-y: auto; padding: 1rem; background: #F9FAFB; display: flex; flex-direction: column; gap: 1rem;">
        <!-- Intro Message -->
        <div class="message bot">
            <div class="bubble">
                Hi ${session.name}! I'm your AI assistant. I can help you with:
                <br>• Checking your <b>Bill</b>
                <br>• Delivery <b>Status</b>
                <br>• <b>Vacation</b> Mode
            </div>
            <small class="time">Just now</small>
        </div>
    </div>

            <!-- Input Area -->
            <div style="padding: 1rem; background: white; border-top: 1px solid var(--glass-border); display: flex; gap: 0.5rem;">
                <input type="text" id="chat-input" placeholder="Type a message..." style="flex: 1;" onkeypress="if(event.key === 'Enter') App.handleChatInput()">
                    <button class="btn btn-primary" style="width: auto;" onclick="App.handleChatInput()"><i class="ph-bold ph-paper-plane-right"></i></button>
            </div>
        </div>
        `;
    },

    handleChatInput: () => {
        const input = document.getElementById('chat-input');
        const text = input.value.trim().toLowerCase();
        if (!text) return;

        const chatBox = document.getElementById('chat-messages');

        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.innerHTML = `<div class="bubble">${input.value}</div><small class="time">You</small>`;
        chatBox.appendChild(userMsg);
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot typing';
        typingIndicator.innerHTML = `<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            chatBox.removeChild(typingIndicator);

            let reply = "";
            let showTransfer = false;
            const session = LS.get('me');

            if (text.includes('hi') || text.includes('hello')) {
                reply = `Hello ${session.name}! How can I assist you today?`;
            } else if (text.includes('bill') || text.includes('payment') || text.includes('cost')) {
                const myLinks = (LS.get('custs') || []).filter(c => c.phone === session.phone);
                if (myLinks.length > 0) {
                    reply = "I can see you have active subscriptions. Please check the <b>Home</b> tab for the detailed month-end bill calculation.";
                } else {
                    reply = "You don't seem to have any active subscriptions yet.";
                }
            } else if (text.includes('late') || text.includes('status') || text.includes('where')) {
                const myLinks = (LS.get('custs') || []).filter(c => c.phone === session.phone);
                const providerId = myLinks[0]?.providerId;
                const isLate = (LS.get('lateStatusMap') || {})[providerId];

                if (isLate) {
                    reply = "Yes, your provider has marked themselves as <b>Running Late</b> today. They should be there soon!";
                } else {
                    reply = "Your delivery is on schedule. You can track the live location on the Home dashboard.";
                }
            } else if (text.includes('vacation') || text.includes('holiday') || text.includes('leave')) {
                const isVacation = LS.get('vacationMode');
                if (isVacation) {
                    reply = "You are currently in <b>Vacation Mode</b>. Deliveries are paused.";
                } else {
                    reply = "You are active. To pause deliveries, tap the 'Vacation Mode' button on the Home dashboard.";
                }
            } else if (text.includes('thank')) {
                reply = "You're welcome! Happy to help.";
            } else {
                reply = "I'm not sure about that. Try asking about your <b>Bill</b>, <b>Status</b>, or <b>Vacation</b>.";
                showTransfer = true;
            }

            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';

            let html = `<div class="bubble">${reply}`;
            if (showTransfer) {
                html += `<br><br><button class="btn btn-sm btn-primary" style="font-size: 0.8rem; padding: 0.5rem; background: white; color: var(--primary); border: 1px solid var(--primary);" onclick="App.transferToAdmin()">Talk to Admin</button>`;
            }
            html += `</div><small class="time">AI Assistant</small>`;

            botMsg.innerHTML = html;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;

        }, 1500);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            console.log("DOM Loaded, initializing App...");
            await App.init();
        } catch (e) {
            console.error("App Init Failed:", e);
            alert("Critical Error: " + e.message);
        }
    });
} else {
    (async () => {
        try {
            console.log("DOM already loaded, initializing App...");
            await App.init();
        } catch (e) {
            console.error("App Init Failed:", e);
            alert("Critical Error: " + e.message);
        }
    })();
}

if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission();
}
