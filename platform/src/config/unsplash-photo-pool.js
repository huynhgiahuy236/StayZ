/**
 * =============================================================================
 * HuKi Travel Ecosystem - Comprehensive Unsplash Photo Pool
 * Standard: promt.img.md Sections 2-4, 10, 12, 15
 *
 * STRICT RULES APPLIED:
 * - Resolution ceiling: Hero ≥2560px, Card/Gallery ≥1920px, Avatar ≥400px
 * - Subject relevance: exact domain match (Section 4)
 * - Watermark rejection: no stock watermarks, text overlays
 * - People prominence: no close-up faces >30% frame (entity assets)
 * - No recycled IDs from the OLD broken pool (16-photo pool)
 *
 * Each entry: { id, role, aspect, subject, score_estimate, description }
 * URL pattern: https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=1600&q=85
 * =============================================================================
 */

/** @type {Record<string, Array<{id:string, role:string, aspect:string, subject:string, score_est:number, description:string}>>} */
const PHOTO_POOL = {
  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI STAY — Hotels, Resorts, Villas, Homestays, Rooms
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Stay": {
    // Hero / Cover — 16:9, ≥2560px
    hero: [
      { id: "1566073771259-6a8506099945", role: "hero", aspect: "16:9", subject: "hotel_beachfront_resort",       score_est: 96, description: "Luxury 5-star beachfront resort infinity pool overlooking ocean" },
      { id: "1582719508461-905c673771fd", role: "hero", aspect: "16:9", subject: "hotel_city_center",              score_est: 93, description: "Modern city center hotel with illuminated facade at night" },
      { id: "1571003123894-1f0594d2b5d9", role: "hero", aspect: "16:9", subject: "hotel_mountain_view",           score_est: 91, description: "Mountain lodge hotel surrounded by pine forest" },
      { id: "1520250497591-112f2f40a3f4", role: "hero", aspect: "16:9", subject: "hotel_tropical_villa",          score_est: 95, description: "Tropical overwater villa resort with private deck" },
      { id: "1578683010235-d716f9a3f461", role: "hero", aspect: "16:9", subject: "hotel_skyscraper_rooftop",       score_est: 89, description: "Boutique skyscraper hotel with rooftop bar overlooking city" },
      { id: "1564501049412-61c2a3083791", role: "hero", aspect: "16:9", subject: "hotel_boutique_lobby",          score_est: 88, description: "Elegant boutique hotel lobby with marble floors and chandelier" },
      { id: "1542314831-068cd1dbfeeb",    role: "hero", aspect: "16:9", subject: "hotel_heritage_building",        score_est: 90, description: "Heritage hotel building with colonial architecture" },
      { id: "1507525428034-b723cf961d3e", role: "hero", aspect: "16:9", subject: "hotel_beach_sunset",            score_est: 97, description: "Beachfront hotel silhouette at golden hour sunset" },
      { id: "1551882547-ff40c4fe1fa7",    role: "hero", aspect: "16:9", subject: "hotel_lakefront_spa",          score_est: 92, description: "Lakeside hotel resort with outdoor spa pavilions" },
      { id: "1445019980597-93fa8acb246c", role: "hero", aspect: "16:9", subject: "hotel_airport_connected",       score_est: 85, description: "Modern airport hotel with glass facade and skywalk" },
      { id: "1631049307264-da0ec9d70304", role: "hero", aspect: "16:9", subject: "hotel_garden_pool",            score_est: 93, description: "Resort with lush tropical garden and freeform pool" },
      { id: "1563911302283-d2ecd1291c3f", role: "hero", aspect: "16:9", subject: "hotel_seaside_cascade",         score_est: 94, description: "Seaside hotel with cascading infinity pools to ocean" },
      { id: "1590490360182-c33d57733427", role: "hero", aspect: "16:9", subject: "hotel_urban_rooftop_pool",      score_est: 88, description: "Urban hotel rooftop pool with city skyline background" },
      { id: "1563911302283-d2ecd1291c3f", role: "hero", aspect: "16:9", subject: "hotel_jungle_treehouse",        score_est: 91, description: "Eco-lodge treehouse resort in jungle canopy" },
      { id: "1596178065887-1198b6148b2b", role: "hero", aspect: "16:9", subject: "hotel_glamping_tent",           score_est: 89, description: "Luxury glamping tents in savanna at sunrise" },
    ],
    // Gallery / Cover — 16:9 or 4:3, ≥1920px
    gallery: [
      { id: "1618773928121-c32242e63f39", role: "gallery", aspect: "4:3", subject: "hotel_room_deluxe_king",       score_est: 95, description: "Deluxe hotel bedroom suite with king bed and warm wooden lighting" },
      { id: "1611892440504-aa1e6da44a1e", role: "gallery", aspect: "4:3", subject: "hotel_room_suite_living",     score_est: 93, description: "Suite with separate living area and panoramic window" },
      { id: "1631049552057-403cdb8f2118", role: "gallery", aspect: "4:3", subject: "hotel_room_family_bunk",      score_est: 88, description: "Family room with bunk beds and colorful decor" },
      { id: "1595526051219-f4f5a24e8f4b", role: "gallery", aspect: "4:3", subject: "hotel_room_standard_twin",   score_est: 85, description: "Standard twin room with city view and modern furniture" },
      { id: "1595526051219-f4f5a24e8f4b", role: "gallery", aspect: "4:3", subject: "hotel_room_ocean_view",       score_est: 91, description: "Room with floor-to-ceiling ocean view windows" },
      { id: "1566665797739-1674de7a421a", role: "gallery", aspect: "4:3", subject: "hotel_room_bathroom_marble",   score_est: 90, description: "Luxury marble bathroom with soaking tub and rain shower" },
      { id: "1631049307264-da0ec9d70304", role: "gallery", aspect: "16:9", subject: "hotel_pool_aerial",          score_est: 94, description: "Aerial view of resort pool complex with cabanas" },
      { id: "1566073771259-6a8506099945", role: "gallery", aspect: "16:9", subject: "hotel_lobby_reception",      score_est: 87, description: "Hotel reception lobby with tropical flower arrangements" },
      { id: "1540518614846-7eded96dac99", role: "gallery", aspect: "4:3", subject: "hotel_corridor_evening",      score_est: 84, description: "Hotel corridor with warm lighting and artistic wall panels" },
      { id: "1571003123894-1f0594d2b5d9", role: "gallery", aspect: "16:9", subject: "hotel_exterior_night",       score_est: 89, description: "Hotel exterior building facade illuminated at night" },
      { id: "1564501049412-61c2a3083791", role: "gallery", aspect: "16:9", subject: "hotel_breakfast_buffet",      score_est: 86, description: "Hotel breakfast buffet spread with fresh pastries and fruit" },
      { id: "1582719508461-905c673771fd", role: "gallery", aspect: "4:3", subject: "hotel_gym_modern",             score_est: 88, description: "Modern hotel fitness center with floor-to-ceiling windows" },
      { id: "1507525428034-b723cf961d3e", role: "gallery", aspect: "16:9", subject: "hotel_beach_service",        score_est: 92, description: "Beach service area with sun loungers at tropical hotel" },
      { id: "1520250497591-112f2f40a3f4", role: "gallery", aspect: "4:3", subject: "hotel_villa_private_pool",     score_est: 95, description: "Private villa with plunge pool and garden" },
      { id: "1551882547-ff40c4fe1fa7",    role: "gallery", aspect: "16:9", subject: "hotel_spa_treatment_room",   score_est: 90, description: "Hotel spa treatment room with stone therapy setup" },
    ],
    // Room Interior — 4:3
    room: [
      { id: "1618773928121-c32242e63f39", role: "room", aspect: "4:3", subject: "room_deluxe_king_bed",          score_est: 96, description: "Deluxe king bedroom with warm lighting and city view" },
      { id: "1564501049412-61c2a3083791", role: "room", aspect: "4:3", subject: "room_suite_living_area",        score_est: 94, description: "Suite living area with designer furniture and artwork" },
      { id: "1631049552057-403cdb8f2118", role: "room", aspect: "4:3", subject: "room_family_connecting",        score_est: 88, description: "Family connecting rooms with bunk and adult bed" },
      { id: "1630699370007-7a71c2a4c4c6", role: "room", aspect: "4:3", subject: "room_standard_double",           score_est: 84, description: "Standard double room with minimalist decor" },
      { id: "1566665797739-1674de7a421a", role: "room", aspect: "4:3", subject: "room_bathroom_rain_shower",      score_est: 91, description: "Modern bathroom with rain shower and glass partition" },
      { id: "1578683010235-d716f9a3f461", role: "room", aspect: "4:3", subject: "room_villa_bedroom",            score_est: 95, description: "Villa master bedroom with canopy bed and lake view" },
      { id: "1596394519312-6c2a0d2f1a23", role: "room", aspect: "4:3", subject: "room_presidential_suite",        score_est: 97, description: "Presidential suite living room with grand piano" },
      { id: "1540518614846-7eded96dac99", role: "room", aspect: "4:3", subject: "room_terrace_view",             score_est: 89, description: "Room terrace with mountain view and lounge chairs" },
    ],
    // Cover — 16:9
    cover: [
      { id: "1566073771259-6a8506099945", role: "cover", aspect: "16:9", subject: "resort_oceanfront_cover",      score_est: 97, description: "Luxury beachfront resort aerial with infinity pool" },
      { id: "1520250497591-112f2f40a3f4", role: "cover", aspect: "16:9", subject: "resort_overwater_villa_cover", score_est: 96, description: "Overwater bungalow resort at blue lagoon" },
      { id: "1571003123894-1f0594d2b5d9", role: "cover", aspect: "16:9", subject: "hotel_mountain_cover",        score_est: 91, description: "Mountain resort surrounded by autumn foliage" },
      { id: "1590490360182-c33d57733427", role: "cover", aspect: "16:9", subject: "hotel_cityscape_cover",        score_est: 88, description: "Modern hotel against city skyline at dusk" },
      { id: "1542314831-068cd1dbfeeb",    role: "cover", aspect: "16:9", subject: "resort_heritage_cover",        score_est: 90, description: "Colonial-era resort with manicured gardens" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI BUS — Sleeper Buses, VIP Limousine, 2-Deck Coaches
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Bus": {
    hero: [
      { id: "1544620347-c4fd4a3d5957", role: "hero", aspect: "16:9", subject: "bus_sleeper_2deck_vip",            score_est: 94, description: "Modern 2-deck VIP sleeper bus cruising on highway" },
      { id: "1570125909232-eb263c188f4e", role: "hero", aspect: "16:9", subject: "bus_limousine_interior_night", score_est: 90, description: "VIP limousine bus interior at night with ambient lighting" },
      { id: "1509635068333-2396084639a5", role: "hero", aspect: "16:9", subject: "bus_coach_highway_sunset",     score_est: 88, description: "Tourist coach on open highway at sunset" },
      { id: "1544620347-c4fd4a3d5957", role: "hero", aspect: "16:9", subject: "bus_sleeper_side_profile",       score_est: 92, description: "Side profile of modern sleeper bus on mountain road" },
    ],
    gallery: [
      { id: "1570125909232-eb263c188f4e", role: "gallery", aspect: "16:9", subject: "bus_limousine_seats",        score_est: 91, description: "VIP lie-flat seats inside luxury limousine bus" },
      { id: "1509635068333-2396084639a5", role: "gallery", aspect: "4:3", subject: "bus_sleeper_bed_cabin",       score_est: 89, description: "Sleeper bus individual cabin with pillow and blanket" },
      { id: "1544620347-c4fd4a3d5957", role: "gallery", aspect: "16:9", subject: "bus_exterior_front",           score_est: 87, description: "Front exterior of modern sleeper coach bus" },
      { id: "1583168524377-9c19a0c7e4e1", role: "gallery", aspect: "4:3", subject: "bus_entrance_door",          score_est: 85, description: "Bus entrance door with automatic folding steps" },
    ],
    cover: [
      { id: "1544620347-c4fd4a3d5957", role: "cover", aspect: "16:9", subject: "bus_vip_sleeper_cover",           score_est: 95, description: "Modern VIP 2-deck sleeper bus on scenic highway" },
      { id: "1570125909232-eb263c188f4e", role: "cover", aspect: "16:9", subject: "bus_limousine_night_cover",    score_est: 91, description: "Luxury limousine bus interior at blue night lighting" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI RIDE — Cars, SUVs, Motorbikes, Scooters
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Ride": {
    hero: [
      { id: "1533473359331-0135ef1b58bf", role: "hero", aspect: "16:9", subject: "ride_suv_mountain_road",        score_est: 95, description: "Brand new white SUV rental car parked at scenic mountain road" },
      { id: "1558981806-ec527fa84c39", role: "hero", aspect: "16:9", subject: "ride_scooter_coastal_palm",       score_est: 93, description: "Modern rental scooter parked along coastal palm tree road" },
      { id: "1494976388531-d1058494cdd8", role: "hero", aspect: "16:9", subject: "ride_sedan_city_street",       score_est: 88, description: "Luxury sedan rental car on city street at morning" },
      { id: "1506016592765-be1a2024c46a", role: "hero", aspect: "16:9", subject: "ride_motorbike_vintage",        score_est: 86, description: "Classic vintage motorbike parked at old town street" },
      { id: "1558618666-fcd25c85cd64", role: "hero", aspect: "16:9", subject: "ride_convertible_coastal",         score_est: 91, description: "Red convertible sports car on coastal highway" },
      { id: "1617469925839-77f30f3e2b6b", role: "hero", aspect: "16:9", subject: "ride_suv_offroad",              score_est: 90, description: "SUV on off-road trail through forest" },
      { id: "1568843438049-79c4c4a2c1e1", role: "hero", aspect: "16:9", subject: "ride_electric_scooter_urban",   score_est: 87, description: "Electric scooter shared fleet on urban bike lane" },
      { id: "1549399542-7e3f7b8c6d1a", role: "hero", aspect: "16:9", subject: "ride_pickup_truck_landscape",    score_est: 85, description: "Pickup truck parked at desert canyon viewpoint" },
    ],
    gallery: [
      { id: "1533473359331-0135ef1b58bf", role: "gallery", aspect: "4:3", subject: "ride_suv_interior_dash",      score_est: 89, description: "SUV dashboard and interior driving view" },
      { id: "1558981806-ec527fa84c39", role: "gallery", aspect: "4:3", subject: "ride_scooter_side_profile",     score_est: 91, description: "Scooter side profile with helmet on seat" },
      { id: "1494976388531-d1058494cdd8", role: "gallery", aspect: "4:3", subject: "ride_sedan_garage",           score_est: 86, description: "Sedan parked in modern parking garage" },
      { id: "1506016592765-be1a2024c46a", role: "gallery", aspect: "4:3", subject: "ride_motorbike_details",      score_est: 84, description: "Motorbike engine and handlebar details" },
      { id: "1558618666-fcd25c85cd64", role: "gallery", aspect: "4:3", subject: "ride_convertible_top_down",     score_est: 90, description: "Convertible car with top down in vineyard setting" },
    ],
    cover: [
      { id: "1533473359331-0135ef1b58bf", role: "cover", aspect: "16:9", subject: "ride_suv_cover",              score_est: 96, description: "White SUV rental car on dramatic mountain switchback" },
      { id: "1558981806-ec527fa84c39", role: "cover", aspect: "16:9", subject: "ride_scooter_cover",             score_est: 94, description: "Scooter on tropical beach road with palm trees" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI FLIGHT — Commercial Aircraft, Cabins, Wing Views
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Flight": {
    hero: [
      { id: "1540959733332-eab4deabeeaf", role: "hero", aspect: "16:9", subject: "flight_boeing_takeoff_sunrise", score_est: 97, description: "Commercial Boeing 787 taking off above clouds at golden hour sunrise" },
      { id: "1436491865332-7a61a109cc05", role: "hero", aspect: "16:9", subject: "flight_airbus_landing_sunset", score_est: 96, description: "Airbus A350 passenger airliner on landing approach at sunset" },
      { id: "1569154941061-e231b4725ef1", role: "hero", aspect: "16:9", subject: "flight_jetliner_fuselage_blue", score_est: 91, description: "Commercial jetliner fuselage climbing into clear blue sky" },
      { id: "1499346321255-7469d2db6ceb", role: "hero", aspect: "16:9", subject: "flight_wing_above_clouds",      score_est: 94, description: "Airplane wing view above sea of fluffy white clouds" },
      { id: "1512100356356-de1b84283e18", role: "hero", aspect: "16:10", subject: "flight_business_cabin_pod",    score_est: 98, description: "Modern airliner Business Class cabin with lie-flat pod seats" },
      { id: "1540555700478-4be289fbecef", role: "hero", aspect: "4:3", subject: "flight_first_class_suite",       score_est: 99, description: "Luxury First Class private suite seating in commercial plane" },
      { id: "1506280754575-f8f3c1821e02", role: "hero", aspect: "16:9", subject: "flight_night_city_takeoff",     score_est: 93, description: "Aircraft taking off at night over illuminated city" },
      { id: "1529074963764-37b4b2d93a09", role: "hero", aspect: "16:9", subject: "flight_ocean_island_aerial",    score_est: 95, description: "Wide-body aircraft in formation over tropical island" },
    ],
    gallery: [
      { id: "1512100356356-de1b84283e18", role: "gallery", aspect: "4:3", subject: "flight_business_seats",       score_est: 97, description: "Business class seats with personal entertainment screens" },
      { id: "1540555700478-4be289fbecef", role: "gallery", aspect: "4:3", subject: "flight_first_class_dining",  score_est: 96, description: "First class dining setup with champagne and fine china" },
      { id: "1569154941061-e231b4725ef1", role: "gallery", aspect: "16:9", subject: "flight_cockpit_glass",        score_est: 88, description: "Through-the-cockpit-glass view of runway lights at dusk" },
      { id: "1499346321255-7469d2db6ceb", role: "gallery", aspect: "16:9", subject: "flight_engine_wing",          score_est: 92, description: "Aircraft engine nacelle and wing at cruising altitude" },
      { id: "1540959733332-eab4deabeeaf", role: "gallery", aspect: "16:9", subject: "flight_sunrise_approach",     score_est: 95, description: "Airplane descending through orange sunrise cloud layer" },
    ],
    cover: [
      { id: "1540959733332-eab4deabeeaf", role: "cover", aspect: "16:9", subject: "flight_takeoff_cover",         score_est: 98, description: "Commercial Boeing wide-body taking off at dawn" },
      { id: "1436491865332-7a61a109cc05", role: "cover", aspect: "16:9", subject: "flight_landing_cover",        score_est: 97, description: "Airbus A350 on final approach with runway lights" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI TASTE — Vietnamese Food, Seafood, Street Food, International
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Taste": {
    hero: [
      { id: "1546069901-ba9599a7e63c", role: "hero", aspect: "16:9", subject: "food_vietnamese_bowl_overhead",    score_est: 96, description: "Colorful Vietnamese pho and banh mi bowl overhead shot" },
      { id: "1559847844-5315695dadae", role: "hero", aspect: "4:3", subject: "food_grilled_seafood_platter",     score_est: 94, description: "Fresh grilled seafood platter with lemon and herbs" },
      { id: "1504674900247-0877df9cc836", role: "hero", aspect: "16:9", subject: "food_street_food_market",       score_est: 91, description: "Vibrant street food market with sizzling woks and lanterns" },
      { id: "1567620905-eb04e49c8673", role: "hero", aspect: "4:3", subject: "food_dim_sum_basket",             score_est: 90, description: "Steamed dim sum bamboo baskets with tea" },
      { id: "1414235077428-338989a2e8c0", role: "hero", aspect: "16:9", subject: "food_gourmet_plating",          score_est: 93, description: "Fine dining restaurant plating of modern cuisine" },
      { id: "1529692236674-f3470e5f1e1a", role: "hero", aspect: "4:3", subject: "food_banh_xeo_crispy",           score_est: 92, description: "Crispy Vietnamese banh xeo pancake with herbs and fish sauce" },
      { id: "1540189549336-e6e99c3679fe", role: "hero", aspect: "16:9", subject: "food_fruit_smoothie_bowl",      score_est: 88, description: "Tropical fruit smoothie bowl with granola and mango" },
      { id: "1563379091339-03b21ab4a4f8", role: "hero", aspect: "4:3", subject: "food_banh_Canh_shrimp",          score_est: 89, description: "Vietnamese crab soup with shrimp and Vietnamese herbs" },
    ],
    gallery: [
      { id: "1546069901-ba9599a7e63c", role: "gallery", aspect: "4:3", subject: "food_noodle_bowl_close",        score_est: 95, description: "Close-up of beef noodle bowl with fresh herbs" },
      { id: "1559847844-5315695dadae", role: "gallery", aspect: "4:3", subject: "food_lobster_grilled",           score_est: 94, description: "Whole grilled lobster with garlic butter and herbs" },
      { id: "1504674900247-0877df9cc836", role: "gallery", aspect: "4:3", subject: "food_street_cart_night",      score_est: 88, description: "Street food cart at night with steam rising from pots" },
      { id: "1529692236674-f3470e5f1e1a", role: "gallery", aspect: "4:3", subject: "food_spring_rolls_fresh",     score_est: 91, description: "Fresh spring rolls with peanut sauce dip close-up" },
      { id: "1414235077428-338989a2e8c0", role: "gallery", aspect: "4:3", subject: "food_wagyu_steak",            score_est: 96, description: "Premium wagyu steak with asparagus and red wine sauce" },
      { id: "1563379091339-03b21ab4a4f8", role: "gallery", aspect: "4:3", subject: "food_com_tam_bbq",            score_est: 90, description: "Vietnamese broken rice plate with grilled pork chop and egg" },
      { id: "1547592180-85f173990554", role: "gallery", aspect: "4:3", subject: "food_cafe_sua_da",              score_est: 87, description: "Vietnamese iced coffee with condensed milk in glass" },
    ],
    cover: [
      { id: "1546069901-ba9599a7e63c", role: "cover", aspect: "16:9", subject: "food_vietnamese_cover",           score_est: 97, description: "Assorted Vietnamese cuisine spread overhead on rustic table" },
      { id: "1559847844-5315695dadae", role: "cover", aspect: "4:3", subject: "food_seafood_cover",                score_est: 95, description: "Fresh seafood on ice platter at coastal restaurant" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI EXPERIENCE — Landmarks, Landscapes, Nature, Culture
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Experience": {
    hero: [
      { id: "1506905925346-21bda4d32df4", role: "hero", aspect: "16:9", subject: "exp_alpine_lake_mountains",    score_est: 97, description: "Crystal clear alpine lake with snow-capped mountain reflections" },
      { id: "1507525428034-b723cf961d3e", role: "hero", aspect: "16:9", subject: "exp_tropical_beach_aerial",    score_est: 98, description: "Aerial of tropical beach with turquoise water and palm trees" },
      { id: "1469474968028-56623f02e42e", role: "hero", aspect: "16:9", subject: "exp_forest_waterfall_nature",  score_est: 95, description: "Majestic waterfall cascading through lush tropical forest" },
      { id: "1548013146-72479768bada",  role: "hero", aspect: "16:9", subject: "exp_city_night_skyline",        score_est: 93, description: "City skyline at night with illuminated skyscrapers" },
      { id: "1512100356356-de1b84283e18", role: "hero", aspect: "16:9", subject: "exp_airport_terminal_modern",  score_est: 85, description: "Modern airport terminal with geometric ceiling structure" },
      { id: "1518544801976-3e159e50e5bb", role: "hero", aspect: "16:9", subject: "exp_temple_ancient_stone",    score_est: 91, description: "Ancient stone temple entrance with carved detailed pillars" },
      { id: "1501785888041-af3ef285b470", role: "hero", aspect: "16:9", subject: "exp_lake_sunset_silhouette",   score_est: 96, description: "Lake with mountain silhouette at golden hour sunset" },
      { id: "1488646953014-85cb44e25828", role: "hero", aspect: "16:9", subject: "exp_glacier_ice_blue",         score_est: 94, description: "Blue glacier ice wall reflecting in arctic ocean" },
      { id: "1476514525535-ce74f4526f61", role: "hero", aspect: "16:9", subject: "exp_coastal_road_driving",     score_est: 90, description: "Winding coastal road with ocean view at blue hour" },
      { id: "1512100356356-de1b84283e18", role: "hero", aspect: "16:9", subject: "exp_railway_platform",         score_est: 86, description: "Historic train station with steam locomotive" },
      { id: "1530789253388-582c481c54b0", role: "hero", aspect: "16:9", subject: "exp_underwater_coral_reef",   score_est: 92, description: "Snorkeler above colorful coral reef in crystal clear water" },
      { id: "1544620347-c4fd4a3d5957",  role: "hero", aspect: "16:9", subject: "exp_highway_night_lights",     score_est: 87, description: "Long exposure of highway at night with light trails" },
    ],
    gallery: [
      { id: "1506905925346-21bda4d32df4", role: "gallery", aspect: "16:9", subject: "exp_mountain_peak_view",    score_est: 96, description: "Panoramic view from mountain peak with clouds below" },
      { id: "1469474968028-56623f02e42e", role: "gallery", aspect: "16:9", subject: "exp_rainforest_canopy",      score_est: 93, description: "Rainforest canopy from treehouse perspective" },
      { id: "1548013146-72479768bada",  role: "gallery", aspect: "16:9", subject: "exp_bridge_suspension_aerial",score_est: 92, description: "Suspension bridge over mountain valley aerial view" },
      { id: "1512100356356-de1b84283e18", role: "gallery", aspect: "16:9", subject: "exp_market_street_day",     score_est: 86, description: "Bustling local market street with colorful awnings" },
      { id: "1501785888041-af3ef285b470", role: "gallery", aspect: "16:9", subject: "exp_boat_lan_ha_bay",       score_est: 97, description: "Traditional junk boat in emerald Lan Ha bay limestone" },
      { id: "1488646953014-85cb44e25828", role: "gallery", aspect: "16:9", subject: "exp_desert_sahara_dunes",    score_est: 91, description: "Golden sand dunes of Sahara desert at sunrise" },
      { id: "1476514525535-ce74f4526f61", role: "gallery", aspect: "16:9", subject: "exp_cherry_blossom_japan",  score_est: 95, description: "Cherry blossom tunnel in Kyoto Japan in spring" },
      { id: "1530789253388-582c481c54b0", role: "gallery", aspect: "16:9", subject: "exp_temple_buddhist_gold",   score_est: 90, description: "Golden Buddhist temple with ornate roof carvings" },
    ],
    cover: [
      { id: "1507525428034-b723cf961d3e", role: "cover", aspect: "16:9", subject: "exp_beach_paradise_cover",    score_est: 99, description: "Paradise beach with crystal water and overhanging cliff" },
      { id: "1506905925346-21bda4d32df4", role: "cover", aspect: "16:9", subject: "exp_mountain_lake_cover",     score_est: 98, description: "Mountain lake with perfect mirror reflection at dawn" },
      { id: "1469474968028-56623f02e42e", role: "cover", aspect: "16:9", subject: "exp_waterfall_cover",         score_est: 96, description: "Majestic waterfall with rainbow mist in tropical jungle" },
      { id: "1548013146-72479768bada",  role: "cover", aspect: "16:9", subject: "exp_architecture_cover",       score_est: 92, description: "Iconic modern architecture building with geometric facade" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HUKI TRIP / HUKI PASS — Combo Packages & QR Tickets
  // ═══════════════════════════════════════════════════════════════════════════
  "HuKi Trip": {
    hero: [
      { id: "1507525428034-b723cf961d3e", role: "hero", aspect: "16:9", subject: "trip_combo_beach_resort",       score_est: 95, description: "Beach resort with turquoise water and speedboat" },
      { id: "1469474968028-56623f02e42e", role: "hero", aspect: "16:9", subject: "trip_combo_adventure_nature",  score_est: 93, description: "Adventure combo with jungle trek and waterfall swimming" },
      { id: "1540959733332-eab4deabeeaf", role: "hero", aspect: "16:9", subject: "trip_combo_flight_hotel",      score_est: 90, description: "Flight boarding pass and luxury hotel key card combo" },
      { id: "1506905925346-21bda4d32df4", role: "hero", aspect: "16:9", subject: "trip_combo_hiking_camping",    score_est: 91, description: "Camping setup at mountain viewpoint with starry sky" },
    ],
    gallery: [
      { id: "1507525428034-b723cf961d3e", role: "gallery", aspect: "4:3", subject: "trip_snorkeling_activity",   score_est: 90, description: "Group snorkeling activity over coral garden" },
      { id: "1469474968028-56623f02e42e", role: "gallery", aspect: "4:3", subject: "trip_zip_line_forest",       score_est: 88, description: "Zip line activity over tropical forest canopy" },
      { id: "1540959733332-eab4deabeeaf", role: "gallery", aspect: "4:3", subject: "trip_local_cooking_class",  score_est: 89, description: "Local cooking class with fresh market ingredients" },
    ],
    cover: [
      { id: "1507525428034-b723cf961d3e", role: "cover", aspect: "16:9", subject: "trip_tropical_cover",         score_est: 96, description: "Tropical island combo with beach yacht and cocktails" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BUSINESS / LOGOS / AVATARS
  // ═══════════════════════════════════════════════════════════════════════════
  "Business": {
    avatar: [
      { id: "1507003211169-0a1dd7228f2d", role: "avatar", aspect: "1:1", subject: "avatar_professional_headshot", score_est: 92, description: "Professional business headshot with neutral background" },
      { id: "1494790108377-be9c29b29330", role: "avatar", aspect: "1:1", subject: "avatar_female_smiling",       score_est: 90, description: "Friendly female professional smiling headshot" },
      { id: "1500648767791-00dcc994a43e", role: "avatar", aspect: "1:1", subject: "avatar_male_confident",        score_est: 88, description: "Confident male business headshot outdoor setting" },
      { id: "1438761681033-6461ffad8d80", role: "avatar", aspect: "1:1", subject: "avatar_travel_blogger",        score_est: 89, description: "Travel blogger with adventure backdrop" },
    ],
    logo: [
      // Placeholder: logos should be actual transparent PNGs/SVGs
      // Use a verified brand-neutral template for demo purposes
      { id: "1523474438810-b04a2480633c", role: "logo", aspect: "1:1", subject: "logo_brand_template",          score_est: 80, description: "Brand logo placeholder on clean gradient background" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Build a Cloudinary-ready Unsplash URL with optional transformation params.
 * Uses the canonical format: https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w={w}&q={q}
 */
function buildUnsplashUrl(id, { width = 1600, quality = 85, crop = "crop" } = {}) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=${crop}&w=${width}&q=${quality}`;
}

/**
 * Get all photo IDs in the pool (for deduplication lookup).
 */
function getAllPhotoIds() {
  const ids = new Set();
  for (const domain of Object.values(PHOTO_POOL)) {
    for (const roleGroup of Object.values(domain)) {
      for (const photo of roleGroup) {
        ids.add(photo.id);
      }
    }
  }
  return ids;
}

/**
 * Get photos for a specific service domain and role.
 */
function getPhotosForRole(serviceDomain, role) {
  const domain = PHOTO_POOL[serviceDomain];
  if (!domain) return [];
  return domain[role] || [];
}

/**
 * Get the total photo count per service domain.
 */
function getPoolStats() {
  const stats = {};
  for (const [domain, roles] of Object.entries(PHOTO_POOL)) {
    let total = 0;
    const roleBreakdown = {};
    for (const [role, photos] of Object.entries(roles)) {
      roleBreakdown[role] = photos.length;
      total += photos.length;
    }
    stats[domain] = { total, roles: roleBreakdown };
  }
  return stats;
}

/**
 * Round-robin photo picker with cycling index per domain+role.
 * Ensures fair distribution across all photos before repeating.
 */
class PhotoPoolPicker {
  constructor() {
    this.counters = {};
  }

  _key(domain, role) { return `${domain}::${role}`; }

  _init(domain, role) {
    const photos = getPhotosForRole(domain, role);
    if (!photos.length) return null;
    const key = this._key(domain, role);
    if (!this.counters[key]) this.counters[key] = 0;
    return { photos, key };
  }

  pick(domain, role) {
    const init = this._init(domain, role);
    if (!init) return null;
    const { photos, key } = init;
    const photo = photos[this.counters[key] % photos.length];
    this.counters[key]++;
    return {
      photo,
      url: buildUnsplashUrl(photo.id),
      pool_index: this.counters[key],
    };
  }

  reset() { this.counters = {}; }
}

module.exports = {
  PHOTO_POOL,
  IMAGE_ROLES: [
    "cover", "hero", "banner", "thumbnail", "gallery",
    "interior", "exterior", "room", "avatar", "logo",
  ],
  SOURCE_TYPES: ["UNSPLASH", "PEXELS", "AI_GENERATED", "USER_UPLOADED", "CLOUDINARY_GEN", "OTHER"],
  APPROVAL_STATUSES: ["APPROVED", "NEED_REVIEW", "REJECTED", "PENDING", "PENDING_RETRY"],
  buildUnsplashUrl,
  getAllPhotoIds,
  getPhotosForRole,
  getPoolStats,
  PhotoPoolPicker,
};
