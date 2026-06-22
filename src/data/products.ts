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
  { slug: "tablets", name: "Tablets", icon: "Pill", count: 1240 },
  { slug: "syrups", name: "Syrups", icon: "FlaskConical", count: 480 },
  { slug: "injections", name: "Injections", icon: "Syringe", count: 320 },
  { slug: "capsules", name: "Capsules", icon: "Capsule", count: 890 },
  { slug: "ointments", name: "Ointments", icon: "Droplet", count: 210 },
  { slug: "vitamins", name: "Vitamins", icon: "Heart", count: 540 },
  { slug: "drops", name: "Eye/Ear Drops", icon: "Eye", count: 180 },
  { slug: "inhalers", name: "Inhalers", icon: "Wind", count: 95 },
];

const imgMap: Record<string, string> = {
  tablets: tablet,
  syrups: syrup,
  injections: injection,
  capsules: capsule,
  ointments: ointment,
  vitamins,
  drops,
  inhalers: inhaler,
};

const sampleNames: Record<string, string[]> = {
  tablets: ["Paracetamol 500mg", "Azithromycin 250mg", "Cetirizine 10mg", "Amlodipine 5mg", "Metformin 500mg", "Pantoprazole 40mg"],
  syrups: ["Cough Relief Syrup", "Multivitamin Syrup", "Iron Tonic", "Antacid Suspension", "Cold & Flu Syrup", "Digestive Tonic"],
  injections: ["Vitamin B12 Inj", "Insulin 100IU", "Diclofenac Inj", "Ceftriaxone 1g", "Tetanus Toxoid", "Hydrocortisone Inj"],
  capsules: ["Omeprazole 20mg", "Amoxicillin 500mg", "Doxycycline 100mg", "Fluoxetine 20mg", "Pregabalin 75mg", "Itraconazole 100mg"],
  ointments: ["Antiseptic Cream", "Anti-fungal Cream", "Pain Relief Gel", "Hydrocortisone Cream", "Burn Care Ointment", "Mupirocin Ointment"],
  vitamins: ["Vitamin D3 60K", "Multivitamin Plus", "Vitamin C 1000mg", "Calcium + D3", "Omega-3 Fish Oil", "Iron + Folic Acid"],
  drops: ["Lubricating Eye Drops", "Anti-allergic Drops", "Ear Wax Removal", "Antibiotic Eye Drops", "Glaucoma Drops", "Saline Nasal Drops"],
  inhalers: ["Salbutamol Inhaler", "Budesonide Inhaler", "Tiotropium Inhaler", "Formoterol Inhaler", "Combination Inhaler", "Rescue Inhaler"],
};

const brands = ["Adhya Pharmex Pharma", "Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin", "Zydus", "Mankind", "Torrent"];

export const products: Product[] = (() => {
  const list: Product[] = [];
  let id = 1;
  for (const cat of categories) {
    const names = sampleNames[cat.slug];
    names.forEach((name, i) => {
      const mrp = 80 + ((id * 37) % 900);
      const price = Math.round(mrp * 0.82);
      list.push({
        id: String(id++),
        name,
        brand: brands[(id + i) % brands.length],
        category: cat.slug,
        image: imgMap[cat.slug],
        mrp,
        price,
        packing: cat.slug === "syrups" ? "100ml Bottle" : cat.slug === "injections" ? "1 Vial" : "Strip of 10",
        composition: name,
        description:
          "Premium quality pharmaceutical product manufactured under strict GMP standards. Trusted by 400+ retailers and dispensed by leading hospitals across the country. Store in a cool, dry place.",
      });
    });
  }
  return list;
})();

export const featuredProducts = products.filter((_, i) => i % 4 === 0).slice(0, 8);

export const getProductById = (id: string) => products.find((p) => p.id === id);