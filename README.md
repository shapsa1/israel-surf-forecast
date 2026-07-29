# 🏄‍♂️ YallaSurf - Israeli Coast Surf Forecasting App

YallaSurf is a premium, real-time, responsive surf forecasting web application designed specifically for the Israeli Mediterranean coastline. Inspired by modern forecasting giants like **Surfline** and **GoSurf**, YallaSurf delivers a stunning glassmorphic dark-themed interface providing highly accurate localized wave heights, wind directions, wave energy, and equipment recommendations.

---

## ✨ Features

### 🔍 Spot Selection & Filtering
*   **Complete Israeli Beach Directory**: Over 16 major surf spots ranging from northern beaches (Haifa, Netanya) to southern shores (Ashdod, Ashkelon).
*   **Advanced Search & Filter**: Instant searching by beach name and regional category tabs (North, Center, South).
*   **Favorites System**: Toggle the star button to cache your favorite beach break for quick, one-click loading on your next visit.

### 📊 Comprehensive 5-Day Daylight Forecast
*   **5-Day Summary Cards**: Horizontal summary row showing daily surf quality badges, peak swell ranges, and peak wind directions.
*   **Day Drilldown Toggler**: Interactive day-selector that refreshes the hourly grid for any chosen day.
*   **Daylight-Only Table (06:00 - 20:00)**: Avoids nighttime noise, focusing strictly on rideable daylight hours.
*   **Parameters Tracked**:
    *   **Surf Height (m / ft)**: Wave-face height calculated using custom shoaling and wind-decay factors.
    *   **Swell**: Combined significant wave height, primary period (seconds), and exact incoming swell degrees with a rotating arrow.
    *   **Wind**: Speed, origin degrees, and dynamic status badges (`OFFSHORE`, `ONSHORE`, `SIDESHORE`) calculated relative to beach coastline orientation.
    *   **Nearshore Wave Energy (kJ)**: Reverse-engineered kinetic wave power formula adjusted with a $7.3$ multiplier to match leading global models.
    *   **Hourly Quality Ratings**: Dynamic ratings (`FLAT`, `POOR`, `FAIR`, `GOOD`, `EPIC`) based on wind-to-beach orientation, wind speed, and swell periods.

### 🏄‍♂️ Live Surfboard Selection Advisory Column
A dynamic matching system inspired by the *Surf Holidays Guide* is embedded into the hourly forecast grid:
*   **Longboard** (`🪵`): Suggested on flat or micro-wave days. High buoyancy lets you cruise easily on tiny rollers.
*   **Fish** (`🐟`): Suggested on small, playful, clean glassy waves. Offers paddle power and skates over fat sections.
*   **Mini-Mal** (`🛹`): Suggested on small, messy onshore days to easily plow through crumbly chop.
*   **Shortboard** (`⚡`): Suggested on medium, clean offshore days. Optimal for carving and sharp snaps in the pocket.
*   **Hybrid** (`🏄‍♂️`): Suggested on medium-sized, messy onshore days to maintain speed on choppy wave faces.
*   **Step-Up / Gun** (`🚀` / `🌊`): Suggested on heavy swells for absolute control on large wave faces.

### ⚙️ Premium UX & Aesthetics
*   **Modern Glassmorphism**: Vibrant neon cyan highlights, custom micro-animations (e.g. glowing sun, pulsing icons), and a sleek dark theme.
*   **Real-time Unit Conversion**: Instantly switch between Metric (meters, km/h, °C) and Imperial (feet, mph, °F) units with a global header toggle.
*   **Timezone-Safe Local Parsing**: Advanced date deconstruction ensures Open-Meteo forecasts align precisely with Israel local time offsets without lag.
*   **Fully Responsive**: Completely optimized with horizontal-scroll panels for smooth mobile swiping and desktop grid layouts.

---

## 🛠️ Technology Stack
*   **HTML5 & CSS3**: Native semantic architecture, flexbox, custom grid-templates, and pure Vanilla CSS custom design system.
*   **JavaScript (ES6+)**: Vanilla asynchronous ES6 JS (No bloat frameworks, no external dependencies).
*   **FontAwesome Icons**: Premium iconography for indicators.
*   **Open-Meteo Marine API**: Parallel coordinate batch-fetching on page load to eliminate API lags.

---

## 🚀 Quick Setup & Local Hosting

Since YallaSurf is built as a pure, static front-end web app, you do **not** need to install complex compilers, dependencies, or run `npm install`.

### Run via Python (Recommended)
1. Open your terminal in the project directory:
   ```bash
   python3 -m http.server 8000
   ```
2. Open your browser and navigate to:
   👉 **`http://localhost:8000`**

### Run via VS Code (Live Server)
* Right-click `index.html` and select **"Open with Live Server"**.

---

## 👨‍💻 Contributing
Feel free to fork this repository, add additional surf spots, or introduce extra forecasting features! 

*Happy Surfing!* 🌊🤙
