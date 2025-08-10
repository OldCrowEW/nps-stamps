// National Park Location Data
// Coordinates sourced from National Park Service official data
window.parkLocations = {
  // National Parks
  "Yellowstone NP": { lat: 44.4280, lng: -110.5885, state: "WY", type: "National Park" },
  "Grand Canyon NP": { lat: 36.1069, lng: -112.1129, state: "AZ", type: "National Park" },
  "Yosemite NP": { lat: 37.8651, lng: -119.5383, state: "CA", type: "National Park" },
  "Great Smoky Mountains NP": { lat: 35.6118, lng: -83.4895, state: "TN", type: "National Park" },
  "Zion NP": { lat: 37.2982, lng: -113.0263, state: "UT", type: "National Park" },
  "Rocky Mountain NP": { lat: 40.3428, lng: -105.6836, state: "CO", type: "National Park" },
  "Acadia NP": { lat: 44.3386, lng: -68.2733, state: "ME", type: "National Park" },
  "Grand Teton NP": { lat: 43.7904, lng: -110.6818, state: "WY", type: "National Park" },
  "Olympic NP": { lat: 47.8021, lng: -123.6044, state: "WA", type: "National Park" },
  "Glacier NP": { lat: 48.7596, lng: -113.7870, state: "MT", type: "National Park" },
  "Joshua Tree NP": { lat: 33.8734, lng: -115.9010, state: "CA", type: "National Park" },
  "Bryce Canyon NP": { lat: 37.5930, lng: -112.1871, state: "UT", type: "National Park" },
  "Arches NP": { lat: 38.7331, lng: -109.5925, state: "UT", type: "National Park" },
  "Canyonlands NP": { lat: 38.2619, lng: -109.8781, state: "UT", type: "National Park" },
  "Sequoia NP": { lat: 36.4864, lng: -118.5658, state: "CA", type: "National Park" },
  "Kings Canyon NP": { lat: 36.8879, lng: -118.5551, state: "CA", type: "National Park" },
  "Death Valley NP": { lat: 36.5054, lng: -117.0794, state: "CA", type: "National Park" },
  "Capitol Reef NP": { lat: 38.2972, lng: -111.2615, state: "UT", type: "National Park" },
  "Badlands NP": { lat: 43.8554, lng: -101.9777, state: "SD", type: "National Park" },
  "Theodore Roosevelt NP": { lat: 47.1751, lng: -103.4544, state: "ND", type: "National Park" },
  "Wind Cave NP": { lat: 43.5578, lng: -103.4464, state: "SD", type: "National Park" },
  "Mammoth Cave NP": { lat: 37.1862, lng: -86.1004, state: "KY", type: "National Park" },
  "Hot Springs NP": { lat: 34.5117, lng: -93.0429, state: "AR", type: "National Park" },
  "Everglades NP": { lat: 25.2866, lng: -80.8987, state: "FL", type: "National Park" },
  "Biscayne NP": { lat: 25.4823, lng: -80.2077, state: "FL", type: "National Park" },
  "Dry Tortugas NP": { lat: 24.6285, lng: -82.8732, state: "FL", type: "National Park" },
  "Congaree NP": { lat: 33.7948, lng: -80.7821, state: "SC", type: "National Park" },
  "Shenandoah NP": { lat: 38.4527, lng: -78.3498, state: "VA", type: "National Park" },
  "New River Gorge NP & Preserve": { lat: 37.9393, lng: -81.0675, state: "WV", type: "National Park" },
  "Indiana Dunes NP": { lat: 41.6533, lng: -87.0920, state: "IN", type: "National Park" },
  "Cuyahoga Valley NP": { lat: 41.2808, lng: -81.5678, state: "OH", type: "National Park" },
  "Isle Royale NP": { lat: 48.0063, lng: -88.5542, state: "MI", type: "National Park" },
  "Voyageurs NP": { lat: 48.4839, lng: -92.8386, state: "MN", type: "National Park" },
  "Crater Lake NP": { lat: 42.8684, lng: -122.1685, state: "OR", type: "National Park" },
  "Mount Rainier NP": { lat: 46.8523, lng: -121.7603, state: "WA", type: "National Park" },
  "North Cascades NP": { lat: 48.7718, lng: -121.2985, state: "WA", type: "National Park" },
  "Redwood NP": { lat: 41.2133, lng: -124.0046, state: "CA", type: "National Park" },
  "Lassen Volcanic NP": { lat: 40.4977, lng: -121.4207, state: "CA", type: "National Park" },
  "Channel Islands NP": { lat: 34.0132, lng: -119.4179, state: "CA", type: "National Park" },
  "Pinnacles NP": { lat: 36.4906, lng: -121.1825, state: "CA", type: "National Park" },
  "Great Basin NP": { lat: 39.0057, lng: -114.2579, state: "NV", type: "National Park" },
  "Black Canyon of the Gunnison NP": { lat: 38.5753, lng: -107.7416, state: "CO", type: "National Park" },
  "Great Sand Dunes NP & Preserve": { lat: 37.7916, lng: -105.5943, state: "CO", type: "National Park" },
  "Mesa Verde NP": { lat: 37.2308, lng: -108.4618, state: "CO", type: "National Park" },
  "Petrified Forest NP": { lat: 34.9099, lng: -109.8068, state: "AZ", type: "National Park" },
  "Saguaro NP": { lat: 32.2967, lng: -110.7574, state: "AZ", type: "National Park" },
  "Carlsbad Caverns NP": { lat: 32.1479, lng: -104.5567, state: "NM", type: "National Park" },
  "Guadalupe Mountains NP": { lat: 31.8430, lng: -104.8607, state: "TX", type: "National Park" },
  "Big Bend NP": { lat: 29.1275, lng: -103.2428, state: "TX", type: "National Park" },
  
  // Alaska National Parks
  "Denali NP & Preserve": { lat: 63.1148, lng: -151.1926, state: "AK", type: "National Park" },
  "Glacier Bay NP & Preserve": { lat: 58.5395, lng: -137.0209, state: "AK", type: "National Park" },
  "Katmai NP & Preserve": { lat: 58.5987, lng: -155.0551, state: "AK", type: "National Park" },
  "Kenai Fjords NP": { lat: 59.8183, lng: -149.6506, state: "AK", type: "National Park" },
  "Kobuk Valley NP": { lat: 67.3552, lng: -159.2086, state: "AK", type: "National Park" },
  "Lake Clark NP & Preserve": { lat: 60.4127, lng: -154.3314, state: "AK", type: "National Park" },
  "Wrangell-St. Elias NP & Preserve": { lat: 61.7101, lng: -142.9856, state: "AK", type: "National Park" },
  "Gates of the Arctic NP & Preserve": { lat: 67.7880, lng: -153.2949, state: "AK", type: "National Park" },
  
  // Hawaii National Parks
  "Haleakalā NP": { lat: 20.7201, lng: -156.2539, state: "HI", type: "National Park" },
  "Hawaiʻi Volcanoes NP": { lat: 19.4194, lng: -155.2885, state: "HI", type: "National Park" },
  
  // US Territories
  "Virgin Islands NP": { lat: 18.3424, lng: -64.7296, state: "VI", type: "National Park" },
  "American Samoa NP": { lat: -14.2581, lng: -170.6840, state: "AS", type: "National Park" },
  
  // Major National Historical Parks & Sites
  "Independence NHP": { lat: 39.9496, lng: -75.1503, state: "PA", type: "National Historical Park" },
  "Colonial NHP": { lat: 37.2273, lng: -76.6151, state: "VA", type: "National Historical Park" },
  "Boston NHP": { lat: 42.3584, lng: -71.0598, state: "MA", type: "National Historical Park" },
  "Statue of Liberty NM": { lat: 40.6892, lng: -74.0445, state: "NY", type: "National Monument" },
  "Ellis Island": { lat: 40.6996, lng: -74.0394, state: "NY", type: "National Monument" },
  "Alcatraz Island": { lat: 37.8270, lng: -122.4230, state: "CA", type: "National Historical Park" },
  "Pearl Harbor NHS": { lat: 21.3099, lng: -157.9219, state: "HI", type: "National Historical Site" },
  "Mount Rushmore NM": { lat: 43.8791, lng: -103.4591, state: "SD", type: "National Memorial" },
  "Gateway Arch NP": { lat: 38.6247, lng: -90.1848, state: "MO", type: "National Park" },
  "Lincoln Memorial": { lat: 38.8893, lng: -77.0502, state: "DC", type: "National Memorial" },
  "Washington Monument": { lat: 38.8895, lng: -77.0353, state: "DC", type: "National Monument" },
  "Jefferson Memorial": { lat: 38.8814, lng: -77.0365, state: "DC", type: "National Memorial" },
  
  // National Seashores & Lakeshores
  "Cape Hatteras NS": { lat: 35.2582, lng: -75.5951, state: "NC", type: "National Seashore" },
  "Cape Cod NS": { lat: 42.0499, lng: -70.0754, state: "MA", type: "National Seashore" },
  "Fire Island NS": { lat: 40.7305, lng: -73.1370, state: "NY", type: "National Seashore" },
  "Assateague Island NS": { lat: 38.0331, lng: -75.1503, state: "MD", type: "National Seashore" },
  "Padre Island NS": { lat: 27.0439, lng: -97.3831, state: "TX", type: "National Seashore" },
  "Gulf Islands NS": { lat: 30.2926, lng: -87.0642, state: "FL", type: "National Seashore" },
  "Canaveral NS": { lat: 28.7544, lng: -80.7540, state: "FL", type: "National Seashore" },
  "Cumberland Island NS": { lat: 30.8574, lng: -81.4582, state: "GA", type: "National Seashore" },
  "Point Reyes NS": { lat: 38.0398, lng: -122.8682, state: "CA", type: "National Seashore" },
  "Golden Gate NRA": { lat: 37.8199, lng: -122.4783, state: "CA", type: "National Recreation Area" },
  "Pictured Rocks NL": { lat: 46.5197, lng: -86.3174, state: "MI", type: "National Lakeshore" },
  "Sleeping Bear Dunes NL": { lat: 44.8654, lng: -86.0687, state: "MI", type: "National Lakeshore" },
  "Apostle Islands NL": { lat: 46.7622, lng: -90.6538, state: "WI", type: "National Lakeshore" },
  "Indiana Dunes NL": { lat: 41.6533, lng: -87.0920, state: "IN", type: "National Lakeshore" }
};

// Helper function to get park location
window.getParkLocation = function(parkName) {
  // Try exact match first
  if (window.parkLocations[parkName]) {
    return window.parkLocations[parkName];
  }
  
  // Try partial match for parks with different naming conventions
  const normalizedName = parkName.toLowerCase();
  for (const [key, location] of Object.entries(window.parkLocations)) {
    if (key.toLowerCase().includes(normalizedName) || 
        normalizedName.includes(key.toLowerCase())) {
      return location;
    }
  }
  
  return null;
};

// Calculate distance between two points using Haversine formula
window.calculateDistance = function(lat1, lng1, lat2, lng2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in miles
};