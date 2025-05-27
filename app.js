console.log('[DEBUG] app.js loaded');
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
                this.showSeriesOverview();
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
                if (stamp.park === parkName) {
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
        
        const container = document.getElementById('detailContent');
        const appearanceCards = parkAppearances.map(appearance => {
            const otherStamps = appearance.yearData.stamps.filter(s => s.park !== parkName);
            return `
                <div class="appearance-card">
                    <div class="appearance-header">
                        <h3 data-route="year/${appearance.year}" class="clickable-year">${appearance.year}</h3>
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
            </div>
            <div class="park-detail-content">
                <div class="park-overview">
                    <p class="appearance-count">Featured in ${parkAppearances.length} stamp set${parkAppearances.length > 1 ? 's' : ''}</p>
                    <h2>Appearances by Year</h2>
                    <div class="park-appearances-grid">
                        ${appearanceCards}
                    </div>
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
                e.preventDefault();
                e.stopPropagation();
                const route = routeElement.getAttribute('data-route');
                if (route) {
                    this.navigateTo(route);
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
            return;
        }

        const searchResults = this.searchParks(query);
        this.displaySuggestions(searchResults, query);
        this.displayResults(searchResults);
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

        this.displayResults(results);
    }

    clearFilters() {
        document.getElementById('yearFilter').value = '';
        document.getElementById('regionFilter').value = '';
        document.getElementById('searchInput').value = '';
        this.clearResults();
        this.updateResultsCount();
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
                    allParks[stamp.park] = [];
                }
                allParks[stamp.park].push({
                    year: yearData.year,
                    region: stamp.region
                });
            });
        });

        const sortedParks = Object.entries(allParks).sort((a, b) => 
            a[0].localeCompare(b[0])
        );

        const grid = document.createElement('div');
        grid.className = 'alphabetical-grid';

        sortedParks.forEach(([park, appearances]) => {
            const item = document.createElement('div');
            item.className = 'park-item';
            
            const years = appearances.map(a => a.year).sort((a, b) => b - a).join(', ');
            
            item.innerHTML = `
                <div class="park-name">${park}</div>
                <div class="park-years">Years: ${years}</div>
            `;

            item.addEventListener('click', () => {
                document.getElementById('searchInput').value = park;
                this.handleSearch(park);
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        ${parks.map(p => `
                            <div class="region-park-item" data-route="park/${encodeURIComponent(p.park)}">
                                <img src="${window.getStampImage(p.park, p.year, p.region)}" 
                                     alt="${p.park}" 
                                     class="region-park-image"
                                     loading="lazy">
                                <div class="region-park-info">
                                    <div class="region-park-name">${p.park}</div>
                                    <div class="region-park-year">${p.year}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(regionSection);
            }
        });
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
        // Year detail view
        document.querySelectorAll('.stamp-set-image-large img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                console.log('[DEBUG] Year detail image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        // Park detail view
        document.querySelectorAll('.appearance-image img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                console.log('[DEBUG] Park detail image clicked:', img.src);
                openModal(img.src, img.alt);
            });
        });
        // Timeline view
        document.querySelectorAll('.timeline-image-container img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                console.log('[DEBUG] Timeline image clicked:', img.src);
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
