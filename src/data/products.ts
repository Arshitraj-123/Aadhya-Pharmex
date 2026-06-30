import tablet from "@/assets/product-tablet.jpg";
import syrup from "@/assets/product-syrup.jpg";
import injection from "@/assets/product-injection.jpg";
import capsule from "@/assets/product-capsule.jpg";
import ointment from "@/assets/product-ointment.jpg";
import vitamins from "@/assets/product-vitamins.jpg";
import drops from "@/assets/product-drops.jpg";
import inhaler from "@/assets/product-inhaler.jpg";

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
  { slug: "health-drinks", name: "Health Drinks", icon: "Heart", count: 4 },
  { slug: "baby-products", name: "Baby Products", icon: "Heart", count: 12 },
  { slug: "medical-devices", name: "Medical Devices", icon: "Eye", count: 10 },
  { slug: "drops", name: "Drops", icon: "Eye", count: 35 },
  { slug: "cream", name: "Cream", icon: "Droplet", count: 28 },
  { slug: "inhalers", name: "Inhalers", icon: "Wind", count: 9 },
];

const imgMap: Record<string, string> = {
  "counter-products": tablet,
  "surgical-products": injection,
  "health-drinks": vitamins,
  "baby-products": syrup,
  "medical-devices": injection,
  drops: drops,
  cream: ointment,
  inhalers: inhaler,
};

const sampleNames: Record<string, string[]> = {
  "counter-products": [
    "Hajmola Candy",
    "Vicks Lozenge",
    "Honeytus",
    "Hand Sanitizer",
    "Bandages",
    "Handwash"
  ],

  "surgical-products": [
    "Hand Gloves",
    "Surgical Cotton",
    "Syringe",
    "Needle",
    "Face Mask",
    "Sanitary Pads"
  ],

  "health-drinks": [
    "Horlicks",
    "Boost",
    "Bournvita",
    "Complan"
  ],

  "baby-products": [
    "Baby Oil",
    "Baby Lotion",
    "Baby Shampoo",
    "Baby Soap",
    "Baby Wipes",
    "Baby Powder"
  ],

  "medical-devices": [
    "BP Monitor",
    "Thermometer",
    "Nebulizer",
    "Glucometer",
    "Oximeter",
    "Vaporizer"
  ],

  drops: [
    "Refresh Tears Eye Drop",
    "Ciplox Eye Drop",
    "Optive Eye Drop",
    "Hylo Soft Eye Drop",
    "Itone Eye Drop",
    "Lubrix Eye Drop"
  ],

  cream: [
    "Candid Cream",
    "Betnovate Cream",
    "Cetaphil Cream",
    "Momate Cream",
    "Biluma Cream",
    "Melacare Cream"
  ],

  inhalers: [
    "Foracort Inhaler",
    "Seroflo Inhaler",
    "Duolin Inhaler",
    "Levolin Inhaler",
    "Budecort Inhaler",
    "Aerocort Inhaler"
  ],
};

const brands = [
  "Adhya Pharmex",
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
        image: imgMap[cat.slug] || tablet,
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
          "Premium quality healthcare product available at Adhya Pharmex. Manufactured under strict quality standards and trusted by customers across multiple healthcare categories.",
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