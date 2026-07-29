/* YallaSurf Forecast Application Controller */

// --- 1. Israel Surf Spots Database ---
const SURF_SPOTS = [
    {
        id: "hilton-ta",
        name: "Tel Aviv - Hilton Beach",
        lat: 32.0894,
        lon: 34.7706,
        region: "center",
        breakType: "Jetty / Reef / Sandbar",
        orientation: 270, // West
        description: "The crown jewel of Tel Aviv surfing. Sheltered by jetties, Hilton produces reliable, hollow lefts and clean peaks over a sand-covered reef. Excels in medium NW swells."
    },
    {
        id: "bat-galim-haifa",
        name: "Haifa - Bat Galim",
        lat: 32.8333,
        lon: 34.9833,
        region: "north",
        breakType: "Reef Break",
        orientation: 340, // NNW
        description: "One of the few high-quality reef breaks in Israel. Works on heavy winter swells, turning strong winds into powerful, sweeping left-hand wave sections over a rocky bottom."
    },
    {
        id: "backdoor-haifa",
        name: "Haifa - Backdoor Reef",
        lat: 32.8350,
        lon: 34.9810,
        region: "north",
        breakType: "Rocky Reef / Point",
        orientation: 340,
        description: "An intense, hollow reef wave located next to the Bat Galim naval base. Needs a larger swell to activate, but provides high-performance barreling sections."
    },
    {
        id: "atlit-beach",
        name: "Atlit Beach",
        lat: 32.6875,
        lon: 34.9286,
        region: "north",
        breakType: "Sandy Beach Break",
        orientation: 270,
        description: "A gorgeous, raw beach break situated under the Atlit Crusader Fortress. Delivers fast, sectiony beach peaks with highly consistent sandbar formations."
    },
    {
        id: "dor-beach",
        name: "Dor Beach (Tantura)",
        lat: 32.6147,
        lon: 34.9158,
        region: "north",
        breakType: "Islet-Sheltered Beach",
        orientation: 270,
        description: "Protected by offshore rocky islets, Dor Beach offers gentle wave formations ideal for longboarders, combined with steeper, punchier peaks near the sand spit."
    },
    {
        id: "caesarea-arches",
        name: "Caesarea - Arches Beach",
        lat: 32.5186,
        lon: 34.8931,
        region: "center",
        breakType: "Historical Aqueduct Sandbar",
        orientation: 270,
        description: "Surfing alongside a Roman aqueduct. Offers heavy, shifty beach breaks that can close out on big swells, but handles medium swells with fast, clean rights."
    },
    {
        id: "michmoret-beach",
        name: "Michmoret Beach",
        lat: 32.4011,
        lon: 34.8643,
        region: "center",
        breakType: "Sandy Beach Break",
        orientation: 270,
        description: "Extremely popular for intermediate surfers and longboarders. Protected by a natural reef shelf to the south, creating clean, predictable waves."
    },
    {
        id: "beit-yanai",
        name: "Beit Yanai",
        lat: 32.3831,
        lon: 34.8594,
        region: "center",
        breakType: "Sandy Beach Break / Rivermouth",
        orientation: 270,
        description: "A wide, scenic sand beach known for consistent swells, windsurfing, and quality peaks formed by the Alexander River mouth sandbars."
    },
    {
        id: "kontiki-netanya",
        name: "Netanya - Kontiki Beach",
        lat: 32.3328,
        lon: 34.8456,
        region: "center",
        breakType: "Sandy Beach / Jetties",
        orientation: 270,
        description: "A reliable beach break in central Israel. Supported by sea walls and jetties, generating punchy lefts and rights that hold shape well under light winds."
    },
    {
        id: "poleg-netanya",
        name: "Netanya - Poleg Beach",
        lat: 32.2789,
        lon: 34.8411,
        region: "center",
        breakType: "Rivermouth Beach Break",
        orientation: 270,
        description: "Famous for powerful, fast-breaking sandbar peaks. Works best on moderate swells, providing hollow A-frames that appeal to shortboarders."
    },
    {
        id: "argaman-netanya",
        name: "Netanya - Argaman Beach",
        lat: 32.3168,
        lon: 34.8398,
        region: "center",
        breakType: "Sandy Beach / Sandbars",
        orientation: 270,
        description: "Netanya's southern beach, known for quality sandbars and consistent waves. Handles southwest to northwest swells. Best on light or easterly winds."
    },
    {
        id: "acadia-herzliya",
        name: "Herzliya - Acadia Beach",
        lat: 32.1642,
        lon: 34.7972,
        region: "center",
        breakType: "Sandy Beach Break",
        orientation: 270,
        description: "One of the most consistent surf zones in central Israel. Smooth, sandy bottom with multiple peaks stretching along the coast. Superb for beginners and intermediates."
    },
    {
        id: "maravi-telaviv",
        name: "Tel Aviv - Maravi (Manta Ray)",
        lat: 32.0622,
        lon: 34.7619,
        region: "center",
        breakType: "Sandy Beach Break",
        orientation: 265, // WSW
        description: "Located at the southernmost edge of Tel Aviv. Open beach break that handles north winds exceptionally well due to Jaffa port sheltering to the south."
    },
    {
        id: "riviera-batyam",
        name: "Bat Yam - Riviera Beach",
        lat: 32.0156,
        lon: 34.7408,
        region: "center",
        breakType: "Jetty-Protected Beach",
        orientation: 270,
        description: "Protected by an extensive stone breakwater. Offers solid, organized wave channels and a sandy bottom, making bat-yam an excellent winter surf sanctuary."
    },
    {
        id: "gil-ashdod",
        name: "Ashdod - Gil Beach",
        lat: 31.7917,
        lon: 34.6256,
        region: "south",
        breakType: "Jetty-Protected Break",
        orientation: 270,
        description: "Main surfing hub in Ashdod. Positioned north of the breakwater, creating consistent right-hand waves and offering excellent protection from strong south winds."
    },
    {
        id: "delila-ashkelon",
        name: "Ashkelon - Delila Beach",
        lat: 31.6789,
        lon: 34.5517,
        region: "south",
        breakType: "Beach Break & Jetties",
        orientation: 270,
        description: "Southern Israel's prominent break. Features shifty sandbars that can create hollow, speedy peaks on clean swells. Highly popular with local riders."
    }
];

// --- 2. Application State ---
let state = {
    selectedSpot: SURF_SPOTS[0],
    favorites: JSON.parse(localStorage.getItem('yallasurf_favs')) || [],
    currentFilter: 'all',
    searchQuery: '',
    unitSystem: 'metric', // 'metric' (m, kts, C) or 'imperial' (ft, mph, F)
    chartInstance: null,
    weatherData: null,
    leafletMap: null,
    mapMarkers: {},
    selectedForecastDay: 0 // 0 for today, 1 for tomorrow, etc.
};

// --- 3. DOM Elements ---
const DOM = {
    searchInput: document.getElementById('search-input'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    spotsList: document.getElementById('spots-list'),
    loadingOverlay: document.getElementById('loading-overlay'),
    
    // Header controls
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    unitsToggleBtn: document.getElementById('units-toggle-btn'),
    
    // Dashboard fields
    spotName: document.getElementById('spot-name'),
    spotBreakType: document.getElementById('spot-break-type'),
    spotRegion: document.getElementById('spot-region'),
    spotTips: document.getElementById('spot-tips'),
    favBtn: document.getElementById('fav-btn'),
    spotRatingBadge: document.getElementById('spot-rating-badge'),
    
    // Metrics
    metricSwellHeight: document.getElementById('metric-swell-height'),
    metricSwellPeriod: document.getElementById('metric-swell-period'),
    metricSwellDir: document.getElementById('metric-swell-dir'),
    metricSwellArrow: document.getElementById('metric-swell-arrow'),
    
    metricWindStatus: document.getElementById('metric-wind-status'),
    metricWindSpeed: document.getElementById('metric-wind-speed'),
    metricWindDir: document.getElementById('metric-wind-dir'),
    metricWindArrow: document.getElementById('metric-wind-arrow'),
    metricWindDesc: document.getElementById('metric-wind-desc'),
    
    metricWaveEnergy: document.getElementById('metric-wave-energy'),
    metricEnergyDesc: document.getElementById('metric-energy-desc'),
    
    metricSeaTemp: document.getElementById('metric-sea-temp'),
    metricAirTemp: document.getElementById('metric-air-temp'),
    metricWeatherDesc: document.getElementById('metric-weather-desc'),
    
    // Containers
    forecast5DayContainer: document.getElementById('forecast-5day-container'),
    hourlyDrilldownTitle: document.getElementById('hourly-drilldown-title'),
    hourlyRows: document.getElementById('hourly-rows'),
    
    // Mobile controls
    mobileSidebarToggle: document.getElementById('mobile-sidebar-toggle'),
    sidebar: document.getElementById('sidebar')
};

// --- 4. Initialization & Setup ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupTheme();
    setupEventHandlers();
    // initLeafletMap(); // Disabled "Israeli Surf Coast" Leaflet Map panel
    renderSpotsSidebar();
    preloadSidebarMetrics(); // Fetch live metrics for sidebar cards
    loadSpotData(state.selectedSpot);
}

// --- 5. Theme & Settings Management ---
function setupTheme() {
    // Default to dark, check saved system settings or manual localstorage
    const savedTheme = localStorage.getItem('yallasurf_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = DOM.themeToggleBtn.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('yallasurf_theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Re-render map tiles to match theme if map is active
    if (state.leafletMap) {
        updateMapTiles(newTheme);
    }
}

function toggleUnits() {
    state.unitSystem = state.unitSystem === 'metric' ? 'imperial' : 'metric';
    DOM.unitsToggleBtn.querySelector('.unit-indicator').textContent = state.unitSystem.toUpperCase();
    
    // Re-render UI with new unit selections
    updateMetricsUI();
    renderSpotsSidebar();
    render5DayOutlook();
    renderHourlyDrilldown();
    updateChart();
}

// --- 6. Event Handlers ---
function setupEventHandlers() {
    // Search filter input
    DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderSpotsSidebar();
    });

    // Filter regional tabs
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');
            state.currentFilter = targetBtn.getAttribute('data-filter');
            renderSpotsSidebar();
        });
    });

    // Theme toggle click
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Unit system click
    DOM.unitsToggleBtn.addEventListener('click', toggleUnits);

    // Add to favorites button click
    DOM.favBtn.addEventListener('click', () => {
        toggleFavorite(state.selectedSpot.id);
    });

    // Mobile Sidebar Drawer toggling
    DOM.mobileSidebarToggle.addEventListener('click', () => {
        DOM.sidebar.classList.toggle('open');
        const icon = DOM.mobileSidebarToggle.querySelector('i');
        const text = DOM.mobileSidebarToggle.querySelector('span');
        if (DOM.sidebar.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
            text.textContent = 'Close';
        } else {
            icon.className = 'fa-solid fa-list-ul';
            text.textContent = 'Spots';
        }
    });
}

// --- 7. Map Implementation (Leaflet) ---
function initLeafletMap() {
    // Center of Israeli Coast (Tel Aviv)
    state.leafletMap = L.map('map', {
        center: [32.2, 34.8],
        zoom: 9,
        zoomControl: true,
        scrollWheelZoom: false
    });

    // Load initial dark/light tiles based on current theme
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateMapTiles(theme);

    // Plot surfboard markers for all beaches
    SURF_SPOTS.forEach(spot => {
        // Build custom circular wave-marker
        const markerIcon = L.divIcon({
            className: 'custom-map-pin',
            html: `<div class="marker-glow-ring spot-pin-${spot.id}"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([spot.lat, spot.lon], { icon: markerIcon })
            .addTo(state.leafletMap)
            .bindPopup(`<strong>${spot.name}</strong><br>${spot.breakType}`)
            .on('click', () => {
                selectSpot(spot);
            });

        state.mapMarkers[spot.id] = marker;
    });
}

function updateMapTiles(theme) {
    if (!state.leafletMap) return;
    // If tile layer exists, remove it
    if (state.tileLayer) {
        state.leafletMap.removeLayer(state.tileLayer);
    }

    let tileUrl, attribution;
    if (theme === 'light') {
        tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap &copy; CARTO';
    } else {
        tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap &copy; CARTO';
    }

    state.tileLayer = L.tileLayer(tileUrl, {
        attribution: attribution,
        maxZoom: 19
    }).addTo(state.leafletMap);
}

// Custom Leaflet styling inject to document
const markerStyles = document.createElement('style');
markerStyles.innerHTML = `
    .custom-map-pin {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .marker-glow-ring {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--accent-primary);
        border: 2px solid var(--bg-primary);
        box-shadow: 0 0 10px var(--accent-primary);
        transition: all 0.3s;
    }
    .custom-map-pin:hover .marker-glow-ring {
        transform: scale(1.4);
        background-color: #ffffff;
        box-shadow: 0 0 15px #00f2fe;
    }
    .marker-glow-ring.active-marker {
        width: 16px;
        height: 16px;
        background-color: #ffffff;
        border: 3px solid var(--accent-primary);
        box-shadow: 0 0 15px var(--accent-primary);
        animation: pulse 1s infinite;
    }
`;
document.head.appendChild(markerStyles);

// --- 8. Core Data Fetching & Computations ---
async function loadSpotData(spot) {
    state.selectedSpot = spot;
    state.selectedForecastDay = 0; // Reset selected day to Today
    DOM.loadingOverlay.classList.add('active');
    
    // Focus map on selected spot
    if (state.leafletMap) {
        state.leafletMap.panTo([spot.lat, spot.lon]);
        
        // Highlight active map marker
        Object.keys(state.mapMarkers).forEach(key => {
            const markerDiv = document.querySelector(`.spot-pin-${key}`);
            if (markerDiv) {
                if (key === spot.id) {
                    markerDiv.classList.add('active-marker');
                } else {
                    markerDiv.classList.remove('active-marker');
                }
            }
        });
    }

    // Fetch API Data (Parallel fetches for efficiency)
    try {
        const [marineRes, weatherRes] = await Promise.all([
            fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${spot.lat}&longitude=${spot.lon}&hourly=wave_height,wave_period,wave_direction,swell_wave_height,swell_wave_period,swell_wave_direction&timezone=auto`),
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${spot.lat}&longitude=${spot.lon}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=auto`)
        ]);

        if (!marineRes.ok || !weatherRes.ok) {
            throw new Error("Failed to fetch weather from Open-Meteo endpoints.");
        }

        const marineData = await marineRes.json();
        const weatherData = await weatherRes.json();
        
        // Process & Cache state data
        processForecastData(marineData, weatherData);
        
        // Render UI
        updateDashboardHeaderUI();
        updateMetricsUI();
        render5DayOutlook();
        renderHourlyDrilldown(); // Render detailed daytime hour dashboard
        renderSpotsSidebar(); // Update quick metric badges in list
        updateChart();
        
    } catch (error) {
        console.error("Error loading spot forecast:", error);
        alert("Unable to fetch marine weather. Please verify your connection.");
    } finally {
        DOM.loadingOverlay.classList.remove('active');
    }
}

function processForecastData(marineJson, weatherJson) {
    // Parse times
    const hourlyTimes = marineJson.hourly.time;
    const now = new Date();
    
    // Find closest index matching current hour
    let currentIndex = 0;
    let minTimeDiff = Infinity;
    
    hourlyTimes.forEach((timeStr, idx) => {
        const date = parseLocalISOString(timeStr);
        const diff = Math.abs(date - now);
        if (diff < minTimeDiff) {
            minTimeDiff = diff;
            currentIndex = idx;
        }
    });

    state.weatherData = {
        currentIndex: currentIndex,
        hourly: {
            time: hourlyTimes,
            waveHeight: marineJson.hourly.wave_height,
            wavePeriod: marineJson.hourly.wave_period,
            waveDir: marineJson.hourly.wave_direction,
            // Mediterranean sea wave_height (combined significant height) is much more representative 
            // of physical surf break conditions than open ocean swell_wave_height.
            swellHeight: marineJson.hourly.wave_height,
            swellPeriod: marineJson.hourly.wave_period,
            swellDir: marineJson.hourly.wave_direction,
            airTemp: weatherJson.hourly.temperature_2m,
            windSpeed: weatherJson.hourly.wind_speed_10m,
            windDir: weatherJson.hourly.wind_direction_10m,
            weatherCode: weatherJson.hourly.weather_code
        }
    };
}

// --- 9. Surf & Wind Analytics Algorithms ---
function calculateWindRating(windDir, beachOrientation) {
    // Compass Alignment
    // Beach faces beachOrientation (usually 270 deg / West)
    // Offshore wind is opposite beach orientation: orientation - 180 (usually 90 deg / East)
    const relativeAngle = Math.abs((windDir - beachOrientation + 360) % 360);
    
    // If angle is around 180 (blowing from inland directly offshore)
    // 180 deg difference means direct offshore wind.
    // 0 deg difference means direct onshore wind.
    if (relativeAngle >= 120 && relativeAngle <= 240) {
        return {
            status: "OFFSHORE",
            class: "offshore-badge",
            desc: "Ideal offshore winds grooming clean wave faces."
        };
    } else if (relativeAngle <= 45 || relativeAngle >= 315) {
        return {
            status: "ONSHORE",
            class: "onshore-badge",
            desc: "Onshore wind causing choppy, crumbled lines."
        };
    } else {
        return {
            status: "SIDESHORE",
            class: "sideshore-badge",
            desc: "Sideshore wind creating mild chop and current drift."
        };
    }
}

function calculateWaveEnergy(height, period) {
    // E = 7.3 * H^2 * T (empirical Nearshore power metric in kJ matching Surfline)
    return 7.3 * Math.pow(height, 2) * period;
}

function calculateSurfRange(height, period, windSpeedKnots, windStatus, unitSystem) {
    // Shoaling converts swell height and period to rideable wave faces
    const periodFactor = period >= 10 ? 1.25 : period >= 8 ? 1.05 : 0.85;
    let baseHeight = height * periodFactor;
    
    // Onshore wind degrades swell structure
    if (windStatus === "ONSHORE" && windSpeedKnots > 10) {
        baseHeight *= 0.8;
    }
    
    const max = baseHeight * 1.1;
    
    if (unitSystem === 'imperial') {
        if (max < 0.35) {
            return "0 - 1 ft";
        } else if (max < 0.75) {
            return "1 - 2 ft";
        } else if (max < 1.1) {
            return "2 - 3 ft";
        } else if (max < 1.5) {
            return "3 - 4 ft";
        } else {
            return "4 - 6 ft";
        }
    } else {
        if (max < 0.35) {
            return "0.0 - 0.3 m";
        } else if (max < 0.75) {
            return "0.3 - 0.6 m";
        } else if (max < 1.1) {
            return "0.6 - 0.9 m";
        } else if (max < 1.5) {
            return "0.9 - 1.2 m";
        } else {
            return "1.2 - 1.8 m";
        }
    }
}

function getEnergyDescriptor(energy) {
    if (energy < 5) return "Flat, virtually no power.";
    if (energy < 15) return "Weak, soft surf. Good for longboards.";
    if (energy < 50) return "Clean, fun and playful power.";
    if (energy < 150) return "Solid, punchy waves with good push.";
    return "Heavy, powerful surf. Use caution.";
}

function calculateOverallSurfRating(height, period, windStatus, windSpeed) {
    if (height < 0.25) return "FLAT";
    
    // Basic weightings
    let score = 50; // starts average

    // Swell Height reward
    if (height >= 0.5 && height <= 1.2) score += 15;
    if (height > 1.2 && height <= 2.2) score += 25;
    if (height > 2.2) score += 10; // slightly heavy

    // Swell Period reward (longer period = cleaner power)
    if (period >= 7 && period <= 10) score += 15;
    if (period > 10) score += 25;
    if (period < 5.5) score -= 15; // short period wind chop

    // Wind Impact (Critical surf shaper)
    if (windStatus === "OFFSHORE") {
        if (windSpeed < 12) score += 25; // Light offshore is best
        else score += 15; // Strong offshore holds wave back
    } else if (windStatus === "ONSHORE") {
        if (windSpeed > 8) score -= 30; // heavy crumbling
        else score -= 10; // light onshore is okay
    } else { // Sideshore
        if (windSpeed > 10) score -= 15;
    }

    if (score < 30) return "POOR";
    if (score < 55) return "FAIR";
    if (score < 80) return "GOOD";
    return "EPIC";
}

function getWeatherIconAndDesc(code) {
    // WMO Weather interpretation codes
    if (code === 0) return { icon: "fa-sun text-yellow-400", desc: "Clear Sunny Skies" };
    if (code >= 1 && code <= 3) return { icon: "fa-cloud-sun", desc: "Partly Cloudy" };
    if (code >= 45 && code <= 48) return { icon: "fa-smog", desc: "Foggy" };
    if (code >= 51 && code <= 67) return { icon: "fa-cloud-showers-heavy", desc: "Rain Showers" };
    if (code >= 71 && code <= 86) return { icon: "fa-snowflake", desc: "Wintery Conditions" };
    return { icon: "fa-cloud", desc: "Overcast" };
}

// --- 10. UI Update Controllers ---
function updateDashboardHeaderUI() {
    const spot = state.selectedSpot;
    DOM.spotName.textContent = spot.name;
    DOM.spotBreakType.textContent = spot.breakType;
    DOM.spotRegion.textContent = spot.region.toUpperCase() + " COAST";
    DOM.spotTips.textContent = spot.description;
    
    // Star Favorite Status
    const isFav = state.favorites.includes(spot.id);
    DOM.favBtn.className = isFav ? "fav-action-btn active" : "fav-action-btn";
    DOM.favBtn.querySelector('i').className = isFav ? "fa-solid fa-star" : "fa-regular fa-star";
}

function updateMetricsUI() {
    if (!state.weatherData) return;
    const idx = state.weatherData.currentIndex;
    const hourly = state.weatherData.hourly;
    const spot = state.selectedSpot;

    // 1. Swell Metric
    const rawSwellHeight = hourly.swellHeight[idx];
    const swellPeriod = hourly.swellPeriod[idx];
    const swellDirDeg = hourly.swellDir[idx];
    
    let displayHeight = rawSwellHeight;
    let heightUnit = "m";
    if (state.unitSystem === 'imperial') {
        displayHeight = rawSwellHeight * 3.28084; // Meters to Feet
        heightUnit = "ft";
    }
    DOM.metricSwellHeight.innerHTML = `${displayHeight.toFixed(1)} <span class="unit-sub">${heightUnit}</span>`;
    DOM.metricSwellPeriod.textContent = `${swellPeriod.toFixed(1)}s`;
    
    const swellDirectionCardinal = getCompassCardinal(swellDirDeg);
    DOM.metricSwellDir.textContent = swellDirectionCardinal;
    DOM.metricSwellArrow.style.transform = `rotate(${swellDirDeg}deg)`;

    // 2. Wind Metric
    const rawWindSpeed = hourly.windSpeed[idx];
    const windDirDeg = hourly.windDir[idx];
    
    let displayWind = rawWindSpeed * 0.539957; // km/h to knots
    let windUnit = "kts";
    if (state.unitSystem === 'imperial') {
        displayWind = rawWindSpeed * 0.621371; // km/h to mph
        windUnit = "mph";
    }
    DOM.metricWindSpeed.innerHTML = `${displayWind.toFixed(0)} <span class="unit-sub">${windUnit}</span>`;
    DOM.metricWindDir.textContent = `${getCompassCardinal(windDirDeg)} (${windDirDeg}°)`;
    DOM.metricWindArrow.style.transform = `rotate(${windDirDeg + 180}deg)`; // point towards flow

    const windRating = calculateWindRating(windDirDeg, spot.orientation);
    DOM.metricWindStatus.textContent = windRating.status;
    DOM.metricWindStatus.className = `card-subtitle ${windRating.class}`;
    DOM.metricWindDesc.textContent = windRating.desc;

    // 3. Nearshore Wave Energy
    const waveEnergyValue = calculateWaveEnergy(rawSwellHeight, swellPeriod);
    DOM.metricWaveEnergy.innerHTML = `${waveEnergyValue.toFixed(0)} <span class="unit-sub">kJ</span>`;
    DOM.metricEnergyDesc.textContent = getEnergyDescriptor(waveEnergyValue);

    // 4. Temperatures
    const rawAirTemp = hourly.airTemp[idx];
    // Open-Meteo doesn't give sea water temps in basic api, so we map a realistic seasonal water temperature for Israel
    // Water temperature along Israel coast is ~29C in summer, ~17C in winter
    const month = new Date().getMonth();
    const seaTempCurve = [17, 17.5, 18.5, 20.5, 23, 26, 28.5, 29.5, 28.5, 26.5, 23.5, 19.5];
    const rawSeaTemp = seaTempCurve[month];

    let displayAir = rawAirTemp;
    let displaySea = rawSeaTemp;
    let tempUnit = "°C";
    if (state.unitSystem === 'imperial') {
        displayAir = (rawAirTemp * 9/5) + 32;
        displaySea = (rawSeaTemp * 9/5) + 32;
        tempUnit = "°F";
    }
    DOM.metricSeaTemp.textContent = `${displaySea.toFixed(0)}${tempUnit}`;
    DOM.metricAirTemp.textContent = `${displayAir.toFixed(0)}${tempUnit}`;

    const weatherInfo = getWeatherIconAndDesc(hourly.weatherCode[idx]);
    DOM.metricWeatherDesc.innerHTML = `<i class="fa-solid ${weatherInfo.icon}"></i> ${weatherInfo.desc}`;

    // 5. Global Spot Rating
    const overallRating = calculateOverallSurfRating(rawSwellHeight, swellPeriod, windRating.status, displayWind);
    DOM.spotRatingBadge.textContent = overallRating;
    DOM.spotRatingBadge.className = `rating-value rating-${overallRating.toLowerCase()}`;
}

function render5DayOutlook() {
    if (!state.weatherData) return;
    DOM.forecast5DayContainer.innerHTML = '';
    const hourly = state.weatherData.hourly;
    const spot = state.selectedSpot;

    const daysForecast = [];
    const dayIndices = [12, 36, 60, 84, 108]; // Representative indices for noon of Today (0), Tomorrow (1), and subsequent days

    dayIndices.forEach((idx, i) => {
        if (idx >= hourly.time.length) return;
        
        const date = parseLocalISOString(hourly.time[idx]);
        let dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        if (i === 0) dayName = "TODAY";
        const dateStr = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
        
        const rawHeight = hourly.waveHeight[idx];
        const period = hourly.wavePeriod[idx];
        const rawWind = hourly.windSpeed[idx] * 0.539957; // knots
        const windDir = hourly.windDir[idx];

        // Assess conditions
        const windRating = calculateWindRating(windDir, spot.orientation);
        const rating = calculateOverallSurfRating(rawHeight, period, windRating.status, rawWind);

        let displayHeight = rawHeight;
        let heightUnit = "m";
        if (state.unitSystem === 'imperial') {
            displayHeight = rawHeight * 3.28084;
            heightUnit = "ft";
        }

        daysForecast.push({
            dayIndex: i,
            dayName: dayName,
            dateStr: dateStr,
            height: displayHeight,
            unit: heightUnit,
            period: period,
            wind: rawWind,
            rating: rating
        });
    });

    daysForecast.forEach(day => {
        const card = document.createElement('div');
        const isActive = day.dayIndex === state.selectedForecastDay;
        card.className = `forecast-card${isActive ? ' active' : ''}`;
        card.setAttribute('onclick', `selectForecastDay(${day.dayIndex})`);
        card.innerHTML = `
            <span class="day-name">${day.dayName} ${day.dateStr}</span>
            <span class="day-badge rating-${day.rating.toLowerCase()}">${day.rating}</span>
            <span class="day-height">${day.height.toFixed(1)}${day.unit}</span>
            <span class="day-period">${day.period.toFixed(0)}s</span>
            <span class="day-wind"><i class="fa-solid fa-wind"></i> ${day.wind.toFixed(0)} kts</span>
        `;
        DOM.forecast5DayContainer.appendChild(card);
    });
}

function selectForecastDay(dayIndex) {
    state.selectedForecastDay = dayIndex;
    render5DayOutlook();
    renderHourlyDrilldown();
}

function renderHourlyDrilldown() {
    if (!state.weatherData) return;
    DOM.hourlyRows.innerHTML = '';
    const hourly = state.weatherData.hourly;
    const spot = state.selectedSpot;

    // A day is represented by a 24-hour block in our 168-hour array
    const dayStartIdx = state.selectedForecastDay * 24;

    // Display formatted header date
    const repIdx = dayStartIdx + 12; // representative noon index
    if (repIdx >= hourly.time.length) return;

    const repDate = parseLocalISOString(hourly.time[repIdx]);
    const formattedDate = repDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    DOM.hourlyDrilldownTitle.textContent = `Day Drilldown: ${state.selectedForecastDay === 0 ? "Today's" : formattedDate + "'s"} Hourly Forecast`;

    // Render hours 06:00 to 20:00 (Indices dayStartIdx + 6 to dayStartIdx + 20)
    for (let h = 6; h <= 20; h++) {
        const idx = dayStartIdx + h;
        if (idx >= hourly.time.length) break;

        const rawHeight = hourly.waveHeight[idx];
        const period = hourly.wavePeriod[idx];
        const rawSwellDir = hourly.waveDir[idx] || 270;
        const rawWindSpeed = hourly.windSpeed[idx];
        const windDirDeg = hourly.windDir[idx];

        // Wave Energy (kJ)
        const waveEnergy = calculateWaveEnergy(rawHeight, period);
        
        // Wind calculations (onshore/offshore and units conversion)
        const windRating = calculateWindRating(windDirDeg, spot.orientation);
        let displayWind = rawWindSpeed * 0.539957; // knots
        let windUnit = "kts";
        if (state.unitSystem === 'imperial') {
            displayWind = rawWindSpeed * 0.621371; // mph
            windUnit = "mph";
        }

        // Overall Quality Score
        const qualityRating = calculateOverallSurfRating(rawHeight, period, windRating.status, displayWind);

        // Height Unit Conversion
        let displayHeight = rawHeight;
        let heightUnit = "m";
        if (state.unitSystem === 'imperial') {
            displayHeight = rawHeight * 3.28084;
            heightUnit = "ft";
        }

        // Create elegant row
        const surfRange = calculateSurfRange(rawHeight, period, displayWind, windRating.status, state.unitSystem);
        
        const row = document.createElement('div');
        row.className = 'hourly-row';
        row.innerHTML = `
            <div class="col-hour">${String(h).padStart(2, '0')}:00</div>
            <div class="col-rating">
                <span class="day-badge rating-${qualityRating.toLowerCase()}">${qualityRating}</span>
            </div>
            <div class="col-surf">${surfRange}</div>
            <div class="col-swell">
                ${displayHeight.toFixed(1)}${heightUnit}
                <i class="fa-solid fa-arrow-down" style="transform: rotate(${rawSwellDir}deg); font-size: 10px; color: var(--text-muted);" title="Swell Direction: ${rawSwellDir}°"></i>
                <span style="font-size: 10px; color: var(--text-muted);">${getCompassCardinal(rawSwellDir)}</span>
            </div>
            <div class="col-period">${period.toFixed(0)}s</div>
            <div class="col-wind">
                ${displayWind.toFixed(0)} <span style="font-size: 10px; color: var(--text-muted);">${windUnit}</span>
                <i class="fa-solid fa-arrow-up" style="transform: rotate(${windDirDeg + 180}deg); font-size: 10px;" title="Wind Origin: ${windDirDeg}°"></i>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; margin-right: 4px;">${getCompassCardinal(windDirDeg)}</span>
                <span class="day-badge rating-${windRating.class.split('-')[0]}" style="font-size: 9px; padding: 2px 5px; font-weight: 800;">${windRating.status}</span>
            </div>
            <div class="col-energy">${waveEnergy.toFixed(0)} <span style="font-size: 10px; color: var(--text-muted);">kJ</span></div>
        `;
        DOM.hourlyRows.appendChild(row);
    }
}

// Make globally accessible
window.selectForecastDay = selectForecastDay;

function renderSpotsSidebar() {
    DOM.spotsList.innerHTML = '';
    
    // Filtering Spots list
    let filteredSpots = SURF_SPOTS.filter(spot => {
        const matchesSearch = spot.name.toLowerCase().includes(state.searchQuery);
        
        if (state.currentFilter === 'all') return matchesSearch;
        if (state.currentFilter === 'favs') return matchesSearch && state.favorites.includes(spot.id);
        return matchesSearch && spot.region === state.currentFilter;
    });

    if (filteredSpots.length === 0) {
        DOM.spotsList.innerHTML = `
            <div class="loading-spots">
                <i class="fa-solid fa-cloud-rain" style="font-size: 24px;"></i>
                <p>No spots found.</p>
            </div>
        `;
        return;
    }

    filteredSpots.forEach(spot => {
        const card = document.createElement('div');
        card.className = `spot-card ${state.selectedSpot.id === spot.id ? 'selected' : ''}`;
        
        const isFav = state.favorites.includes(spot.id);
        
        // Retrieve preloaded sidebar wave height and period
        const actualHeight = state.sidebarWaveHeights && state.sidebarWaveHeights[spot.id];
        let heightStr = "--";
        let badgeClass = "rating-fair";
        
        if (actualHeight !== undefined && actualHeight !== null) {
            let displayHeight = actualHeight;
            let unit = "m";
            if (state.unitSystem === 'imperial') {
                displayHeight = actualHeight * 3.28084;
                unit = "ft";
            }
            heightStr = `${displayHeight.toFixed(1)}${unit}`;
            
            // Determine color class based on height boundaries
            if (actualHeight < 0.25) {
                badgeClass = "rating-flat";
            } else if (actualHeight < 0.7) {
                badgeClass = "rating-fair";
            } else if (actualHeight < 1.3) {
                badgeClass = "rating-good";
            } else {
                badgeClass = "rating-epic";
            }
        }
        
        card.innerHTML = `
            <div class="spot-card-info" onclick="selectSpotById('${spot.id}')">
                <span class="spot-card-name">${spot.name}</span>
                <span class="spot-card-meta">
                    <i class="fa-solid fa-location-dot"></i> ${spot.region.toUpperCase()} · ${spot.breakType.split(' ')[0]}
                </span>
            </div>
            <div class="spot-card-metrics">
                <span class="height-badge ${badgeClass}">${heightStr}</span>
                <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${spot.id}')">
                    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>
            </div>
        `;
        DOM.spotsList.appendChild(card);
    });
}

function selectSpotById(id) {
    const spot = SURF_SPOTS.find(s => s.id === id);
    if (spot) {
        selectSpot(spot);
    }
}

function selectSpot(spot) {
    state.selectedSpot = spot;
    loadSpotData(spot);
    
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
        DOM.sidebar.classList.remove('open');
        const icon = DOM.mobileSidebarToggle.querySelector('i');
        const text = DOM.mobileSidebarToggle.querySelector('span');
        icon.className = 'fa-solid fa-list-ul';
        text.textContent = 'Spots';
    }
}

// Make globally accessible for onClick events inside dynamic elements
window.selectSpotById = selectSpotById;
window.toggleFavorite = toggleFavorite;

// --- 11. Favorites Persistence Logic ---
function toggleFavorite(spotId) {
    const idx = state.favorites.indexOf(spotId);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
    } else {
        state.favorites.push(spotId);
    }
    localStorage.setItem('yallasurf_favs', JSON.stringify(state.favorites));
    
    // Re-render UI
    updateDashboardHeaderUI();
    renderSpotsSidebar();
}

// --- 12. Chart.js Implementation ---
function updateChart() {
    if (!state.weatherData) return;
    const hourly = state.weatherData.hourly;
    
    // Prepare 48 hour slices starting from current hour
    const currIdx = state.weatherData.currentIndex;
    const length = 48;
    const sliceTimes = [];
    const sliceSwells = [];
    const sliceWinds = [];

    for (let i = 0; i < length; i++) {
        const targetIdx = currIdx + i;
        if (targetIdx >= hourly.time.length) break;
        
        // Time label format (e.g. "Wed 15:00")
        const date = parseLocalISOString(hourly.time[targetIdx]);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const hour = date.getHours().toString().padStart(2, '0') + ':00';
        sliceTimes.push(`${day} ${hour}`);
        
        // Swell heights
        let waveHeight = hourly.waveHeight[targetIdx];
        if (state.unitSystem === 'imperial') waveHeight = waveHeight * 3.28084;
        sliceSwells.push(waveHeight.toFixed(2));
        
        // Wind speed (knots or mph)
        let windVal = hourly.windSpeed[targetIdx] * 0.539957; // knots
        if (state.unitSystem === 'imperial') windVal = hourly.windSpeed[targetIdx] * 0.621371; // mph
        sliceWinds.push(windVal.toFixed(0));
    }

    const ctx = document.getElementById('forecastChart').getContext('2d');
    
    // Destroy previous instance
    if (state.chartInstance) {
        state.chartInstance.destroy();
    }

    // Chart customization to match Glassmorphism theme
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    const gridColor = isLightTheme ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
    const textLabelColor = isLightTheme ? '#64748b' : '#94a3b8';

    // Gradients for glowing fills
    const waveGrad = ctx.createLinearGradient(0, 0, 0, 180);
    waveGrad.addColorStop(0, 'rgba(0, 242, 254, 0.4)');
    waveGrad.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

    const windGrad = ctx.createLinearGradient(0, 0, 0, 180);
    windGrad.addColorStop(0, 'rgba(255, 159, 67, 0.25)');
    windGrad.addColorStop(1, 'rgba(255, 159, 67, 0.0)');

    state.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sliceTimes,
            datasets: [
                {
                    label: `Swell Height (${state.unitSystem === 'imperial' ? 'ft' : 'm'})`,
                    data: sliceSwells,
                    borderColor: '#00f2fe',
                    backgroundColor: waveGrad,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    yAxisID: 'yWave'
                },
                {
                    label: `Wind Speed (${state.unitSystem === 'imperial' ? 'mph' : 'kts'})`,
                    data: sliceWinds,
                    borderColor: '#ff9f43',
                    backgroundColor: windGrad,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    yAxisID: 'yWind'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: { display: false } // Custom HTML legend used
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: textLabelColor,
                        font: { family: 'Plus Jakarta Sans', size: 9 },
                        maxTicksLimit: 8
                    }
                },
                yWave: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: gridColor },
                    ticks: {
                        color: textLabelColor,
                        font: { family: 'Outfit', size: 9 }
                    }
                },
                yWind: {
                    type: 'linear',
                    position: 'right',
                    grid: { display: false },
                    ticks: {
                        color: textLabelColor,
                        font: { family: 'Outfit', size: 9 }
                    }
                }
            }
        }
    });
}

// --- 13. Miscellaneous Utilities ---
function getCompassCardinal(deg) {
    const cardinals = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(deg / 22.5) % 16;
    return cardinals[index];
}

function parseLocalISOString(timeStr) {
    if (!timeStr) return new Date();
    // Expected format: "YYYY-MM-DDTHH:mm"
    const parts = timeStr.split('T');
    if (parts.length < 2) return new Date(timeStr);
    const [datePart, timePart] = parts;
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute);
}

async function preloadSidebarMetrics() {
    try {
        const lats = SURF_SPOTS.map(s => s.lat).join(',');
        const lons = SURF_SPOTS.map(s => s.lon).join(',');
        const res = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lats}&longitude=${lons}&hourly=wave_height,wave_period&timezone=auto`);
        if (!res.ok) return;
        const batchData = await res.json();
        
        // We expect an array of responses
        if (Array.isArray(batchData)) {
            state.sidebarWaveHeights = {};
            state.sidebarWavePeriods = {};
            
            // Find current index based on local parsing
            const firstResponse = batchData[0];
            const now = new Date();
            let currentIdx = 0;
            let minTimeDiff = Infinity;
            
            firstResponse.hourly.time.forEach((timeStr, idx) => {
                const date = parseLocalISOString(timeStr);
                const diff = Math.abs(date - now);
                if (diff < minTimeDiff) {
                    minTimeDiff = diff;
                    currentIdx = idx;
                }
            });
            
            SURF_SPOTS.forEach((spot, i) => {
                const spotData = batchData[i];
                if (spotData && spotData.hourly) {
                    state.sidebarWaveHeights[spot.id] = spotData.hourly.wave_height[currentIdx];
                    state.sidebarWavePeriods[spot.id] = spotData.hourly.wave_period[currentIdx];
                }
            });
            
            // Re-render sidebar now that real data is cached
            renderSpotsSidebar();
        }
    } catch (err) {
        console.error("Error preloading sidebar metrics:", err);
    }
}
