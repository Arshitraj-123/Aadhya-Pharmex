import tablet from "@/assets/product-tablet.jpg";
import syrup from "@/assets/product-syrup.jpg";
import injection from "@/assets/product-injection.jpg";
import capsule from "@/assets/product-capsule.jpg";
import ointment from "@/assets/product-ointment.jpg";
import vitamins from "@/assets/product-vitamins.jpg";
import drops from "@/assets/product-drops.jpg";
import inhaler from "@/assets/product-inhaler.jpg";
import hajmola from "@/assets/hajmola-candy.jpg";
import { productImageMap } from "./productImages";



export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  mrp: number;
  price: number;
  packing: string;
  composition: string;
  description: string;
};

export const categories = [
  { slug: "counter-products", name: "Counter Products", icon: "Pill", count: 12 },
  { slug: "surgical-products", name: "Surgical Products", icon: "Syringe", count: 13 },
  { slug: "health-drinks", name: "Health Drinks", icon: "GlassWater", count: 4 },
  { slug: "laxative-powders", name: "Laxative Powders", icon: "Pill", count: 3 },
  { slug: "baby-products", name: "Baby Products", icon: "Baby", count: 12 },
  { slug: "balms-and-pain-killers", name: "Balms & Pain Killers", icon: "Flame", count: 17 },
  { slug: "medical-devices", name: "Medical Devices", icon: "Stethoscope", count: 10 },
  { slug: "toothpaste", name: "Toothpaste", icon: "Smile", count: 4 },
  { slug: "cosmetics-and-others", name: "Cosmetics & Others", icon: "Sparkles", count: 27 },
  { slug: "ointment", name: "Ointment", icon: "Droplet", count: 25 },
  { slug: "lotion", name: "Lotion", icon: "Droplet", count: 25 },
  { slug: "drops", name: "Drops", icon: "Eye", count: 40 },
  { slug: "gel", name: "Gel", icon: "Droplet", count: 18 },
  { slug: "cream", name: "Cream", icon: "Droplet", count: 38 },
  { slug: "dusting-powder", name: "Dusting Powder", icon: "Wind", count: 20 },
  { slug: "inhaler", name: "Inhaler", icon: "Wind", count: 10 },
  { slug: "respules", name: "Respules", icon: "Wind", count: 10 },
  { slug: "iv-fluids", name: "IV Fluids", icon: "Droplet", count: 6 },
  { slug: "gargles", name: "Gargles", icon: "Droplet", count: 4 },
  { slug: "mouth-wash", name: "Mouth Wash", icon: "Droplet", count: 20 },
  { slug: "soap", name: "Soap", icon: "Droplet", count: 20 },
  { slug: "powder", name: "Powder", icon: "Package", count: 10 },
  { slug: "baby-drops", name: "Baby Drops", icon: "Baby", count: 30 },
  { slug: "face-wash", name: "Face Wash", icon: "Droplet", count: 10 },
  { slug: "shampoo", name: "Shampoo", icon: "Droplet", count: 10 },
];

const imgMap: Record<string, string> = {
  "counter-products": hajmola,
  "surgical-products": injection,
  "health-drinks": vitamins,
  "laxative-powders": capsule,
  "baby-products": syrup,
  "balms-and-pain-killers": ointment,
  "medical-devices": injection,
  "toothpaste": tablet,
  "cosmetics-and-others": capsule,
  "ointment": ointment,
  "lotion": ointment,
  "drops": drops,
  "gel": ointment,
  "cream": ointment,
  "dusting-powder": capsule,
  "inhaler": inhaler,
  "respules": inhaler,
  "iv-fluids": injection,
  "gargles": syrup,
  "mouth-wash": syrup,
  "soap": capsule,
  "powder": vitamins,
  "baby-drops": drops,
  "face-wash": capsule,
  "shampoo": capsule,
};

const sampleNames: Record<string, string[]> = {
  "counter-products": [
    "Hajmola Candy",
    "Vicks Lozenge",
    "Just Drop / Cough Lozenges",
    "Sils",
    "Coughl",
    "Honeytus",
    "Hand Sanitizer (Any Brand)",
    "Disinfection Spray",
    "Bandages",
    "Disinfectant Liquid",
    "Antiseptic Liquid",
    "Handwash (Any Brand)"
  ],
  "surgical-products": [
    "Hand Gloves",
    "Surgical Cotton",
    "Needle",
    "Syringe",
    "Surgical Tape",
    "Foley Catheter",
    "Knee Cap",
    "Elbow Cap",
    "Baby Diaper",
    "Adult Diaper",
    "Sanitary Pads",
    "Face Mask",
    "Ear Buds"
  ],
  "health-drinks": [
    "Bournvita",
    "Complan",
    "Horlicks",
    "Boost"
  ],
  "laxative-powders": [
    "Pet Saffa",
    "Kayam Churna",
    "Isabgol"
  ],
  "baby-products": [
    "Celex (All Range)",
    "NAN Pro (All Range)",
    "Baby Gift Kit",
    "Baby Powder",
    "Baby Cream",
    "Baby Oil",
    "Baby Lotion",
    "Baby Shampoo",
    "Baby Soap",
    "Baby Nipple",
    "Baby Milk Bottle",
    "Baby Wipes"
  ],
  "balms-and-pain-killers": [
    "Zandu Balm",
    "AP Special Balm",
    "Tiger Balm",
    "Moov Balm (Monisons Balm)",
    "Hara Mallam",
    "Iodex",
    "Vicks Vaporub",
    "Vicks Baby Rub",
    "Moov Gel",
    "Volini Gel",
    "Omnigel",
    "Moov Spray",
    "Volini Spray",
    "Combiflam Gel",
    "Combiflam Spray",
    "Omni Spray",
    "Fast Relief"
  ],
  "medical-devices": [
    "BP Monitor",
    "Glucometer",
    "Oximeter",
    "Thermometer",
    "Vaporizer",
    "Nebulizer",
    "Weight Machine",
    "Heating Pad",
    "Hot Water Bag",
    "Massager"
  ],
  "toothpaste": [
    "Colgate (All Range)",
    "Sensodyne (All Range)",
    "Patanjali Dant Kanti",
    "Dabur Red Paste"
  ],
  "cosmetics-and-others": [
    "Dabur Lal Tail",
    "Glucose (Any Brand)",
    "Honey (Any Brand)",
    "Mosquito Repellent Cream",
    "Odonil",
    "Face Wash",
    "Chyawanprash",
    "Boro Plus",
    "Petroleum Jelly",
    "Glycerine",
    "Soaps (Any Brand)",
    "Vicco Turmeric",
    "Mosquito Coil",
    "Mosquito Liquid Vaporiser",
    "Fast Card",
    "Amritdhara",
    "Pran Shuddha",
    "Mosquito Roll-On",
    "Toothbrushes",
    "Hair Removal Cream",
    "V-Wash",
    "Talcum Powder",
    "Hair Color / Dye",
    "Lip Guard",
    "Ring Guard",
    "Yogi Kanthika",
    "Medilight"
  ],
  "ointment": [
    "TBAE 2% Ointment",
    "Betadine 10% Ointment",
    "Pilex Forte Ointment",
    "Thrombophob Ointment",
    "Topisal 6% Ointment",
    "Propysalic NF Ointment",
    "Medisalic Ointment",
    "Tekrow Forte Ointment",
    "Tenovate Ointment",
    "Nise Gel Ointment",
    "Cipladine Ointment",
    "Zole-F Ointment",
    "Lobet-S Ointment",
    "Myocin D Ointment",
    "Dubiner Ointment",
    "Lobet Ointment",
    "Sensor Ointment",
    "Dip-Salic F Ointment",
    "Denza Ointment",
    "Clop-S Ointment",
    "Neo-Salic 6 Ointment",
    "Metrogyl-P 2% Ointment",
    "Betnovate-S Ointment",
    "Clonate Ointment",
    "Fason Ointment"
  ],
  "lotion": [
    "Nazia Max Lotion",
    "Nivea Lotion",
    "Cetaphil Lotion",
    "Physiogel Lotion",
    "Moiz Lotion",
    "AP Soft Lotion",
    "Topisal 3% Lotion",
    "Daprobate Plus Lotion",
    "Lacto Calamine Lotion",
    "Candid B Lotion",
    "Cut Plus Lotion",
    "Topisal 6% Lotion",
    "Dezon Lotion",
    "Zy Lotion",
    "Caladryl Lotion",
    "Taris Lotion",
    "Rivela Tint Lotion",
    "Momet Lotion",
    "Halex-S Lotion",
    "Keto Star Lotion",
    "Kera Glow AD Lotion",
    "Anaboom AD Lotion",
    "Clonate Lotion",
    "Propysalic-A Lotion",
    "Onabet Lotion"
  ],
  "drops": [
    "Refresh Tears Eye Drop",
    "Itone Eye Drop",
    "Refresh Liquid Gel Eye Drop",
    "Hylo Soft Eye Drop",
    "Dorzox T Eye Drop",
    "Himalaya Ophthacare Eye Drop",
    "Otwin / Pedreza Drop",
    "Lubrix Eye Drop",
    "Gentle Eye Drop",
    "Epitears Eye Drop",
    "Tear Drops",
    "Clearwax Ear Drop",
    "Optive Eye Drop",
    "Eye Mist Eye Drop",
    "Lubimoist Eye Drop",
    "Ciplox Eye/Ear Drop",
    "Brimolol Eye Drop",
    "Iotim Eye Drop",
    "Mostane Eye Drop",
    "Nutra Site Eye Drop",
    "Soliwax Ear Drop",
    "Biomed / Bimat Eye Drop",
    "Mytears Eye Drop",
    "Hylapf Eye Drop",
    "Flo Gel Eye Drop",
    "Xylomist Nasal Drop",
    "Glaucomol Eye Drop",
    "Moxicip Eye Drop",
    "Ciplox D Eye/Ear Drop",
    "Betafree Eye Drop",
    "Lotepred Eye Drop",
    "Eco Tears Eye Drop",
    "Lubriks DS Eye Drop",
    "Maxmoist Ultra Eye Drop",
    "Brizotim Eye Drop",
    "Bribis Eye Drop",
    "Toxo Eye Drop",
    "Ed Tears Lubricant Eye Drop",
    "Brimcom Eye Drop",
    "Megabrom Eye Drop"
  ],
  "gel": [
    "Benzac AC 2.5% Gel",
    "Acne Star Gel",
    "Acidermin Jelly",
    "Zitcare S 1% Gel",
    "Oxyclin Gel",
    "Clinc A 1% Gel",
    "Faceclin Gel",
    "Kozi Vit Ultra Gel",
    "Himcolin Gel",
    "Adapalene Gel",
    "Clear Gel 1%",
    "Throfare Gel",
    "Cystaflam Gel",
    "Persol AC 5 Gel",
    "DFO Gel",
    "Viron Gel",
    "Glocin Gel",
    "Elitra Plus Gel"
  ],
  "cream": [
    "Imol Cream",
    "Glyco 6 Cream 0.025%",
    "Delanozin Cream",
    "Candid Cream",
    "Nishia Max Cream",
    "Betnovate N Cream",
    "Anovate Cream",
    "Sparp Asen Cream",
    "Fusi Bet Cream",
    "Biluma Cream",
    "Zarina Cream",
    "Tenovate Cream",
    "Age-Derm 20% Cream",
    "Betnovate C Cream",
    "Four Derm Cream",
    "Momate Cream",
    "Lulifin Cream",
    "Anovate Cream",
    "Quad-Derm RF Cream",
    "Skinlite Cream",
    "Flutivate Cream",
    "Eumosone M Cream",
    "Lulilock Cream",
    "Desowen Cream",
    "Momate F Cream",
    "Tri-luma Cream",
    "Cetaphil Cream",
    "Sebamed Cream",
    "Cutisoft Cream",
    "Onabet 2% Cream",
    "Clocip Cream",
    "Melacare Cream",
    "Lobet GM Neo Cream",
    "Clob-G Cream",
    "Foodie Cream",
    "Clonate F Cream",
    "Nedy Backed Cream",
    "Rashfree Cream"
  ],
  "dusting-powder": [
    "Absorb Dusting Powder",
    "Candid Dusting Powder",
    "Clocip Dusting Powder",
    "Neosporin Dusting Powder",
    "Zocon 1% Dusting Powder",
    "Mycoderm C Dusting Powder",
    "Nebasel Dusting Powder",
    "Canesten Dusting Powder",
    "Keto Dusting Powder",
    "Flucos Dusting Powder",
    "Tetmosol Dusting Powder",
    "New Force Dusting Powder",
    "KZ Dusting Powder",
    "Terbinaforce Dusting Powder",
    "Tyza Dusting Powder",
    "Surfaz Dusting Powder",
    "Pendam Plus Dusting Powder",
    "Terbest Dusting Powder",
    "Dress Dusting Powder",
    "Tribin Dusting Powder"
  ],
  "inhaler": [
    "Foracort Inhaler",
    "Vicks Inhaler",
    "Alin Inhaler",
    "Seroflo Inhaler",
    "Duolin Inhaler",
    "Levolin 50mcg Inhaler",
    "Aerocort Inhaler",
    "Duova Inhaler",
    "Formonide 200 Inhaler",
    "Budecort 200 Inhaler"
  ],
  "respules": [
    "Budecort 0.5 Respule",
    "Levolin 3 Respule",
    "Foracort 0.5 Respule",
    "Levolin 0.63 Respule",
    "Asthalin Respule",
    "Budecort 0.5 Respule",
    "Formonide 5 Respule",
    "Flohale 5 Respule",
    "Combimist L Respule",
    "Hyperneb 3% Respule"
  ],
  "iv-fluids": [
    "NS - Normal Saline",
    "DNS - Dextrose + NS",
    "RL - Ringer Lactate",
    "D5 - Dextrose 5%",
    "D10 - Dextrose 10%",
    "D25 - Dextrose 25%"
  ],
  "gargles": [
    "Betadine Gargle",
    "Cofsils Expert Gargle",
    "Betakind Gargle",
    "Max Berry Gargle"
  ],
  "mouth-wash": [
    "Listerine Mouth Wash",
    "Hexidine Mouth Wash",
    "Chlohex ADS Mouth Wash",
    "Sankool AD Mouth Wash",
    "Hi Ora Mouth Wash",
    "Colera Mouth Wash",
    "Amflor Mouth Wash",
    "Hydroxy Mouth Wash",
    "Thermokind Mouth Wash",
    "Freshclor Mouth Wash",
    "Himalaya Oro T Mouth Wash",
    "Maxtra Gargle Mouth Wash",
    "Rexidine SRS Mouth Wash",
    "Kidodent Mouth Wash",
    "Sankool AD Mouth Wash",
    "Buragen Plus Mouth Wash",
    "Floritop Mouth Wash",
    "Sensod-K Mouth Wash",
    "Lupident Mouth Wash",
    "SHY OR Mouth Wash"
  ],
  "soap": [
    "Tetmosol Soap",
    "Acne Star Soap",
    "Keto Soap",
    "Perobar 2.5 Soap",
    "Derma Dew Soap",
    "Cetaphil Soap",
    "Sebamed Soap",
    "Keto Cip Soap",
    "Keto Star Soap",
    "KET Soap",
    "Ketofly Soap",
    "Ketokem Soap",
    "Kenz Soap",
    "HH Mite Soap",
    "Zocon Soap",
    "Moizident Soap",
    "LS-Du Soap",
    "Navel Soap",
    "New Force Soap",
    "Keto Scalp Soap"
  ],
  "powder": [
    "ORS Powder",
    "Protein X Powder",
    "Eno Powder",
    "Pediasure Powder",
    "Ensure Powder",
    "Sugar Free Powder",
    "Dexol Powder",
    "Milk Powder",
    "Lactogen Powder",
    "MacPro Powder"
  ],
  "baby-drops": [
    "Colicaid Drop",
    "D-Protin Drop",
    "Ultra D3 Drop",
    "Calcine P Drop",
    "A2Z AA Plus Drop",
    "Bevon Drops",
    "D3 Must Drops",
    "Maxtra Drop",
    "Uprise D3 Drop",
    "Mucolite Drop",
    "Ascoril LS Drop",
    "Sinarest AF Drop",
    "Domstal Baby Drop",
    "Ferium XT Drop",
    "Health OK Drop",
    "Cypon Drop",
    "Solvin Cold AF Drop",
    "Liv 5 Drop",
    "Brot Drop",
    "Asthakind P Drop",
    "Vitcofol Oral Drop",
    "Wicoryl Oral Drop",
    "Bactisol Drop",
    "Cyclopam Drop",
    "Macbery Drop",
    "Cetizen Drop",
    "Unzyme Drop",
    "Zincetotal Drop",
    "Mot norm Drop",
    "BroZedex LS Drop"
  ],
  "face-wash": [
    "Derma Dew Face Wash",
    "Sebonac Face Wash",
    "Ethiglo Face Wash",
    "KLM Klin Face Wash",
    "Tone N Glow Face Wash",
    "Acmed Face Wash",
    "Acne Star Face Wash",
    "Luma Face Wash",
    "Acgtame Face Wash",
    "Sellywash"
  ],
  "shampoo": [
    "Scalp Plus Shampoo",
    "Kera Glow AD Shampoo",
    "8X Shampoo",
    "Keto Cip 2% Shampoo",
    "Sesia KT Shampoo",
    "Ketok Shampoo",
    "MD Shampoo",
    "Sebowash Shampoo",
    "Anaboom Shampoo",
    "Keto Cip Shampoo"
  ],
};

const brands = [
  "Aadya Pharmex",
  "Cipla",
  "Sun Pharma",
  "Dr. Reddy's",
  "Lupin",
  "Zydus",
  "Mankind",
  "Torrent",
];

export const products: Product[] = (() => {
  const list: Product[] = [];
  let id = 1;

  for (const cat of categories) {
    const names = sampleNames[cat.slug] || [];

    names.forEach((name, i) => {
      const mrp = 80 + ((id * 37) % 900);
      const price = Math.round(mrp * 0.82);

      list.push({
        id: String(id++),
        name,
        brand: brands[(id + i) % brands.length],
        category: cat.slug,
        image: productImageMap[name] || imgMap[cat.slug] || tablet,
        mrp,
        price,
        packing:
          cat.slug === "health-drinks"
            ? "200g Pack"
            : cat.slug === "medical-devices"
            ? "1 Unit"
            : cat.slug === "drops"
            ? "10ml Bottle"
            : cat.slug === "inhalers"
            ? "1 Inhaler"
            : "Standard Pack",
        composition: name,
        description:
          "Premium quality healthcare product available at Aadya Pharmex. Manufactured under strict quality standards and trusted by customers across multiple healthcare categories.",
      });
    });
  }

  return list;
})();

export const featuredProducts = products
  .filter((_, i) => i % 2 === 0)
  .slice(0, 8);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);