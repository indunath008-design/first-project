// Indra Gadgets - Product Catalog Data

export const products = [
  {
    id: "indra-quantum-x1",
    name: "Indra Quantum X1 Wireless ANC",
    tagline: "Neural Noise-Cancelling Flagship Headphones",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewsCount: 318,
    badge: "BESTSELLER",
    isDealOfTheDay: true,
    dealEndsInHours: 9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience acoustic perfection with custom 45mm Beryllium drivers, real-time neural active noise cancellation, and ultra-low latency spatial audio. Crafted with aircraft-grade aluminum and memory foam lambskin cups.",
    specs: {
      "Driver": "45mm Custom Beryllium",
      "Battery Life": "96 Hours (ANC off) / 65 Hours (ANC on)",
      "Connectivity": "Bluetooth 5.4, 3.5mm, USB-C Lossless",
      "Weight": "260g",
      "Water Resistance": "IPX4 Splashproof",
      "Warranty": "2-Year IndraCare Protection"
    },
    features: [
      "Adaptive Neural ANC with 8 internal acoustic mics",
      "Lossless 24-bit/192kHz Hi-Res wireless streaming",
      "Multipoint pairing across 3 devices simultaneously",
      "Ultra-fast charging: 10 mins gives 12 hours playtime"
    ],
    colors: [
      { name: "Stealth Obsidian", hex: "#111827", code: "obsidian" },
      { name: "Titanium Silver", hex: "#94a3b8", code: "silver" },
      { name: "Neon Cyber Blue", hex: "#06b6d4", code: "cyan" }
    ],
    variants: [
      { label: "Standard Edition", priceDiff: 0 },
      { label: "Studio Hardcase Bundle", priceDiff: 39 },
      { label: "Pro DAC Audiophile Pack", priceDiff: 79 }
    ],
    inStock: true,
    stockCount: 6
  },
  {
    id: "indra-titan-v-ultra",
    name: "Indra Titan V Ultra 5G",
    tagline: "Snapdragon 8 Gen 3 • 200MP Periscope Camera",
    category: "smartphones",
    categoryLabel: "Smartphones",
    price: 999,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 422,
    badge: "HOT DEAL",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The pinnacle of mobile engineering. Built with a Grade 5 Titanium chassis, 6.8-inch 144Hz LTPO Micro-OLED display, and Indra's quad-camera system with 100x Space Zoom and computational RAW cinema mode.",
    specs: {
      "Processor": "Snapdragon 8 Gen 3 AI Engine",
      "Display": "6.8\" 144Hz QHD+ LTPO Dynamic OLED",
      "Battery Life": "5,400mAh (2 Days usage)",
      "Charging": "120W HyperCharge (0-100% in 18 min)",
      "Weight": "218g",
      "Water Resistance": "IP68 Submersible (6m)",
      "Warranty": "2-Year IndraCare Protection"
    },
    features: [
      "200MP Primary Sensor + 50MP Periscope 10x Optical Zoom",
      "On-device Indra Neural AI with real-time translation",
      "Satellite SOS messaging & Wi-Fi 7 Ready",
      "Grade 5 Titanium frame with Ceramic Shield Glass"
    ],
    colors: [
      { name: "Titanium Black", hex: "#1e293b", code: "black" },
      { name: "Cosmic Silver", hex: "#cbd5e1", code: "silver" },
      { name: "Aurora Green", hex: "#10b981", code: "green" }
    ],
    variants: [
      { label: "256GB / 12GB RAM", priceDiff: 0 },
      { label: "512GB / 16GB RAM", priceDiff: 120 },
      { label: "1TB / 24GB AI Edition", priceDiff: 280 }
    ],
    inStock: true,
    stockCount: 11
  },
  {
    id: "indra-blade-16-pro",
    name: "Indra Blade 16 Pro AI Laptop",
    tagline: "Intel Core Ultra 9 • RTX 4090 • Mini-LED 240Hz",
    category: "laptops",
    categoryLabel: "Laptops & PC",
    price: 2499,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 189,
    badge: "FLAGSHIP",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The most potent creator and gaming powerhouse ever forged. Encased in a single CNC milled anodized aluminum unibody, featuring vapor chamber liquid cooling and a dual-mode 4K 120Hz / FHD 240Hz Mini-LED display.",
    specs: {
      "Processor": "Intel Core Ultra 9 185H (16 Cores, 22 Threads)",
      "Graphics": "NVIDIA GeForce RTX 4090 16GB GDDR6",
      "Display": "16\" Dual-Mode 4K Mini-LED 1000 nits",
      "Battery Life": "99.9Wh (Up to 11 Hours web/productivity)",
      "Weight": "2.14 kg",
      "Connectivity": "Thunderbolt 4, Wi-Fi 7, HDMI 2.1",
      "Warranty": "2-Year Comprehensive Indra Warranty"
    },
    features: [
      "Custom Vapor Chamber with liquid metal thermal interface",
      "Indra RGB per-key mechanical switches with N-key rollover",
      "Studio quality 6-speaker array with spatial THX tuning",
      "1080p IR Windows Hello webcam with physical shutter"
    ],
    colors: [
      { name: "Stealth Matte Black", hex: "#0f172a", code: "black" },
      { name: "Mercury Silver", hex: "#e2e8f0", code: "silver" }
    ],
    variants: [
      { label: "32GB RAM / 1TB Gen4 SSD", priceDiff: 0 },
      { label: "64GB RAM / 2TB Gen4 SSD", priceDiff: 350 },
      { label: "96GB RAM / 4TB Extreme SSD", priceDiff: 750 }
    ],
    inStock: true,
    stockCount: 4
  },
  {
    id: "indra-chronos-zenith",
    name: "Indra Chronos Zenith Smartwatch",
    tagline: "Sapphire Crystal • ECG & Micro-Radar Biometrics",
    category: "wearables",
    categoryLabel: "Wearables",
    price: 389,
    originalPrice: 479,
    rating: 4.8,
    reviewsCount: 264,
    badge: "POPULAR",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Architected for extreme athletes and high-performing leaders. Featuring dual-frequency GPS, medical-grade ECG sensor, continuous SpO2, arterial stiffness tracking, and 21-day expedition battery life.",
    specs: {
      "Display": "1.5\" AMOLED Sapphire Glass 2000 nits",
      "Battery Life": "21 Days (Smart Mode) / 72H Precision GPS",
      "Connectivity": "Bluetooth 5.4, NFC Payments, LTE eSIM",
      "Weight": "49g (Titanium Case)",
      "Water Resistance": "10 ATM (100 meters dive proof)",
      "Warranty": "2-Year Worldwide Replacement"
    },
    features: [
      "Precision Dual-Frequency L1+L5 multi-satellite navigation",
      "Continuous heart rate variability (HRV) and recovery index",
      "Tactile aerospace titanium rotating crown with haptic clicks",
      "Over 120 professional sport tracking profiles"
    ],
    colors: [
      { name: "Titanium Raw", hex: "#94a3b8", code: "titanium" },
      { name: "Midnight DLC", hex: "#0f172a", code: "black" },
      { name: "Solar Gold", hex: "#eab308", code: "gold" }
    ],
    variants: [
      { label: "Fluorocarbon Sport Band", priceDiff: 0 },
      { label: "Titanium Link Bracelet", priceDiff: 79 },
      { label: "Italian Leather + Sport Band Combo", priceDiff: 49 }
    ],
    inStock: true,
    stockCount: 14
  },
  {
    id: "indra-holo-vision-vr",
    name: "Indra HoloVision Spatial VR",
    tagline: "Dual 4K Micro-OLED • Hand & Eye Tracking",
    category: "gaming",
    categoryLabel: "Gaming & VR",
    price: 849,
    originalPrice: 999,
    rating: 4.7,
    reviewsCount: 153,
    badge: "INNOVATION",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Step into spatial computing with 4K per eye resolution, pancake optics offering 115° field of view, lossless wireless PC streaming, and zero-latency sub-millimeter eye and bare-hand tracking.",
    specs: {
      "Display": "Dual 3840x3552 Micro-OLED 120Hz",
      "Field of View": "115° Ultrawide Pancake Optics",
      "Weight": "385g Ergonomic Counterbalance",
      "Battery Life": "3.5 Hours Internal + Swappable Battery",
      "Connectivity": "Wi-Fi 6E, USB-C DisplayPort, BT 5.3",
      "Warranty": "2-Year IndraCare Protection"
    },
    features: [
      "Sub-millimeter bare hand gesture recognition",
      "Foveated rendering driven by infrared eye tracking",
      "Full color ultra-low latency stereo passthrough AR",
      "Compatible with SteamVR, OpenXR, and Mac/PC virtual displays"
    ],
    colors: [
      { name: "Cyber White", hex: "#f8fafc", code: "white" },
      { name: "Shadow Graphite", hex: "#1e293b", code: "graphite" }
    ],
    variants: [
      { label: "256GB Spatial Edition", priceDiff: 0 },
      { label: "512GB Pro Creator Bundle + Battery Strap", priceDiff: 149 }
    ],
    inStock: true,
    stockCount: 8
  },
  {
    id: "indra-aero-drone-4k",
    name: "Indra AeroDrone 4K Pro Cine",
    tagline: "Omnidirectional Obstacle Avoidance • 46-Min Flight",
    category: "accessories",
    categoryLabel: "Drones & Creators",
    price: 699,
    originalPrice: 849,
    rating: 4.9,
    reviewsCount: 204,
    badge: "SALE 18%",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Compact folding drone armed with a 1-inch CMOS sensor, 4K/120fps HDR video, 10-bit D-Log M color profile, and 15km video transmission range. Master cinematic tracking shots with autonomous AI copilot.",
    specs: {
      "Camera Sensor": "1-inch 48MP CMOS 4K/120fps HDR",
      "Flight Time": "46 Minutes per intelligent battery",
      "Transmission": "15km O4 FHD Video Transmission",
      "Weight": "249g (Sub-250g Regulatory Exemption)",
      "Wind Resistance": "Level 6 (38 km/h)",
      "Warranty": "2-Year Free Crash Replacement"
    },
    features: [
      "360-degree APAS 5.0 omnidirectional obstacle sensing",
      "True vertical shooting for social media creators",
      "MasterShots automatic Hollywood camera choreography",
      "Return-to-home with LiDAR assisted precision landing"
    ],
    colors: [
      { name: "Stealth Grey", hex: "#475569", code: "grey" }
    ],
    variants: [
      { label: "Standard Remote Kit", priceDiff: 0 },
      { label: "Fly More Combo (3 Batteries + Hub + Bag)", priceDiff: 169 },
      { label: "Cinematographer Master Pack + Smart Screen RC", priceDiff: 289 }
    ],
    inStock: true,
    stockCount: 9
  },
  {
    id: "indra-pulse-pods-pro",
    name: "Indra PulsePods Pro ANC Earbuds",
    tagline: "Lossless Audio • Spatial Audio with Head Tracking",
    category: "audio",
    categoryLabel: "Audio & Sound",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 512,
    badge: "TOP RATED",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Tiny footprint, earth-shaking clarity. Dual dynamic drivers with titanium diaphragms deliver punchy sub-bass and crisp highs. Intelligent conversational awareness lowers volume when you begin speaking.",
    specs: {
      "Driver": "11mm Liquid Crystal Polymer + Planar Tweeter",
      "ANC Level": "Up to 48dB Active Noise Reduction",
      "Battery Life": "8 Hours (Earbuds) / 40 Hours (Case)",
      "Charging": "Qi Wireless + USB-C Rapid Charge",
      "Water Resistance": "IP54 Dust & Sweat Resistant",
      "Weight": "4.6g per earbud"
    },
    features: [
      "Personalized SoundID acoustic calibration",
      "Dynamic head-tracking 360 spatial immersion",
      "Smart touch and squeeze stem gesture controls",
      "Crystal-clear triple beamforming mics with wind filters"
    ],
    colors: [
      { name: "Matte White", hex: "#f1f5f9", code: "white" },
      { name: "Cosmic Onyx", hex: "#0f172a", code: "onyx" },
      { name: "Electric Cyan", hex: "#06b6d4", code: "cyan" }
    ],
    variants: [
      { label: "Wireless Case Edition", priceDiff: 0 },
      { label: "Rugged Armor Case + Carabiner Bundle", priceDiff: 19 }
    ],
    inStock: true,
    stockCount: 22
  },
  {
    id: "indra-cyberdeck-mech",
    name: "Indra CyberDeck 75% Mechanical",
    tagline: "Gasket Mount • Hot-Swappable Hall Effect Switches",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 159,
    originalPrice: 199,
    rating: 4.9,
    reviewsCount: 288,
    badge: "COMMUNITY FAVORITE",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The enthusiast typing instrument. Machined from 6063 aerospace aluminum with gasket suspension, PORON acoustic dampening foams, and rapid-trigger magnetic Hall Effect switches with 0.1mm actuation.",
    specs: {
      "Layout": "75% Compact (82 Keys) + OLED Smart Screen",
      "Switches": "Pre-Lubed Indra Magnetic Hall Effect",
      "Polling Rate": "8,000Hz Ultra-Low Latency",
      "Connectivity": "Tri-Mode (2.4GHz Wireless, BT 5.2, USB-C)",
      "Battery Life": "4,000mAh (Up to 200 Hours)",
      "Weight": "1.45 kg Heavy Anodized Aluminum"
    },
    features: [
      "Customizable 0.85-inch OLED display for GIFs and stats",
      "Adjustable actuation point from 0.1mm to 4.0mm",
      "Double-shot PBT cherry profile keycaps",
      "Full VIA/QMK web-based key remap software"
    ],
    colors: [
      { name: "Cyberpunk Violet/Black", hex: "#7c3aed", code: "violet" },
      { name: "Anodized Silver", hex: "#94a3b8", code: "silver" },
      { name: "Stealth Charcoal", hex: "#1e293b", code: "charcoal" }
    ],
    variants: [
      { label: "Linear Jade Magnetic Switches", priceDiff: 0 },
      { label: "Tactile Blue Switches", priceDiff: 0 },
      { label: "Silent Phantom Pre-lubed Switches", priceDiff: 20 }
    ],
    inStock: true,
    stockCount: 16
  },
  {
    id: "indra-nexus-controller",
    name: "Indra Nexus Elite Pro Controller",
    tagline: "Hall Effect Joysticks • Dual Haptic Actuators",
    category: "gaming",
    categoryLabel: "Gaming & VR",
    price: 129,
    originalPrice: 169,
    rating: 4.8,
    reviewsCount: 340,
    badge: "ZERO DRIFT",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Say farewell to stick drift forever. Equipped with contactless magnetic Hall Effect joysticks and triggers, 4 remappable rear paddles, microswitch mechanical face buttons, and dual rumble motors.",
    specs: {
      "Compatibility": "PC, Steam Deck, PS5, Xbox, Switch, iOS, Android",
      "Joysticks": "Hall-Effect Electromagnetic (Anti-Drift)",
      "Polling Rate": "1000Hz (1ms response time)",
      "Battery Life": "1,200mAh (Up to 30 Hours gameplay)",
      "Weight": "245g Ergonomic Grip",
      "Warranty": "2-Year No-Drift Guarantee"
    },
    features: [
      "Interchangeable thumbstick caps and magnetic D-pads",
      "3-stop hair trigger locks for instant shooting reaction",
      "Audio jack with dedicated on-controller chat mixer",
      "Textured rubberized comfort grip"
    ],
    colors: [
      { name: "Glacier White", hex: "#f1f5f9", code: "white" },
      { name: "Carbon Black", hex: "#0f172a", code: "black" },
      { name: "Cyber Neon Indigo", hex: "#6366f1", code: "indigo" }
    ],
    variants: [
      { label: "Controller Only", priceDiff: 0 },
      { label: "Charging Dock + Travel Hardcase Bundle", priceDiff: 39 }
    ],
    inStock: true,
    stockCount: 19
  },
  {
    id: "indra-lumina-smart-hub",
    name: "Indra Lumina Ambient Hub & Speaker",
    tagline: "Matter & Thread Protocol • 360° Room Acoustics",
    category: "smarthome",
    categoryLabel: "Smart Home",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewsCount: 164,
    badge: "SMART IOT",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The central nervous system of your futuristic sanctuary. Combines an acoustic omnidirectional speaker with an integrated smart home bridge supporting Matter, Thread, and Zigbee. Features ambient LED mood lighting synced to sound.",
    specs: {
      "Acoustics": "3.5\" Long-Throw Woofer + Dual Tweeters",
      "Smart Protocols": "Matter, Thread, Zigbee 3.0, Wi-Fi 6, BLE",
      "Voice AI": "Offline Privacy-First Speech Assistant + Alexa/Google",
      "Dimensions": "170mm x 140mm Cylindrical",
      "Weight": "1.2 kg",
      "Power": "USB-C PD 45W Adapter"
    },
    features: [
      "Zero-cloud local processing for ultra-fast smart home routines",
      "16-Million color dynamic edge glow with circadian wake-up",
      "Room calibration radar adapts audio to wall placement",
      "Hardware privacy microphone mute switch"
    ],
    colors: [
      { name: "Nordic Charcoal", hex: "#334155", code: "charcoal" },
      { name: "Cloud White", hex: "#f8fafc", code: "white" }
    ],
    variants: [
      { label: "Single Unit", priceDiff: 0 },
      { label: "Stereo Pair (2 Units - Save $50)", priceDiff: 149 }
    ],
    inStock: true,
    stockCount: 12
  },
  {
    id: "indra-curv-38-oled",
    name: "Indra Curv 38\" QD-OLED Monitor",
    tagline: "3840x1600 • 175Hz 0.03ms • 1800R Immersion",
    category: "laptops",
    categoryLabel: "Laptops & PC",
    price: 1099,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 138,
    badge: "PREMIUM",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A feast for your eyes. Quantum Dot OLED panel with pure blacks, infinite contrast, 99.3% DCI-P3 color space, and factory calibration delta-E < 1. Includes 90W USB-C reverse charging for single-cable laptop docking.",
    specs: {
      "Panel Type": "Quantum Dot OLED (3840 x 1600 Ultrawide)",
      "Refresh Rate": "175Hz / 0.03ms GtG Response Time",
      "Curvature": "1800R Ergonomic Curve",
      "HDR": "VESA DisplayHDR True Black 400",
      "Ports": "2x HDMI 2.1, 1x DP 1.4, 1x USB-C 90W PD, USB Hub",
      "Warranty": "3-Year OLED Burn-In Warranty Included"
    },
    features: [
      "KVM Switch allows one keyboard/mouse across two computers",
      "Ambient Indra Prism bias lighting on rear panel",
      "Custom graphene heatsink with silent fanless operation",
      "Height, tilt, and swivel precision aluminum stand"
    ],
    colors: [
      { name: "Cyber Gunmetal", hex: "#1e293b", code: "gunmetal" }
    ],
    variants: [
      { label: "Standard Desktop Stand", priceDiff: 0 },
      { label: "Heavy Duty Gas Spring Monitor Arm Pack", priceDiff: 89 }
    ],
    inStock: true,
    stockCount: 5
  },
  {
    id: "indra-glide-pro-mouse",
    name: "Indra Glide Pro Wireless Mouse",
    tagline: "39g Ultra-Lightweight • 30,000 DPI Optical Sensor",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 89,
    originalPrice: 119,
    rating: 4.8,
    reviewsCount: 410,
    badge: "ESPORTS",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Featherweight speed without honeycomb holes. Solid composite magnesium-alloy inner skeleton weighing just 39 grams. Equipped with 4,000Hz polling rate wireless receiver for zero micro-stutter tracking.",
    specs: {
      "Sensor": "Indra AimTrack 30K Optical Sensor",
      "Weight": "39g Ultra-Lightweight Shell",
      "Switches": "Optical Microswitches (100M click life)",
      "Battery Life": "90 Hours continuous competitive gaming",
      "Connectivity": "Indra SpeedLink 2.4GHz + USB-C Paracord",
      "Warranty": "2-Year Replacement Warranty"
    },
    features: [
      "Zero smoothing, filtering, or acceleration",
      "100% Virgin grade PTFE rounded skates",
      "Onboard memory profiles for DPI and LOD settings",
      "Sweat-resistant matte nanoscale coating"
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff", code: "white" },
      { name: "Stealth Black", hex: "#111827", code: "black" },
      { name: "Neon Cyber Red", hex: "#ef4444", code: "red" }
    ],
    variants: [
      { label: "Standard 1K Polling Dongle", priceDiff: 0 },
      { label: "4K / 8K HyperPolling Wireless Dongle Pack", priceDiff: 24 }
    ],
    inStock: true,
    stockCount: 28
  },
  {
    id: "indra-volt-station",
    name: "Indra VoltPower 45,000mAh Power Bank",
    tagline: "140W USB-C PD 3.1 • Smart TFT Color Display",
    category: "accessories",
    categoryLabel: "Power & Rig",
    price: 119,
    originalPrice: 159,
    rating: 4.9,
    reviewsCount: 377,
    badge: "AIRLINE APPROVED",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The definitive mobile battery powerhouse. Capable of charging two 16-inch laptops simultaneously at full speed with dual 140W PD 3.1 ports. The built-in IPS color display shows live wattage, battery health, and cycle count.",
    specs: {
      "Capacity": "45,000mAh / 99.8Wh (TSA Carry-On Compliant)",
      "Max Output": "140W Single Port / 210W Total Combined",
      "Ports": "2x USB-C PD 3.1, 1x USB-A 22.5W Fast Charge",
      "Recharge Time": "0 to 100% in 45 Minutes (at 100W input)",
      "Weight": "580g",
      "Safety": "GaNPrime Multi-Protection Thermal Monitoring"
    },
    features: [
      "Real-time OLED display with wattage per port and time to empty",
      "Pass-through charging enables usage as uninterrupted power supply",
      "Airline compliant under 100Wh international carry-on limit",
      "Rugged aerospace flame-retardant casing"
    ],
    colors: [
      { name: "Space Titanium", hex: "#64748b", code: "titanium" },
      { name: "Cyber Cyberpunk Yellow/Black", hex: "#eab308", code: "yellow" }
    ],
    variants: [
      { label: "Battery Unit + 240W Braided Cable", priceDiff: 0 },
      { label: "Full Kit + 140W GaN Wall Charger", priceDiff: 45 }
    ],
    inStock: true,
    stockCount: 17
  },
  {
    id: "indra-cinema-camera",
    name: "Indra CineSnap 8K Mirrorless Camera",
    tagline: "8K 60fps RAW • In-Body 5-Axis Stabilizer",
    category: "accessories",
    categoryLabel: "Drones & Creators",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviewsCount: 94,
    badge: "PRO CREATOR",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Cinema-grade sensor in a featherweight mirrorless body. Full-frame 45MP back-illuminated sensor with 15+ stops dynamic range, dual native ISO, real-time AI subject eye tracking for humans, animals, and vehicles.",
    specs: {
      "Sensor": "Full-Frame 45MP BSI CMOS Sensor",
      "Video": "8K/60p 12-bit RAW, 4K/120p 10-bit 4:2:2 internal",
      "Stabilization": "8.5 Stops 5-Axis In-Body Image Stabilization",
      "Storage": "Dual CFexpress Type B + SD UHS-II slots",
      "Weight": "670g Weather-Sealed Magnesium Body",
      "Warranty": "3-Year Pro Service Protection"
    },
    features: [
      "AI Deep Learning subject autofocus tracking with lock-on",
      "Internal electronic ND filter (1 to 8 stops continuously variable)",
      "Full-size HDMI 2.1 and dedicated XLR audio input support",
      "Active cooling fan prevents overheating during continuous 8K recording"
    ],
    colors: [
      { name: "Classic Matte Black", hex: "#18181b", code: "black" }
    ],
    variants: [
      { label: "Body Only", priceDiff: 0 },
      { label: "24-70mm f/2.8 Pro Cine Lens Bundle", priceDiff: 799 }
    ],
    inStock: true,
    stockCount: 3
  },
  {
    id: "indra-retro-cyber-deck",
    name: "Indra PocketDeck Handheld Console",
    tagline: "AMD Ryzen 7 7840U • 7\" 120Hz OLED Screen",
    category: "gaming",
    categoryLabel: "Gaming & VR",
    price: 599,
    originalPrice: 729,
    rating: 4.8,
    reviewsCount: 226,
    badge: "SALE 17%",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Play AAA PC games anywhere at 1080p 60fps+. Powered by AMD Ryzen Zen 4 with RDNA 3 graphics, custom Hall-Effect thumbsticks, dual vibration linear motors, and a vibrant 120Hz touch OLED panel.",
    specs: {
      "APU": "AMD Ryzen 7 7840U (8 Cores, 16 Threads, RDNA 3)",
      "Display": "7-inch 1920x1080 120Hz OLED 600 nits",
      "RAM & Storage": "32GB LPDDR5X + 1TB PCIe 4.0 NVMe",
      "Battery": "50Wh (3 to 7 Hours playtime)",
      "Weight": "610g Ergonomic Contoured Grip",
      "OS": "Indra SteamOS / Windows 11 Dual Boot"
    },
    features: [
      "Dual trackpads with haptic feedback for PC cursor control",
      "MicroSD expansion slot with high-speed game launching",
      "Dual USB4 40Gbps ports supporting external GPU docks",
      "Gyroscopic aiming assistance with 6-axis IMU"
    ],
    colors: [
      { name: "Retro Cyber Grey", hex: "#6b7280", code: "grey" },
      { name: "Translucent Smoke Purple", hex: "#581c87", code: "purple" }
    ],
    variants: [
      { label: "1TB SSD Edition", priceDiff: 0 },
      { label: "2TB SSD + Official Dock Stand Bundle", priceDiff: 99 }
    ],
    inStock: true,
    stockCount: 10
  },
  {
    id: "indra-prism-desk-mat",
    name: "Indra Prism Studio Smart Keylight",
    tagline: "Edge-Lit 2800K-7000K • Wireless App & Stream Deck Control",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 99,
    originalPrice: 129,
    rating: 4.7,
    reviewsCount: 198,
    badge: "CREATOR TOOL",
    isDealOfTheDay: false,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Broadcast-grade desktop lighting without glare or heat. Multi-layer diffusion technology produces soft, flattering illumination for streaming, video conferences, and studio photography.",
    specs: {
      "Brightness": "2,800 Lumens Adjustable (0-100%)",
      "Color Temp": "2800K to 7000K Cold to Warm",
      "CRI / TLCI": "96+ Color Rendering Accuracy",
      "Mount": "Desk Clamp Telescopic Pole (33-85cm)",
      "Connectivity": "Wi-Fi 2.4GHz + Local Bluetooth Control",
      "Power": "45W Dedicated Power Adapter"
    },
    features: [
      "Seamless integration with Stream Deck, PC/Mac app, and Mobile",
      "Edge-lit indirect architecture eliminates eye fatigue",
      "Precision metal ball head for 360-degree rotation",
      "Zero audible coil whine or flicker even at 1000fps video"
    ],
    colors: [
      { name: "Matte Black", hex: "#1e293b", code: "black" }
    ],
    variants: [
      { label: "Single Keylight with Desk Clamp", priceDiff: 0 },
      { label: "Dual Keylight Studio Kit (Save $30)", priceDiff: 79 }
    ],
    inStock: true,
    stockCount: 24
  }
];

export const categories = [
  { id: "all", name: "All Gadgets", icon: "sparkles", count: 16 },
  { id: "audio", name: "Audio Gear", icon: "headphones", count: 2 },
  { id: "smartphones", name: "Smartphones", icon: "smartphone", count: 1 },
  { id: "laptops", name: "Laptops & PC", icon: "laptop", count: 2 },
  { id: "wearables", name: "Wearables", icon: "watch", count: 1 },
  { id: "gaming", name: "Gaming & VR", icon: "gamepad-2", count: 3 },
  { id: "smarthome", name: "Smart Home", icon: "home", count: 1 },
  { id: "accessories", name: "Accessories & Power", icon: "zap", count: 6 }
];

export const promoCodes = {
  "INDRA10": { discountPercent: 10, description: "10% Off Entire Order" },
  "INDRA20": { discountPercent: 20, description: "20% Flash Deal Discount" },
  "TECH50": { discountFixed: 50, minTotal: 250, description: "$50 Off Orders Over $250" },
  "CYBERGADGET": { discountPercent: 15, description: "15% VIP Insider Discount" }
};
