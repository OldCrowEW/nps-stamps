// National Park Passport Stamp Data
const stampData = [
    // 2025
    {
        year: 2025,
        stamps: [
            { park: "Mount Rushmore National Memorial", region: "National" },
            { park: "African Burial Ground National Monument", region: "North Atlantic" },
            { park: "Friendship Hill National Historic Site", region: "Mid-Atlantic" },
            { park: "Old Stone House", region: "National Capital" },
            { park: "Christiansted National Historic Site", region: "Southeast" },
            { park: "Brown v. Board of Education National Historical Park", region: "Midwest" },
            { park: "Alibates Flint Quarries National Monument", region: "Southwest" },
            { park: "Golden Spike National Historical Park", region: "Rocky Mountain" },
            { park: "John Muir National Historic Site", region: "Western" },
            { park: "John Day Fossil Beds National Monument", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2024
    {
        year: 2024,
        stamps: [
            { park: "Boston National Historical Park", region: "National" },
            { park: "Ellis Island", region: "North Atlantic" },
            { park: "Harriet Tubman Underground Railroad National Historical Park", region: "Mid-Atlantic" },
            { park: "World War II Memorial", region: "National Capital" },
            { park: "Tuskegee Airmen National Historic Site", region: "Southeast" },
            { park: "Ulysses S. Grant National Historic Site", region: "Midwest" },
            { park: "Rio Grande Wild & Scenic River", region: "Southwest" },
            { park: "Grand Teton National Park", region: "Rocky Mountain" },
            { park: "Wupatki National Monument", region: "Western" },
            { park: "Craters of the Moon National Monument & Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2023
    {
        year: 2023,
        stamps: [
            { park: "Manhattan Project National Historical Park", region: "National" },
            { park: "Minute Man National Historical Park", region: "North Atlantic" },
            { park: "First State National Historical Park", region: "Mid-Atlantic" },
            { park: "Mary McLeod Bethune Council House National Historic Site", region: "National Capital" },
            { park: "Kennesaw Mountain National Battlefield Park", region: "Southeast" },
            { park: "Charles Young Buffalo Soldiers National Monument", region: "Midwest" },
            { park: "President William Jefferson Clinton Birthplace Home National Historic Site", region: "Southwest" },
            { park: "Bryce Canyon National Park", region: "Rocky Mountain" },
            { park: "Pipe Spring National Monument", region: "Western" },
            { park: "Olympic National Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2022
    {
        year: 2022,
        stamps: [
            { park: "Lake Mead National Recreation Area", region: "National" },
            { park: "Governors Island National Monument", region: "North Atlantic" },
            { park: "Thaddeus Kosciuszko National Memorial", region: "Mid-Atlantic" },
            { park: "Carter G. Woodson Home National Historic Site", region: "National Capital" },
            { park: "Cape Lookout National Seashore", region: "Southeast" },
            { park: "Pullman National Monument", region: "Midwest" },
            { park: "Chickasaw National Recreation Area", region: "Southwest" },
            { park: "Yellowstone National Park", region: "Rocky Mountain" },
            { park: "Great Basin National Park", region: "Western" },
            { park: "Cape Krusenstern National Monument", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2021
    {
        year: 2021,
        stamps: [
            { park: "Golden Gate National Recreation Area", region: "National" },
            { park: "Castle Clinton National Monument", region: "North Atlantic" },
            { park: "Flight 93 National Memorial", region: "Mid-Atlantic" },
            { park: "Dwight D. Eisenhower Memorial", region: "National Capital" },
            { park: "Virgin Islands Coral Reef National Monument", region: "Southeast" },
            { park: "Nicodemus National Historic Site", region: "Midwest" },
            { park: "Chamizal National Memorial", region: "Southwest" },
            { park: "Timpanogos Cave National Monument", region: "Rocky Mountain" },
            { park: "Pu'ukohola Heiau National Historic Site", region: "Western" },
            { park: "Kobuk Valley National Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2020
    {
        year: 2020,
        stamps: [
            { park: "Women's Rights National Historical Park", region: "National" },
            { park: "Stonewall National Monument", region: "North Atlantic" },
            { park: "Maggie L. Walker National Historic Site", region: "Mid-Atlantic" },
            { park: "Potomac Heritage National Scenic Trail", region: "National Capital" },
            { park: "Jimmy Carter National Historic Site", region: "Southeast" },
            { park: "First Ladies National Historic Site", region: "Midwest" },
            { park: "Waco Mammoth National Monument", region: "Southwest" },
            { park: "Knife River Indian Villages National Historic Site", region: "Rocky Mountain" },
            { park: "Rosie the Riveter World War II Home Front National Historical Park", region: "Western" },
            { park: "Alagnak Wild River", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2019
    {
        year: 2019,
        stamps: [
            { park: "Grand Canyon National Park", region: "National" },
            { park: "Home of Franklin D. Roosevelt National Historic Site", region: "North Atlantic" },
            { park: "Fort Monroe National Monument", region: "Mid-Atlantic" },
            { park: "President's Park", region: "National Capital" },
            { park: "Cape Hatteras National Seashore", region: "Southeast" },
            { park: "William Howard Taft National Historic Site", region: "Midwest" },
            { park: "New Orleans Jazz National Historical Park", region: "Southwest" },
            { park: "Yucca House National Monument", region: "Rocky Mountain" },
            { park: "San Francisco Maritime National Historical Park", region: "Western" },
            { park: "Hagerman Fossil Beds National Monument", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2018
    {
        year: 2018,
        stamps: [
            { park: "Appalachian National Scenic Trail", region: "National" },
            { park: "Eleanor Roosevelt National Historic Site", region: "North Atlantic" },
            { park: "Steamtown National Historic Site", region: "Mid-Atlantic" },
            { park: "Vietnam Women's Memorial", region: "National Capital" },
            { park: "Biscayne National Park", region: "Southeast" },
            { park: "James A. Garfield National Historic Site", region: "Midwest" },
            { park: "Valles Caldera National Preserve", region: "Southwest" },
            { park: "Minuteman Missile National Historic Site", region: "Rocky Mountain" },
            { park: "Hubbell Trading Post National Historic Site", region: "Western" },
            { park: "Minidoka National Historic Site", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2017
    {
        year: 2017,
        stamps: [
            { park: "Denali National Park and Preserve", region: "National" },
            { park: "John Fitzgerald Kennedy National Historic Site", region: "North Atlantic" },
            { park: "Eisenhower National Historic Site", region: "Mid-Atlantic" },
            { park: "Belmont-Paul Women's Equality National Monument", region: "National Capital" },
            { park: "Guilford Courthouse National Military Park", region: "Southeast" },
            { park: "George Washington Carver National Monument", region: "Midwest" },
            { park: "Palo Alto Battlefield National Historical Park", region: "Southwest" },
            { park: "Sand Creek Massacre National Historic Site", region: "Rocky Mountain" },
            { park: "Casa Grande Ruins National Monument", region: "Western" },
            { park: "Yukon-Charley Rivers National Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2016
    {
        year: 2016,
        stamps: [
            { park: "National Park Service Turns 100", region: "National" },
            { park: "Acadia National Park", region: "North Atlantic" },
            { park: "Wolf Trap National Park for the Performing Arts", region: "Mid-Atlantic" },
            { park: "John Paul Jones Memorial", region: "National Capital" },
            { park: "Abraham Lincoln Birthplace National Historical Park", region: "Southeast" },
            { park: "George Rogers Clark National Historical Park", region: "Midwest" },
            { park: "Capulin Volcano National Monument", region: "Southwest" },
            { park: "Fort Union Trading Post National Historic Site", region: "Rocky Mountain" },
            { park: "Hawaii Volcanoes National Park", region: "Western" },
            { park: "San Juan Island National Historical Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2015
    {
        year: 2015,
        stamps: [
            { park: "Appomattox Court House National Historical Park", region: "National" },
            { park: "Boston Harbor Islands National Recreation Area", region: "North Atlantic" },
            { park: "Monocacy National Battlefield", region: "Mid-Atlantic" },
            { park: "Ford's Theatre National Historic Site", region: "National Capital" },
            { park: "Ocmulgee National Monument", region: "Southeast" },
            { park: "Missouri National Recreational River", region: "Midwest" },
            { park: "Lake Meredith National Recreation Area", region: "Southwest" },
            { park: "Fossil Butte National Monument", region: "Rocky Mountain" },
            { park: "Walnut Canyon National Monument", region: "Western" },
            { park: "Nez Perce National Historical Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2014
    {
        year: 2014,
        stamps: [
            { park: "Fort McHenry National Monument and Historic Shrine", region: "National" },
            { park: "Marsh-Billings-Rockefeller National Historical Park", region: "North Atlantic" },
            { park: "Johnstown Flood National Memorial", region: "Mid-Atlantic" },
            { park: "Lyndon Baines Johnson Memorial Grove on the Potomac", region: "National Capital" },
            { park: "Horseshoe Bend National Military Park", region: "Southeast" },
            { park: "Dayton Aviation Heritage National Historical Park", region: "Midwest" },
            { park: "Big Thicket National Preserve", region: "Southwest" },
            { park: "Bighorn Canyon National Recreation Area", region: "Rocky Mountain" },
            { park: "César E. Chávez National Monument", region: "Western" },
            { park: "Bering Land Bridge National Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2013
    {
        year: 2013,
        stamps: [
            { park: "Martin Luther King, Jr. Memorial", region: "National" },
            { park: "Longfellow House-Washington's Headquarters National Historic Site", region: "North Atlantic" },
            { park: "Paterson Great Falls National Historical Park", region: "Mid-Atlantic" },
            { park: "George Gordon Meade Memorial", region: "National Capital" },
            { park: "De Soto National Memorial", region: "Southeast" },
            { park: "River Raisin National Battlefield Park", region: "Midwest" },
            { park: "Little Rock Central High School National Historic Site", region: "Southwest" },
            { park: "John D. Rockefeller, Jr. Memorial Parkway", region: "Rocky Mountain" },
            { park: "Sunset Crater Volcano National Monument", region: "Western" },
            { park: "Lake Clark National Park and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2012
    {
        year: 2012,
        stamps: [
            { park: "Shiloh National Military Park", region: "National" },
            { park: "Hamilton Grange National Memorial", region: "North Atlantic" },
            { park: "Clara Barton National Historic Site", region: "Mid-Atlantic" },
            { park: "John Ericsson National Memorial", region: "National Capital" },
            { park: "Natchez National Historical Park", region: "Southeast" },
            { park: "Pipestone National Monument", region: "Midwest" },
            { park: "El Malpais National Monument", region: "Southwest" },
            { park: "Black Canyon of the Gunnison National Park", region: "Rocky Mountain" },
            { park: "Fort Bowie National Historic Site", region: "Western" },
            { park: "Noatak National Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2011
    {
        year: 2011,
        stamps: [
            { park: "Fort Sumter National Monument", region: "National" },
            { park: "Adams National Historic Park", region: "North Atlantic" },
            { park: "Prince William Forest Park", region: "Mid-Atlantic" },
            { park: "Ulysses S. Grant Memorial", region: "National Capital" },
            { park: "Fort Frederica National Monument", region: "Southeast" },
            { park: "Niobrara National Scenic River", region: "Midwest" },
            { park: "Fort Davis National Historic Site", region: "Southwest" },
            { park: "Theodore Roosevelt National Park", region: "Rocky Mountain" },
            { park: "Devils Postpile National Monument", region: "Western" },
            { park: "Ross Lake National Recreation Area", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2010
    {
        year: 2010,
        stamps: [
            { park: "Dinosaur National Monument", region: "National" },
            { park: "Fort Stanwix National Monument", region: "North Atlantic" },
            { park: "George Washington Birthplace National Monument", region: "Mid-Atlantic" },
            { park: "Piscataway Park", region: "National Capital" },
            { park: "Fort Matanzas National Monument", region: "Southeast" },
            { park: "Perry's Victory and International Peace Memorial", region: "Midwest" },
            { park: "Washita Battlefield National Historic Site", region: "Southwest" },
            { park: "Capitol Reef National Park", region: "Rocky Mountain" },
            { park: "Kings Canyon National Park", region: "Western" },
            { park: "Lewis and Clark National Historical Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2009
    {
        year: 2009,
        stamps: [
            { park: "Abraham Lincoln Birthplace National Historical Park", region: "National" },
            { park: "Gateway National Recreation Area", region: "North Atlantic" },
            { park: "Richmond National Battlefield Park", region: "Mid-Atlantic" },
            { park: "District of Columbia War Memorial", region: "National Capital" },
            { park: "Congaree National Park", region: "Southeast" },
            { park: "Lincoln Boyhood National Memorial", region: "Midwest" },
            { park: "Padre Island National Seashore", region: "Southwest" },
            { park: "Fort Laramie National Historic Site", region: "Rocky Mountain" },
            { park: "Haleakala National Park", region: "Western" },
            { park: "Oregon Caves National Monument", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2008
    {
        year: 2008,
        stamps: [
            { park: "Pinnacles National Park", region: "National" },
            { park: "Theodore Roosevelt Birthplace National Historic Site", region: "North Atlantic" },
            { park: "Chesapeake and Ohio Canal National Historical Park", region: "Mid-Atlantic" },
            { park: "Meridian Hill Park", region: "National Capital" },
            { park: "Andrew Johnson National Historic Site", region: "Southeast" },
            { park: "Ozark National Scenic Riverways", region: "Midwest" },
            { park: "Cane River Creole National Historical Park", region: "Southwest" },
            { park: "Jewel Cave National Monument", region: "Rocky Mountain" },
            { park: "Tumacacori National Historical Park", region: "Western" },
            { park: "Lake Chelan National Recreation Area", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2007
    {
        year: 2007,
        stamps: [
            { park: "Kalaupapa National Historical Park", region: "National" },
            { park: "Springfield Armory National Historic Site", region: "North Atlantic" },
            { park: "Catoctin Mountain Park", region: "Mid-Atlantic" },
            { park: "George Mason Memorial", region: "National Capital" },
            { park: "Fort Pulaski National Monument", region: "Southeast" },
            { park: "Homestead National Monument of America", region: "Midwest" },
            { park: "Amistad National Recreation Area", region: "Southwest" },
            { park: "Cedar Breaks National Monument", region: "Rocky Mountain" },
            { park: "Mojave National Preserve", region: "Western" },
            { park: "Ebey's Landing National Historical Reserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2006
    {
        year: 2006,
        stamps: [
            { park: "Petrified Forest National Park", region: "National" },
            { park: "New Bedford Whaling National Historical Park", region: "North Atlantic" },
            { park: "Booker T. Washington National Monument", region: "Mid-Atlantic" },
            { park: "West Potomac Park", region: "National Capital" },
            { park: "Obed Wild and Scenic River", region: "Southeast" },
            { park: "Tallgrass Prairie National Preserve", region: "Midwest" },
            { park: "Pea Ridge National Military Park", region: "Southwest" },
            { park: "Grant-Kohrs Ranch National Historic Site", region: "Rocky Mountain" },
            { park: "Tonto National Monument", region: "Western" },
            { park: "Gates of the Arctic National Park and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2005
    {
        year: 2005,
        stamps: [
            { park: "George Washington Memorial Parkway", region: "National" },
            { park: "Boston African American National Historic Site", region: "North Atlantic" },
            { park: "Antietam National Battlefield", region: "Mid-Atlantic" },
            { park: "World War II Memorial", region: "National Capital" },
            { park: "Cumberland Gap National Historical Park", region: "Southeast" },
            { park: "Wilson's Creek National Battlefield", region: "Midwest" },
            { park: "Aztec Ruins National Monument", region: "Southwest" },
            { park: "Bent's Old Fort National Historic Site", region: "Rocky Mountain" },
            { park: "Lassen Volcanic National Park", region: "Western" },
            { park: "Whitman Mission National Historic Site", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2004
    {
        year: 2004,
        stamps: [
            { park: "Navajo National Monument", region: "National" },
            { park: "Frederick Law Olmsted National Historic Site", region: "North Atlantic" },
            { park: "Fort Necessity National Battlefield", region: "Mid-Atlantic" },
            { park: "Pennsylvania Avenue National Historic Site", region: "National Capital" },
            { park: "Big South Fork National River and Recreation Area", region: "Southeast" },
            { park: "Fort Larned National Historic Site", region: "Midwest" },
            { park: "Fort Union National Monument", region: "Southwest" },
            { park: "Colorado National Monument", region: "Rocky Mountain" },
            { park: "Chiricahua National Monument", region: "Western" },
            { park: "Lake Roosevelt National Recreation Area", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2003
    {
        year: 2003,
        stamps: [
            { park: "Saguaro National Park", region: "National" },
            { park: "Vanderbilt Mansion National Historic Site", region: "North Atlantic" },
            { park: "Morristown National Historical Park", region: "Mid-Atlantic" },
            { park: "Mary McLeod Bethune Council House National Historic Site", region: "National Capital" },
            { park: "Fort Donelson National Battlefield", region: "Southeast" },
            { park: "Voyageurs National Park", region: "Midwest" },
            { park: "Gila Cliff Dwellings National Monument", region: "Southwest" },
            { park: "Wind Cave National Park", region: "Rocky Mountain" },
            { park: "Manzanar National Historic Site", region: "Western" },
            { park: "City of Rocks National Reserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2002
    {
        year: 2002,
        stamps: [
            { park: "Glen Canyon National Recreation Area", region: "National" },
            { park: "Saratoga National Historical Park", region: "North Atlantic" },
            { park: "Fredericksburg and Spotsylvania National Military Park", region: "Mid-Atlantic" },
            { park: "Theodore Roosevelt Island Park", region: "National Capital" },
            { park: "Stones River National Battlefield", region: "Southeast" },
            { park: "Grand Portage National Monument", region: "Midwest" },
            { park: "Buffalo National River", region: "Southwest" },
            { park: "Great Sand Dunes National Monument and Preserve", region: "Rocky Mountain" },
            { park: "Coronado National Memorial", region: "Western" },
            { park: "Aniakchak National Monument and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2001
    {
        year: 2001,
        stamps: [
            { park: "Independence National Historical Park - The Liberty Bell", region: "National" },
            { park: "Theodore Roosevelt Inaugural National Historic Site", region: "North Atlantic" },
            { park: "Petersburg National Battlefield", region: "Mid-Atlantic" },
            { park: "Kenilworth Park and Aquatic Gardens", region: "National Capital" },
            { park: "Moores Creek National Battlefield", region: "Southeast" },
            { park: "Isle Royale National Park", region: "Midwest" },
            { park: "Fort Smith National Historic Site", region: "Southwest" },
            { park: "Canyonlands National Park", region: "Rocky Mountain" },
            { park: "Montezuma Castle National Monument", region: "Western" },
            { park: "San Juan Island National Historical Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 2000
    {
        year: 2000,
        stamps: [
            { park: "Minute Man National Historical Park", region: "National" },
            { park: "Weir Farm National Historic Site", region: "North Atlantic" },
            { park: "Manassas National Battlefield Park", region: "Mid-Atlantic" },
            { park: "National Mall", region: "National Capital" },
            { park: "Canaveral National Seashore", region: "Southeast" },
            { park: "Cuyahoga Valley National Park", region: "Midwest" },
            { park: "Chaco Culture National Historical Park", region: "Southwest" },
            { park: "Curecanti National Recreation Area", region: "Rocky Mountain" },
            { park: "Channel Islands National Park", region: "Western" },
            { park: "Glacier Bay National Park and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1999
    {
        year: 1999,
        stamps: [
            { park: "Mount Rainier National Park", region: "National" },
            { park: "Fire Island National Seashore", region: "North Atlantic" },
            { park: "Harpers Ferry National Historical Park", region: "Mid-Atlantic" },
            { park: "Fort Washington Park", region: "National Capital" },
            { park: "Cumberland Island National Seashore", region: "Southeast" },
            { park: "Herbert Hoover National Historic Site", region: "Midwest" },
            { park: "Jean Lafitte National Historical Park and Preserve", region: "Southwest" },
            { park: "Badlands National Park", region: "Rocky Mountain" },
            { park: "Joshua Tree National Park", region: "Western" },
            { park: "Fort Vancouver National Historic Site", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1998
    {
        year: 1998,
        stamps: [
            { park: "Women's Rights National Historical Park", region: "National" },
            { park: "Sagamore Hill National Historic Site", region: "North Atlantic" },
            { park: "Upper Delaware Scenic and Recreational River", region: "Mid-Atlantic" },
            { park: "Franklin Delano Roosevelt Memorial", region: "National Capital" },
            { park: "Fort Sumter National Monument", region: "Southeast" },
            { park: "Hopewell Culture National Historical Park", region: "Midwest" },
            { park: "Petroglyph National Monument", region: "Southwest" },
            { park: "Natural Bridges National Monument", region: "Rocky Mountain" },
            { park: "Point Reyes National Seashore", region: "Western" },
            { park: "Sitka National Historical Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1997
    {
        year: 1997,
        stamps: [
            { park: "Everglades National Park", region: "National" },
            { park: "General Grant National Memorial", region: "North Atlantic" },
            { park: "New River Gorge National River", region: "Mid-Atlantic" },
            { park: "Korean War Veterans Memorial", region: "National Capital" },
            { park: "Dry Tortugas National Park", region: "Southeast" },
            { park: "Scotts Bluff National Monument", region: "Midwest" },
            { park: "Guadalupe Mountains National Park", region: "Southwest" },
            { park: "Zion National Park", region: "Rocky Mountain" },
            { park: "Pu'uhonua o Honaunau National Historical Park", region: "Western" },
            { park: "Katmai National Park and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1996
    {
        year: 1996,
        stamps: [
            { park: "Mesa Verde National Park", region: "National" },
            { park: "Saugus Iron Works National Historic Site", region: "North Atlantic" },
            { park: "Shenandoah National Park", region: "Mid-Atlantic" },
            { park: "Oxon Cove Park and Oxon Hill Farm", region: "National Capital" },
            { park: "Gulf Islands National Seashore", region: "Southeast" },
            { park: "Effigy Mounds National Monument", region: "Midwest" },
            { park: "El Morro National Monument", region: "Southwest" },
            { park: "Little Bighorn Battlefield National Monument", region: "Rocky Mountain" },
            { park: "National Park of American Samoa", region: "Western" },
            { park: "John Day Fossil Beds National Monument", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1995
    {
        year: 1995,
        stamps: [
            { park: "Glacier National Park", region: "National" },
            { park: "Saint-Gaudens National Historic Site", region: "North Atlantic" },
            { park: "Delaware Water Gap National Recreation Area", region: "Mid-Atlantic" },
            { park: "Lincoln Memorial", region: "National Capital" },
            { park: "Andersonville National Historic Site", region: "Southeast" },
            { park: "Agate Fossil Beds National Monument", region: "Midwest" },
            { park: "Carlsbad Caverns National Park", region: "Southwest" },
            { park: "Rainbow Bridge National Monument", region: "Rocky Mountain" },
            { park: "Fort Point National Historic Site", region: "Western" },
            { park: "Wrangell-St. Elias National Park and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1994
    {
        year: 1994,
        stamps: [
            { park: "Golden Spike National Historic Site", region: "National" },
            { park: "Martin Van Buren National Historic Site", region: "North Atlantic" },
            { park: "Allegheny Portage Railroad National Historic Site", region: "Mid-Atlantic" },
            { park: "Vietnam Veterans Memorial", region: "National Capital" },
            { park: "Carl Sandburg Home National Historic Site", region: "Southeast" },
            { park: "Harry S Truman National Historic Site", region: "Midwest" },
            { park: "Lyndon B. Johnson National Historical Park", region: "Southwest" },
            { park: "Florissant Fossil Beds National Monument", region: "Rocky Mountain" },
            { park: "Organ Pipe Cactus National Monument", region: "Western" },
            { park: "Kenai Fjords National Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1993
    {
        year: 1993,
        stamps: [
            { park: "Grand Teton National Park", region: "National" },
            { park: "Boston National Historical Park", region: "North Atlantic" },
            { park: "Fort McHenry National Monument and Historic Site", region: "Mid-Atlantic" },
            { park: "Ford's Theatre National Historic Site", region: "National Capital" },
            { park: "Wright Brothers National Memorial", region: "Southeast" },
            { park: "Saint Croix National Scenic Riverway", region: "Midwest" },
            { park: "Arkansas Post National Memorial", region: "Southwest" },
            { park: "Hovenweep National Monument", region: "Rocky Mountain" },
            { park: "Redwood National Park", region: "Western" },
            { park: "North Cascades National Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1992
    {
        year: 1992,
        stamps: [
            { park: "San Juan National Historic Site", region: "National" },
            { park: "Roger Williams National Memorial", region: "North Atlantic" },
            { park: "Edison National Historic Site", region: "Mid-Atlantic" },
            { park: "Frederick Douglass National Historic Site", region: "National Capital" },
            { park: "Castillo de San Marcos National Monument", region: "Southeast" },
            { park: "Fort Scott National Historic Site", region: "Midwest" },
            { park: "Salinas Pueblo Missions National Monument", region: "Southwest" },
            { park: "Big Hole National Battlefield", region: "Rocky Mountain" },
            { park: "Cabrillo National Monument", region: "Western" },
            { park: "Fort Clatsop National Memorial", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1991
    {
        year: 1991,
        stamps: [
            { park: "Muir Woods National Monument", region: "National" },
            { park: "Lowell National Historical Park", region: "North Atlantic" },
            { park: "Valley Forge National Historical Park", region: "Mid-Atlantic" },
            { park: "Washington Monument", region: "National Capital" },
            { park: "Mammoth Cave National Park", region: "Southeast" },
            { park: "Indiana Dunes National Lakeshore", region: "Midwest" },
            { park: "Bandelier National Monument", region: "Southwest" },
            { park: "Fort Union Trading Post National Historic Site", region: "Rocky Mountain" },
            { park: "USS Arizona Memorial", region: "Western" },
            { park: "Klondike Gold Rush National Historical Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1990
    {
        year: 1990,
        stamps: [
            { park: "Sequoia National Park", region: "National" },
            { park: "Ellis Island National Monument", region: "North Atlantic" },
            { park: "Appomattox Court House National Historical Park", region: "Mid-Atlantic" },
            { park: "Rock Creek Park", region: "National Capital" },
            { park: "Chickamauga and Chattanooga National Military Park", region: "Southeast" },
            { park: "Sleeping Bear Dunes National Lakeshore", region: "Midwest" },
            { park: "Pecos National Historical Park", region: "Southwest" },
            { park: "Rocky Mountain National Park", region: "Rocky Mountain" },
            { park: "Death Valley National Park", region: "Western" },
            { park: "Craters of the Moon National Monument", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1989
    {
        year: 1989,
        stamps: [
            { park: "Yellowstone National Park", region: "National" },
            { park: "Federal Hall National Memorial", region: "North Atlantic" },
            { park: "Assateague Island National Seashore", region: "Mid-Atlantic" },
            { park: "Jefferson Memorial", region: "National Capital" },
            { park: "Great Smoky Mountains National Park", region: "Southeast" },
            { park: "Apostle Islands National Lakeshore", region: "Midwest" },
            { park: "Hot Springs National Park", region: "Southwest" },
            { park: "Arches National Park", region: "Rocky Mountain" },
            { park: "Great Basin National Park", region: "Western" },
            { park: "Crater Lake National Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1988
    {
        year: 1988,
        stamps: [
            { park: "Arts for the Parks Winners", region: "National" },
            { park: "Salem Maritime National Historic Site", region: "North Atlantic" },
            { park: "Gettysburg National Military Park", region: "Mid-Atlantic" },
            { park: "The White House", region: "National Capital" },
            { park: "Natchez Trace Parkway", region: "Southeast" },
            { park: "Pictured Rocks National Lakeshore", region: "Midwest" },
            { park: "San Antonio Missions National Historical Park", region: "Southwest" },
            { park: "Bryce Canyon National Park", region: "Rocky Mountain" },
            { park: "Grand Canyon National Park", region: "Western" },
            { park: "Olympic National Park", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1987
    {
        year: 1987,
        stamps: [
            { park: "Independence National Historical Park/Independence Hall", region: "National" },
            { park: "Acadia National Park", region: "North Atlantic" },
            { park: "Hopewell Furnace National Historic Site", region: "Mid-Atlantic" },
            { park: "Constitution Gardens", region: "National Capital" },
            { park: "Vicksburg National Military Park", region: "Southeast" },
            { park: "Lincoln Home National Historic Site", region: "Midwest" },
            { park: "White Sands National Park", region: "Southwest" },
            { park: "Devils Tower National Monument", region: "Rocky Mountain" },
            { park: "Hawaii Volcanoes National Park", region: "Western" },
            { park: "Denali National Park and Preserve", region: "Pacific Northwest & Alaska" }
        ]
    },
    // 1986
    {
        year: 1986,
        stamps: [
            { park: "Statue of Liberty National Monument", region: "National" },
            { park: "Cape Cod National Seashore", region: "North Atlantic" },
            { park: "Colonial National Historical Park", region: "Mid-Atlantic" },
            { park: "Vietnam Veterans Memorial", region: "National Capital" },
            { park: "Blue Ridge Parkway", region: "Southeast" },
            { park: "Jefferson National Expansion Memorial", region: "Midwest" },
            { park: "Big Bend National Park", region: "Southwest" },
            { park: "Mount Rushmore National Memorial", region: "Rocky Mountain" },
            { park: "Yosemite National Park", region: "Western" },
            { park: "Mount Rainier National Park", region: "Pacific Northwest & Alaska" }
        ]
    }
];

// Generate purchase links
function generatePurchaseLink(year) {
    return `https://shop.americasnationalparks.org/products/${year}-passport-stamp-set`;
}

// Generate stamp set image URL
// This returns a placeholder for now but can be easily updated with real images
function getStampSetImage(year) {
    // Use the real images we downloaded
    return `images/stamps/${year}-stamps.jpg`;
}

// Generate individual stamp image
function getStampImage(park, year, region) {
    // Use the actual stamp set image
    return `images/stamps/${year}-stamps.jpg`;
}

// Export data and functions for use in app.js
window.stampData = stampData;
window.generatePurchaseLink = generatePurchaseLink;
window.getStampSetImage = getStampSetImage;
window.getStampImage = getStampImage; 
