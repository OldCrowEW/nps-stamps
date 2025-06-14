console.log('[DEBUG] app.js loaded');

// Helper function to normalize park names for sticker mapping lookup
function normalizeParkName(parkName) {
    // Handle specific special cases first
    if (parkName === 'Ellis Island National Monument') {
        return 'Ellis Island';
    }
    if (parkName === 'Gateway National Recreation Area') {
        return 'Gateway NRA Sandy Hook Unit';
    }
    if (parkName.startsWith('Independence National Historical Park')) {
        return 'Independence NHP';
    }
    if (parkName === 'Ozark National Scenic Riverways') {
        return 'Ozark NSR';
    }
    
    return parkName
        .replace(/National Historical Park/g, 'NHP')
        .replace(/National Historic Site/g, 'NHS') 
        .replace(/National Park/g, 'NP')
        .replace(/National Monument/g, 'NM')
        .replace(/National Memorial/g, 'NM')
        .replace(/National Battlefield Park/g, 'NBP')
        .replace(/National Battlefield/g, 'NB')
        .replace(/National Military Park/g, 'NMP')
        .replace(/National Scenic River/g, 'NSR')
        .replace(/National Wild and Scenic River/g, 'NSR')
        .replace(/Wild & Scenic River/g, 'WSR')
        .replace(/National Recreation Area/g, 'NRA')
        .replace(/National Seashore/g, 'NS')
        .replace(/National Lakeshore/g, 'NL')
        .replace(/National Preserve/g, 'N PRES')
        .replace(/National River and Recreation Area/g, 'NRRA')
        .replace(/ and Preserve/g, ' and PRES')
        .replace(/African Burial Ground/g, 'African Burial Grounds') // Handle specific case
        .trim();
}

// Helper function to get sticker data with name normalization
function getStickerData(parkName) {
    // Try exact match first
    if (window.parkStickerMapping?.[parkName]) {
        return window.parkStickerMapping[parkName];
    }
    
    // Try normalized name
    const normalizedName = normalizeParkName(parkName);
    if (window.parkStickerMapping?.[normalizedName]) {
        return window.parkStickerMapping[normalizedName];
    }
    
    // Try reverse lookup - check if any sticker mapping key matches our normalized name
    const ourNormalizedName = normalizeParkName(parkName);
    for (const [stickerKey, stickerData] of Object.entries(window.parkStickerMapping || {})) {
        if (stickerKey === ourNormalizedName) {
            return stickerData;
        }
    }
    
    return null;
}

// Park Passport Finder Application
class ParkPassportFinder {
    constructor() {
        this.data = window.stampData;
        this.filteredData = [];
        this.currentView = 'timeline';
        this.currentRoute = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateYearFilter();
        this.setupRouting();
        // Handle initial load
        if (window.location.hash) {
            this.handleRoute();
        } else {
            // Show default view
            const sections = ['searchSection', 'browseSection', 'resultsSection', 'detailSection'];
            sections.slice(0, 3).forEach(id => document.getElementById(id).style.display = 'block');
            this.showBrowseView('timeline');
        }
        this.updateResultsCount();
    }

    setupRouting() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle clicks on links with data-route attribute
        document.addEventListener('click', (e) => {
            const routeLink = e.target.closest('[data-route]');
            if (routeLink) {
                e.preventDefault();
                const route = routeLink.getAttribute('data-route');
                this.navigateTo(route);
            }
        });
    }

    navigateTo(route) {
        window.history.pushState({}, '', `#${route}`);
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);
        const [type, ...params] = hash.split('/');
        
        // Hide all sections first
        const sections = ['searchSection', 'browseSection', 'resultsSection', 'detailSection'];
        sections.forEach(id => document.getElementById(id).style.display = 'none');
        
        if (!type) {
            // Default view - show main sections
            sections.slice(0, 3).forEach(id => document.getElementById(id).style.display = 'block');
            this.showBrowseView('timeline');
            return;
        }
        
        // Show detail section for detail views
        document.getElementById('detailSection').style.display = 'block';
        
        const container = document.getElementById('detailContent');
        switch(type) {
            case 'year':
                this.showYearDetail(params[0]);
                break;
            case 'park':
                const parkName = decodeURIComponent(params.join('/'));
                this.showParkDetail(parkName);
                break;

            case 'region':
                this.showRegionDetail(decodeURIComponent(params.join('/')));
                break;
            case 'series':
                // Handle subroutes for series
                if (params[0] === 'years') {
                    // Render all years index
                    container.innerHTML = '<h2>All Stamp Series by Year</h2><div id="seriesYearsList"></div>';
                    this.renderTimelineView(document.getElementById('seriesYearsList'));
                } else if (params[0] === 'regions') {
                    // Render all regions index
                    container.innerHTML = '<h2>All Stamp Series by Region</h2><div id="seriesRegionsList"></div>';
                    this.renderRegionView(document.getElementById('seriesRegionsList'));
                } else if (params[0] === 'parks') {
                    // Render all parks index
                    container.innerHTML = '<h2>All Stamp Series by Park</h2><div id="seriesParksList"></div>';
                    this.renderAlphabeticalView(document.getElementById('seriesParksList'));
                } else {
                    this.showSeriesOverview();
                }
                break;
            default:
                this.showBrowseView('timeline');
        }
    }

    async showYearDetail(year) {
        const yearData = this.data.find(d => d.year === parseInt(year));
        if (!yearData) {
            this.showNotFound();
            return;
        }
        
        const container = document.getElementById('detailContent');
        const nationalStamp = yearData.stamps.find(s => s.region === 'National');
        const regionalStamps = yearData.stamps.filter(s => s.region !== 'National');
        
        container.innerHTML = `
            <div class="detail-header">
                <button class="back-btn" onclick="history.back()">← Back</button>
                <h1>${year} Passport Stamp Set</h1>
            </div>
            <div class="year-detail-content">
                <div class="stamp-set-image-large">
                    <img src="${window.getStampSetImage(year)}" alt="${year} Stamp Set" loading="lazy">
                </div>
                <div class="stamp-set-info">
                    <h2>Set Information</h2>
                    <p class="stamp-count">10 stamps in this set</p>
                    <a href="${window.generatePurchaseLink(year)}" 
                       target="_blank" 
                       rel="noopener"
                       class="purchase-btn-large">
                        Purchase ${year} Stamp Set
                    </a>
                    ${nationalStamp ? `<h3>National Stamp: ${nationalStamp.park}</h3>` : ''}
                    <h3>Parks in this Set:</h3>
                    <div class="timeline-parks">
                        ${yearData.stamps.map(stamp => `
                            <span class="park-pill${stamp.region === 'National' ? ' national-stamp' : ''}" data-route="park/${encodeURIComponent(stamp.park)}">${stamp.park}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    showParkDetail(parkName) {
        const parkAppearances = [];
        this.data.forEach(yearData => {
            yearData.stamps.forEach(stamp => {
                // Check for exact match
                if (stamp.park === parkName) {
                    parkAppearances.push({
                        year: yearData.year,
                        region: stamp.region,
                        yearData: yearData
                    });
                }
                // Check if normalized stamp name matches the park name
                else if (normalizeParkName(stamp.park) === parkName) {
                    parkAppearances.push({
                        year: yearData.year,
                        region: stamp.region,
                        yearData: yearData
                    });
                }
                // Check if stamp name matches normalized park name
                else if (stamp.park === normalizeParkName(parkName)) {
                    parkAppearances.push({
                        year: yearData.year,
                        region: stamp.region,
                        yearData: yearData
                    });
                }
                // Check if both normalized versions match
                else if (normalizeParkName(stamp.park) === normalizeParkName(parkName)) {
                    parkAppearances.push({
                        year: yearData.year,
                        region: stamp.region,
                        yearData: yearData
                    });
                }
            });
        });
        
        if (parkAppearances.length === 0) {
            this.showNotFound();
            return;
        }
        
        // Sort by year (newest first)
        parkAppearances.sort((a, b) => b.year - a.year);
        
        // Get the most recent year this park appeared for the sticker image
        const mostRecentYear = parkAppearances[0].year;
        
        // Check if individual sticker is available and build sticker section
        const stickerData = getStickerData(parkName);
        let stickerSection = '';
        
        if (stickerData?.hasIndividualSticker) {
            // Handle both regular and Junior Ranger stickers
            let stickersHtml = '';
            
            if (stickerData.stickerType === 'both') {
                // Show both regular and Junior Ranger
                stickersHtml = `
                    <div class="stickers-grid">
                        <div class="sticker-card">
                            <div class="sticker-image-container">
                                <img src="images/individual-stickers/${stickerData.imageFilename}" 
                                     alt="${parkName} Regular Sticker" 
                                     class="sticker-image"
                                     loading="lazy"
                                     onerror="this.style.display='none'; this.parentElement.querySelector('.sticker-placeholder').style.display='flex';">
                                <div class="sticker-placeholder" style="display: none;">
                                    <div class="placeholder-icon">🎫</div>
                                    <p>Regular Sticker</p>
                                </div>
                            </div>
                            <div class="sticker-info">
                                <h4>Regular Passport Sticker</h4>
                                <p class="sticker-description">${stickerData.description}</p>
                                <div class="sticker-details">
                                    <span class="sticker-type">Photography Design</span>
                                </div>
                                <a href="${stickerData.purchaseUrl}" 
                                   target="_blank" 
                                   rel="noopener"
                                   class="purchase-sticker-btn">
                                    Buy Sticker
                                </a>
                            </div>
                        </div>
                        
                        <div class="sticker-card">
                            <div class="sticker-image-container">
                                <img src="images/individual-stickers/${stickerData.imageFilenameJuniorRanger}" 
                                     alt="${parkName} Junior Ranger Sticker" 
                                     class="sticker-image"
                                     loading="lazy"
                                     onerror="this.style.display='none'; this.parentElement.querySelector('.sticker-placeholder').style.display='flex';">
                                <div class="sticker-placeholder" style="display: none;">
                                    <div class="placeholder-icon">🎨</div>
                                    <p>Junior Ranger Sticker</p>
                                </div>
                            </div>
                            <div class="sticker-info">
                                <h4>Junior Ranger Sticker</h4>
                                <p class="sticker-description">${stickerData.descriptionJuniorRanger}</p>
                                <div class="sticker-details">
                                    <span class="sticker-type">Artistic Design by David Klug</span>
                                </div>
                                <a href="${stickerData.purchaseUrlJuniorRanger}" 
                                   target="_blank" 
                                   rel="noopener"
                                   class="purchase-sticker-btn">
                                    Buy Jr. Ranger
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Show single sticker type
                const isJuniorRanger = stickerData.stickerType === 'junior-ranger';
                stickersHtml = `
                    <div class="stickers-grid single-sticker">
                        <div class="sticker-card">
                            <div class="sticker-image-container">
                                <img src="images/individual-stickers/${stickerData.imageFilename}" 
                                     alt="${parkName} ${isJuniorRanger ? 'Junior Ranger' : 'Regular'} Sticker" 
                                     class="sticker-image"
                                     loading="lazy"
                                     onerror="this.style.display='none'; this.parentElement.querySelector('.sticker-placeholder').style.display='flex';">
                                <div class="sticker-placeholder" style="display: none;">
                                    <div class="placeholder-icon">${isJuniorRanger ? '🎨' : '🎫'}</div>
                                    <p>${isJuniorRanger ? 'Junior Ranger' : 'Regular'} Sticker</p>
                                </div>
                            </div>
                            <div class="sticker-info">
                                <h4>${isJuniorRanger ? 'Junior Ranger Sticker' : 'Regular Passport Sticker'}</h4>
                                <p class="sticker-description">${stickerData.description}</p>
                                <div class="sticker-details">
                                    <span class="sticker-type">${isJuniorRanger ? 'Artistic Design by David Klug' : 'Photography Design'}</span>
                                </div>
                                <a href="${stickerData.purchaseUrl}" 
                                   target="_blank" 
                                   rel="noopener"
                                   class="purchase-sticker-btn">
                                    Buy Sticker
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            stickerSection = `
                <div class="individual-stickers-section">
                    <div class="section-header">
                        <h3>Individual Passport Stickers</h3>
                        <p class="section-description">Official stickers designed to fit in your Passport to Your National Parks book. Available for separate purchase.</p>
                    </div>
                    ${stickersHtml}
                </div>
            `;
        }
        
        const container = document.getElementById('detailContent');
        const appearanceCards = parkAppearances.map(appearance => {
            const otherStamps = appearance.yearData.stamps.filter(s => s.park !== parkName);
            return `
                <div class="appearance-card" data-route="year/${appearance.year}">
                    <div class="appearance-header">
                        <h3 class="clickable-year">${appearance.year}</h3>
                        <span class="stamp-region-badge ${appearance.region === 'National' ? 'national' : ''}">${appearance.region}</span>
                    </div>
                    <div class="appearance-image" data-route="year/${appearance.year}">
                        <img src="${window.getStampSetImage(appearance.year)}" 
                             alt="${appearance.year} Stamp Set" 
                             loading="lazy">
                    </div>
                    <div class="appearance-info">
                        <p class="other-stamps-label">Other stamps in this set:</p>
                        <div class="other-stamps">
                            ${otherStamps.map(stamp => 
                                `<span class="mini-park-pill" data-route="park/${encodeURIComponent(stamp.park)}">${stamp.park}</span>`
                            ).join('')}
                        </div>
                        <a href="${window.generatePurchaseLink(appearance.year)}" 
                           target="_blank" 
                           rel="noopener"
                           class="stamp-link"
                           onclick="event.stopPropagation()">
                            Buy ${appearance.year} Set
                        </a>
                    </div>
                </div>
            `;
        }).join('');
        container.innerHTML = `
            <div class="detail-header">
                <button class="back-btn" onclick="history.back()">← Back</button>
                <h1>${parkName}</h1>
                <p class="park-subtitle">Featured in ${parkAppearances.length} stamp set${parkAppearances.length > 1 ? 's' : ''}</p>
            </div>
            <div class="park-detail-content">
                <div class="park-stickers-container">
                    <div class="stamp-sets-section">
                        <div class="section-header">
                            <h3>Stamp Set Appearances</h3>
                            <p class="section-description">View all the passport stamp sets that feature ${parkName}.</p>
                        </div>
                        <div class="park-appearances-grid">
                            ${appearanceCards}
                        </div>
                    </div>
                    ${stickerSection}
                </div>
            </div>
        `;
    }



    showRegionDetail(regionName) {
        const regionParks = [];
        this.data.forEach(yearData => {
            yearData.stamps.forEach(stamp => {
                if (stamp.region === regionName) {
                    regionParks.push({
                        park: stamp.park,
                        year: yearData.year
                    });
                }
            });
        });
        
        if (regionParks.length === 0) {
            this.showNotFound();
            return;
        }
        
        // Group by park
        const parksByName = {};
        regionParks.forEach(entry => {
            if (!parksByName[entry.park]) {
                parksByName[entry.park] = [];
            }
            parksByName[entry.park].push(entry.year);
        });
        
        const container = document.getElementById('detailContent');
        container.innerHTML = `
            <div class="detail-header">
                <button class="back-btn" onclick="history.back()">← Back</button>
                <h1>${regionName} Region</h1>
            </div>
            
            <div class="region-detail-content">
                <p class="region-stats">${Object.keys(parksByName).length} different parks featured in this region</p>
                
                <div class="region-parks-detail-grid">
                    ${Object.entries(parksByName).sort((a, b) => a[0].localeCompare(b[0])).map(([park, years]) => `
                        <div class="region-park-card" data-route="park/${encodeURIComponent(park)}">
                            <div class="region-park-image">
                                <img src="${window.getStampImage(park, Math.max(...years), regionName)}" 
                                     alt="${park}" 
                                     loading="lazy">
                            </div>
                            <div class="region-park-details">
                                <h3>${park}</h3>
                                <p class="year-list">Years: ${years.sort((a, b) => b - a).join(', ')}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    showSeriesOverview() {
        const container = document.getElementById('detailContent');
        
        // Calculate statistics
        const totalStamps = this.data.reduce((sum, year) => sum + year.stamps.length, 0);
        const uniqueParks = new Set();
        this.data.forEach(yearData => {
            yearData.stamps.forEach(stamp => {
                uniqueParks.add(stamp.park);
            });
        });
        
        container.innerHTML = `
            <div class="detail-header">
                <button class="back-btn" onclick="history.back()">← Back</button>
                <h1>Passport Stamp Series Overview</h1>
            </div>
            
            <div class="series-overview">
                <div class="series-stats">
                    <div class="stat-card">
                        <h3>40</h3>
                        <p>Years of Stamps</p>
                        <small>1986 - 2025</small>
                    </div>
                    <div class="stat-card">
                        <h3>${totalStamps.toLocaleString()}</h3>
                        <p>Total Stamps</p>
                        <small>10 per year</small>
                    </div>
                    <div class="stat-card">
                        <h3>${uniqueParks.size.toLocaleString()}</h3>
                        <p>Unique Parks</p>
                        <small>Featured in the series</small>
                    </div>
                </div>
                
                <h2>Browse by Category</h2>
                <div class="series-browse-grid">
                    <div class="browse-card" data-route="series/years">
                        <h3>By Year</h3>
                        <p>Explore all 40 years of stamp sets</p>
                    </div>
                    <div class="browse-card" data-route="series/regions">
                        <h3>By Region</h3>
                        <p>Browse stamps by geographic region</p>
                    </div>
                    <div class="browse-card" data-route="series/parks">
                        <h3>By Park</h3>
                        <p>Find all appearances of specific parks</p>
                    </div>
                </div>
                
                <h2>Recent Stamp Sets</h2>
                <div class="recent-sets-grid">
                    ${this.data.slice(0, 6).map(yearData => `
                        <div class="recent-set-card" data-route="year/${yearData.year}">
                            <img src="${window.getStampSetImage(yearData.year)}" 
                                 alt="${yearData.year} Stamp Set" 
                                 loading="lazy">
                            <h4>${yearData.year}</h4>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    showNotFound() {
        const container = document.getElementById('detailContent');
        container.innerHTML = `
            <div class="detail-header">
                <button class="back-btn" onclick="history.back()">← Back</button>
                <h1>Not Found</h1>
            </div>
            <div class="not-found">
                <p>Sorry, we couldn't find what you're looking for.</p>
                <button class="back-btn" onclick="history.back()">Go Back</button>
            </div>
        `;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        searchInput.addEventListener('focus', () => this.showSuggestions());
        searchInput.addEventListener('blur', () => {
            setTimeout(() => this.hideSuggestions(), 200);
        });
        
        // Allow Enter key to search with current partial term
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.hideSuggestions();
                this.handleSearch(searchInput.value);
            }
        });

        // Filter functionality
        document.getElementById('yearFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('regionFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());

        // Browse tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.showBrowseView(view);
            });
        });

        // Global click handler for all route elements
        document.body.addEventListener('click', (e) => {
            const routeElement = e.target.closest('[data-route]');
            if (routeElement) {
                // If it's a park link, region title, or mini-park-pill, allow navigation
                if (
                    routeElement.classList.contains('mini-park-pill') ||
                    routeElement.classList.contains('park-pill') ||
                    routeElement.classList.contains('region-title')
                ) {
                    e.preventDefault();
                    e.stopPropagation();
                    const route = routeElement.getAttribute('data-route');
                    if (route) {
                        window.parkFinder.navigateTo(route);
                    }
                    return;
                }
                // If it's an appearance-card, but NOT clicking on .mini-park-pill, .appearance-image img, or .stamp-link, navigate to year
                if (
                    routeElement.classList.contains('appearance-card') &&
                    !e.target.closest('.mini-park-pill') &&
                    !e.target.closest('.appearance-image img') &&
                    !e.target.closest('.stamp-link')
                ) {
                    e.preventDefault();
                    e.stopPropagation();
                    const route = routeElement.getAttribute('data-route');
                    if (route) {
                        window.parkFinder.navigateTo(route);
                    }
                    return;
                }
            }
        });
    }

    populateYearFilter() {
        const yearFilter = document.getElementById('yearFilter');
        const years = [...new Set(this.data.map(item => item.year))].sort((a, b) => b - a);
        
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.hideSuggestions();
            this.clearResults();
            showBrowseSection(true);
            return;
        }

        const searchResults = this.searchParks(query);
        this.displaySuggestions(searchResults, query);
        this.displayResults(searchResults);
        showBrowseSection(false);
    }

    searchParks(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        this.data.forEach(yearData => {
            yearData.stamps.forEach(stamp => {
                if (stamp.park.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        park: stamp.park,
                        region: stamp.region,
                        year: yearData.year
                    });
                }
            });
        });

        return results;
    }

    displaySuggestions(results, query) {
        const suggestionsDiv = document.getElementById('searchSuggestions');
        suggestionsDiv.innerHTML = '';

        if (results.length === 0) {
            suggestionsDiv.classList.remove('active');
            return;
        }

        // Show count of all matches
        const matchCount = results.length;
        const uniqueParks = [...new Set(results.map(r => r.park))];
        
        // Add a "show all X results" option at the top
        if (uniqueParks.length > 1) {
            const showAllDiv = document.createElement('div');
            showAllDiv.className = 'suggestion-item show-all';
            showAllDiv.innerHTML = `<strong>Show all ${matchCount} matches for "${query}"</strong>`;
            showAllDiv.addEventListener('click', () => {
                this.hideSuggestions();
                // Keep the partial search term to show all matches
                document.getElementById('searchInput').value = query;
                this.handleSearch(query);
            });
            suggestionsDiv.appendChild(showAllDiv);
        }

        // Show individual park suggestions
        uniqueParks.slice(0, 5).forEach(park => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            const parkCount = results.filter(r => r.park === park).length;
            div.innerHTML = `${this.highlightMatch(park, query)} <span style="color: #6c757d; font-size: 0.9em;">(${parkCount} stamp${parkCount > 1 ? 's' : ''})</span>`;
            div.addEventListener('click', () => {
                document.getElementById('searchInput').value = park;
                this.handleSearch(park);
                this.hideSuggestions();
            });
            suggestionsDiv.appendChild(div);
        });

        suggestionsDiv.classList.add('active');
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    showSuggestions() {
        const query = document.getElementById('searchInput').value;
        if (query) {
            this.handleSearch(query);
        }
    }

    hideSuggestions() {
        document.getElementById('searchSuggestions').classList.remove('active');
    }

    displayResults(results) {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = '';

        // Hide browse section if there are results or a search is active
        const searchInput = document.getElementById('searchInput');
        if (results.length > 0 || (searchInput && searchInput.value.trim())) {
            showBrowseSection(false);
        } else {
            showBrowseSection(true);
        }

        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No results found</h3>
                    <p>Try searching for a different park name</p>
                </div>
            `;
            this.updateResultsCount(0);
            return;
        }

        // Group results by park
        const groupedResults = {};
        results.forEach(result => {
            if (!groupedResults[result.park]) {
                groupedResults[result.park] = [];
            }
            groupedResults[result.park].push(result);
        });

        Object.entries(groupedResults).forEach(([park, stamps]) => {
            const card = this.createStampCard(park, stamps);
            container.appendChild(card);
        });

        this.updateResultsCount(Object.keys(groupedResults).length);
    }

    createStampCard(parkName, stamps) {
        const card = document.createElement('div');
        card.className = 'stamp-card';
        card.setAttribute('data-route', `park/${encodeURIComponent(parkName)}`);

        // Get the first stamp's image as the card image
        const firstStamp = stamps[0];
        const stampImage = window.getStampSetImage(firstStamp.year);

        const yearsHtml = stamps.map(stamp => `
            <div style="margin-bottom: 0.5rem;">
                <span class="stamp-year">${stamp.year}</span>
                <span class="stamp-region">${stamp.region}</span>
            </div>
        `).join('');

        // Check for individual sticker availability
        const stickerData = getStickerData(parkName);
        let stickerInfo = '';
        if (stickerData?.hasIndividualSticker) {
            const stickerTypes = [];
            if (stickerData.stickerType === 'both') {
                stickerTypes.push('Regular', 'Jr. Ranger');
            } else if (stickerData.stickerType === 'junior-ranger') {
                stickerTypes.push('Jr. Ranger');
            } else {
                stickerTypes.push('Individual');
            }
            stickerInfo = `<div class="park-stickers">Individual: ${stickerTypes.join(', ')}</div>`;
        }

        card.innerHTML = `
            <div class="stamp-image-container">
                <img src="${stampImage}" 
                     alt="${parkName}" 
                     class="stamp-image" 
                     loading="lazy">
            </div>
            <div class="stamp-content">
                <h3 class="stamp-park">${parkName}</h3>
                ${yearsHtml}
                ${stickerInfo}
                <div class="stamp-links" onclick="event.stopPropagation()">
                    ${stamps.map(stamp => `
                        <a href="${window.generatePurchaseLink(stamp.year)}" 
                           target="_blank" 
                           rel="noopener"
                           class="stamp-link"
                           style="margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-block;">
                            Buy ${stamp.year} Set
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        return card;
    }

    applyFilters() {
        const yearFilter = document.getElementById('yearFilter').value;
        const regionFilter = document.getElementById('regionFilter').value;
        const searchQuery = document.getElementById('searchInput').value;

        let results = [];

        this.data.forEach(yearData => {
            if (yearFilter && yearData.year !== parseInt(yearFilter)) {
                return;
            }

            yearData.stamps.forEach(stamp => {
                if (regionFilter && stamp.region !== regionFilter) {
                    return;
                }

                if (searchQuery && !stamp.park.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return;
                }

                results.push({
                    park: stamp.park,
                    region: stamp.region,
                    year: yearData.year
                });
            });
        });

        // Hide browse section if any filter is active
        if (yearFilter || regionFilter || searchQuery) {
            showBrowseSection(false);
        } else {
            showBrowseSection(true);
        }

        this.displayResults(results);
    }

    clearFilters() {
        document.getElementById('yearFilter').value = '';
        document.getElementById('regionFilter').value = '';
        document.getElementById('searchInput').value = '';
        this.clearResults();
        this.updateResultsCount();
        showBrowseSection(true);
    }

    clearResults() {
        document.getElementById('resultsContainer').innerHTML = '';
        this.updateResultsCount(0);
    }

    updateResultsCount(count) {
        const countDiv = document.getElementById('resultsCount');
        if (count === undefined) {
            countDiv.textContent = '';
        } else if (count === 0) {
            countDiv.textContent = 'No results found';
        } else if (count === 1) {
            countDiv.textContent = '1 park found';
        } else {
            countDiv.textContent = `${count} parks found`;
        }
    }

    showBrowseView(view) {
        this.currentView = view;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        const container = document.getElementById('browseContainer');
        container.innerHTML = '';

        switch(view) {
            case 'timeline':
                this.renderTimelineView(container);
                break;
            case 'alphabetical':
                this.renderAlphabeticalView(container);
                break;
            case 'region':
                this.renderRegionView(container);
                break;
            case 'individual-stickers':
                this.renderIndividualStickersView(container);
                break;
            case 'junior-ranger':
                this.renderJuniorRangerView(container);
                break;
        }
    }

    renderTimelineView(container) {
        const timeline = document.createElement('div');
        timeline.className = 'timeline';

        const sortedData = [...this.data].sort((a, b) => b.year - a.year);

        sortedData.forEach(yearData => {
            const item = document.createElement('div');
            item.className = 'timeline-item';

            const stampSetImage = window.getStampSetImage(yearData.year);
            const nationalStamp = yearData.stamps.find(s => s.region === 'National');
            const regionalStamps = yearData.stamps.filter(s => s.region !== 'National');

            item.innerHTML = `
                <div class="timeline-year-header">
                    <h2 class="timeline-year" data-route="year/${yearData.year}">${yearData.year} Passport Stamp Set</h2>
                    <a href="${window.generatePurchaseLink(yearData.year)}" 
                       target="_blank" 
                       rel="noopener"
                       class="stamp-link timeline-purchase"
                       onclick="event.stopPropagation()">
                        Purchase ${yearData.year} Set
                    </a>
                </div>
                
                <div class="timeline-content">
                    <div class="timeline-image-container" data-route="year/${yearData.year}">
                        <img src="${stampSetImage}" alt="${yearData.year} Stamp Set" class="timeline-image" loading="lazy">
                    </div>
                    
                    <div class="timeline-stamps">
                        ${nationalStamp ? `
                            <div class="timeline-national-section">
                                <h4>National Stamp</h4>
                                <div class="timeline-national-stamp">
                                    <span class="park-pill national-stamp" data-route="park/${encodeURIComponent(nationalStamp.park)}">${nationalStamp.park}</span>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="timeline-regional-section">
                            <h4>Regional Stamps</h4>
                            <div class="timeline-parks">
                                ${regionalStamps.map(stamp => 
                                    `<span class="park-pill" data-route="park/${encodeURIComponent(stamp.park)}">${stamp.park}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            timeline.appendChild(item);
        });

        container.appendChild(timeline);
    }

    renderAlphabeticalView(container) {
        const allParks = {};

        this.data.forEach(yearData => {
            yearData.stamps.forEach(stamp => {
                if (!allParks[stamp.park]) {
                    allParks[stamp.park] = {
                        stampAppearances: [],
                        hasIndividualSticker: false,
                        stickerType: null
                    };
                }
                allParks[stamp.park].stampAppearances.push({
                    year: yearData.year,
                    region: stamp.region
                });
            });
        });

        // Add individual sticker info
        Object.keys(allParks).forEach(parkName => {
            const stickerData = getStickerData(parkName);
            if (stickerData?.hasIndividualSticker) {
                allParks[parkName].hasIndividualSticker = true;
                allParks[parkName].stickerType = stickerData.stickerType;
            }
        });

        const sortedParks = Object.entries(allParks).sort((a, b) => 
            a[0].localeCompare(b[0])
        );

        const grid = document.createElement('div');
        grid.className = 'alphabetical-grid';

        sortedParks.forEach(([park, data]) => {
            const item = document.createElement('div');
            item.className = 'park-item';
            
            const years = data.stampAppearances.map(a => a.year).sort((a, b) => b - a).join(', ');
            
            let stickerInfo = '';
            if (data.hasIndividualSticker) {
                const stickerTypes = [];
                if (data.stickerType === 'both') {
                    stickerTypes.push('Regular', 'Jr. Ranger');
                } else if (data.stickerType === 'junior-ranger') {
                    stickerTypes.push('Jr. Ranger');
                } else {
                    stickerTypes.push('Individual');
                }
                stickerInfo = `<div class="park-stickers">Individual: ${stickerTypes.join(', ')}</div>`;
            }
            
            item.innerHTML = `
                <div class="park-name">${park}</div>
                <div class="park-years">Stamp Sets: ${years}</div>
                ${stickerInfo}
            `;

            item.addEventListener('click', () => {
                this.navigateTo(`park/${encodeURIComponent(park)}`);
            });

            grid.appendChild(item);
        });

        container.appendChild(grid);
    }

    renderRegionView(container) {
        const regions = [
            "National", "North Atlantic", "Mid-Atlantic", "National Capital",
            "Southeast", "Midwest", "Southwest", "Rocky Mountain", 
            "Western", "Pacific Northwest & Alaska"
        ];

        regions.forEach(region => {
            const regionSection = document.createElement('div');
            regionSection.className = 'region-section';

            const parks = [];
            this.data.forEach(yearData => {
                yearData.stamps.forEach(stamp => {
                    if (stamp.region === region) {
                        parks.push({
                            park: stamp.park,
                            year: yearData.year,
                            region: stamp.region
                        });
                    }
                });
            });

            if (parks.length > 0) {
                // Sort parks by year (newest first)
                parks.sort((a, b) => b.year - a.year);
                
                regionSection.innerHTML = `
                    <h3 class="region-title" data-route="region/${encodeURIComponent(region)}">${region}</h3>
                    <div class="region-parks-grid">
                        ${parks.map(p => {
                            // Check for individual sticker availability
                            const stickerData = getStickerData(p.park);
                            let stickerInfo = '';
                            if (stickerData?.hasIndividualSticker) {
                                const stickerTypes = [];
                                if (stickerData.stickerType === 'both') {
                                    stickerTypes.push('Regular', 'Jr. Ranger');
                                } else if (stickerData.stickerType === 'junior-ranger') {
                                    stickerTypes.push('Jr. Ranger');
                                } else {
                                    stickerTypes.push('Individual');
                                }
                                stickerInfo = `<div class="region-park-stickers">Individual: ${stickerTypes.join(', ')}</div>`;
                            }
                            
                            return `
                                <div class="region-park-item" data-route="park/${encodeURIComponent(p.park)}">
                                    <img src="${window.getStampImage(p.park, p.year, p.region)}" 
                                         alt="${p.park}" 
                                         class="region-park-image"
                                         loading="lazy">
                                    <div class="region-park-info">
                                        <div class="region-park-name">${p.park}</div>
                                        <div class="region-park-year">${p.year}</div>
                                        ${stickerInfo}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
                container.appendChild(regionSection);
            }
        });
    }

    renderIndividualStickersView(container) {
        if (!window.parkStickerMapping) {
            container.innerHTML = '<p>Individual stickers data not available.</p>';
            return;
        }

        const individualStickers = [];
        Object.entries(window.parkStickerMapping).forEach(([parkName, stickerData]) => {
            if (stickerData.hasIndividualSticker) {
                if (stickerData.stickerType === 'both') {
                    // Only add the regular sticker, not the junior ranger
                    individualStickers.push({
                        park: parkName,
                        type: 'regular',
                        filename: stickerData.imageFilename,
                        purchaseUrl: stickerData.purchaseUrl,
                        description: stickerData.description
                    });
                } else if (stickerData.stickerType === 'regular') {
                    // Only add regular stickers, skip junior-ranger only parks
                    individualStickers.push({
                        park: parkName,
                        type: stickerData.stickerType,
                        filename: stickerData.imageFilename,
                        purchaseUrl: stickerData.purchaseUrl,
                        description: stickerData.description
                    });
                }
                // Skip junior-ranger only stickers - they go in the Junior Ranger tab
            }
        });

        // Sort by park name
        individualStickers.sort((a, b) => a.park.localeCompare(b.park));

        const grid = document.createElement('div');
        grid.className = 'individual-stickers-browse-grid';

        individualStickers.forEach(sticker => {
            const item = document.createElement('div');
            item.className = 'individual-sticker-browse-item';
            
            item.innerHTML = `
                <div class="sticker-browse-image">
                    <img src="images/individual-stickers/${sticker.filename}" 
                         alt="${sticker.park} ${sticker.type === 'junior-ranger' ? 'Junior Ranger' : 'Regular'} Sticker" 
                         loading="lazy"
                         onerror="this.style.display='none'; this.parentElement.querySelector('.sticker-placeholder').style.display='flex';">
                    <div class="sticker-placeholder" style="display: none;">
                        <div class="placeholder-icon">${sticker.type === 'junior-ranger' ? '🎨' : '🎫'}</div>
                        <p>${sticker.type === 'junior-ranger' ? 'Jr. Ranger' : 'Regular'}</p>
                    </div>
                </div>
                <div class="sticker-browse-info">
                    <h4>${sticker.park}</h4>
                    <p class="sticker-browse-type">${sticker.type === 'junior-ranger' ? 'Junior Ranger' : 'Regular'}</p>
                    <a href="${sticker.purchaseUrl}" target="_blank" rel="noopener" class="stamp-link" onclick="event.stopPropagation()">Buy Sticker</a>
                </div>
            `;

            item.addEventListener('click', (e) => {
                if (!e.target.closest('a') && !e.target.closest('.sticker-browse-image img')) {
                    // Try to find the park in stamp data - handle name mismatches
                    let parkFound = false;
                    outerLoop: for (const yearData of this.data) {
                        for (const stamp of yearData.stamps) {
                            if (stamp.park === sticker.park || normalizeParkName(stamp.park) === sticker.park) {
                                this.navigateTo(`park/${encodeURIComponent(stamp.park)}`);
                                parkFound = true;
                                break outerLoop;
                            }
                        }
                    }
                    
                    // If not found in stamp data, navigate with the sticker park name
                    if (!parkFound) {
                        this.navigateTo(`park/${encodeURIComponent(sticker.park)}`);
                    }
                }
            });

            grid.appendChild(item);
        });

        container.appendChild(grid);
    }

    renderJuniorRangerView(container) {
        if (!window.parkStickerMapping) {
            container.innerHTML = '<p>Individual stickers data not available.</p>';
            return;
        }

        const juniorRangerStickers = [];
        Object.entries(window.parkStickerMapping).forEach(([parkName, stickerData]) => {
            if (stickerData.hasIndividualSticker && (stickerData.stickerType === 'junior-ranger' || stickerData.stickerType === 'both')) {
                const filename = stickerData.stickerType === 'both' ? stickerData.imageFilenameJuniorRanger : stickerData.imageFilename;
                const purchaseUrl = stickerData.stickerType === 'both' ? stickerData.purchaseUrlJuniorRanger : stickerData.purchaseUrl;
                const description = stickerData.stickerType === 'both' ? stickerData.descriptionJuniorRanger : stickerData.description;
                
                juniorRangerStickers.push({
                    park: parkName,
                    filename: filename,
                    purchaseUrl: purchaseUrl,
                    description: description
                });
            }
        });

        // Sort by park name
        juniorRangerStickers.sort((a, b) => a.park.localeCompare(b.park));

        const grid = document.createElement('div');
        grid.className = 'individual-stickers-browse-grid';

        juniorRangerStickers.forEach(sticker => {
            const item = document.createElement('div');
            item.className = 'individual-sticker-browse-item';
            
            item.innerHTML = `
                <div class="sticker-browse-image">
                    <img src="images/individual-stickers/${sticker.filename}" 
                         alt="${sticker.park} Junior Ranger Sticker" 
                         loading="lazy"
                         onerror="this.style.display='none'; this.parentElement.querySelector('.sticker-placeholder').style.display='flex';">
                    <div class="sticker-placeholder" style="display: none;">
                        <div class="placeholder-icon">🎨</div>
                        <p>Jr. Ranger</p>
                    </div>
                </div>
                <div class="sticker-browse-info">
                    <h4>${sticker.park}</h4>
                    <p class="sticker-browse-type">Junior Ranger</p>
                    <a href="${sticker.purchaseUrl}" target="_blank" rel="noopener" class="stamp-link" onclick="event.stopPropagation()">Buy Jr. Ranger</a>
                </div>
            `;

            item.addEventListener('click', (e) => {
                if (!e.target.closest('a') && !e.target.closest('.sticker-browse-image img')) {
                    // Try to find the park in stamp data - handle name mismatches
                    let parkFound = false;
                    outerLoop: for (const yearData of this.data) {
                        for (const stamp of yearData.stamps) {
                            if (stamp.park === sticker.park || normalizeParkName(stamp.park) === sticker.park) {
                                this.navigateTo(`park/${encodeURIComponent(stamp.park)}`);
                                parkFound = true;
                                break outerLoop;
                            }
                        }
                    }
                    
                    // If not found in stamp data, navigate with the sticker park name
                    if (!parkFound) {
                        this.navigateTo(`park/${encodeURIComponent(sticker.park)}`);
                    }
                }
            });

            grid.appendChild(item);
        });

        container.appendChild(grid);
    }

}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const parkFinder = new ParkPassportFinder();
    window.parkFinder = parkFinder;
});

// Image Zoom Modal Logic with Robust Debugging
(function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    let lastFocusedElement = null;

    // Open modal with given image src
    function openModal(imgSrc, altText) {
        console.log('[DEBUG] openModal called with src:', imgSrc, 'alt:', altText);
        lastFocusedElement = document.activeElement;
        modalImg.src = imgSrc;
        modalImg.alt = altText || 'Zoomed Stamp Set';
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        console.log('[DEBUG] closeModal called');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    // Click close button
    closeBtn.addEventListener('click', function() {
        console.log('[DEBUG] Close button clicked');
        closeModal();
    });

    // Click outside modal content closes
    modal.addEventListener('mousedown', function(e) {
        if (e.target === modal) {
            console.log('[DEBUG] Clicked outside modal content');
            closeModal();
        }
    });

    // ESC key closes
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
            console.log('[DEBUG] ESC key pressed');
            closeModal();
        }
        // Trap focus in modal
        if (modal.style.display === 'flex' && e.key === 'Tab') {
            const focusable = [closeBtn, modalImg];
            const idx = focusable.indexOf(document.activeElement);
            if (e.shiftKey) {
                if (idx === 0) {
                    e.preventDefault();
                    focusable[focusable.length - 1].focus();
                }
            } else {
                if (idx === focusable.length - 1) {
                    e.preventDefault();
                    focusable[0].focus();
                }
            }
        }
    });

    // Helper to remove all click listeners from images
    function removeAllImageListeners(selector) {
        document.querySelectorAll(selector).forEach(img => {
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);
        });
    }

    // Attach click listeners to images after each render
    function attachZoomListeners() {
        // Remove previous listeners to avoid duplicates
        removeAllImageListeners('.stamp-set-image-large img');
        removeAllImageListeners('.appearance-image img');
        removeAllImageListeners('.timeline-image-container img');
        removeAllImageListeners('.sticker-browse-image img');
        removeAllImageListeners('.sticker-image');
        
        // Year detail view
        document.querySelectorAll('.stamp-set-image-large img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('[DEBUG] Year detail image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        // Park detail view
        document.querySelectorAll('.appearance-image img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('[DEBUG] Park detail image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        // Timeline view
        document.querySelectorAll('.timeline-image-container img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('[DEBUG] Timeline image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        // Individual stickers browse view
        document.querySelectorAll('.sticker-browse-image img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('[DEBUG] Individual sticker image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        // Park detail individual stickers
        document.querySelectorAll('.sticker-image').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('[DEBUG] Park detail sticker image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        console.log('[DEBUG] attachZoomListeners called');
    }

    // Patch render methods to re-attach listeners
    const origShowYearDetail = ParkPassportFinder.prototype.showYearDetail;
    ParkPassportFinder.prototype.showYearDetail = function(year) {
        origShowYearDetail.call(this, year);
        setTimeout(attachZoomListeners, 0);
    };
    const origShowParkDetail = ParkPassportFinder.prototype.showParkDetail;
    ParkPassportFinder.prototype.showParkDetail = function(parkName) {
        origShowParkDetail.call(this, parkName);
        setTimeout(attachZoomListeners, 0);
    };
    const origShowRegionDetail = ParkPassportFinder.prototype.showRegionDetail;
    ParkPassportFinder.prototype.showRegionDetail = function(regionName) {
        origShowRegionDetail.call(this, regionName);
        setTimeout(attachZoomListeners, 0);
    };
    const origShowSeriesOverview = ParkPassportFinder.prototype.showSeriesOverview;
    ParkPassportFinder.prototype.showSeriesOverview = function() {
        origShowSeriesOverview.call(this);
        setTimeout(attachZoomListeners, 0);
    };
    const origShowBrowseView = ParkPassportFinder.prototype.showBrowseView;
    ParkPassportFinder.prototype.showBrowseView = function(view) {
        origShowBrowseView.call(this, view);
        setTimeout(attachZoomListeners, 0);
    };
    // Also attach on DOMContentLoaded for initial view
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(attachZoomListeners, 0);
    });
})();

function showBrowseSection(show) {
    const browseSection = document.getElementById('browseSection');
    if (browseSection) browseSection.style.display = show ? '' : 'none';
} 
