import { Property } from '@/types/property';

export const properties: Property[] = [
  {
    id: '1',
    address: '123 Main Street',
    city: 'Harare',
    state: 'Hre',
    zipCode: '94105',
    price: 1250000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: 'house',
    yearBuilt: 2010,
    description: "Beautiful modern home in the heart of Harare. This stunning property features an open floor plan, hardwood floors throughout, and a gourmet kitchen with stainless steel appliances. The primary suite includes a walk-in closet and a spa-like bathroom. Enjoy the private backyard with a deck perfect for entertaining. Close to restaurants, shopping, and public transportation.",
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 37.7749,
    longitude: -122.4194,
    features: ['Hardwood floors', 'Gourmet kitchen', 'Private yard', 'Garage', 'Central AC'],
    status: 'for_sale',
    listedDate: '2023-06-15',
    has3DTour: true,
    tourRooms: [
      {
        id: 'living-room',
        name: 'Living Room',
        panoramaImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 100, y: 150 },
        connections: ['kitchen', 'dining-room']
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        panoramaImage: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 200, y: 150 },
        connections: ['living-room', 'dining-room']
      },
      {
        id: 'dining-room',
        name: 'Dining Room',
        panoramaImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 150, y: 250 },
        connections: ['living-room', 'kitchen', 'master-bedroom']
      },
      {
        id: 'master-bedroom',
        name: 'Master Bedroom',
        panoramaImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 250, y: 300 },
        connections: ['dining-room', 'master-bathroom']
      },
      {
        id: 'master-bathroom',
        name: 'Master Bathroom',
        panoramaImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 350, y: 300 },
        connections: ['master-bedroom']
      }
    ]
  },
  {
    id: '2',
    address: '456 Park Avenue',
    city: 'Highlands',
    state: 'Harare',
    zipCode: '10022',
    price: 3500000,
    beds: 4,
    baths: 3.5,
    sqft: 2400,
    type: 'apartment',
    yearBuilt: 2015,
    description: "Luxury condo in prestigious Park Avenue. This elegant residence offers breathtaking city views through floor-to-ceiling windows. The chef's kitchen features top-of-the-line appliances and marble countertops. The primary bedroom includes a custom walk-in closet and an en-suite bathroom with a soaking tub. Building amenities include 24-hour doorman, fitness center, and rooftop terrace.",
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 40.7128,
    longitude: -74.0060,
    features: ['Doorman', 'Elevator', 'Fitness center', 'Rooftop terrace', 'In-unit laundry'],
    status: 'for_sale',
    listedDate: '2023-05-20',
    has3DTour: true,
    tourRooms: [
      {
        id: 'entry',
        name: 'Entry Foyer',
        panoramaImage: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 100, y: 100 },
        connections: ['living-room']
      },
      {
        id: 'living-room',
        name: 'Living Room',
        panoramaImage: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 200, y: 100 },
        connections: ['entry', 'kitchen', 'master-bedroom']
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        panoramaImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 300, y: 100 },
        connections: ['living-room', 'dining-room']
      },
      {
        id: 'dining-room',
        name: 'Dining Room',
        panoramaImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 400, y: 100 },
        connections: ['kitchen']
      },
      {
        id: 'master-bedroom',
        name: 'Master Bedroom',
        panoramaImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 200, y: 200 },
        connections: ['living-room', 'master-bathroom']
      },
      {
        id: 'master-bathroom',
        name: 'Master Bathroom',
        panoramaImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 300, y: 200 },
        connections: ['master-bedroom']
      }
    ]
  },
  {
    id: '3',
    address: '789 Lake Drive',
    city: 'Budiriro',
    state: 'Harare',
    zipCode: '60611',
    price: 875000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: 'apartment',
    yearBuilt: 2018,
    description: "Modern apartment with stunning lake views. This contemporary unit features an open concept living area with high ceilings and hardwood floors. The kitchen includes quartz countertops and high-end appliances. Both bedrooms have ample closet space and the primary bedroom has an en-suite bathroom. Building amenities include a fitness center, pool, and 24-hour concierge.",
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185008-a33f5c7b1844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 41.8781,
    longitude: -87.6298,
    features: ['Lake view', 'Concierge', 'Pool', 'Fitness center', 'Balcony'],
    status: 'for_rent',
    listedDate: '2023-07-01'
  },
  {
    id: '4',
    address: '101 Ocean Avenue',
    city: 'Borrowdale',
    state: 'Harare',
    zipCode: '33139',
    price: 1950000,
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: 'apartment',
    yearBuilt: 2020,
    description: "Oceanfront luxury condo with panoramic views. This stunning residence features an expansive open floor plan with floor-to-ceiling windows showcasing breathtaking ocean views. The gourmet kitchen includes custom cabinetry, quartz countertops, and top-of-the-line appliances. The primary suite offers a spa-like bathroom and a private balcony. Building amenities include infinity pool, fitness center, spa, and 24-hour security.",
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 25.7617,
    longitude: -80.1918,
    features: ['Ocean view', 'Balcony', 'Pool', 'Spa', 'Fitness center', '24-hour security'],
    status: 'for_sale',
    listedDate: '2023-04-10',
    has3DTour: true,
    tourRooms: [
      {
        id: 'living-room',
        name: 'Living Room',
        panoramaImage: 'https://images.unsplash.com/photo-1560448075-bb485b067938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 100, y: 100 },
        connections: ['kitchen', 'balcony']
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        panoramaImage: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 200, y: 100 },
        connections: ['living-room', 'dining-room']
      },
      {
        id: 'dining-room',
        name: 'Dining Room',
        panoramaImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 300, y: 100 },
        connections: ['kitchen', 'hallway']
      },
      {
        id: 'balcony',
        name: 'Balcony',
        panoramaImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 100, y: 200 },
        connections: ['living-room']
      },
      {
        id: 'hallway',
        name: 'Hallway',
        panoramaImage: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 300, y: 200 },
        connections: ['dining-room', 'master-bedroom', 'guest-bedroom']
      },
      {
        id: 'master-bedroom',
        name: 'Master Bedroom',
        panoramaImage: 'https://images.unsplash.com/photo-1560185127-f4f1c64d9def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 400, y: 200 },
        connections: ['hallway', 'master-bathroom']
      },
      {
        id: 'master-bathroom',
        name: 'Master Bathroom',
        panoramaImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 500, y: 200 },
        connections: ['master-bedroom']
      },
      {
        id: 'guest-bedroom',
        name: 'Guest Bedroom',
        panoramaImage: 'https://images.unsplash.com/photo-1560185127-d3b098583abf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        position: { x: 300, y: 300 },
        connections: ['hallway']
      }
    ]
  },
  {
    id: '5',
    address: '222 Highland Drive',
    city: 'Marondera',
    state: 'Manicaland',
    zipCode: '98109',
    price: 1100000,
    beds: 3,
    baths: 2.5,
    sqft: 1750,
    type: 'townhouse',
    yearBuilt: 2017,
    description: "Modern townhouse in desirable neighborhood. This contemporary home features an open floor plan with high ceilings and abundant natural light. The kitchen boasts quartz countertops, stainless steel appliances, and a large island. The primary bedroom includes a walk-in closet and an en-suite bathroom. Additional features include a rooftop deck with city views and a two-car garage.",
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 47.6062,
    longitude: -122.3321,
    features: ['Rooftop deck', 'City views', 'Two-car garage', 'Smart home features', 'Energy efficient'],
    status: 'for_sale',
    listedDate: '2023-06-05'
  },
  {
    id: '6',
    address: '333 Maple Street',
    city: 'Chitungwiza',
    state: 'Harare',
    zipCode: '78704',
    price: 750000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: 'house',
    yearBuilt: 2005,
    description: "Charming family home in sought-after neighborhood. This spacious residence features a welcoming front porch, formal living and dining rooms, and an updated kitchen that opens to a family room. The primary suite is located on the main level and includes a renovated bathroom. The backyard offers a covered patio, mature landscaping, and a swimming pool. Close to parks, schools, and shopping.",
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185009-5bf9f2849488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 30.2672,
    longitude: -97.7431,
    features: ['Swimming pool', 'Covered patio', 'Updated kitchen', 'Main level primary suite', 'Two-car garage'],
    status: 'for_sale',
    listedDate: '2023-05-15'
  },
  {
    id: '7',
    address: '444 Pine Avenue',
    city: 'Mkoba 8',
    state: 'Gweru',
    zipCode: '80202',
    price: 2500,
    beds: 1,
    baths: 1,
    sqft: 850,
    type: 'apartment',
    yearBuilt: 2019,
    description: "Modern apartment in downtown Gweru. This stylish unit features an open concept living area with hardwood floors and large windows. The kitchen includes stainless steel appliances, quartz countertops, and a breakfast bar. The bedroom offers ample closet space and the bathroom has been updated with modern fixtures. Building amenities include a rooftop terrace, fitness center, and resident lounge.",
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 39.7392,
    longitude: -104.9903,
    features: ['Rooftop terrace', 'Fitness center', 'Resident lounge', 'In-unit laundry', 'Pet friendly'],
    status: 'for_rent',
    listedDate: '2023-07-10'
  },
  {
    id: '8',
    address: '555 Oak Crescent',
    city: 'Chibondo',
    state: 'Hwange',
    zipCode: '97205',
    price: 925000,
    beds: 3,
    baths: 2,
    sqft: 1650,
    type: 'house',
    yearBuilt: 1925,
    description: "Charming craftsman home with modern updates. This historic residence has been thoughtfully renovated to preserve its original character while incorporating contemporary amenities. Features include original hardwood floors, built-in cabinetry, and a wood-burning fireplace. The updated kitchen offers quartz countertops and stainless steel appliances. The backyard includes a deck and mature landscaping.",
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    latitude: 45.5051,
    longitude: -122.6750,
    features: ['Original hardwood floors', 'Wood-burning fireplace', 'Updated kitchen', 'Deck', 'Mature landscaping'],
    status: 'for_sale',
    listedDate: '2023-06-20'
  }
];