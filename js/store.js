/**
 * CityNest Persistent Database Store & Seed Data Engine
 */

const STORAGE_KEYS = {
  HOUSING: 'citynest_housing_listings',
  EVENTS: 'citynest_community_events',
  CHECKLIST: 'citynest_checklist_items',
  SAVED: 'citynest_saved_resources',
  CURRENT_USER: 'citynest_current_user',
  USERS: 'citynest_users_list'
};

// Seed Users
export const SEED_USERS = [
  {
    id: 'user_alex_chen',
    name: 'Alex Chen',
    email: 'alex.chen@citynest.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    neighborhood: 'Midtown East',
    relocatedDate: '2 weeks ago',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: 'user_sarah_miller',
    name: 'Sarah Miller',
    email: 'sarah.miller@citynest.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    neighborhood: 'Williamsburg, Brooklyn',
    relocatedDate: '1 month ago',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'user_marcus_vance',
    name: 'Marcus Vance',
    email: 'marcus.vance@citynest.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    neighborhood: 'Astoria, Queens',
    relocatedDate: '3 days ago',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];

// Seed Housing Listings (~8 realistic NYC listings with high-res photos & exact coordinates)
export const SEED_HOUSING = [
  {
    id: 'house_1',
    title: 'Sunlit Modern Studio near Central Park',
    neighborhood: 'Upper West Side, Manhattan',
    address: '240 W 73rd St, New York, NY 10023',
    price: 2450,
    bedrooms: 0,
    type: 'studio',
    description: 'Bright high-floor studio featuring exposed brick, hardwood floors, newly renovated stainless steel kitchenette, oversized south-facing windows, and laundry in building. Just 2 blocks from the 1/2/3 subway line and 3 blocks to Central Park.',
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    amenities: ['In-building Laundry', 'Elevator', 'Dishwasher', 'Pets Allowed', 'High-speed Fiber WiFi', 'Bike Storage'],
    contact_email: 'leasing@uws-residences.com',
    is_featured: true,
    latitude: 40.7794,
    longitude: -73.9822,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'house_2',
    title: 'Historic Brownstone 2BR with Private Garden',
    neighborhood: 'Brooklyn Heights / Cobble Hill',
    address: '142 Amity St, Brooklyn, NY 11201',
    price: 3600,
    bedrooms: 2,
    type: 'apartment',
    description: 'Spacious 2-bedroom floor-through apartment in a landmarked townhouse. Features 11ft ceilings, decorative marble mantels, chef kitchen with gas range, and exclusive access to a serene rear landscaped garden patio.',
    image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
    amenities: ['Private Garden Patio', 'Central A/C', 'Washer/Dryer in Unit', 'Original Hardwood', 'Storage Room'],
    contact_email: 'cobblehill.townhouses@brooklynliving.ny',
    is_featured: true,
    latitude: 40.6908,
    longitude: -73.9961,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 'house_3',
    title: 'Riverfront High-Rise 1BR with Skyline Balcony',
    neighborhood: 'Williamsburg, Brooklyn',
    address: '184 Kent Ave, Brooklyn, NY 11249',
    price: 3200,
    bedrooms: 1,
    type: 'apartment',
    description: 'Luxurious corner 1-bedroom with panoramic floor-to-ceiling vistas of the Manhattan skyline and East River. Building amenities include a 24/7 concierge, state-of-the-art rooftop fitness center, and co-working lounge.',
    image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
    amenities: ['Rooftop Pool & Gym', '24/7 Doorman', 'Private Balcony', 'Co-working Lounge', 'Package Concierge', 'EV Charging'],
    contact_email: 'frontdesk@kentwaterfront.com',
    is_featured: true,
    latitude: 40.7188,
    longitude: -73.9635,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'house_4',
    title: 'Cozy Private Room in Creative Shared Loft',
    neighborhood: 'Bushwick / East Williamsburg',
    address: '382 Jefferson St, Brooklyn, NY 11237',
    price: 1150,
    bedrooms: 1,
    type: 'shared',
    description: 'Furnished master bedroom in a spacious 3BR designer artist loft. Shared with two friendly professionals working in design and tech. Huge communal kitchen, soaring timber beams, projector home theater, and rooftop skyline deck.',
    image_url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80',
    amenities: ['Furnished Room', 'All Utilities Included', 'High-speed 1Gbps WiFi', 'Rooftop Access', 'Dishwasher'],
    contact_email: 'jefferson.loftmates@gmail.com',
    is_featured: false,
    latitude: 40.7064,
    longitude: -73.9238,
    created_at: new Date(Date.now() - 9 * 86400000).toISOString()
  },
  {
    id: 'house_5',
    title: 'Sun-Drenched 2BR near Ditmars Blvd Subway',
    neighborhood: 'Astoria, Queens',
    address: '22-15 31st St, Astoria, NY 11105',
    price: 2650,
    bedrooms: 2,
    type: 'apartment',
    description: 'Immaculate top-floor 2-bedroom with king-sized bedrooms, renovated granite kitchen, brand new tiled bath, and abundant closet space. 4 minute stroll to N/W train station (18 min to Midtown Manhattan) and vibrant Mediterranean dining.',
    image_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=80',
    amenities: ['Heat & Hot Water Included', 'Live-in Super', 'Hardwood Floors', 'Close to N/W Subway', 'Cats Allowed'],
    contact_email: 'mgmt@astoriaheightsrealty.com',
    is_featured: false,
    latitude: 40.7745,
    longitude: -73.9099,
    created_at: new Date(Date.now() - 11 * 86400000).toISOString()
  },
  {
    id: 'house_6',
    title: 'Spacious Multi-Level Townhome with Garage & Yard',
    neighborhood: 'Park Slope / South Slope',
    address: '412 11th St, Brooklyn, NY 11215',
    price: 4950,
    bedrooms: 3,
    type: 'house',
    description: 'Charming 3-bedroom, 2.5-bathroom single-family townhouse. Features a private driveway garage, finished basement recreation room, private fenced backyard for entertaining, and gourmet kitchen. Close to Prospect Park.',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    amenities: ['Private Garage Parking', 'Fenced Backyard', 'Central Heating & A/C', 'Finished Basement', 'Washer/Dryer'],
    contact_email: 'broker@parkslopeheritage.com',
    is_featured: true,
    latitude: 40.6675,
    longitude: -73.9870,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'house_7',
    title: 'Chic Loft in Historic Tribeca Cast-Iron Building',
    neighborhood: 'Tribeca, Manhattan',
    address: '88 Franklin St, New York, NY 10013',
    price: 4200,
    bedrooms: 1,
    type: 'apartment',
    description: 'Authentic 1,100 sq ft open loft with soaring 13-foot ceilings, Corinthian cast-iron columns, polished concrete floors, custom chef island, and deep soaking bathtub. Key-locked elevator opens directly into residence.',
    image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    amenities: ['Keyed Elevator Entry', 'Soaking Tub', 'Central Air', 'Custom Lighting', 'Wine Cooler'],
    contact_email: 'concierge@franklintribeca.com',
    is_featured: false,
    latitude: 40.7176,
    longitude: -74.0042,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: 'house_8',
    title: 'Modern High-Rise Studio with River & Queensboro Views',
    neighborhood: 'Long Island City, Queens',
    address: '45-45 Center Blvd, Long Island City, NY 11109',
    price: 2550,
    bedrooms: 0,
    type: 'studio',
    description: 'Modern luxury studio on the LIC waterfront with direct views of the East River and Empire State Building. Steps from Gantry Plaza State Park and 1 stop to Grand Central on the 7 train.',
    image_url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop&q=80',
    amenities: ['Waterfront Promenade Access', 'Fitness Club & Yoga', 'Tennis Courts', '24h Concierge', 'Valet Dry Cleaning'],
    contact_email: 'licwaterfront@tfc.com',
    is_featured: false,
    latitude: 40.7455,
    longitude: -73.9575,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

// Helper to get formatted future dates
function getFutureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

// Seed Community Events (~8 events across all 6 categories with NYC coordinates)
export const SEED_EVENTS = [
  {
    id: 'event_1',
    title: 'Newcomers Coffee & Welcome Circle in Bryant Park',
    description: 'Relocated recently? Meet fellow new arrivals over artisan espresso and pastries under the London plane trees of Bryant Park. Casual speed-networking followed by a neighborhood walk.',
    category: 'social',
    date: getFutureDate(2),
    time: '10:30 AM - 12:00 PM',
    location: 'Bryant Park Reading Room (Near 42nd St & 6th Ave)',
    neighborhood: 'Midtown Manhattan',
    image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    max_attendees: 30,
    attendees: ['user_sarah_miller', 'user_marcus_vance', 'emily.r@gmail.com', 'david.k@gmail.com', 'lisa.p@gmail.com'],
    latitude: 40.7536,
    longitude: -73.9832,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'event_2',
    title: 'Sunset Social Running Club — Brooklyn Bridge & DUMBO',
    description: 'All-paces friendly 5K group jog across the iconic Brooklyn Bridge ending with refreshing drinks and wood-fired pizza at DUMBO waterfront. Bag check available at start point.',
    category: 'sports',
    date: getFutureDate(4),
    time: '6:30 PM - 8:00 PM',
    location: 'City Hall Park Fountain (Start) → DUMBO Archway',
    neighborhood: 'Lower Manhattan / Brooklyn',
    image_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
    max_attendees: 45,
    attendees: ['user_alex_chen', 'user_marcus_vance', 'jordan.t@gmail.com', 'claire.w@gmail.com'],
    latitude: 40.7128,
    longitude: -74.0060,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'event_3',
    title: 'Metropolitan Museum Art Walk & Rooftop Social',
    description: 'Guided exploration of highlights in the American Wing and European Paintings at The Met, followed by drinks and sunset views on the Cantor Rooftop Garden overlooking Central Park.',
    category: 'cultural',
    date: getFutureDate(6),
    time: '4:00 PM - 7:00 PM',
    location: 'The Met Fifth Avenue (Main Great Hall Steps)',
    neighborhood: 'Upper East Side, Manhattan',
    image_url: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&auto=format&fit=crop&q=80',
    max_attendees: 20,
    attendees: ['user_sarah_miller', 'user_alex_chen', 'rachel.m@gmail.com'],
    latitude: 40.7794,
    longitude: -73.9632,
    created_at: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'event_4',
    title: 'NYC Tech & Creative Founders Mixer',
    description: 'Connect with local startup founders, software engineers, product designers, and freelancers. Featuring short lightning talks on scaling in NYC, followed by open networking and drinks.',
    category: 'professional',
    date: getFutureDate(8),
    time: '6:00 PM - 9:00 PM',
    location: 'WeWork Flatiron Innovation Hub, 115 W 18th St',
    neighborhood: 'Flatiron / Chelsea',
    image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
    max_attendees: 50,
    attendees: ['user_alex_chen', 'steve.b@gmail.com', 'nina.z@gmail.com', 'kevin.l@gmail.com'],
    latitude: 40.7397,
    longitude: -73.9952,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'event_5',
    title: 'Community Garden Planting & Herb Care Day',
    description: 'Get your hands green! Volunteer with local neighbors to cultivate raised garden beds, weed native pollinator patches, and plant seasonal vegetables. Gloves and tools provided.',
    category: 'volunteer',
    date: getFutureDate(10),
    time: '9:30 AM - 1:00 PM',
    location: 'Liz Christy Community Garden, E Houston St & Bowery',
    neighborhood: 'East Village / Lower East Side',
    image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=800&auto=format&fit=crop&q=80',
    max_attendees: 18,
    attendees: ['user_marcus_vance', 'hannah.g@gmail.com', 'oliver.t@gmail.com'],
    latitude: 40.7242,
    longitude: -73.9926,
    created_at: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: 'event_6',
    title: 'Mindful Morning Sound Bath & Meditation by the Hudson',
    description: 'Release city stress with a soothing outdoor sound bath using crystal singing bowls and guided breathwork. Bring a yoga mat or blanket. Tea served afterward.',
    category: 'wellness',
    date: getFutureDate(3),
    time: '8:00 AM - 9:15 AM',
    location: 'Pier 57 Rooftop Park, 25 11th Ave',
    neighborhood: 'Chelsea / Meatpacking District',
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
    max_attendees: 25,
    attendees: ['user_sarah_miller', 'user_alex_chen', 'chloe.k@gmail.com', 'sam.w@gmail.com'],
    latitude: 40.7441,
    longitude: -74.0099,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'event_7',
    title: 'Astoria Mediterranean Food Crawl & Market Discovery',
    description: 'Explore the culinary capital of Queens! We will visit 4 authentic Greek bakeries, souvlaki spots, and an import specialty grocery market. Guided by a lifelong local foodie.',
    category: 'cultural',
    date: getFutureDate(12),
    time: '1:00 PM - 4:00 PM',
    location: 'Athens Square Park, 30th Ave & 30th St',
    neighborhood: 'Astoria, Queens',
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    max_attendees: 16,
    attendees: ['user_marcus_vance', 'alina.v@gmail.com'],
    latitude: 40.7656,
    longitude: -73.9212,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'event_8',
    title: 'Prospect Park Sunday Ultimate Frisbee & Picnic',
    description: 'Friendly non-competitive scrimmage in Prospect Park Long Meadow. Beginners welcome! Bring a snack to share for the post-game blanket picnic.',
    category: 'sports',
    date: getFutureDate(7),
    time: '2:00 PM - 5:00 PM',
    location: 'Prospect Park Long Meadow (near Grand Army Plaza entrance)',
    neighborhood: 'Park Slope, Brooklyn',
    image_url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80',
    max_attendees: 30,
    attendees: ['user_alex_chen', 'user_sarah_miller', 'leo.d@gmail.com', 'mia.t@gmail.com'],
    latitude: 40.6720,
    longitude: -73.9699,
    created_at: new Date(Date.now() - 6 * 86400000).toISOString()
  }
];

// Seed Checklist Items (~10 starter items across categories)
export const SEED_CHECKLIST = [
  {
    id: 'check_1',
    title: 'Transfer State ID / Get New York Driver License or Non-Driver ID',
    description: 'Schedule an appointment at the nearest NY DMV hub. Bring proof of identity, Social Security card, and 2 proofs of NY residency (utility bill, lease).',
    category: 'legal',
    is_completed: false,
    priority: 'high',
    due_days: 14,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'check_2',
    title: 'Set up Con Edison Electricity & Cooking Gas Account',
    description: 'Open your electric and gas account online at conEd.com on or before your lease start date to prevent service interruption.',
    category: 'utilities',
    is_completed: true,
    priority: 'high',
    due_days: 2,
    created_at: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    id: 'check_3',
    title: 'Sign Up for OMNY Contactless Subway / Bus Transit Account',
    description: 'Link your credit card or phone wallet to omny.info to track rides and automatically unlock the 12-ride weekly fare cap ($34 max).',
    category: 'transport',
    is_completed: true,
    priority: 'medium',
    due_days: 3,
    created_at: new Date(Date.now() - 11 * 86400000).toISOString()
  },
  {
    id: 'check_4',
    title: 'Find In-Network Primary Care Physician & Local Urgent Care',
    description: 'Verify healthcare network directory (NY State of Health / employer portal) and register with a local clinic within 15 min walk.',
    category: 'healthcare',
    is_completed: false,
    priority: 'high',
    due_days: 21,
    created_at: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: 'check_5',
    title: 'Obtain Free New York Public Library (NYPL/BPL) Card & Culture Pass',
    description: 'Get your library card at any branch with ID + proof of address to reserve free admission passes to over 80 museums across NYC.',
    category: 'social',
    is_completed: false,
    priority: 'low',
    due_days: 30,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'check_6',
    title: 'File USPS Official Change of Address & Mail Forwarding',
    description: 'Submit your address change online at moversguide.usps.com ($1.10 verification fee) to forward mail for up to 12 months.',
    category: 'housing',
    is_completed: true,
    priority: 'high',
    due_days: 1,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: 'check_7',
    title: 'Schedule High-Speed Fiber Internet Installation (Verizon Fios / Spectrum)',
    description: 'Confirm building provider compatibility and schedule technician arrival or order self-installation modem kit.',
    category: 'utilities',
    is_completed: false,
    priority: 'high',
    due_days: 5,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'check_8',
    title: 'Update Voter Registration Address with NYC Board of Elections',
    description: 'Submit updated voter registration through NY DMV portal or NYS Board of Elections form to vote in upcoming local elections.',
    category: 'legal',
    is_completed: false,
    priority: 'medium',
    due_days: 45,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'check_9',
    title: 'Update NYC City & State Tax Withholding Forms (IT-2104 / W-4)',
    description: 'Submit form IT-2104 to your payroll/employer to ensure correct NYC resident municipal income tax is withheld.',
    category: 'finance',
    is_completed: false,
    priority: 'medium',
    due_days: 30,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'check_10',
    title: 'Explore Neighborhood Grocery Stores, Laundromat & Hardware Shops',
    description: 'Locate your go-to supermarket, 24-hour pharmacy, nearest dry cleaners, and favorite coffee shop within 5 blocks.',
    category: 'social',
    is_completed: false,
    priority: 'low',
    due_days: 7,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

// Seed Saved Resources (linked to default active user: Alex Chen)
export const SEED_SAVED = [
  {
    id: 'saved_1',
    user_id: 'user_alex_chen',
    resource_type: 'housing',
    resource_id: 'house_1',
    title: 'Sunlit Modern Studio near Central Park',
    notes: 'Tour scheduled for Saturday 11am. Landlord contact is Responsive.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'saved_2',
    user_id: 'user_alex_chen',
    resource_type: 'event',
    resource_id: 'event_1',
    title: 'Newcomers Coffee & Welcome Circle in Bryant Park',
    notes: 'Meeting fellow arrivals here. Need to arrive 10 min early.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'saved_3',
    user_id: 'user_alex_chen',
    resource_type: 'service',
    resource_id: 'service_transport_1',
    title: 'OMNY Fare Cap & Subway Card Essentials',
    notes: 'Remember to tap same phone Apple Pay card all week.',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'saved_4',
    user_id: 'user_sarah_miller',
    resource_type: 'housing',
    resource_id: 'house_3',
    title: 'Riverfront High-Rise 1BR with Skyline Balcony',
    notes: 'Incredible views of Williamsburg bridge. Great fitness amenities.',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  }
];

// 6 City Services Categories (each with 3 detailed guides = 18 guides)
export const CITY_SERVICES_DATA = [
  {
    id: 'cat_transport',
    name: 'Transportation & Transit',
    icon: 'Train',
    description: 'Subways, buses, commuter rails, bike sharing, and ferry routes across all five boroughs.',
    guides: [
      {
        id: 'service_transport_1',
        title: 'Subway & Bus Fare System (OMNY & MetroCard)',
        summary: 'How to pay fares, leverage automatic weekly fare caps, and navigate transit 24/7.',
        steps: [
          'Tap any contactless credit/debit card, Apple Pay, or Google Wallet at any subway turnstile or bus scanner ($2.90 per ride).',
          'OMNY Weekly Fare Capping: Once you pay for 12 rides with the same device between Monday and Sunday, all remaining rides that week are FREE.',
          'Subways run 24 hours a day, 7 days a week. Download the official "MTA app" (or Transit app) for live train arrival times and service change alerts.'
        ],
        contact: 'MTA Info: 511 | OMNY Helpline: 877-789-6669',
        link: 'https://omny.info',
        tip: 'Free transfers between subway and bus (or bus to bus) are automatically granted within 2 hours of your initial tap.'
      },
      {
        id: 'service_transport_2',
        title: 'Citi Bike & Micromobility Network',
        summary: 'Largest bike share network in North America with over 25,000 classic and electric bikes.',
        steps: [
          'Download the Citi Bike or Lyft app to unlock bikes at thousands of docking stations across Manhattan, Brooklyn, Queens, and the Bronx.',
          'Annual memberships offer discounted e-bike rates and unlimited 45-minute classic rides.',
          'Always ride in marked green bike lanes where available and obey traffic signals (riding on pedestrian sidewalks is illegal for adults).'
        ],
        contact: 'Citi Bike Customer Support: 1-855-BIKE-311',
        link: 'https://citibikenyc.com',
        tip: 'Check dock availability in the app before arriving, especially during peak commute hours in high-density business districts.'
      },
      {
        id: 'service_transport_3',
        title: 'NYC Ferry & Commuter Waterways',
        summary: 'Scenic, efficient water transit connecting Manhattan, Brooklyn, Queens, Staten Island, and the Bronx.',
        steps: [
          'Purchase tickets on the NYC Ferry app ($4.00 single ride; 10-trip bundles available for $27.50).',
          'Popular routes include the East River line (DUMBO, Williamsburg, Wall St, 34th St) and Soundview route.',
          'Ferries feature outdoor top decks, onboard cafes, bike racks, and restrooms.'
        ],
        contact: 'NYC Ferry: 844-469-3377',
        link: 'https://ferry.nyc',
        tip: 'NYC Ferry requires a separate ticket from MTA subway/bus OMNY; transfers between ferry lines are free within 90 minutes.'
      }
    ]
  },
  {
    id: 'cat_utilities',
    name: 'Utilities & Connectivity',
    icon: 'Zap',
    description: 'Electricity, natural gas, gigabit fiber internet, municipal water, and waste/recycling schedules.',
    guides: [
      {
        id: 'service_util_1',
        title: 'Con Edison Electricity & Gas Activation',
        summary: 'Setting up power, managing monthly billing, and requesting smart meter readings.',
        steps: [
          'Visit conEd.com or call 1-800-75-CONED at least 3 business days prior to lease commencement.',
          'Provide your lease agreement address, unit number, SSN or government ID, and move-in meter reading if requested.',
          'Enroll in Level Payment Plan to avoid unexpected seasonal spikes during heavy summer air conditioning.'
        ],
        contact: 'Con Edison: 1-800-752-6633 | Emergency Gas Odor: 1-800-75-CONED or 911',
        link: 'https://coned.com',
        tip: 'If you smell gas (rotten egg odor), leave the building immediately and call 911 and Con Ed from outside. Do not turn light switches on or off.'
      },
      {
        id: 'service_util_2',
        title: 'High-Speed Home Internet & Fiber Providers',
        summary: 'Choosing between Verizon Fios Gigabit, Spectrum, Optimum, and honestNYC wireless broadband.',
        steps: [
          'Check your exact building address on provider websites to see if pure fiber (Verizon Fios / NYC Mesh) is pre-wired.',
          'Opt for symmetrical upload/download speeds if you work remotely or host frequent video conferences.',
          'Ask your landlord where the building telecom junction box is located for technician appointment access.'
        ],
        contact: 'Verizon: 1-800-837-4966 | Spectrum: 1-855-707-7328',
        link: 'https://broadbandmap.fcc.gov',
        tip: 'Buying your own compatible Wi-Fi 6 router often saves $15/month in equipment rental fees.'
      },
      {
        id: 'service_util_3',
        title: 'NYC Sanitation, Recycling & Compost Rules',
        summary: 'Mandatory residential curbside recycling, food scrap curbside composting, and bulk pickup.',
        steps: [
          'Blue Bin: Metal, glass, rigid plastics, and beverage cartons.',
          'Green Bin: Mixed paper, flattened cardboard boxes, and newspapers.',
          'Brown Bin: Food scraps, food-soiled paper, and yard trimmings (now mandatory citywide).',
          'Put bins out after 6:00 PM (or 8:00 PM for bags) on your designated neighborhood collection nights.'
        ],
        contact: 'NYC Department of Sanitation (DSNY): Dial 311',
        link: 'https://dsny.cityofnewyork.us',
        tip: 'Download the "DSNY Collection Schedule" for your zip code to get automated calendar reminders on holiday adjustments.'
      }
    ]
  },
  {
    id: 'cat_healthcare',
    name: 'Healthcare & Wellness Services',
    icon: 'HeartPulse',
    description: 'Finding primary physicians, urgent care centers, state health insurance marketplace, and emergency care.',
    guides: [
      {
        id: 'service_health_1',
        title: 'NY State of Health Marketplace & Essential Plan',
        summary: 'Enrolling in quality health insurance, subsidised plans, and the $0-premium NY Essential Plan.',
        steps: [
          'Visit nystateofhealth.ny.gov to compare qualified health insurance plans with income-based tax credits.',
          'Qualifying life events (moving into New York State) grant you a 60-day Special Enrollment Period.',
          'If eligible, New York\'s Essential Plan provides comprehensive $0 monthly premium coverage with no deductibles.'
        ],
        contact: 'NY State of Health Customer Service: 1-855-355-5777',
        link: 'https://nystateofhealth.ny.gov',
        tip: 'Certified enrollment navigators offer free, multilingual assistance over the phone or in person.'
      },
      {
        id: 'service_health_2',
        title: 'NYC Health + Hospitals Public Care & Community Clinics',
        summary: 'Guaranteed medical care regardless of insurance status or ability to pay across 11 acute hospitals.',
        steps: [
          'NYC Care program provides low-to-no-cost primary care doctors, pharmacy prescriptions, and specialists.',
          'Enroll in person at any NYC Health + Hospitals facility or through community partners.',
          'Confidential care is guaranteed regardless of immigration status or income.'
        ],
        contact: 'NYC Care Contact Line: 1-646-692-2273',
        link: 'https://nyccare.nyc',
        tip: 'Carry your NYC Care card to get discounted $2–$10 prescription medications at all hospital system pharmacies.'
      },
      {
        id: 'service_health_3',
        title: 'Urgent Care Clinics vs. Emergency Rooms',
        summary: 'Knowing where to go for acute illnesses, minor fractures, rapid tests, vs life-threatening emergencies.',
        steps: [
          'Urgent Care (CityMD, Northwell-GoHealth, MedRite): Walk-in care for sprains, minor burns, flu, stitches, and X-rays with low co-pays.',
          'Hospital Emergency Rooms: Go for chest pain, stroke symptoms, major trauma, severe shortness of breath, or uncontrollable bleeding (or call 911).',
          'NYC Well (1-888-NYC-WELL): 24/7 free mental health counseling, mobile crisis dispatch, and peer support.'
        ],
        contact: 'Emergency: 911 | Mental Health Crisis: 988 or 1-888-692-9355',
        link: 'https://nyc.gov/health',
        tip: 'Check your urgent care center\'s online wait times before walking in to avoid crowded peak hours.'
      }
    ]
  },
  {
    id: 'cat_legal',
    name: 'Legal, ID & Tenant Protections',
    icon: 'ShieldCheck',
    description: 'Driver licenses, NYC IDNYC municipal card, tenant rights, lease regulations, and voting.',
    guides: [
      {
        id: 'service_legal_1',
        title: 'NY State REAL ID / Driver License Conversion',
        summary: 'Transferring your out-of-state driver license or obtaining a NY State REAL ID / Enhanced ID.',
        steps: [
          'New residents must exchange an out-of-state license within 30 days of establishing residency.',
          'Book an appointment at dmv.ny.gov and complete form MV-44.',
          'Bring: Proof of Identity (Passport), Social Security Card, and 2 Proofs of NY Residence (Lease, Utility bill, Bank statement).'
        ],
        contact: 'NY DMV Support: 518-486-9786',
        link: 'https://dmv.ny.gov',
        tip: 'REAL ID or Enhanced ID will be required for all domestic air travel; opt for REAL ID during your initial license appointment.'
      },
      {
        id: 'service_legal_2',
        title: 'IDNYC: Municipal ID Card & Free Culture Perks',
        summary: 'Official government photo ID available to all city residents age 10+ with massive cultural benefits.',
        steps: [
          'Schedule an IDNYC enrollment center appointment at any public library or municipal center.',
          'Unlock 1-year free memberships to over 40 top institutions including MoMA PS1, BAM, Brooklyn Museum, and the Central Park Zoo.',
          'Serves as primary ID for opening accounts at select local credit unions and entering city buildings.'
        ],
        contact: 'IDNYC Hotline: Dial 311 or 718-557-1399',
        link: 'https://nyc.gov/idnyc',
        tip: 'IDNYC cards are 100% free of charge and valid for 5 years from issuance date.'
      },
      {
        id: 'service_legal_3',
        title: 'NYC Tenant Rights, Rent Stabilization & Security Deposits',
        summary: 'Key legal protections: maximum 1 month security deposit, heat/hot water laws, and eviction defense.',
        steps: [
          'Security Deposit Cap: Landlords can legally charge no more than 1 month rent as a security deposit and must return it within 14 days of move-out with itemized receipts.',
          'Heat Season (Oct 1 – May 31): Landlords must maintain minimum 68°F indoors when outdoor temp falls below 55°F during day.',
          'Free Right to Counsel: Eligible low-income tenants facing eviction have the right to free legal representation in Housing Court.'
        ],
        contact: 'NYC Tenant Helpline: Dial 311 and ask for "Tenant Helpline" | DHCR: 833-499-0343',
        link: 'https://hcr.ny.gov/rent-regulation',
        tip: 'Always photograph every room and existing wear-and-tear during move-in and email the photos to your landlord on day 1 for written timestamp proof.'
      }
    ]
  },
  {
    id: 'cat_education',
    name: 'Education & Public Libraries',
    icon: 'BookOpen',
    description: 'New York Public Library systems, free Culture Pass museum access, adult classes, and school enrollment.',
    guides: [
      {
        id: 'service_edu_1',
        title: 'Public Library System & Culture Pass Access',
        summary: 'Access NYPL (Manhattan/Bronx/Staten Island), BPL (Brooklyn), and QPL (Queens) resources.',
        steps: [
          'Apply for a library card online or at any branch with proof of address.',
          'Borrow digital audiobooks, e-books, and magazines via the Libby and SimplyE apps.',
          'Use "Culture Pass" (culturepass.nyc) with your library card to reserve free tickets to the Guggenheim, Whitney, Botanical Gardens, and Intrepid Museum.'
        ],
        contact: 'NYPL: 917-275-6975 | BPL: 718-230-2100 | QPL: 718-990-0700',
        link: 'https://culturepass.nyc',
        tip: 'Reserve Culture Pass museum tickets on the 1st of each month when new reservation batches drop.'
      },
      {
        id: 'service_edu_2',
        title: 'CUNY Community Colleges & Continuing Education',
        summary: 'Affordable university degrees, certificate programs, and free adult language classes.',
        steps: [
          'Explore CUNY\'s network of 25 campuses across the five boroughs.',
          'Enroll in continuing education courses for coding, data analytics, real estate, and graphic design.',
          'Access free English as a Second Language (ESL) and High School Equivalency (GED) classes.'
        ],
        contact: 'CUNY Admissions: 212-997-2869',
        link: 'https://cuny.edu',
        tip: 'NY residents who have lived in the state for 12 continuous months qualify for heavily discounted in-state tuition rates.'
      },
      {
        id: 'service_edu_3',
        title: 'NYC Public Schools Registration & Pre-K 3K',
        summary: 'Enrolling children in NYC Department of Education schools, free 3-K, and universal Pre-K.',
        steps: [
          'Create a MySchools.nyc account to explore zoned elementary, middle, and high schools.',
          'New York City offers universal free 3-K and Pre-K for all 3 and 4-year-old residents.',
          'Visit a Family Welcome Center with child\'s birth certificate, immunization records, and two proofs of address.'
        ],
        contact: 'NYC DOE: 718-935-2009 | Dial 311',
        link: 'https://myschools.nyc',
        tip: 'All NYC public school students receive free breakfast and lunch every day regardless of family income.'
      }
    ]
  },
  {
    id: 'cat_finance',
    name: 'Finance, Banking & Taxes',
    icon: 'DollarSign',
    description: 'Setting up local checking accounts, NYC municipal resident income tax, and budgeting in the city.',
    guides: [
      {
        id: 'service_fin_1',
        title: 'Opening a Local Checking & Savings Account',
        summary: 'Zero-fee checking options, high-yield credit unions, and ATM fee reimbursements.',
        steps: [
          'Local community credit unions (e.g., MCU, Lower East Side People\'s FCU) often offer fee-free checking and lower loan rates.',
          'Major institutions (Chase, TD Bank, Citibank) have extensive ATM coverage across every neighborhood.',
          'Bring photo ID, Social Security Card (or ITIN), and signed apartment lease as proof of address.'
        ],
        contact: 'NYC Financial Empowerment Centers: Book free financial counseling via 311',
        link: 'https://nyc.gov/finance',
        tip: 'NYC Financial Empowerment Centers offer free, confidential one-on-one financial coaching to all residents.'
      },
      {
        id: 'service_fin_2',
        title: 'NYC & NY State Resident Income Tax Guide',
        summary: 'Understanding NYC local resident income tax rates (approx. 3.078% – 3.876%) and tax filing.',
        steps: [
          'If you live in NYC for more than 183 days or maintain a permanent residence, you are subject to NYC resident personal income tax.',
          'Submit form IT-2104 to your employer to adjust payroll withholding.',
          'Use NYC Free Tax Prep if your household earns under $85,000 to file federal, state, and city taxes for free with IRS-certified preparers.'
        ],
        contact: 'NYS Dept of Taxation and Finance: 518-457-5181 | NYC Free Tax Prep: Dial 311',
        link: 'https://tax.ny.gov',
        tip: 'Commuter transit benefits allow you to use pre-tax dollars (up to $315/month) for subway, bus, and train fares.'
      },
      {
        id: 'service_fin_3',
        title: 'Cost of Living & Smart City Budgeting Strategies',
        summary: 'Practical tips for managing grocery, dining, utility, and entertainment costs in NYC.',
        steps: [
          'Shop at neighborhood produce stands and greenmarkets (Union Square, Grand Army Plaza) for fresh food at a fraction of supermarket prices.',
          'Take advantage of NYC Restaurant Week, Broadway Week 2-for-1 tickets, and free outdoor summer movies in public parks.',
          'Set up automatic billing alerts for electricity and internet to track variable charges.'
        ],
        contact: 'NYC Department of Consumer and Worker Protection: Dial 311',
        link: 'https://nyc.gov/dcwp',
        tip: 'Use apps like Too Good To Go to rescue surplus gourmet meals from local bakeries and restaurants for $4–$6.'
      }
    ]
  }
];

// 6 Wellness Resources (each with 3 detailed guides = 18 guides) + Daily Affirmations
export const WELLNESS_RESOURCES_DATA = [
  {
    id: 'well_hotlines',
    name: 'Crisis Hotlines & 24/7 Immediate Support',
    icon: 'PhoneCall',
    badge: 'Immediate Help',
    badgeColor: 'bg-red-100 text-red-700',
    description: 'Confidential, free, 24/7 crisis support lines and mobile outreach dispatchers.',
    items: [
      {
        id: 'well_hot_1',
        title: '988 Suicide & Crisis Lifeline',
        detail: 'Call or text 988 anytime. Free, confidential support from trained crisis counselors for you or a loved one in distress. Available in English, Spanish, and 240+ languages via translation.',
        actionText: 'Call 988',
        actionHref: 'tel:988'
      },
      {
        id: 'well_hot_2',
        title: 'NYC Well: 24/7 Free City Mental Health Line',
        detail: 'Talk, text, or chat with a counselor who understands NYC resources. Can dispatch Mobile Crisis Teams directly to your home if an in-person evaluation is needed.',
        actionText: 'Call 1-888-NYC-WELL',
        actionHref: 'tel:18886929355'
      },
      {
        id: 'well_hot_3',
        title: 'Crisis Text Line: Text HOME to 741741',
        detail: 'Connect with a live volunteer crisis counselor 24/7 via SMS. Ideal when you are in a crowded public space or subway and prefer discreet text support.',
        actionText: 'Text 741741',
        actionHref: 'sms:741741'
      }
    ]
  },
  {
    id: 'well_stress',
    name: 'Managing Relocation & City Sensory Overload',
    icon: 'Compass',
    badge: 'Mindfulness',
    badgeColor: 'bg-amber-100 text-amber-800',
    description: 'Techniques for navigating high-pace urban density, noise sensitivity, and transitional anxiety.',
    items: [
      {
        id: 'well_str_1',
        title: 'The 5-4-3-2-1 Sensory Grounding Technique in Crowds',
        detail: 'When feeling overwhelmed on busy streets: Notice 5 things you can see, 4 you can physically feel, 3 sounds you hear, 2 scents, and 1 positive affirmation.',
        actionText: 'Learn Protocol',
        actionHref: '#guide'
      },
      {
        id: 'well_str_2',
        title: 'Urban Oasis Guide: Finding Quiet Sanctuaries',
        detail: 'Top tranquil spots to decompress: The Cloisters gardens in Fort Tryon Park, Brooklyn Botanic Garden, Green-Wood Cemetery paths, and Elevated Acre in FiDi.',
        actionText: 'View Sanctuaries',
        actionHref: '#guide'
      },
      {
        id: 'well_str_3',
        title: 'The 90-Day Acclimation Timeline',
        detail: 'Recognize that feelings of disorientation, fatigue, and nostalgia are standard physiological responses to relocation that peak around week 3 and stabilize by month 3.',
        actionText: 'Read Timeline',
        actionHref: '#guide'
      }
    ]
  },
  {
    id: 'well_community',
    name: 'Building Authentic Connections & Community',
    icon: 'Users',
    badge: 'Social Health',
    badgeColor: 'bg-blue-100 text-blue-800',
    description: 'Overcoming urban loneliness and establishing meaningful local friendships and circles.',
    items: [
      {
        id: 'well_com_1',
        title: 'The "Third Place" Rule in Your Neighborhood',
        detail: 'Choose one local independent coffee shop, bookstore, or climbing gym and visit at the exact same hour weekly. Familiarity creates effortless social bonds.',
        actionText: 'Find Third Places',
        actionHref: '#guide'
      },
      {
        id: 'well_com_2',
        title: 'Adult Social Sports & Recreational Leagues',
        detail: 'Join ZogSports, NYC Footy, or Volo for casual kickball, dodgeball, volleyball, and soccer where post-game pub socials are built into every league.',
        actionText: 'Explore Leagues',
        actionHref: '#guide'
      },
      {
        id: 'well_com_3',
        title: 'Volunteer with Neighborhood Mutual Aid Groups',
        detail: 'Connect with deeply caring neighbors by volunteering at local community fridges, God\'s Love We Deliver, or City Harvest food distribution sites.',
        actionText: 'Volunteer Hubs',
        actionHref: '#guide'
      }
    ]
  },
  {
    id: 'well_selfcare',
    name: 'Urban Self-Care & Physical Rest Basics',
    icon: 'Smile',
    badge: 'Daily Habits',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'Protecting your sleep hygiene, hydration, and physical energy in a 24-hour metropolis.',
    items: [
      {
        id: 'well_self_1',
        title: 'Acoustic Sleep Hygiene in Noisy Neighborhoods',
        detail: 'Invest in dual-layer silicone earplugs, white noise machines, and heavy thermal blackout curtains to block sirens, delivery trucks, and streetlights.',
        actionText: 'Sleep Checklist',
        actionHref: '#guide'
      },
      {
        id: 'well_self_2',
        title: 'Hydration & Daily Step Recovery',
        detail: 'New residents routinely average 12,000–18,000 steps daily. Wear supportive ergonomic footwear and carry a reusable insulated water bottle (fill up at public parks).',
        actionText: 'Step Wellness',
        actionHref: '#guide'
      },
      {
        id: 'well_self_3',
        title: 'Weekly Digital & Subway Detox Days',
        detail: 'Dedicate one morning each weekend to leaving your phone on Do Not Disturb and taking a long walk through Central Park or along the Hudson River Greenway.',
        actionText: 'Detox Routines',
        actionHref: '#guide'
      }
    ]
  },
  {
    id: 'well_therapy',
    name: 'Finding Professional Mental Health Care',
    icon: 'Sparkles',
    badge: 'Professional',
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'Connecting with licensed therapists, sliding-scale clinics, and community counseling.',
    items: [
      {
        id: 'well_ther_1',
        title: 'Sliding-Scale & Affordable Therapy Clinics in NYC',
        detail: 'Explore training institutes offering quality therapy for $25–$60/session: National Institute for the Psychotherapies (NIP), Gestalt Center, and ICP NYC.',
        actionText: 'View Clinics',
        actionHref: '#guide'
      },
      {
        id: 'well_ther_2',
        title: 'Psychology Today & Alma Therapist Search Strategies',
        detail: 'Filter by exact insurance carrier, specialty (life transitions, anxiety, cross-cultural adjustment), and request a complimentary 15-minute intro call.',
        actionText: 'Directory Tips',
        actionHref: '#guide'
      },
      {
        id: 'well_ther_3',
        title: 'Employee Assistance Programs (EAP) Perks',
        detail: 'Most mid-to-large employers provide 4 to 8 free confidential counseling sessions per year through their EAP that begin within 48 hours.',
        actionText: 'Check EAP Steps',
        actionHref: '#guide'
      }
    ]
  },
  {
    id: 'well_rights',
    name: 'Know Your Rights & Workplace Mental Health Protections',
    icon: 'Shield',
    badge: 'Legal Protections',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    description: 'Legal rights under NYC Human Rights Law, medical leave, and healthcare privacy.',
    items: [
      {
        id: 'well_right_1',
        title: 'NYC Human Rights Law: Reasonable Accommodations',
        detail: 'Employers in NYC with 4+ employees must provide reasonable accommodations for documented mental health conditions without retaliation.',
        actionText: 'View Law Details',
        actionHref: '#guide'
      },
      {
        id: 'well_right_2',
        title: 'New York Paid Family & Medical Leave (NY PFL)',
        detail: 'Eligible employees can take job-protected paid leave to care for their own serious medical condition or a family member with mental health needs.',
        actionText: 'PFL Benefits',
        actionHref: '#guide'
      },
      {
        id: 'well_right_3',
        title: 'Healthcare Parity & Insurance Coverage Rights',
        detail: 'State law requires insurance plans to offer mental health and substance use disorder benefits with equal co-pays and deductibles as physical care.',
        actionText: 'Parity Rights',
        actionHref: '#guide'
      }
    ]
  }
];

// Daily Affirmations for New Residents
export const DAILY_AFFIRMATIONS = [
  {
    text: "Building a home in a new city takes patience. Every step I take today weaves me deeper into the fabric of this vibrant community.",
    author: "CityNest Mindfulness Guide",
    theme: "Patience & Growth"
  },
  {
    text: "I belong here. The energy of this city has room for my unique voice, dreams, and story.",
    author: "New York Newcomer Collective",
    theme: "Belonging"
  },
  {
    text: "It is normal to feel tired as my senses adjust to new sights and sounds. I allow myself to rest without guilt.",
    author: "Urban Wellness Practice",
    theme: "Self-Care"
  },
  {
    text: "Every friendly interaction—with a barista, a neighbor, or a subway companion—is a seed of connection.",
    author: "Community Builders Network",
    theme: "Connection"
  },
  {
    text: "I do not have to conquer the entire metropolis in a week. I choose to discover my own neighborhood one block at a time.",
    author: "Mindful Explorer",
    theme: "Presence"
  },
  {
    text: "Transitions are fertile ground for transformation. I am becoming more resilient, capable, and adventurous every single day.",
    author: "CityNest Wellness Hub",
    theme: "Resilience"
  },
  {
    text: "When I feel small among giant skyscrapers, I remember that human hearts and dreams built every stone.",
    author: "Urban Reflections",
    theme: "Perspective"
  }
];

/**
 * Storage Controller Class with reactive event dispatcher
 */
class DBStore {
  constructor() {
    this.listeners = new Set();
    this.initialize();
  }

  initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.HOUSING)) {
      localStorage.setItem(STORAGE_KEYS.HOUSING, JSON.stringify(SEED_HOUSING));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(SEED_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHECKLIST)) {
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(SEED_CHECKLIST));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED)) {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(SEED_SAVED));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(SEED_USERS[0]));
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (e) { console.error('Store listener error:', e); }
    });
  }

  // --- Users & Auth ---
  getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : SEED_USERS[0];
    } catch {
      return SEED_USERS[0];
    }
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    this.notify();
  }

  getAllUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  }

  loginOrRegister(email, name = '') {
    const users = this.getAllUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      const formattedName = name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      user = {
        id: 'user_' + Date.now(),
        name: formattedName,
        email: email.toLowerCase(),
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
        neighborhood: 'New York City',
        relocatedDate: 'Just arrived',
        created_at: new Date().toISOString()
      };
      users.push(user);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    this.setCurrentUser(user);
    return user;
  }

  // --- Housing Listings ---
  getHousingListings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HOUSING);
      return data ? JSON.parse(data) : SEED_HOUSING;
    } catch {
      return SEED_HOUSING;
    }
  }

  getHousingById(id) {
    return this.getHousingListings().find(h => h.id === id);
  }

  // --- Community Events ---
  getCommunityEvents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return data ? JSON.parse(data) : SEED_EVENTS;
    } catch {
      return SEED_EVENTS;
    }
  }

  getEventById(id) {
    return this.getCommunityEvents().find(e => e.id === id);
  }

  toggleEventRSVP(eventId, user) {
    const events = this.getCommunityEvents();
    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found' };

    const userId = typeof user === 'object' && user ? user.id : user;
    const userEmail = typeof user === 'object' && user ? user.email : null;

    const attendees = event.attendees || [];
    const isAttending = attendees.includes(userId) || (userEmail && attendees.includes(userEmail));

    if (isAttending) {
      event.attendees = attendees.filter(id => id !== userId && (!userEmail || id !== userEmail));
    } else {
      if (attendees.length >= event.max_attendees) {
        return { success: false, message: 'This event has reached full capacity.' };
      }
      event.attendees = [...attendees, userId];
    }

    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    this.notify();
    return { success: true, isAttending: !isAttending, event };
  }

  // --- Checklist Items ---
  getChecklistItems() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
      return data ? JSON.parse(data) : SEED_CHECKLIST;
    } catch {
      return SEED_CHECKLIST;
    }
  }

  toggleChecklistItem(id) {
    const items = this.getChecklistItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.is_completed = !item.is_completed;
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(items));
      this.notify();
    }
    return item;
  }

  addChecklistItem({ title, description, category, priority, due_days }) {
    const items = this.getChecklistItems();
    const newItem = {
      id: 'check_' + Date.now(),
      title,
      description: description || '',
      category: category || 'housing',
      priority: priority || 'medium',
      due_days: Number(due_days) || 7,
      is_completed: false,
      created_at: new Date().toISOString()
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(items));
    this.notify();
    return newItem;
  }

  deleteChecklistItem(id) {
    const items = this.getChecklistItems().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(items));
    this.notify();
  }

  resetChecklistToDefault() {
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(SEED_CHECKLIST));
    this.notify();
  }

  // --- Saved Resources (User-scoped) ---
  getAllSavedResources() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED);
      return data ? JSON.parse(data) : SEED_SAVED;
    } catch {
      return SEED_SAVED;
    }
  }

  getUserSavedResources(userId) {
    const all = this.getAllSavedResources();
    return all.filter(s => s.user_id === userId);
  }

  isResourceSaved(userId, resourceType, resourceId) {
    const userSaved = this.getUserSavedResources(userId);
    return userSaved.some(s => s.resource_type === resourceType && s.resource_id === resourceId);
  }

  saveResource({ userId, resourceType, resourceId, title, notes = '' }) {
    const all = this.getAllSavedResources();
    const existingIndex = all.findIndex(s => s.user_id === userId && s.resource_type === resourceType && s.resource_id === resourceId);

    if (existingIndex >= 0) {
      all[existingIndex].notes = notes;
      all[existingIndex].title = title;
    } else {
      const newSaved = {
        id: 'saved_' + Date.now(),
        user_id: userId,
        resource_type: resourceType,
        resource_id: resourceId,
        title,
        notes,
        created_at: new Date().toISOString()
      };
      all.unshift(newSaved);
    }

    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(all));
    this.notify();
    return true;
  }

  removeSavedResource(savedId, userId) {
    const all = this.getAllSavedResources();
    const filtered = all.filter(s => !(s.id === savedId && s.user_id === userId));
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(filtered));
    this.notify();
  }

  removeSavedByResource(userId, resourceType, resourceId) {
    const all = this.getAllSavedResources();
    const filtered = all.filter(s => !(s.user_id === userId && s.resource_type === resourceType && s.resource_id === resourceId));
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(filtered));
    this.notify();
  }

  updateSavedNotes(savedId, userId, newNotes) {
    const all = this.getAllSavedResources();
    const item = all.find(s => s.id === savedId && s.user_id === userId);
    if (item) {
      item.notes = newNotes;
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(all));
      this.notify();
    }
  }

  // City Services & Wellness Data access
  getCityServices() {
    return CITY_SERVICES_DATA;
  }

  getWellnessResources() {
    return WELLNESS_RESOURCES_DATA;
  }

  getDailyAffirmations() {
    return DAILY_AFFIRMATIONS;
  }
}

export const db = new DBStore();
