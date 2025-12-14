# NearSeva (Hackathon Build)

Smart automation for local service providers like Tiffin/Milk/Chai walas.

Basically, it helps them track their deliveries and customers without using a notebook. Meant to be mobile-first since they use phones all day.

## � Status
**Work in Progress.** The core stuff works (tracking, bills, customer list) but the UI is a bit heavy on glassmorphism lol.

## Features that acutally work
- **Provider Dashboard:** You can add customers and see them on a map.
- **Tracking:** Uses Leaflet for the map. It's a bit glitchy if you move too fast but serves the purpose.
- **Bill Calc:** Auto-calculates the monthly bill based on deliveries.
- **Customer View:** They can see if the provider is coming or late.

## Setup
It's just vanilla JS + Supabase. No build step needed for the web version.

1. Clone this repo.
2. Open `index.html` in your browser (or use Live Server in VS Code).
3. That's it.

**Note:** You need the `api.js` file with the Supabase keys. If it's missing, DM me.

## Tech Stack
- HTML/CSS (Custom CSS, no Tailwind this time)
- JS (Vanilla, hate frameworks for small projects)
- Supabase (Backend/Auth)
- Capacitor (Used for the Android build in `mobile_app` folder)

## Known Issues / TODOs
- [ ] The "Stop Delivery" button sometimes needs a double click.
- [ ] Map doesn't center automatically if GPS signal is weak.
- [ ] **Dont touch line 1 in app.js**, it breaks the error handling for some reason.
- [ ] Need to fix the layout on older iPhones.

## Contributing
If you find a bug, just fix it and PR. Don't judge the `app.js` file size, I'll refactor it later.
