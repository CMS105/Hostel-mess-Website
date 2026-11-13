// Authentic South Indian College Hostel Mess Mock Data
// Brand: MESSMATE - Every Meal Matters. Every Voice Counts.

import { SOUTH_INDIAN_FOOD } from "./foodAssets.js";

export const INITIAL_STUDENT_PROFILE = {
  id: "STU-8821",
  name: "Rahul Sharma",
  rollNo: "21BCE1042",
  room: "B-204",
  hostelBlock: "Kaveri Hostel (Block B)",
  dietPreference: "South Indian Vegetarian",
  totalPoints: 420,
  engagementLevel: "Gold Messmate",
};

export const MEAL_TIMINGS = {
  breakfast: { label: "Breakfast", time: "07:30 AM - 09:30 AM", startHour: 7.5, endHour: 9.5 },
  lunch: { label: "Lunch", time: "12:30 PM - 02:30 PM", startHour: 12.5, endHour: 14.5 },
  snacks: { label: "Evening Snacks", time: "05:00 PM - 06:30 PM", startHour: 17.0, endHour: 18.5 },
  dinner: { label: "Dinner", time: "07:30 PM - 09:30 PM", startHour: 19.5, endHour: 21.5 },
};

// Initial 7-day Weekly Menu (Monday - Sunday) with Authentic South Indian Mess Dishes
export const INITIAL_WEEKLY_MENU = [
  // MONDAY
  {
    id: "m-mon-bf",
    day: "Monday",
    dayIndex: 1,
    mealType: "breakfast",
    name: "Steamed Idli, Medu Vada & Drumstick Sambar",
    description: "Traditional fermented steamed rice idlis and crispy golden medu vada served with piping hot Madras drumstick sambar and fresh coconut chutney.",
    timing: "07:30 AM - 09:30 AM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.idli_sambar,
    avgRating: 4.4,
    ratingCount: 142,
    goodVotes: 121,
    badVotes: 21,
    alternativeDishes: [
      { id: "alt-1", name: "Rava Upma with Coconut Chutney", count: 28 },
      { id: "alt-2", name: "Brown Bread Toast with Jam & Banana", count: 35 }
    ],
    isAvailable: true
  },
  {
    id: "m-mon-lu",
    day: "Monday",
    dayIndex: 1,
    mealType: "lunch",
    name: "South Indian Meals: Rice, Drumstick Sambar, Rasam & Cabbage Palya",
    description: "Boiled Sona Masoori rice served on stainless-steel thali with slow-cooked drumstick sambar, pepper tomato rasam, cabbage beans poriyal, crispy appalam, and set curd.",
    timing: "12:30 PM - 02:30 PM",
    category: "Thali Meals",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 4.1,
    ratingCount: 168,
    goodVotes: 131,
    badVotes: 37,
    alternativeDishes: [
      { id: "alt-3", name: "Soft Chapatis with Dal Tadka", count: 32 },
      { id: "alt-4", name: "Curd Rice with Pomegranate & Pickle", count: 41 }
    ],
    isAvailable: true
  },
  {
    id: "m-mon-sn",
    day: "Monday",
    dayIndex: 1,
    mealType: "snacks",
    name: "Crispy Onion Bajji & Degree Filter Coffee / Tea",
    description: "Hot gram-flour battered sliced onion bajjis, fried crisp and served with green chili dip alongside freshly brewed South Indian filter coffee.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.bajji_tea,
    avgRating: 4.6,
    ratingCount: 195,
    goodVotes: 176,
    badVotes: 19,
    alternativeDishes: [
      { id: "alt-5", name: "Sundal (Tempered Chickpeas with Coconut)", count: 24 },
      { id: "alt-6", name: "Banana with Marie Biscuits", count: 12 }
    ],
    isAvailable: true
  },
  {
    id: "m-mon-di",
    day: "Monday",
    dayIndex: 1,
    mealType: "dinner",
    name: "Soft Chapatis with Vegetable Kurma & Sambar Rice",
    description: "Tawa chapatis paired with traditional coconut-based mixed vegetable kurma, steamed ponni rice, rasam, and Semiya Payasam dessert.",
    timing: "07:30 PM - 09:30 PM",
    category: "Dinner Special",
    imageUrl: SOUTH_INDIAN_FOOD.chapati_kurma,
    avgRating: 4.3,
    ratingCount: 182,
    goodVotes: 150,
    badVotes: 32,
    alternativeDishes: [
      { id: "alt-7", name: "Comfort Moong Dal Khichdi with Ghee", count: 30 },
      { id: "alt-8", name: "Curd Rice with Lemon Pickle", count: 26 }
    ],
    isAvailable: true
  },

  // TUESDAY
  {
    id: "m-tue-bf",
    day: "Tuesday",
    dayIndex: 2,
    mealType: "breakfast",
    name: "Golden Masala Dosa, Sambar & Coconut Chutney",
    description: "Crispy thin fermented crepe filled with savory potato onion palya, served with drumstick sambar, green coconut chutney, and spicy tomato dip.",
    timing: "07:30 AM - 09:30 AM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.masala_dosa,
    avgRating: 4.7,
    ratingCount: 215,
    goodVotes: 199,
    badVotes: 16,
    alternativeDishes: [
      { id: "alt-9", name: "Plain Paper Dosa with Chutney", count: 22 },
      { id: "alt-10", name: "Warm Milk with Cornflakes & Honey", count: 18 }
    ],
    isAvailable: true
  },
  {
    id: "m-tue-lu",
    day: "Tuesday",
    dayIndex: 2,
    mealType: "lunch",
    name: "Rice with Tomato Dal, Mysore Rasam & Aloo Podimas",
    description: "Freshly steamed rice with tempered tomato toor dal, aromatic Mysore rasam, spiced mashed potato roast, papad, and fresh buttermilk.",
    timing: "12:30 PM - 02:30 PM",
    category: "Thali Meals",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 4.2,
    ratingCount: 160,
    goodVotes: 128,
    badVotes: 32,
    alternativeDishes: [
      { id: "alt-11", name: "Whole Wheat Phulkas with Yellow Dal", count: 38 },
      { id: "alt-12", name: "Curd Rice with Boondi", count: 29 }
    ],
    isAvailable: true
  },
  {
    id: "m-tue-sn",
    day: "Tuesday",
    dayIndex: 2,
    mealType: "snacks",
    name: "Mysore Bonda & Fresh Coconut Chutney with Chai",
    description: "Crispy outer crust, airy inside urad-flour fritters seasoned with ginger and whole black pepper, served with fresh coconut chutney and hot tea.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.bonda_chutney,
    avgRating: 4.4,
    ratingCount: 170,
    goodVotes: 145,
    badVotes: 25,
    alternativeDishes: [
      { id: "alt-13", name: "Fresh Robust Banana & Marie Biscuits", count: 15 },
      { id: "alt-14", name: "Black Tea / Green Tea", count: 19 }
    ],
    isAvailable: true
  },
  {
    id: "m-tue-di",
    day: "Tuesday",
    dayIndex: 2,
    mealType: "dinner",
    name: "Bisibelebath with Crispy Boondi & Potato Fry",
    description: "Famous Karnataka spiced rice and lentil pot dish cooked with seasonal carrots, peas, shallots, topped with pure ghee and crispy Kara boondi.",
    timing: "07:30 PM - 09:30 PM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.bisibelebath,
    avgRating: 4.2,
    ratingCount: 145,
    goodVotes: 116,
    badVotes: 29,
    alternativeDishes: [
      { id: "alt-15", name: "Chapatis with Mixed Veg Kurma", count: 48 },
      { id: "alt-16", name: "Light Curd Rice with Pickle", count: 24 }
    ],
    isAvailable: true
  },

  // WEDNESDAY
  {
    id: "m-wed-bf",
    day: "Wednesday",
    dayIndex: 3,
    mealType: "breakfast",
    name: "Ghee Ven Pongal, Medu Vada & Coconut Thuvayal",
    description: "Velvety rice and yellow moong dal cooked with crushed black pepper, cumin seeds, ginger, curry leaves, and generous ghee-roasted cashews with medu vada.",
    timing: "07:30 AM - 09:30 AM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.pongal_vada,
    avgRating: 4.8,
    ratingCount: 230,
    goodVotes: 219,
    badVotes: 11,
    alternativeDishes: [
      { id: "alt-17", name: "Bread Butter with Boiled Egg / Banana", count: 34 },
      { id: "alt-18", name: "Rava Upma with Chutney", count: 18 }
    ],
    isAvailable: true
  },
  {
    id: "m-wed-lu",
    day: "Wednesday",
    dayIndex: 3,
    mealType: "lunch",
    name: "Grand South Thali: Arachuvitta Sambar, Pepper Rasam & Beetroot Poriyal",
    description: "Freshly ground coconut spice sambar, spicy garlic pepper rasam, sweet-savory beetroot poriyal, hot steamed rice, roasted appalam, and set curd.",
    timing: "12:30 PM - 02:30 PM",
    category: "Thali Meals",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 4.0,
    ratingCount: 152,
    goodVotes: 114,
    badVotes: 38,
    alternativeDishes: [
      { id: "alt-19", name: "Phulkas with Aloo Gobi & Dal", count: 52 },
      { id: "alt-20", name: "Lemon Rice with Peanuts", count: 33 }
    ],
    isAvailable: true
  },
  {
    id: "m-wed-sn",
    day: "Wednesday",
    dayIndex: 3,
    mealType: "snacks",
    name: "Sundal (Tempered Chickpeas with Grated Coconut) & Coffee",
    description: "Nutritious white chickpeas boiled tender and tempered with mustard, curry leaves, hing, green chillies, and freshly grated coconut.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.sundal_snack,
    avgRating: 4.5,
    ratingCount: 165,
    goodVotes: 144,
    badVotes: 21,
    alternativeDishes: [
      { id: "alt-21", name: "Roasted Masala Peanuts", count: 16 },
      { id: "alt-22", name: "Degree Filter Coffee", count: 21 }
    ],
    isAvailable: true
  },
  {
    id: "m-wed-di",
    day: "Wednesday",
    dayIndex: 3,
    mealType: "dinner",
    name: "South Indian Vegetable Pulao with Cucumber Pachadi & Salan",
    description: "Fragrant basmati rice gently spiced with star anise, cloves, green peas and carrots, served with cold cucumber mint pachadi and Mysore bonda.",
    timing: "07:30 PM - 09:30 PM",
    category: "Dinner Special",
    imageUrl: SOUTH_INDIAN_FOOD.veg_pulao,
    avgRating: 4.5,
    ratingCount: 190,
    goodVotes: 166,
    badVotes: 24,
    alternativeDishes: [
      { id: "alt-23", name: "Steamed Rice with Tomato Rasam", count: 21 },
      { id: "alt-24", name: "Phulkas with Mixed Veg Kurma", count: 25 }
    ],
    isAvailable: true
  },

  // THURSDAY
  {
    id: "m-thu-bf",
    day: "Thursday",
    dayIndex: 4,
    mealType: "breakfast",
    name: "Golden Puffed Poori with Potato Onion Saagu",
    description: "Two freshly puffed whole wheat pooris served with mild spiced South Indian potato-onion-gramflour saagu and coconut chutney.",
    timing: "07:30 AM - 09:30 AM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.poori_saagu,
    avgRating: 4.3,
    ratingCount: 165,
    goodVotes: 136,
    badVotes: 29,
    alternativeDishes: [
      { id: "alt-25", name: "Semolina Upma with Coconut Chutney", count: 22 },
      { id: "alt-26", name: "Toasted Bread with Butter & Jam", count: 34 }
    ],
    isAvailable: true
  },
  {
    id: "m-thu-lu",
    day: "Thursday",
    dayIndex: 4,
    mealType: "lunch",
    name: "Steamed Rice with Keerai Kootu (Spinach Dal) & Pepper Rasam",
    description: "Healthy greens and yellow dal kootu tempered with cumin, served with hot steamed rice, spicy tomato pepper rasam, roasted vazhaikkai (raw banana), and curd.",
    timing: "12:30 PM - 02:30 PM",
    category: "Thali Meals",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 3.8,
    ratingCount: 140,
    goodVotes: 98,
    badVotes: 42,
    alternativeDishes: [
      { id: "alt-27", name: "Chana Dal Khichdi with Papad", count: 38 },
      { id: "alt-28", name: "Curd Rice with Cucumber Salad", count: 42 }
    ],
    isAvailable: true
  },
  {
    id: "m-thu-sn",
    day: "Thursday",
    dayIndex: 4,
    mealType: "snacks",
    name: "Parippu Vada (Crunchy Dal Vada) & Masala Tea",
    description: "Traditional Kerala/Tamil Nadu style coarse chana dal and shallot fritters, fried extra crunchy with fresh curry leaves and hot spiced tea.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.bajji_tea,
    avgRating: 4.6,
    ratingCount: 180,
    goodVotes: 162,
    badVotes: 18,
    alternativeDishes: [
      { id: "alt-29", name: "Banana with Marie Biscuits", count: 25 },
      { id: "alt-30", name: "Lemon Green Tea", count: 18 }
    ],
    isAvailable: true
  },
  {
    id: "m-thu-di",
    day: "Thursday",
    dayIndex: 4,
    mealType: "dinner",
    name: "Soft Chapatis with Paneer Peas Kurma & Steamed Rice",
    description: "Hand-rolled chapatis served with rich cottage cheese and green peas kurma, steamed ponni rice, tomato rasam, and fruit custard.",
    timing: "07:30 PM - 09:30 PM",
    category: "Dinner Special",
    imageUrl: SOUTH_INDIAN_FOOD.chapati_kurma,
    avgRating: 4.4,
    ratingCount: 160,
    goodVotes: 136,
    badVotes: 24,
    alternativeDishes: [
      { id: "alt-31", name: "Comfort Moong Dal Khichdi", count: 31 },
      { id: "alt-32", name: "Curd Rice with Mango Pickle", count: 19 }
    ],
    isAvailable: true
  },

  // FRIDAY (TODAY)
  {
    id: "m-fri-bf",
    day: "Friday",
    dayIndex: 5,
    mealType: "breakfast",
    name: "Soft Thatte Idli with Gunpowder Podi, Ghee & Sambar",
    description: "Giant soft Karnataka plate idlis dusted with spiced chutney podi and molten ghee, served with hot vegetable drumstick sambar and coconut chutney.",
    timing: "07:30 AM - 09:30 AM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.idli_sambar,
    avgRating: 4.7,
    ratingCount: 190,
    goodVotes: 176,
    badVotes: 14,
    alternativeDishes: [
      { id: "alt-33", name: "Bread Toast with Jam & Boiled Eggs", count: 36 },
      { id: "alt-34", name: "Semolina Upma with Coconut Chutney", count: 20 }
    ],
    isAvailable: true
  },
  {
    id: "m-fri-lu",
    day: "Friday",
    dayIndex: 5,
    mealType: "lunch",
    name: "Friday Feast: Sona Masoori Rice, Brinjal Sambar, Rasam & Beans Palya",
    description: "Steamed rice with authentic tamarind brinjal drumstick sambar, pepper cumin rasam, green beans carrot palya, roasted appalam, set curd, and lime pickle.",
    timing: "12:30 PM - 02:30 PM",
    category: "Thali Meals",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 4.1,
    ratingCount: 165,
    goodVotes: 128,
    badVotes: 37,
    alternativeDishes: [
      { id: "alt-35", name: "Whole Wheat Chapatis with Dal", count: 68 },
      { id: "alt-36", name: "Comfort Curd Rice with Pomegranate", count: 32 }
    ],
    isAvailable: true
  },
  {
    id: "m-fri-sn",
    day: "Friday",
    dayIndex: 5,
    mealType: "snacks",
    name: "Mysore Bonda with Spicy Tomato Chutney & Degree Filter Coffee",
    description: "Deep-fried golden flour dumplings seasoned with crushed peppercorns and grated ginger, paired with tangy tomato dip and hot filter coffee.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.bonda_chutney,
    avgRating: 5.0, // EXACT TEST 6: Displays "5.0 / 5 | 1 rating"
    ratingCount: 1, // Exactly 1 rating
    goodVotes: 1,
    badVotes: 0,
    alternativeDishes: [
      { id: "alt-37", name: "Fresh Banana & Marie Biscuits", count: 14 },
      { id: "alt-38", name: "Black Tea with Jaggery", count: 27 }
    ],
    isAvailable: true
  },
  {
    id: "m-fri-di",
    day: "Friday",
    dayIndex: 5,
    mealType: "dinner",
    name: "Tomato Bath / Lemon Rice with Coconut Chutney & Rice Sambar",
    description: "Fragrant Karnataka style spicy tomato rice tempered with curry leaves and peanuts, accompanied by coconut chutney, steamed rice, rasam, and fruit custard.",
    timing: "07:30 PM - 09:30 PM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.tomato_bath,
    avgRating: 4.3,
    ratingCount: 175,
    goodVotes: 144,
    badVotes: 31,
    alternativeDishes: [
      { id: "alt-39", name: "Soft Phulkas with Dal", count: 28 },
      { id: "alt-40", name: "Curd Rice with Mango Pickle", count: 35 }
    ],
    isAvailable: true
  },

  // SATURDAY
  {
    id: "m-sat-bf",
    day: "Saturday",
    dayIndex: 6,
    mealType: "breakfast",
    name: "Onion Tomato Uttapam & Coriander Coconut Chutney",
    description: "Thick savory rice pancakes griddled with finely chopped shallots, tomatoes, and green chillies, served with fresh coriander coconut chutney and sambar.",
    timing: "07:30 AM - 09:30 AM",
    category: "South Indian",
    imageUrl: SOUTH_INDIAN_FOOD.plain_dosa,
    avgRating: 4.3, // EXACT TEST 7: Displays "4.3 / 5 | 4 ratings"
    ratingCount: 4, // Exactly 4 ratings
    goodVotes: 3,
    badVotes: 1,
    alternativeDishes: [
      { id: "alt-41", name: "Bread Toast with Jam", count: 24 },
      { id: "alt-42", name: "Banana with Milk", count: 30 }
    ],
    isAvailable: true
  },
  {
    id: "m-sat-lu",
    day: "Saturday",
    dayIndex: 6,
    mealType: "lunch",
    name: "Tangy Puliyogare (Tamarind Rice), Mor Kuzhambu & Potato Roast",
    description: "Temple style tamarind rice tossed with roasted peanuts, sesame and curry leaves, accompanied by buttermilk coconut mor kuzhambu and spiced potato fry.",
    timing: "12:30 PM - 02:30 PM",
    category: "Thali Meals",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 4.2,
    ratingCount: 148,
    goodVotes: 118,
    badVotes: 30,
    alternativeDishes: [
      { id: "alt-43", name: "Plain Steamed Rice with Toor Dal", count: 22 },
      { id: "alt-44", name: "Curd Rice with Pomegranate", count: 31 }
    ],
    isAvailable: true
  },
  {
    id: "m-sat-sn",
    day: "Saturday",
    dayIndex: 6,
    mealType: "snacks",
    name: "Maddur Vada & Hot Ginger Filter Tea",
    description: "Authentic Karnataka crispy onion and semolina specialty fritter flavored with curry leaves, hing and green chillies, served with ginger milk tea.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.bajji_tea,
    avgRating: 0, // EXACT TEST 5: Displays "Not rated yet | 0 ratings"
    ratingCount: 0, // Zero ratings
    goodVotes: 0,
    badVotes: 0,
    alternativeDishes: [
      { id: "alt-45", name: "Seasonal Banana & Biscuits", count: 20 },
      { id: "alt-46", name: "Green Tea", count: 15 }
    ],
    isAvailable: true
  },
  {
    id: "m-sat-di",
    day: "Saturday",
    dayIndex: 6,
    mealType: "dinner",
    name: "Soft Chapatis with Vegetable Kurma & Rava Kesari",
    description: "Fresh tawa chapatis paired with comforting mixed vegetable coconut kurma, steamed rice, tomato rasam, and traditional saffron rava kesari.",
    timing: "07:30 PM - 09:30 PM",
    category: "Dinner Special",
    imageUrl: SOUTH_INDIAN_FOOD.chapati_kurma,
    avgRating: 4.4,
    ratingCount: 165,
    goodVotes: 140,
    badVotes: 25,
    alternativeDishes: [
      { id: "alt-47", name: "Comfort Moong Dal Khichdi", count: 29 },
      { id: "alt-48", name: "Curd Rice with Pickle", count: 42 }
    ],
    isAvailable: true
  },

  // SUNDAY
  {
    id: "m-sun-bf",
    day: "Sunday",
    dayIndex: 0,
    mealType: "breakfast",
    name: "Sunday Special: Poori Saagu & Saffron Rava Kesari with Filter Coffee",
    description: "Weekend special featuring three fluffy golden pooris, savory potato onion saagu, sweet ghee rava kesari, and freshly decocted South Indian filter coffee.",
    timing: "08:00 AM - 10:30 AM",
    category: "Special",
    imageUrl: SOUTH_INDIAN_FOOD.poori_saagu,
    avgRating: 4.8,
    ratingCount: 265,
    goodVotes: 252,
    badVotes: 13,
    alternativeDishes: [
      { id: "alt-49", name: "Steamed Idli with Sambar & Chutney", count: 24 },
      { id: "alt-50", name: "Bread Toast with Jam", count: 18 }
    ],
    isAvailable: true
  },
  {
    id: "m-sun-lu",
    day: "Sunday",
    dayIndex: 0,
    mealType: "lunch",
    name: "Sunday Grand Mess Feast: Ghee Rice, Paneer Kurma, Appalam & Paal Payasam",
    description: "Aromatic jeera ghee rice, rich vegetable coconut paneer kurma, onion cucumber raita, crunchy giant appalam, sweet paal payasam, and vanilla ice cream cup.",
    timing: "12:30 PM - 02:45 PM",
    category: "Special",
    imageUrl: SOUTH_INDIAN_FOOD.meals_thali,
    avgRating: 4.7,
    ratingCount: 250,
    goodVotes: 231,
    badVotes: 19,
    alternativeDishes: [
      { id: "alt-51", name: "South Indian Veg Dum Biryani", count: 45 },
      { id: "alt-52", name: "Comfort Curd Rice", count: 16 }
    ],
    isAvailable: true
  },
  {
    id: "m-sun-sn",
    day: "Sunday",
    dayIndex: 0,
    mealType: "snacks",
    name: "Banana & South Indian Mixture with Filter Coffee / Tea",
    description: "Fresh Robusta banana, crunchy spicy South Indian mixture namkeen, and hot filter coffee.",
    timing: "05:00 PM - 06:30 PM",
    category: "Snacks",
    imageUrl: SOUTH_INDIAN_FOOD.filter_coffee,
    avgRating: 4.4,
    ratingCount: 160,
    goodVotes: 136,
    badVotes: 24,
    alternativeDishes: [
      { id: "alt-53", name: "Marie Biscuits & Tea", count: 12 },
      { id: "alt-54", name: "Roasted Makhana", count: 22 }
    ],
    isAvailable: true
  },
  {
    id: "m-sun-di",
    day: "Sunday",
    dayIndex: 0,
    mealType: "dinner",
    name: "Light Mess Dinner: Chapatis, Steamed Rice, Lemon Rasam & Curd Rice",
    description: "Gentle Sunday night meal with soft chapatis, yellow dal, soothing hot lemon rasam, rice, papad, and homestyle curd rice with mango pickle.",
    timing: "07:30 PM - 09:30 PM",
    category: "Comfort",
    imageUrl: SOUTH_INDIAN_FOOD.curd_rice,
    avgRating: 4.2,
    ratingCount: 155,
    goodVotes: 124,
    badVotes: 31,
    alternativeDishes: [
      { id: "alt-55", name: "Moong Dal Khichdi with Ghee", count: 32 },
      { id: "alt-56", name: "Phulkas with Aloo Palya", count: 26 }
    ],
    isAvailable: true
  }
];

// Announcements tailored to South Indian mess operations
export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Sunday Special Grand Feast: Ghee Rice & Paal Payasam",
    category: "Special Feast",
    priority: "High",
    date: "2026-11-13",
    time: "10:30 AM",
    content: "Sunday lunch will feature Aromatic Ghee Rice, Vegetable Kurma, Paal Payasam and Ice Cream. Counter open till 02:45 PM.",
    author: "Kaveri Hostel Mess Warden"
  },
  {
    id: "ann-2",
    title: "Fresh Whole Wheat Chapatis at Counter 3",
    category: "Menu Update",
    priority: "Normal",
    date: "2026-11-12",
    time: "03:15 PM",
    content: "Based on student alternative requests, fresh tawa chapatis are now served parallelly during lunch service at Counter 3.",
    author: "Mess Operations Supervisor"
  },
  {
    id: "ann-3",
    title: "UV Water Cooler Filter Replacement Completed",
    category: "Hygiene",
    priority: "Normal",
    date: "2026-11-11",
    time: "09:00 AM",
    content: "All water coolers in Dining Hall A and B underwent monthly deep sanitization and sediment filter replacement. Verified 100% pure.",
    author: "Health & Safety Incharge"
  },
  {
    id: "ann-4",
    title: "Food Waste Awareness: 22 kg Saved in Rasam & Rice Portions",
    category: "Green Campus",
    priority: "Normal",
    date: "2026-11-10",
    time: "06:00 PM",
    content: "Plate scraping audit shows a 14% drop in rice wastage this week! Thank you for taking mindful portions.",
    author: "Student Mess Committee"
  }
];

// Simplified Cleanliness Data (Clean vs Needs Attention binary tracking)
export const INITIAL_CLEANLINESS_DATA = {
  areas: {
    diningHall: { name: "Dining Hall", cleanVotes: 145, needsAttentionVotes: 39, satisfactionPct: 79 },
    diningTables: { name: "Dining Tables", cleanVotes: 162, needsAttentionVotes: 34, satisfactionPct: 83 },
    drinkingWater: { name: "Drinking Water Area", cleanVotes: 190, needsAttentionVotes: 25, satisfactionPct: 88 },
    kitchenHygiene: { name: "Kitchen & Cooking Prep", cleanVotes: 74, needsAttentionVotes: 14, satisfactionPct: 84 },
    washrooms: { name: "Washrooms & Handwash Area", cleanVotes: 128, needsAttentionVotes: 36, satisfactionPct: 78 }
  },
  inspectionLogs: [
    {
      id: "insp-01",
      date: "2026-11-13 11:30 AM",
      inspector: "K. Subramanian (Mess Warden)",
      location: "Kitchen & Dosa Griddles",
      status: "Clean",
      notes: "Griddles and idli steamers sanitized. Kitchen staff wearing aprons and hairnets.",
      correctiveAction: "Routine check verified. High standard maintained.",
      isCompleted: true
    },
    {
      id: "insp-02",
      date: "2026-11-12 03:00 PM",
      inspector: "S. Priya (Student Mess Secretary)",
      location: "Plate Return & Wash Counter",
      status: "Needs attention",
      notes: "Sambar spills on floor near plate wash tray. Water tap nozzle loose.",
      correctiveAction: "Housekeeping deployed for immediate dry mop; maintenance tightened tap.",
      isCompleted: true
    },
    {
      id: "insp-03",
      date: "2026-11-11 08:30 PM",
      inspector: "Dr. Arvind (Hostel Warden)",
      location: "Handwash Basin & Soap Dispensers",
      status: "Clean",
      notes: "All 4 automatic liquid soap dispensers refilled and fully operational.",
      correctiveAction: "Passed inspection.",
      isCompleted: true
    }
  ],
  hygieneReports: [
    {
      id: "REP-401",
      feedbackId: "FB-089",
      issueType: "Water cleanliness problems",
      location: "Drinking Water Dispenser #2",
      severity: "High",
      description: "Water dripping continuously on floor around dispenser creating slippery puddle near dining row 4.",
      status: "In Progress",
      timestamp: "2026-11-13 01:15 PM",
      adminNotes: "Plumber deployed. Replacement rubber seal installed.",
      resolvedAt: null
    },
    {
      id: "REP-402",
      feedbackId: "FB-084",
      issueType: "Unclean utensils",
      location: "Stainless Steel Plate Tray Counter",
      severity: "Medium",
      description: "Water marks and grease residue on steel thali plates at counter B.",
      status: "Resolved",
      timestamp: "2026-11-12 01:30 PM",
      adminNotes: "Dishwasher rinse water temperature calibrated to 75°C. 300 plates re-sanitized.",
      resolvedAt: "2026-11-12 02:45 PM"
    },
    {
      id: "REP-403",
      feedbackId: "FB-077",
      issueType: "Improper waste disposal",
      location: "Dining Hall Left Exit Bins",
      severity: "Medium",
      description: "Solid food waste bin was overflowing during peak 1:30 PM lunch hour.",
      status: "Resolved",
      timestamp: "2026-11-11 08:45 PM",
      adminNotes: "Additional 120-litre covered foot-pedal bin added to exit row.",
      resolvedAt: "2026-11-12 09:30 AM"
    }
  ]
};

// Initial Food Waste Logs with South Indian Mess Context
export const INITIAL_FOOD_WASTE_RECORDS = [
  {
    id: "fw-01",
    date: "2026-11-13",
    mealType: "lunch",
    foodType: "Steamed Rice & Sambar",
    preparedKg: 160,
    servedKg: 136,
    remainingKg: 24,
    wastedKg: 18, // 11.2%
    studentsServed: 410,
    reason: "Rice portion left uneaten on thalis",
    recordedBy: "Mess Duty Supervisor"
  },
  {
    id: "fw-02",
    date: "2026-11-12",
    mealType: "dinner",
    foodType: "Bisibelebath & Kurma",
    preparedKg: 145,
    servedKg: 118,
    remainingKg: 27,
    wastedKg: 24, // 16.5% - Exceeds 15% threshold
    studentsServed: 360,
    reason: "Students studying for midterms skipped regular dinner",
    recordedBy: "Evening Supervisor"
  },
  {
    id: "fw-03",
    date: "2026-11-12",
    mealType: "lunch",
    foodType: "Tomato Dal & Rice",
    preparedKg: 150,
    servedKg: 138,
    remainingKg: 12,
    wastedKg: 9, // 6%
    studentsServed: 420,
    reason: "Normal plate scrapings",
    recordedBy: "Mess Duty Supervisor"
  },
  {
    id: "fw-04",
    date: "2026-11-11",
    mealType: "dinner",
    foodType: "Vegetable Dum Pulao",
    preparedKg: 170,
    servedKg: 162,
    remainingKg: 8,
    wastedKg: 7, // 4.1% - High popularity
    studentsServed: 460,
    reason: "High student turnout, minimal leftovers",
    recordedBy: "Evening Supervisor"
  },
  {
    id: "fw-05",
    date: "2026-11-10",
    mealType: "lunch",
    foodType: "Keerai Kootu & Rice",
    preparedKg: 140,
    servedKg: 121,
    remainingKg: 19,
    wastedKg: 16, // 11.4%
    studentsServed: 380,
    reason: "Low student preference for greens",
    recordedBy: "Mess Duty Supervisor"
  },
  {
    id: "fw-06",
    date: "2026-11-09",
    mealType: "dinner",
    foodType: "Whole Wheat Chapatis & Kurma",
    preparedKg: 155,
    servedKg: 147,
    remainingKg: 8,
    wastedKg: 6, // 3.8%
    studentsServed: 430,
    reason: "Popular dinner item with very low plate wastage",
    recordedBy: "Evening Supervisor"
  },
  {
    id: "fw-07",
    date: "2026-11-08",
    mealType: "lunch",
    foodType: "Sunday Feast Mysore Pak & Thali",
    preparedKg: 190,
    servedKg: 182,
    remainingKg: 8,
    wastedKg: 5, // 2.6%
    studentsServed: 470,
    reason: "Special weekend feast enjoyed thoroughly by hostellers",
    recordedBy: "Chief Mess Warden"
  }
];

// Initial Anonymous Student Feedback Logs (Strict Zero-PII Privacy: FB-001, FB-002...)
export const INITIAL_FEEDBACK_LOGS = [
  {
    id: "FB-001",
    mealId: "m-thu-lu",
    mealName: "Steamed Rice with Keerai Kootu (Spinach Dal)",
    choice: "needs_improvement",
    selectedReasons: ["Poor taste", "Too oily"],
    studentFeedback: "The spinach kootu had too much oil floating on top and salt was very uneven. Keerai felt stringy.",
    constructiveSuggestion: "Please use less tempering oil and ensure greens are chopped fine before cooking.",
    timestamp: "2026-11-12 01:45 PM",
    mealCategory: "Thali Meals"
  },
  {
    id: "FB-002",
    mealId: "m-fri-lu",
    mealName: "Friday Feast: Sona Masoori Rice, Brinjal Sambar, Rasam & Beans Palya",
    choice: "good",
    selectedReasons: [],
    studentFeedback: "Sambar was flavorful and rasam had the right amount of crushed pepper. Best Friday lunch this month!",
    constructiveSuggestion: "Keep this sambar consistency every Friday.",
    timestamp: "2026-11-13 01:52 PM",
    mealCategory: "Thali Meals"
  },
  {
    id: "FB-003",
    mealId: "m-wed-bf",
    mealName: "Ghee Ven Pongal, Medu Vada & Coconut Thuvayal",
    choice: "good",
    selectedReasons: [],
    studentFeedback: "Pongal had generous ghee and cashew aroma. Vada was crunchy on the outside.",
    constructiveSuggestion: "Offer ginger chutney as an extra side option.",
    timestamp: "2026-11-11 08:40 AM",
    mealCategory: "South Indian"
  },
  {
    id: "FB-004",
    mealId: "m-tue-di",
    mealName: "Bisibelebath with Crispy Boondi & Potato Fry",
    choice: "needs_improvement",
    selectedReasons: ["Food was cold", "Too spicy"],
    studentFeedback: "Bisibelebath was lukewarm by 8:30 PM. Spice level made it hard to finish without extra curd.",
    constructiveSuggestion: "Keep the insulated containers closed between student batches.",
    timestamp: "2026-11-11 08:50 PM",
    mealCategory: "South Indian"
  }
];

// Initial Alternative Food Requests
export const INITIAL_ALTERNATIVE_REQUESTS = [
  {
    id: "req-01",
    mealId: "m-fri-lu",
    mealName: "Friday Feast: Sona Masoori Rice, Brinjal Sambar",
    requestedDish: "Whole Wheat Chapatis with Dal",
    requestCount: 68,
    date: "2026-11-13",
    status: "Accepted",
    adminNotes: "Counter 3 dedicated to parallel chapati batch."
  },
  {
    id: "req-02",
    mealId: "m-wed-lu",
    mealName: "Grand South Thali",
    requestedDish: "Curd Rice with Pomegranate",
    requestCount: 41,
    date: "2026-11-11",
    status: "Accepted",
    adminNotes: "Chilled curd rice provided at cold buffet counter."
  },
  {
    id: "req-03",
    mealId: "m-thu-lu",
    mealName: "Keerai Kootu & Rice",
    requestedDish: "Phulkas with Yellow Dal Fry",
    requestCount: 38,
    date: "2026-11-12",
    status: "Planned",
    adminNotes: "Adding Phulka counter on Thursday lunch from next week."
  }
];

// Student Participation Points History
export const INITIAL_POINTS_HISTORY = [
  {
    id: "pt-01",
    activity: "Food Evaluation Submitted",
    details: "Voted 👍 GOOD for Friday Thatte Idli",
    points: 25,
    timestamp: "2026-11-13 09:10 AM"
  },
  {
    id: "pt-02",
    activity: "Hygiene Issue Reported",
    details: "Reported water puddle near dispenser #2",
    points: 40,
    timestamp: "2026-11-13 01:15 PM"
  },
  {
    id: "pt-03",
    activity: "Constructive Feedback Given",
    details: "Suggested less tempering oil for keerai kootu",
    points: 30,
    timestamp: "2026-11-12 01:45 PM"
  },
  {
    id: "pt-04",
    activity: "Cleanliness Audit Completed",
    details: "Evaluated 5 mess zones for Wednesday audit",
    points: 25,
    timestamp: "2026-11-11 02:15 PM"
  },
  {
    id: "pt-05",
    activity: "Alternative Dish Requested",
    details: "Voted for Whole Wheat Chapatis option",
    points: 15,
    timestamp: "2026-11-10 11:20 AM"
  }
];

// Student Rated Meals in Demo Session
export const INITIAL_STUDENT_RATINGS = [
  {
    mealId: "m-fri-bf",
    mealName: "Soft Thatte Idli with Gunpowder Podi, Ghee & Sambar",
    choice: "good",
    score: 5.0,
    ratedAt: "2026-11-13 09:10 AM"
  },
  {
    mealId: "m-thu-di",
    mealName: "Soft Chapatis with Paneer Peas Kurma & Steamed Rice",
    choice: "good",
    score: 5.0,
    ratedAt: "2026-11-12 08:45 PM"
  },
  {
    mealId: "m-wed-bf",
    mealName: "Ghee Ven Pongal, Medu Vada & Coconut Thuvayal",
    choice: "good",
    score: 5.0,
    ratedAt: "2026-11-11 08:40 AM"
  }
];

// Fictional Hostel Eco Champion Weekly Leaderboard (Rewarded for participation & zero waste, NOT positive ratings!)
export const INITIAL_ECO_LEADERBOARD = [
  {
    rank: 1,
    id: "STU-8804",
    name: "Priya Nair",
    room: "Room A-312",
    hostelBlock: "Hostel Block A",
    totalPoints: 540,
    cleanPlatesCount: 21,
    verifiedAudits: 8,
    badge: "Zero Waste Champion",
    badgeIcon: "leaf"
  },
  {
    rank: 2,
    id: "STU-8819",
    name: "Ananya Iyer",
    room: "Room C-108",
    hostelBlock: "Hostel Block C",
    totalPoints: 495,
    cleanPlatesCount: 19,
    verifiedAudits: 7,
    badge: "Master Critic",
    badgeIcon: "star"
  },
  {
    rank: 3,
    id: "STU-8821",
    name: "Rahul Sharma (You)",
    room: "Room B-204",
    hostelBlock: "Hostel Block B",
    totalPoints: 420,
    cleanPlatesCount: 16,
    verifiedAudits: 6,
    badge: "Gold Messmate",
    badgeIcon: "award"
  },
  {
    rank: 4,
    id: "STU-8835",
    name: "Karthik Raman",
    room: "Room B-110",
    hostelBlock: "Hostel Block B",
    totalPoints: 390,
    cleanPlatesCount: 15,
    verifiedAudits: 5,
    badge: "Vigilant Auditor",
    badgeIcon: "shield"
  },
  {
    rank: 5,
    id: "STU-8842",
    name: "Sneha Hegde",
    room: "Room A-205",
    hostelBlock: "Hostel Block A",
    totalPoints: 365,
    cleanPlatesCount: 14,
    verifiedAudits: 4,
    badge: "Mindful Portions",
    badgeIcon: "sparkles"
  },
  {
    rank: 6,
    id: "STU-8857",
    name: "Vikramaditya K",
    room: "Room C-302",
    hostelBlock: "Hostel Block C",
    totalPoints: 320,
    cleanPlatesCount: 12,
    verifiedAudits: 3,
    badge: "Silver Contributor",
    badgeIcon: "award"
  },
  {
    rank: 7,
    id: "STU-8869",
    name: "Divya Murthy",
    room: "Room B-401",
    hostelBlock: "Hostel Block B",
    totalPoints: 280,
    cleanPlatesCount: 10,
    verifiedAudits: 3,
    badge: "Bronze Explorer",
    badgeIcon: "award"
  }
];

// Curated South Indian Replacement Suggestions for Disliked Dishes
export const SMART_SOUTH_INDIAN_REPLACEMENTS = [
  {
    dislikedKeywords: ["Keerai Kootu", "Spinach Dal", "Bitter Gourd"],
    recommendedReplacement: "Carrot Beans Poriyal with Fresh Grated Coconut & Chana Dal",
    reason: "Less oil requirement, significantly higher student approval rating in South Indian college mess audits.",
    projectedSatisfactionDelta: "+0.8 ★",
    mealType: "lunch",
    category: "Thali Meals"
  },
  {
    dislikedKeywords: ["Upma", "Vegetable Khichdi"],
    recommendedReplacement: "Crispy Ghee Rava Dosa with Gunpowder Podi & Coconut Chutney",
    reason: "Fermented/rava crisp texture addresses texture complaints commonly associated with semolina upma.",
    projectedSatisfactionDelta: "+0.7 ★",
    mealType: "breakfast",
    category: "South Indian"
  },
  {
    dislikedKeywords: ["Bisibelebath", "Tomato Bath", "Pulao"],
    recommendedReplacement: "Fresh Whole Wheat Tawa Chapatis with Mixed Vegetable Paneer Kurma",
    reason: "High student demand for light dinner rotis over heavy evening spiced rice batches; cuts evening waste by ~18 kg.",
    projectedSatisfactionDelta: "+0.9 ★",
    mealType: "dinner",
    category: "Dinner Special"
  },
  {
    dislikedKeywords: ["Puliyogare", "Tamarind Rice"],
    recommendedReplacement: "Karnataka Bisi Bele Bath with Pure Ghee & Crunchy Kara Boondi",
    reason: "Provides balanced warm lentils and vegetables, eliminating dry peanut complaints from tamarind rice.",
    projectedSatisfactionDelta: "+0.6 ★",
    mealType: "lunch",
    category: "Thali Meals"
  }
];
