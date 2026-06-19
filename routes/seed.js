const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();
const products = [
  {
    name: 'Samsung Galaxy A17 5G',
    description: '6.7-inch Super AMOLED, 90Hz, Exynos 1330, 50MP triple camera with OIS, 5000mAh, 25W charging',
    price: 18999,
    originalPrice: 21999,
    category: 'Phones',
    image: 'images/samsung-galaxy-a17-5g-12.jpg',   // ← no leading /
    stock: 40
  },
  {
    name: 'Samsung Galaxy F05',
    description: '6.7-inch PLS LCD, MediaTek Helio G85, 50MP dual camera, 5000mAh battery, 25W charging, Android 14',
    price: 6499,
    originalPrice: 7999,
    category: 'Phones',
    image: 'images/samsung-galaxy-f05-1.jpg',
    stock: 60
  },
  {
    name: 'Samsung Galaxy S26 Ultra',
    description: '6.9-inch Dynamic AMOLED 2X, Snapdragon 8 Elite Gen 5, 200MP quad camera, 5000mAh, 60W charging, S Pen',
    price: 139999,
    originalPrice: 159999,
    category: 'Phones',
    image: 'images/samsung-galaxy-s26-ultra-1.jpg',
    stock: 15
  },
  {
    name: 'Samsung Galaxy Z Flip7',
    description: '6.9-inch foldable AMOLED, 4.1-inch cover screen, Exynos 2500, 50MP camera, 4300mAh, Android 16',
    price: 95999,
    originalPrice: 109999,
    category: 'Phones',
    image: 'images/samsung-galaxy-z-flip7-03.jpg',
    stock: 20
  },
  {
    name: 'Samsung Galaxy M05',
    description: '6.7-inch PLS LCD, MediaTek Helio G85, 50MP dual camera, 5000mAh battery, 25W charging, Android 14',
    price: 7499,
    originalPrice: 8999,
    category: 'Phones',
    image: 'images/samsung-galaxy-m05-1(1).jpg',
    stock: 50
  },
  {
    name: 'Samsung Galaxy A37',
    description: '6.5-inch Super AMOLED, 50MP triple camera, 5000mAh battery, 8GB RAM, 25W charging',
    price: 24999,
    originalPrice: 29999,
    category: 'Phones',
    image: 'images/samsung-galaxy-a37-4new.jpg',
    stock: 50
  },
  {
    name: 'Samsung Galaxy C55',
    description: '6.7-inch Super AMOLED+, 120Hz, Snapdragon 7 Gen 1, 50MP triple camera, 5000mAh, 45W charging',
    price: 24999,
    originalPrice: 28999,
    category: 'Phones',
    image: 'images/samsung-galaxy-c55-1(2).jpg',
    stock: 35
  },
  {
    name: 'Samsung Galaxy S24 FE',
    description: '6.7-inch AMOLED, Exynos 2400e, 50MP triple camera, 4700mAh battery, 25W charging, Android 15',
    price: 42999,
    originalPrice: 49999,
    category: 'Phones',
    image: 'images/samsung-galaxy-s24-fe-1.jpg',
    stock: 25
  },
  {
    name: 'Samsung Galaxy XCover7 Pro',
    description: '6.6-inch PLS LCD, IP68 rugged, Dimensity 6100+, 50MP camera, 4050mAh, MIL-STD-810H certified',
    price: 49999,
    originalPrice: 54999,
    category: 'Phones',
    image: 'images/samsung-galaxy-xcover7-pro-2.jpg',
    stock: 20
  },
  {
    name: 'Samsung Galaxy A16 LTE',
    description: '6.7-inch Super AMOLED, 90Hz, Mediatek Helio G99, 50MP triple camera, 5000mAh, 25W charging',
    price: 14999,
    originalPrice: 17999,
    category: 'Phones',
    image: 'images/samsung-galaxy-a16-lte-1.jpg',
    stock: 45
  },
  {
    name: 'Apple iPhone 13 Pro Max',
    description: '6.7-inch Super Retina XDR OLED, 120Hz, A15 Bionic, 12MP triple camera, 4352mAh, iOS 26',
    price: 103990,
    originalPrice: 129900,
    category: 'Phones',
    image: 'images/apple-iphone-13-pro-max-01(5).jpg',
    stock: 20
  },
  {
    name: 'Apple iPhone 15 Pro Max',
    description: '6.7-inch Super Retina XDR OLED, 120Hz, A17 Pro, 48MP triple camera, Titanium design, USB-C',
    price: 119900,
    originalPrice: 159900,
    category: 'Phones',
    image: 'images/apple-iphone-15-pro-max-1(3).jpg',
    stock: 18
  },
  {
    name: 'Apple iPhone 16 Pro Max',
    description: '6.9-inch Super Retina XDR OLED, 120Hz, A18 Pro, 48MP quad camera, 4685mAh, Camera Control button',
    price: 134900,
    originalPrice: 159900,
    category: 'Phones',
    image: 'images/apple-iphone-16-pro-max-1(4).jpg',
    stock: 15
  },
  {
    name: 'Apple iPhone 17 Pro',
    description: '6.3-inch Super Retina XDR OLED, A19 Pro, 48MP triple camera, 12GB RAM, iOS 26, Cosmic Orange',
    price: 134900,
    originalPrice: 144900,
    category: 'Phones',
    image: 'images/apple-iphone-17-pro-1(2).jpg',
    stock: 22
  },
  {
    name: 'Apple iPhone 17 Pro Max',
    description: '6.9-inch Super Retina XDR OLED, A19 Pro, 48MP quad camera, 12GB RAM, 2TB option, iOS 26',
    price: 149900,
    originalPrice: 164900,
    category: 'Phones',
    image: 'images/apple-iphone-17-pro-max-1(1).jpg',
    stock: 18
  },
  {
    name: 'Apple iPhone 13',
    description: '6.1-inch Super Retina XDR OLED, A15 Bionic, 12MP dual camera, 3227mAh, iOS 26, 5G',
    price: 49900,
    originalPrice: 69900,
    category: 'Phones',
    image: 'images/apple-iphone-13-01(6).jpg',
    stock: 30
  },
  {
    name: 'Apple iPhone 17',
    description: '6.3-inch Super Retina XDR OLED, A19 chip, 48MP dual camera, 12GB RAM, iOS 26, 5G',
    price: 82900,
    originalPrice: 89900,
    category: 'Phones',
    image: 'images/apple-iphone-17-1(7).jpg',
    stock: 25
  },
  {
    name: 'Apple iPhone 15 Plus',
    description: '6.7-inch Super Retina XDR OLED, A16 Bionic, 48MP dual camera, 4383mAh, Dynamic Island, USB-C',
    price: 79900,
    originalPrice: 89900,
    category: 'Phones',
    image: 'images/apple-iphone-15-plus-1(8).jpg',
    stock: 20
  },
  {
    name: 'Apple iPhone SE 2020',
    description: '4.7-inch Retina HD LCD, A13 Bionic, 12MP single camera, Touch ID, 1821mAh, 5G ready',
    price: 32900,
    originalPrice: 39900,
    category: 'Phones',
    image: 'images/apple-iphone-se-2020-2(9).jpg',
    stock: 35
  },
  {
    name: 'Apple iPhone 14 Pro Max',
    description: '6.7-inch Super Retina XDR OLED, A16 Bionic, 48MP triple camera, Dynamic Island, Always-On display',
    price: 109900,
    originalPrice: 139900,
    category: 'Phones',
    image: 'images/apple-iphone-14-pro-max-1(10).jpg',
    stock: 18
  },
  {
    name: 'OPPO F33 Pro',
    description: '6.57-inch AMOLED 120Hz, Dimensity 6360 Max, 50MP ultra-wide selfie, 7000mAh, 80W charging, IP69',
    price: 32870,
    originalPrice: 37999,
    category: 'Phones',
    image: 'images/(1)oppo-f33-pro-1.jpg',
    stock: 30
  },
  {
    name: 'OPPO F29 Pro',
    description: '6.7-inch AMOLED, Snapdragon 6 Gen 1, 50MP triple camera, 6000mAh battery, 80W SuperVOOC charging',
    price: 27999,
    originalPrice: 32999,
    category: 'Phones',
    image: 'images/(2)oppo-f29-pro-1.jpg',
    stock: 35
  },
  {
    name: 'OPPO K15 Pro Plus',
    description: '6.7-inch AMOLED, MediaTek 8500, 12GB RAM, 50MP triple camera, 5500mAh, 80W SuperVOOC',
    price: 42999,
    originalPrice: 49999,
    category: 'Phones',
    image: 'images/(3)oppo-k15-pro-plus-1.jpg',
    stock: 25
  },
  {
    name: 'OPPO K14X',
    description: '6.67-inch LCD 120Hz, Snapdragon 4 Gen 2, 50MP dual camera, 5000mAh, 33W charging, 5G',
    price: 16999,
    originalPrice: 19999,
    category: 'Phones',
    image: 'images/(4)oppo-k14x-1.jpg',
    stock: 45
  },
  {
    name: 'OPPO Reno8 T 4G',
    description: '6.7-inch AMOLED 120Hz, Snapdragon 695, 108MP main camera, 4800mAh, 67W SUPERVOOC charging',
    price: 23999,
    originalPrice: 27999,
    category: 'Phones',
    image: 'images/(5)oppo-reno8-t-4g-1.jpg',
    stock: 30
  },
  {
    name: 'OPPO A36',
    description: '6.67-inch LCD 90Hz, Snapdragon 480 5G, 50MP dual camera, 5000mAh battery, 33W charging',
    price: 13999,
    originalPrice: 16999,
    category: 'Phones',
    image: 'images/(6)oppo-a36-1.jpg',
    stock: 50
  },
  {
    name: 'OPPO A96',
    description: '6.59-inch IPS LCD 90Hz, Snapdragon 680, 50MP dual camera, 5000mAh, 33W SUPERVOOC, 8GB RAM',
    price: 18999,
    originalPrice: 22999,
    category: 'Phones',
    image: 'images/(7)oppo-a96-02.jpg',
    stock: 40
  },
  {
    name: 'HP Laptop 15-fc0500AU',
    description: '15.6-inch FHD display, AMD Ryzen 3, 8GB RAM, 512GB SSD, Windows 11, MS Office 2024, Silver',
    price: 57899,
    originalPrice: 83823,
    category: 'Laptops',
    image: 'images/lap1.jpg',
    stock: 20
  },
  {
    name: 'HP Spectre x360 14 Touch',
    description: '14-inch 2.8K OLED touch, Intel Core Ultra 7, 16GB RAM, 1TB SSD, Windows 11, 2-in-1 convertible, Silver',
    price: 159999,
    originalPrice: 184999,
    category: 'Laptops',
    image: 'images/A(1)c09053611-touch_2.avif',
    stock: 10
  },
  {
    name: 'HP EliteBook 840 G11',
    description: '14-inch FHD IPS, Intel Core Ultra 5, 16GB RAM, 512GB SSD, Windows 11 Pro, business laptop, Silver',
    price: 112999,
    originalPrice: 129999,
    category: 'Laptops',
    image: 'images/A(2)DG1U2PA-1_T1777360625.avif',
    stock: 15
  },
  {
    name: 'HP EliteBook 860 G11',
    description: '16-inch WUXGA IPS, Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11 Pro, vPro, Silver',
    price: 134999,
    originalPrice: 154999,
    category: 'Laptops',
    image: 'images/A(3)D9CU8PT-1_T1776229880.avif',
    stock: 12
  },
  {
    name: 'HP EliteBook Range',
    description: '14-inch FHD, Intel Core Ultra 5, 16GB RAM, 512GB SSD, Windows 11 Pro, enterprise security, Silver',
    price: 99999,
    originalPrice: 119999,
    category: 'Laptops',
    image: 'images/A(4)w90_elitebook_range_img.webp',
    stock: 20
  },
  {
    name: 'HP OmniBook 7 14 AI PC',
    description: '14-inch 2K IPS, Intel Core Ultra 5 225H, 16GB RAM, 512GB SSD, Windows 11, AI PC, Meteor Silver',
    price: 103490,
    originalPrice: 119999,
    category: 'Laptops',
    image: 'images/A(5)hp-omnibook-7-14-inch-laptop-ai-pc-agusta-meteorsilver-front_1.avif',
    stock: 18
  },
  {
    name: 'HP OmniBook 7 Aero 13.3 AI PC',
    description: '13.3-inch 2K IPS, Intel Core Ultra 7, 16GB RAM, 1TB SSD, Windows 11, ultralight AI PC, Glacier Silver',
    price: 124999,
    originalPrice: 144999,
    category: 'Laptops',
    image: 'images/A(6)hp-omnibook-7-aero-13.3-inch-laptop-next-gen-ai-pc-conrardr-glacier-silver-front_1.avif',
    stock: 15
  },
  {
    name: 'Lenovo Yoga Pro 7i Gen 10 Aura Edition',
    description: '14.5-inch OLED 120Hz, Intel Core Ultra 7 255H, 32GB RAM, 1TB SSD, Windows 11, Intel Arc 140T, Luna Grey',
    price: 106600,
    originalPrice: 124999,
    category: 'Laptops',
    image: 'images/12yoga-pro-7i-gen-10-aura-edition-14-intel.6814d92792b00e5d.png',
    stock: 12
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon Gen 13 Aura Edition',
    description: '14-inch 2.8K OLED 120Hz, Intel Core Ultra 7 258V, 32GB RAM, 1TB SSD, Windows 11 Pro, Wi-Fi 7, Eclipse Black',
    price: 189990,
    originalPrice: 219999,
    category: 'Laptops',
    image: 'images/13thinkpad-x1-carbon-gen-13-aura-edition-14-intel-arl.png',
    stock: 8
  },
  {
    name: 'Lenovo IdeaPad Slim 5',
    description: '14-inch FHD IPS, AMD Ryzen 7, 16GB RAM, 512GB SSD, Windows 11, thin and light, everyday laptop',
    price: 67990,
    originalPrice: 79999,
    category: 'Laptops',
    image: 'images/14htmqsdb494tdfhrtobz5touozowh91078586.avif',
    stock: 20
  },
  {
    name: 'Lenovo Legion 5i Gaming Laptop',
    description: '16-inch FHD 165Hz IPS, Intel Core i7, 16GB RAM, 512GB SSD, RTX 4060, Windows 11, gaming beast',
    price: 114990,
    originalPrice: 134999,
    category: 'Laptops',
    image: 'images/16p4tnzqnoizw47pa2xkzw4gdj51k9aa930864.avif',
    stock: 15
  },
  {
    name: 'Lenovo IdeaPad Slim 3',
    description: '15.6-inch FHD IPS, AMD Ryzen 5, 8GB RAM, 512GB SSD, Windows 11 Home, budget-friendly daily driver',
    price: 47990,
    originalPrice: 54999,
    category: 'Laptops',
    image: 'images/117n218es3vnes50ev2pgk82xncokqr4083966.avif',
    stock: 25
  },
  {
    name: 'Lenovo Yoga 7i 2-in-1',
    description: '14-inch 2.8K OLED touch, Intel Core Ultra 5, 16GB RAM, 512GB SSD, Windows 11, convertible 2-in-1',
    price: 89990,
    originalPrice: 104999,
    category: 'Laptops',
    image: 'images/1527733756066_yoga7i11ss_202511110512331776362914579.avif',
    stock: 18
  },
  {
    name: 'Apple MacBook Neo',
    description: '13.6-inch Liquid Retina, Apple A18 Pro chip, 8GB Unified Memory, 256GB SSD, macOS, Touch ID, Midnight',
    price: 63990,
    originalPrice: 74999,
    category: 'Laptops',
    image: 'images/(1)(1)mbn_0cd16ed14_2x.jpg',
    stock: 20
  },
  {
    name: 'Apple MacBook Air 13 & 15 M4',
    description: '13.6-inch & 15.3-inch Liquid Retina, Apple M4 chip, 16GB Unified Memory, 512GB SSD, macOS Sequoia, Sky Blue',
    price: 99900,
    originalPrice: 114900,
    category: 'Laptops',
    image: 'images/(1)(2)mba_13_15_286f55670_2x.jpg',
    stock: 18
  },
  {
    name: 'Apple MacBook Pro 14 & 16 M5',
    description: '14-inch & 16-inch Liquid Retina XDR, Apple M5 Pro chip, 24GB RAM, 512GB SSD, macOS, Space Black',
    price: 169900,
    originalPrice: 199900,
    category: 'Laptops',
    image: 'images/(1)(3)mbp_14_16_028335cc2_2x.jpg',
    stock: 12
  },
  // ============ WEARABLES ============
  {
    name: 'Galaxy Watch8 Classic (LTE, 4.6 cm)',
    description: '46mm Super AMOLED, Sapphire Crystal glass, BioActive Sensor, GPS, LTE, 5ATM water resistant, Black',
    price: 50999,
    originalPrice: 59999,
    category: 'Wearables',
    image: 'images/in-galaxy-watch8-classic-l505-sm-l505fzkains-thumb-547660119.png',
    stock: 25
  },
  {
    name: 'Galaxy Watch8 (Bluetooth, 4.0 cm)',
    description: '40mm Super AMOLED, BioActive Sensor, Advanced Sleep Tracking, GPS, 5ATM, Silver',
    price: 32999,
    originalPrice: 38999,
    category: 'Wearables',
    image: 'images/in-galaxy-watch8-l320-sm-l320nzsains-thumb-547660099.png',
    stock: 30
  },
  {
    name: 'Galaxy Watch8 (Bluetooth, 4.4 cm)',
    description: '44mm Super AMOLED, BioActive Sensor, Advanced Sleep Tracking, GPS, 5ATM, Cream',
    price: 35999,
    originalPrice: 41999,
    category: 'Wearables',
    image: 'images/in-galaxy-watch8-l325-sm-l325fdaains-thumb-547660315.png',
    stock: 28
  },
  {
    name: 'Galaxy Watch Ultra 2025 (LTE, 4.7 cm)',
    description: '47mm Super AMOLED, Titanium body, Triple sensor, 10ATM water resistant, GPS, LTE, Titanium Gray',
    price: 59999,
    originalPrice: 69999,
    category: 'Wearables',
    image: 'images/in-galaxy-watch-ultra-2025-l705-sm-l705fza1ins-thumb-547659854.png',
    stock: 15
  },
  {
    name: 'Galaxy Watch8 Classic (LTE) Black Steel',
    description: '46mm Super AMOLED, Rotating Bezel, BioActive Sensor, LTE, GPS, 5ATM, Black Steel',
    price: 50999,
    originalPrice: 59999,
    category: 'Wearables',
    image: 'images/in-galaxy-watch8-classic-l500-sm-l500nzkains-thumb-547659989.png',
    stock: 20
  },
  {
    name: 'Galaxy Watch7 (Bluetooth)',
    description: '40mm Super AMOLED, Advanced BioActive Sensor, AI health features, GPS, 5ATM, Green',
    price: 27999,
    originalPrice: 34999,
    category: 'Wearables',
    image: 'images/in-galaxy-watch7-l310-sm-l310nzgains-thumb-542366964.png',
    stock: 35
  },
  {
    name: 'boAt Chrome Ivory',
    description: '1.70-inch AMOLED Always-On display, 1000 nits, Heart Rate, SpO2, Sleep tracking, co-designed with GIVA, Silver',
    price: 4499,
    originalPrice: 6999,
    category: 'Wearables',
    image: 'images/CHROME_IVORY_Lifestyle.png',
    stock: 40
  },
  {
    name: 'boAt Smartwatch Collection',
    description: 'Bluetooth calling, 1.83-inch HD display, Heart Rate, SpO2, 100+ watch faces, 7 days battery, Active Black',
    price: 1999,
    originalPrice: 3999,
    category: 'Wearables',
    image: 'images/combined.jpg',
    stock: 50
  },
  {
    name: 'boAt Premium Smartwatch',
    description: '1.96-inch HD display, Bluetooth calling, Turn by Turn Navigation, Heart Rate, SpO2, 500mAh battery',
    price: 2999,
    originalPrice: 4999,
    category: 'Wearables',
    image: 'images/Lifestyle_render_154400cd-4bd3-4dd8-9c4a-e56f27910199.jpg',
    stock: 45
  },
  {
    name: 'boAt Lunar Vista',
    description: '1.43-inch AMOLED display, Bluetooth calling, 700+ sports modes, Heart Rate, SpO2, Alexa built-in, 7 days battery',
    price: 1399,
    originalPrice: 2999,
    category: 'Wearables',
    image: 'images/Lunar_Vista.gif',
    stock: 60
  },
  {
    name: 'boAt Storm Call 3',
    description: '1.96-inch HD display, Bluetooth calling, Turn by Turn Navigation, QR Tray, Heart Rate, SpO2, Active Black',
    price: 1250,
    originalPrice: 2499,
    category: 'Wearables',
    image: 'images/Storm_Call_3.jpg',
    stock: 55
  },
  {
    name: 'boAt Wave Fury',
    description: '1.83-inch HD display, Bluetooth calling, Functional Crown, Heart Rate, SpO2, 100+ watch faces, Green',
    price: 1399,
    originalPrice: 2999,
    category: 'Wearables',
    image: 'images/Wave_Fury.gif',
    stock: 50
  },
  {
    name: 'boAt Smartwatch Mini',
    description: 'Compact design, Bluetooth calling, Heart Rate, SpO2, Sleep tracking, 7 days battery, multiple sports modes',
    price: 999,
    originalPrice: 1999,
    category: 'Wearables',
    image: 'images/smartwatch_4b47c9df-5ea9-4149-9cf8-ff5a9c8f5cc1_100X100.png',
    stock: 70
  },
  {
    name: 'boAt Smartwatches Range',
    description: 'Multiple styles, Bluetooth calling, Heart Rate, SpO2, Sleep tracking, 100+ watch faces, sporty design',
    price: 1499,
    originalPrice: 2999,
    category: 'Wearables',
    image: 'images/Smartwatches_88f12bcf-24bd-4e3a-aacb-ecc204f62179.png',
    stock: 45
  },
  {
    name: 'boAt Storm S11',
    description: '1.96-inch HD display, Bluetooth calling, Heart Rate, SpO2, 100+ sports modes, 7 days battery, Black',
    price: 1799,
    originalPrice: 3499,
    category: 'Wearables',
    image: 'images/s11_5b6ada38f.png',
    stock: 55
  },
  {
    name: 'boAt Storm SE',
    description: '1.83-inch HD display, Bluetooth calling, Heart Rate, SpO2, Sleep tracking, functional crown, Silver',
    price: 1599,
    originalPrice: 2999,
    category: 'Wearables',
    image: 'images/se_df3e5c87b.png',
    stock: 50
  },
  {
    name: 'boAt Storm Ultra U3',
    description: '2.01-inch HD display, Bluetooth calling, premium metal build, Heart Rate, SpO2, 10 days battery, Black',
    price: 2499,
    originalPrice: 4499,
    category: 'Wearables',
    image: 'images/u3_8b2fafb99.png',
    stock: 40
  },
  {
  name: 'boAt Airdopes 161',
  description: 'Bluetooth Wireless Earbuds, ENx Tech, ASAP Charge, IWP Technology, Black',
  price: 999,
  originalPrice: 2490,
  category: 'Audio',
  image: 'images/AD_161.png',
  stock: 40
},

{
  name: 'boAt Airdopes 311 Pro',
  description: '50 Hours Playback, ENx Technology, ASAP Charge, Bluetooth v5.3, Black',
  price: 1099,
  originalPrice: 4990,
  category: 'Audio',
  image: 'images/AD_311_Pro.jpg',
  stock: 40
},

{
  name: 'boAt Airdopes Supreme',
  description: 'Premium TWS Earbuds, Long Playback, ENx Calling, Low Latency Mode',
  price: 1499,
  originalPrice: 5990,
  category: 'Audio',
  image: 'images/AD_Supreme_1.jpg',
  stock: 40
},

{
  name: 'boAt Nirvana Zenith Pro',
  description: 'Premium ANC Earbuds, High-Resolution Audio, Long Battery Life',
  price: 2499,
  originalPrice: 6990,
  category: 'Audio',
  image: 'images/zenith_pro_LR.png',
  stock: 40
},

{
  name: 'boAt Airdopes 121 Pro Plus',
  description: 'Ergonomic Design, Long Playback, Fast Charging, Bluetooth Earbuds',
  price: 1299,
  originalPrice: 3990,
  category: 'Audio',
  image: 'images/AD_121_PRO_PLUS_ergonomic_design.45.jpg',
  stock: 40
},

{
  name: 'boAt Airdopes 181 Pro',
  description: 'Bluetooth Wireless Earbuds, Fast Pairing, Deep Bass Audio',
  price: 1399,
  originalPrice: 4490,
  category: 'Audio',
  image: 'images/AD_181_pro_1.png',
  stock: 40
},

{
  name: 'boAt Airdopes 181 Pro',
  description: 'Ergonomic Design, Powerful Audio, Seamless Connectivity',
  price: 1399,
  originalPrice: 4490,
  category: 'Audio',
  image: 'images/ad181_pro_ergonomic_design.142_1.jpg',
  stock: 40
},

{
  name: 'boAt Nirvana Ion ANC',
  description: 'Active Noise Cancellation, Massive Playback, Premium Sound',
  price: 2299,
  originalPrice: 6990,
  category: 'Audio',
  image: 'images/ion_anc_1.png',
  stock: 40
},

{
  name: 'boAt Lifestyle Audio Device',
  description: 'Premium boAt Lifestyle Product with Signature Audio Quality',
  price: 1499,
  originalPrice: 3990,
  category: 'Audio',
  image: 'images/Lifestyle_1.png',
  stock: 40
},

{
  name: 'boAt Nirvana X',
  description: 'Premium Audio Experience, Deep Bass, Long Playback',
  price: 2799,
  originalPrice: 7990,
  category: 'Audio',
  image: 'images/Nirvana_X_LR_1.png',
  stock: 40
},

{
  name: 'boAt Airdopes Ultra Plus',
  description: 'Premium Wireless Earbuds, Enhanced Audio, Long Battery',
  price: 1799,
  originalPrice: 4990,
  category: 'Audio',
  image: 'images/AD_Ultra_Plus.jpg',
  stock: 40
},

{
  name: 'boAt Lifestyle Earbuds',
  description: 'Premium boAt Wireless Audio Device',
  price: 1499,
  originalPrice: 3990,
  category: 'Audio',
  image: 'images/LR_86fd641c-f8d5-4b95-be30-7fa46c63feba.png',
  stock: 40
},

{
  name: 'boAt Airdopes 161 Metal',
  description: 'Metal Finish Earbuds, Deep Bass, Bluetooth Connectivity',
  price: 1199,
  originalPrice: 2990,
  category: 'Audio',
  image: 'images/metal-161.jpg',
  stock: 40
},

{
  name: 'boAt Nirvana Ion',
  description: '120 Hours Playback, Crystal Bionic Sound, ENx Calling',
  price: 1999,
  originalPrice: 5990,
  category: 'Audio',
  image: 'images/Nirvana_Ion.jpg',
  stock: 40
},
{
  name: 'Apple AirPods 4',
  description: 'Wireless Earbuds, Personalized Spatial Audio, USB-C Charging, Sweat and Water Resistant',
  price: 12900,
  originalPrice: 13900,
  category: 'Audio',
  image: 'images/airpods-4-select-202409.jpg',
  stock: 25
},

{
  name: 'Apple AirPods 4 with Active Noise Cancellation',
  description: 'Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio, USB-C Charging Case',
  price: 17900,
  originalPrice: 19900,
  category: 'Audio',
  image: 'images/airpods-4-anc-select-202409.jpg',
  stock: 25
},

{
  name: 'Apple AirPods Pro (3rd Generation)',
  description: 'Active Noise Cancellation, Adaptive Audio, Transparency Mode, MagSafe Charging Case, Premium Sound',
  price: 24900,
  originalPrice: 26900,
  category: 'Audio',
  image: 'images/airpods-pro-3-hero-select-202509.jpg',
  stock: 25
},

{
  name: 'Samsung Galaxy Tab S9+ Privacy Screen',
  description: 'Privacy Screen Protector for Galaxy Tab S9+, Anti-Glare, Enhanced Privacy Protection',
  price: 3999,
  originalPrice: 4999,
  category: 'Tablet Accessories',
  image: 'images/in-galaxy-tab-s9-plus-privacy-screen-ef-nx812-ef-nx812pbegin-thumb-537864663.png',
  stock: 20
},

{
  name: 'Samsung Galaxy Tab S10+ Book Cover Keyboard AI',
  description: 'Premium Book Cover Keyboard with AI Key Support for Galaxy Tab S10+, Magnetic Attachment',
  price: 17999,
  originalPrice: 22999,
  category: 'Tablet Accessories',
  image: 'images/in-galaxy-tab-s10-plus-book-cover-keyboard-ai-ef-dx825-ef-dx825ubngin-thumb-543796059.png',
  stock: 15
},

{
  name: 'Samsung Galaxy Tab S10 Lite',
  description: 'Large Display Tablet, Smooth Performance, Entertainment & Productivity Device',
  price: 32999,
  originalPrice: 36999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-s10-lite-sm-x406-564578-sm-x400nzaainu-thumb-549050046.png',
  stock: 25
},

{
  name: 'Samsung Galaxy Tab S11',
  description: 'Flagship Android Tablet, Premium Display, High Performance, Productivity Ready',
  price: 74999,
  originalPrice: 82999,
  category: 'Tablets',
  image: 'images/TabS11_144x144-1.png',
  stock: 20
},

{
  name: 'Samsung Galaxy Tab A11+',
  description: 'Affordable Android Tablet, Big Display, Smooth Multimedia Experience',
  price: 18999,
  originalPrice: 21999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-a11-plus-sm-x230-sm-x230nzaains-thumb-550033747.png',
  stock: 30
},

{
  name: 'Samsung Galaxy Tab A',
  description: 'Reliable Everyday Tablet for Entertainment, Learning and Productivity',
  price: 14999,
  originalPrice: 17999,
  category: 'Tablets',
  image: 'images/Visual-LNB_Galaxy-Tab-A_mo.png',
  stock: 30
},
{
  name: 'Samsung Galaxy Tab A9+',
  description: '11-inch Display, Snapdragon Processor, Quad Speakers, Smooth Entertainment Experience',
  price: 20999,
  originalPrice: 24999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-a9-plus-sm-x210-sm-x210ndbeins-thumb-538733692.png',
  stock: 30
},

{
  name: 'Samsung Galaxy Tab S9 FE',
  description: '10.9-inch Display, S Pen Included, Exynos Processor, IP68 Water Resistance',
  price: 36999,
  originalPrice: 42999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-s9-fe-sm-x510-481717-sm-x510nlgeinu-thumb-538592670.png',
  stock: 25
},

{
  name: 'Samsung Galaxy Tab S10 FE+',
  description: 'Large Premium Display, S Pen Support, Productivity and Entertainment Tablet',
  price: 55999,
  originalPrice: 62999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-s10-fe-plus-sm-x626-542984-sm-x626bzseins-thumb-545692497.png',
  stock: 20
},

{
  name: 'Samsung Galaxy Tab S10 FE',
  description: 'Premium Android Tablet, S Pen Support, Smooth Performance and Multimedia',
  price: 47999,
  originalPrice: 54999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-s10-fe-sm-x526-542965-sm-x520nlbeins-thumb-545690572.png',
  stock: 20
},

{
  name: 'Samsung Galaxy Tab S10+',
  description: 'Flagship Android Tablet, Large AMOLED Display, High Performance, Productivity Ready',
  price: 89999,
  originalPrice: 99999,
  category: 'Tablets',
  image: 'images/in-galaxy-tab-s10-plus-sm-x820-524846-sm-x826bzaains-thumb-543759668.png',
  stock: 15
},

{
  name: 'Samsung Galaxy Tab S9+ Privacy Screen',
  description: 'Privacy Screen Protector for Galaxy Tab S9+, Anti-Glare and Secure Viewing',
  price: 3999,
  originalPrice: 4999,
  category: 'Tablet Accessories',
  image: 'images/in-galaxy-tab-s9-plus-privacy-screen-ef-nx812-ef-nx812pbegin-thumb-537864663.png',
  stock: 20
},
{
  name: 'Lenovo Tab M11',
  description: '11-inch Display, MediaTek Processor, Dolby Atmos Speakers, Ideal for Entertainment & Learning',
  price: 17999,
  originalPrice: 21999,
  category: 'Tablets',
  image: 'images/33p0ifv61wy5fgp6yid9ie81dcb9s2578141.jpg',
  stock: 25
},

{
  name: 'Lenovo Tab Plus LTE',
  description: 'Premium Display, LTE Connectivity, Immersive Audio, Smooth Multitasking',
  price: 24999,
  originalPrice: 29999,
  category: 'Tablets',
  image: 'images/27324076709_GreyLTEnew_202505051226051753702500232.png',
  stock: 20
},

{
  name: 'Lenovo Tab P12',
  description: 'Large 12.7-inch Display, Productivity Ready, Dolby Atmos, Long Battery Life',
  price: 32999,
  originalPrice: 37999,
  category: 'Tablets',
  image: 'images/ux4b65hyjuuoh68y1vevxlnzvoiyub644639.png',
  stock: 20
},

{
  name: 'Lenovo Tab M10',
  description: 'Affordable Android Tablet, HD Display, Smooth Multimedia Experience',
  price: 13999,
  originalPrice: 16999,
  category: 'Tablets',
  image: 'images/dt481lyvfkch6a9qcpx0dg3z0ljyzq493111.jpg',
  stock: 30
},

{
  name: 'Lenovo Yoga Tab',
  description: 'Premium Entertainment Tablet, Built-in Kickstand, Powerful Audio, Long Battery',
  price: 39999,
  originalPrice: 45999,
  category: 'Tablets',
  image: 'images/efyhjjao8e4ilotzvo5u5ex7ldu3j2610643.png',
  stock: 15
},
{
  name: 'OnePlus Pad Go',
  description: '11.35-inch 2.4K Display, Dolby Atmos Quad Speakers, Smooth Performance, Wi-Fi Tablet',
  price: 19999,
  originalPrice: 23999,
  category: 'Tablets',
  image: 'images/4040a6a9e79144406c554f12e598cef2.webp',
  stock: 25
},

{
  name: 'OnePlus Pad Go LTE',
  description: '11.35-inch 2.4K Display, LTE Connectivity, Dolby Atmos Speakers, Entertainment Ready',
  price: 21999,
  originalPrice: 25999,
  category: 'Tablets',
  image: 'images/95560b3bdb6e4b0c79f7b76eacb9e5f0.webp',
  stock: 25
},

{
  name: 'OnePlus Pad',
  description: '11.61-inch 144Hz Display, MediaTek Dimensity Processor, Premium Metal Build',
  price: 37999,
  originalPrice: 42999,
  category: 'Tablets',
  image: 'images/b7f7cba3ecdb24e8005a15667c0b0180.webp',
  stock: 20
},

{
  name: 'OnePlus Pad 2',
  description: 'Flagship Android Tablet, Large High-Resolution Display, Premium Performance',
  price: 42999,
  originalPrice: 47999,
  category: 'Tablets',
  image: 'images/b09b447cbb450be98fdac3a483114f5b.webp',
  stock: 20
},

{
  name: 'OnePlus Pad Lite',
  description: 'Affordable Android Tablet, Smooth Display, Everyday Entertainment and Learning',
  price: 16999,
  originalPrice: 19999,
  category: 'Tablets',
  image: 'images/fba6399523cbd6126ddcedb6920c9046.webp',
  stock: 30
},

{
  name: 'OnePlus Pad Pro',
  description: 'Premium Android Tablet, Large Display, High-End Performance, Productivity Ready',
  price: 49999,
  originalPrice: 55999,
  category: 'Tablets',
  image: 'images/73c44b96d09b0a249de49c348b25cce6.webp',
  stock: 15
},

{
  name: 'OnePlus Pad',
  description: 'Premium Android Tablet with Smooth Display and Immersive Audio Experience',
  price: 37999,
  originalPrice: 42999,
  category: 'Tablets',
  image: 'images/654176f4a08d9492994afdd215a27513.png',
  stock: 20
},
// ============ MONITORS ============
  {
    name: 'Dell P2725QE UltraSharp 27 4K Monitor',
    description: '27-inch 4K UHD IPS, 120Hz, USB-C 90W, HDMI, DisplayPort, Height/Tilt/Swivel/Pivot, 99% sRGB',
    price: 38999,
    originalPrice: 44999,
    category: 'Monitors',
    image: 'images/p2725qe_main_img.png',
    stock: 20
  },
  {
    name: 'Dell UltraSharp U3824DW 38 Curved Monitor',
    description: '38-inch WQHD+ IPS curved, USB-C Hub, 60Hz, 99% sRGB, HDMI, DP, built-in KVM switch',
    price: 130399,
    originalPrice: 154999,
    category: 'Monitors',
    image: 'images/u3824dw_main_img.png',
    stock: 10
  },
  {
    name: 'Dell UltraSharp U2424H 24 Monitor',
    description: '24-inch FHD IPS, USB-C Hub, 60Hz, 99% sRGB, HDMI, DP, Height/Tilt/Swivel/Pivot, slim bezel',
    price: 18799,
    originalPrice: 22999,
    category: 'Monitors',
    image: 'images/u2424h_main_img.png',
    stock: 30
  },
  {
    name: 'Dell UltraSharp U4025QW 40 Curved Monitor',
    description: '40-inch 5K2K IPS Black curved, Thunderbolt 4 Hub 140W, 120Hz, 99% sRGB, HDR600',
    price: 164999,
    originalPrice: 189999,
    category: 'Monitors',
    image: 'images/u4025qw_main_img.png',
    stock: 8
  },
  {
    name: 'Dell UltraSharp U3425WE 34 Curved Monitor',
    description: '34-inch WQHD IPS curved, Thunderbolt 4 Hub, 120Hz, 99% sRGB, HDMI, DP, KVM switch',
    price: 73399,
    originalPrice: 84999,
    category: 'Monitors',
    image: 'images/u3425we_main_img.png',
    stock: 15
  },
  {
    name: 'Dell Alienware AW2723DF 27 Gaming Monitor',
    description: '27-inch QHD IPS, 280Hz, 1ms, G-Sync, HDMI 2.1, DP 1.4, USB Hub, gaming grade display',
    price: 45149,
    originalPrice: 54999,
    category: 'Monitors',
    image: 'images/aw2723df_new.png',
    stock: 18
  },
  {
    name: 'Dell UltraSharp U3226Q 32 4K QD-OLED Monitor',
    description: '31.5-inch 4K QD-OLED, 120Hz, DisplayHDR True Black 500, Anti-Glare, Thunderbolt 4, USB-C 140W',
    price: 219999,
    originalPrice: 249999,
    category: 'Monitors',
    image: 'images/monitor-ultrasharp-u3226q-black-gallery-1.png',
    stock: 5
  },
  {
    name: 'Dell Pro P2425E 24 USB-C Hub Monitor',
    description: '24-inch FHD 16:10 IPS, USB-C 65W, 100Hz, 99% sRGB, HDMI, DP, Height/Tilt/Swivel/Pivot',
    price: 20099,
    originalPrice: 24999,
    category: 'Monitors',
    image: 'images/p2425e_main_img.png',
    stock: 25
  },
  {
    name: 'Dell Pro P2426 24 Monitor',
    description: '23.8-inch FHD IPS, 120Hz, USB-C, HDMI, DP, Height/Tilt/Swivel/Pivot, 99% sRGB, eye comfort',
    price: 17999,
    originalPrice: 21999,
    category: 'Monitors',
    image: 'images/p2426_main_img.png',
    stock: 28
  },
  {
    name: 'Dell Alienware AW3225QF 32 4K QD-OLED Gaming Monitor',
    description: '31.5-inch 4K QD-OLED, 240Hz, 0.03ms, G-Sync, HDMI 2.1, DP 1.4, ultimate gaming display',
    price: 91999,
    originalPrice: 109999,
    category: 'Monitors',
    image: 'images/aw3225qf_main_img.png',
    stock: 12
  },
  {
    name: 'Dell Pro P2425D QHD Monitor',
    description: '24-inch QHD IPS, 100Hz, USB-C, HDMI, DP, Height/Tilt/Swivel/Pivot, 99% sRGB, slim design',
    price: 19999,
    originalPrice: 24999,
    category: 'Monitors',
    image: 'images/p2425d_main_img.png',
    stock: 22
  },
  {
    name: 'Dell 32 Plus 4K Monitor S3225QS',
    description: '32-inch 4K UHD IPS, 120Hz, HDMI 2.1, DP 1.4, VRR, 99% sRGB, HDR, immersive viewing experience',
    price: 34999,
    originalPrice: 42999,
    category: 'Monitors',
    image: 'images/s3225qs_main_img.png',
    stock: 20
  },
  {
    name: 'Apple Studio Display',
    description: '27-inch 5K Retina, 600 nits, P3 wide color, True Tone, 12MP Ultra Wide camera, Thunderbolt 3, 96W charging',
    price: 149900,
    originalPrice: 169900,
    category: 'Monitors',
    image: 'images/hero_studio_display__cngbjlqh5936_small.jpg',
    stock: 10
  },
  {
    name: 'Apple Studio Display XDR',
    description: '27-inch 5K Retina XDR Mini-LED, 2000 nits HDR, P3+Adobe RGB, 120Hz, Thunderbolt 5, 140W charging, A19 Pro',
    price: 289900,
    originalPrice: 319900,
    category: 'Monitors',
    image: 'images/hero_studio_display_xdr__dsmbspy6jjcm_small_2x.jpg',
    stock: 8
  },
  {
    name: 'Dell Monitor W185',
    description: '18.5-inch HD TN panel, 60Hz, VGA, compact budget monitor, ideal for home and office use',
    price: 6999,
    originalPrice: 8999,
    category: 'Monitors',
    image: 'images/w185.png',
    stock: 40
  },
];
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    await Product.insertMany(products);
    console.log('✅ All 6 products added!');
    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seed();