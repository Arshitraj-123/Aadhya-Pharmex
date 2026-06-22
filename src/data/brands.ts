import { products as allProducts, type Product } from "./products";
import tablet from "@/assets/product-tablet.jpg";
import syrup from "@/assets/product-syrup.jpg";
import injection from "@/assets/product-injection.jpg";
import capsule from "@/assets/product-capsule.jpg";
import ointment from "@/assets/product-ointment.jpg";
import vitamins from "@/assets/product-vitamins.jpg";
import drops from "@/assets/product-drops.jpg";
import inhaler from "@/assets/product-inhaler.jpg";

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  founded: string;
  country: string;
};

export const brands: Brand[] = [
  { slug: "medonix-pharma", name: "Adhya Pharmex Pharma", tagline: "Our In-House Excellence", description: "Premium in-house formulations across critical therapeutic segments, manufactured under strict WHO-GMP standards.", color: "from-emerald-700 to-amber-500", founded: "2008", country: "India" },
  { slug: "abbott", name: "Abbott", tagline: "A Promise For Life", description: "Global healthcare leader providing trusted medicines and diagnostics across 160+ countries.", color: "from-blue-700 to-cyan-500", founded: "1888", country: "USA" },
  { slug: "cipla", name: "Cipla", tagline: "Caring for Life", description: "Global pharmaceutical leader delivering high-quality, affordable medicines to patients in over 80 countries.", color: "from-sky-600 to-emerald-500", founded: "1935", country: "India" },
  { slug: "sun-pharma", name: "Sun Pharma", tagline: "Reaching People, Touching Lives", description: "India's largest pharmaceutical company and a top global specialty generics player.", color: "from-amber-600 to-orange-400", founded: "1983", country: "India" },
  { slug: "alkem", name: "Alkem", tagline: "Quality. Innovation. Trust.", description: "Leading Indian pharmaceutical company specializing in branded generics, generic drugs and APIs.", color: "from-rose-600 to-orange-400", founded: "1973", country: "India" },
  { slug: "dr-reddys", name: "Dr. Reddy's", tagline: "Good Health Can't Wait", description: "Integrated pharma company committed to providing access to affordable and innovative medicines.", color: "from-rose-600 to-pink-400", founded: "1984", country: "India" },
  { slug: "intas", name: "Intas", tagline: "Healthier. Together.", description: "Leading vertically integrated Indian multinational pharmaceutical company.", color: "from-indigo-600 to-violet-400", founded: "1976", country: "India" },
  { slug: "lupin", name: "Lupin", tagline: "Innovation in Healing", description: "Trusted multinational pharma producing branded and generic formulations across the globe.", color: "from-emerald-600 to-teal-400", founded: "1968", country: "India" },
  { slug: "zydus", name: "Zydus", tagline: "Dedicated to Life", description: "Leading discovery-driven, global life sciences company with a strong specialty pipeline.", color: "from-violet-600 to-indigo-400", founded: "1952", country: "India" },
  { slug: "mankind", name: "Mankind", tagline: "Serving Life", description: "One of the fastest-growing Indian pharma companies, focused on accessible healthcare for all.", color: "from-fuchsia-600 to-purple-400", founded: "1991", country: "India" },
  { slug: "glenmark", name: "Glenmark", tagline: "A New Way for a New World", description: "Research-driven global pharmaceutical company with a robust dermatology and respiratory portfolio.", color: "from-orange-600 to-amber-400", founded: "1977", country: "India" },
  { slug: "torrent", name: "Torrent", tagline: "Care. Cure. Wellness.", description: "Leading chronic-therapy player with a strong domestic and international footprint.", color: "from-sky-600 to-blue-400", founded: "1959", country: "India" },
  { slug: "aristo", name: "Aristo", tagline: "Healing With Care", description: "One of India's fastest-growing pharma companies focused on quality formulations.", color: "from-teal-600 to-emerald-400", founded: "1971", country: "India" },
  { slug: "micro-labs", name: "Micro Labs", tagline: "Compassion in Healing", description: "Leading Indian pharma manufacturer recognized for cardiac, diabetic and ophthalmic ranges.", color: "from-cyan-600 to-sky-400", founded: "1973", country: "India" },
  { slug: "alembic", name: "Alembic", tagline: "Innovation Lives Here", description: "One of the oldest pharmaceutical companies in India, with a global generics footprint.", color: "from-amber-700 to-yellow-400", founded: "1907", country: "India" },
  { slug: "macleods", name: "Macleods", tagline: "Caring for People", description: "Major global producer of anti-TB, anti-malarial, cardiovascular and dermatology medicines.", color: "from-red-600 to-rose-400", founded: "1989", country: "India" },
  { slug: "emcure", name: "Emcure", tagline: "Powered by Science", description: "Innovation-led pharmaceutical company with strengths in HIV, gynaecology and cardiology.", color: "from-purple-700 to-fuchsia-400", founded: "1981", country: "India" },
];

const imgMap: Record<string, string> = {
  tablets: tablet, syrups: syrup, injections: injection, capsules: capsule,
  ointments: ointment, vitamins, drops, inhalers: inhaler,
};

// Realistic medicine names per brand
const brandCatalog: Record<string, Array<{ name: string; cat: keyof typeof imgMap; composition: string }>> = {
  "abbott": [
    { name: "Digene Antacid Gel", cat: "syrups", composition: "Magaldrate + Simethicone" },
    { name: "Thyronorm 50mcg", cat: "tablets", composition: "Thyroxine Sodium" },
    { name: "Brufen 400mg", cat: "tablets", composition: "Ibuprofen" },
    { name: "Duphaston 10mg", cat: "tablets", composition: "Dydrogesterone" },
    { name: "Cremaffin Plus", cat: "syrups", composition: "Liquid Paraffin + Milk of Magnesia" },
    { name: "Pediasure Vanilla", cat: "vitamins", composition: "Nutritional Supplement" },
  ],
  "cipla": [
    { name: "Azee 500mg", cat: "tablets", composition: "Azithromycin" },
    { name: "Asthalin Inhaler", cat: "inhalers", composition: "Salbutamol 100mcg" },
    { name: "Budecort 200 Inhaler", cat: "inhalers", composition: "Budesonide" },
    { name: "Foracort 200 Inhaler", cat: "inhalers", composition: "Formoterol + Budesonide" },
    { name: "Ciplox 500mg", cat: "tablets", composition: "Ciprofloxacin" },
    { name: "Novamox 500", cat: "capsules", composition: "Amoxicillin" },
  ],
  "sun-pharma": [
    { name: "Volini Pain Relief Gel", cat: "ointments", composition: "Diclofenac Diethylamine" },
    { name: "Revital H Capsules", cat: "capsules", composition: "Multivitamin + Ginseng" },
    { name: "Pantocid 40", cat: "tablets", composition: "Pantoprazole" },
    { name: "Rosuvas 10", cat: "tablets", composition: "Rosuvastatin" },
    { name: "Susten 200", cat: "capsules", composition: "Natural Progesterone" },
    { name: "Levipil 500", cat: "tablets", composition: "Levetiracetam" },
  ],
  "alkem": [
    { name: "Clavam 625", cat: "tablets", composition: "Amoxicillin + Clavulanic Acid" },
    { name: "Pan 40", cat: "tablets", composition: "Pantoprazole" },
    { name: "Taxim-O 200", cat: "tablets", composition: "Cefixime" },
    { name: "Gemcal Capsules", cat: "capsules", composition: "Calcitriol + Calcium" },
    { name: "Pan-D Capsules", cat: "capsules", composition: "Pantoprazole + Domperidone" },
    { name: "A to Z NS Syrup", cat: "syrups", composition: "Multivitamin + Minerals" },
  ],
  "dr-reddys": [
    { name: "Omez 20mg", cat: "capsules", composition: "Omeprazole" },
    { name: "Stamlo 5mg", cat: "tablets", composition: "Amlodipine" },
    { name: "Nise 100mg", cat: "tablets", composition: "Nimesulide" },
    { name: "Mintop 5% Solution", cat: "drops", composition: "Minoxidil" },
    { name: "Atocor 10", cat: "tablets", composition: "Atorvastatin" },
    { name: "Econorm Sachet", cat: "vitamins", composition: "Saccharomyces Boulardii" },
  ],
  "intas": [
    { name: "Ubiphene 50mg", cat: "tablets", composition: "Clomiphene Citrate" },
    { name: "Liofen 10mg", cat: "tablets", composition: "Baclofen" },
    { name: "Calpol 500", cat: "tablets", composition: "Paracetamol" },
    { name: "Levipil 500", cat: "tablets", composition: "Levetiracetam" },
    { name: "Sompraz 40", cat: "tablets", composition: "Esomeprazole" },
    { name: "Insuglar 100IU", cat: "injections", composition: "Insulin Glargine" },
  ],
  "lupin": [
    { name: "Gluconorm G2", cat: "tablets", composition: "Glimepiride + Metformin" },
    { name: "Rablet D", cat: "capsules", composition: "Rabeprazole + Domperidone" },
    { name: "Telma 40", cat: "tablets", composition: "Telmisartan" },
    { name: "Ondem MD 4", cat: "tablets", composition: "Ondansetron" },
    { name: "Budamate 200 Inhaler", cat: "inhalers", composition: "Budesonide + Formoterol" },
    { name: "Ivabrad 5", cat: "tablets", composition: "Ivabradine" },
  ],
  "zydus": [
    { name: "Mifegest Kit", cat: "tablets", composition: "Mifepristone + Misoprostol" },
    { name: "Atorva 10", cat: "tablets", composition: "Atorvastatin" },
    { name: "Sugar Free Natura", cat: "tablets", composition: "Sucralose" },
    { name: "Skinlite Cream", cat: "ointments", composition: "Hydroquinone + Tretinoin" },
    { name: "Deriphyllin Retard 150", cat: "tablets", composition: "Etophylline + Theophylline" },
    { name: "Mucinac 600 Sachet", cat: "vitamins", composition: "Acetylcysteine" },
  ],
  "mankind": [
    { name: "Manforce Tablets", cat: "tablets", composition: "Sildenafil 100mg" },
    { name: "Unwanted 72", cat: "tablets", composition: "Levonorgestrel 1.5mg" },
    { name: "Prega News Kit", cat: "drops", composition: "hCG Pregnancy Test" },
    { name: "Gas-O-Fast Jeera", cat: "vitamins", composition: "Antacid Effervescent" },
    { name: "Dydroboon 10", cat: "tablets", composition: "Dydrogesterone" },
    { name: "Moxikind-CV 625", cat: "tablets", composition: "Amoxicillin + Clavulanic Acid" },
  ],
  "glenmark": [
    { name: "Telma H 40", cat: "tablets", composition: "Telmisartan + Hydrochlorothiazide" },
    { name: "Candid B Cream", cat: "ointments", composition: "Clotrimazole + Beclomethasone" },
    { name: "Ascoril LS Syrup", cat: "syrups", composition: "Ambroxol + Levosalbutamol + Guaifenesin" },
    { name: "Episoft AC Lotion", cat: "ointments", composition: "Moisturizer" },
    { name: "Halovate Cream", cat: "ointments", composition: "Halobetasol Propionate" },
    { name: "Zita Plus 20/500", cat: "tablets", composition: "Teneligliptin + Metformin" },
  ],
  "torrent": [
    { name: "Shelcal 500", cat: "tablets", composition: "Calcium Carbonate + Vit D3" },
    { name: "Chymoral Forte", cat: "tablets", composition: "Trypsin + Chymotrypsin" },
    { name: "Nikoran 5", cat: "tablets", composition: "Nicorandil" },
    { name: "Dilzem 30", cat: "tablets", composition: "Diltiazem" },
    { name: "Nexpro RD 40", cat: "capsules", composition: "Esomeprazole + Domperidone" },
    { name: "Unienzyme Tablets", cat: "tablets", composition: "Fungal Diastase + Papain" },
  ],
  "aristo": [
    { name: "Monocef 1g Inj", cat: "injections", composition: "Ceftriaxone" },
    { name: "Neeri Syrup", cat: "syrups", composition: "Ayurvedic Diuretic" },
    { name: "Wikoryl Tablets", cat: "tablets", composition: "Paracetamol + Phenylephrine + CPM" },
    { name: "Aldigesic-P", cat: "tablets", composition: "Aceclofenac + Paracetamol" },
    { name: "Roseday 10", cat: "tablets", composition: "Rosuvastatin" },
    { name: "Sporlac DS", cat: "tablets", composition: "Lactic Acid Bacillus" },
  ],
  "micro-labs": [
    { name: "Dolo 650", cat: "tablets", composition: "Paracetamol" },
    { name: "Amlong 5", cat: "tablets", composition: "Amlodipine" },
    { name: "Lupisulide P", cat: "tablets", composition: "Nimesulide + Paracetamol" },
    { name: "Olmin 20", cat: "tablets", composition: "Olmesartan" },
    { name: "Indever 40", cat: "tablets", composition: "Propranolol" },
    { name: "Ezact 10", cat: "tablets", composition: "Ezetimibe" },
  ],
  "alembic": [
    { name: "Althrocin 500", cat: "tablets", composition: "Erythromycin" },
    { name: "Roxid 150", cat: "tablets", composition: "Roxithromycin" },
    { name: "Wikoryl AF Drops", cat: "drops", composition: "Paracetamol + Phenylephrine + CPM" },
    { name: "Zeet Expectorant", cat: "syrups", composition: "Ambroxol + Guaifenesin + Terbutaline" },
    { name: "Azithral 500", cat: "tablets", composition: "Azithromycin" },
    { name: "Glychek M 500", cat: "tablets", composition: "Glimepiride + Metformin" },
  ],
  "macleods": [
    { name: "Telista 40", cat: "tablets", composition: "Telmisartan" },
    { name: "Zifi 200", cat: "tablets", composition: "Cefixime" },
    { name: "Rifagut 400", cat: "tablets", composition: "Rifaximin" },
    { name: "Hepamerz Sachet", cat: "vitamins", composition: "L-Ornithine L-Aspartate" },
    { name: "Glycomet GP 1", cat: "tablets", composition: "Glimepiride + Metformin" },
    { name: "Amlokind AT", cat: "tablets", composition: "Amlodipine + Atenolol" },
  ],
  "emcure": [
    { name: "Asomex 5", cat: "tablets", composition: "S-Amlodipine" },
    { name: "Orofer XT", cat: "tablets", composition: "Iron + Folic Acid" },
    { name: "Vertin 16", cat: "tablets", composition: "Betahistine" },
    { name: "Tenvir EM", cat: "tablets", composition: "Tenofovir + Emtricitabine" },
    { name: "Ferium XT Syrup", cat: "syrups", composition: "Iron Polymaltose + Folic Acid" },
    { name: "Climax Spray", cat: "ointments", composition: "Lignocaine 12.5%" },
  ],
  "medonix-pharma": [
    { name: "Adhya Pharmex Cough Relief", cat: "syrups", composition: "Dextromethorphan + CPM" },
    { name: "Adhya Pharmex Pain-X 100", cat: "tablets", composition: "Aceclofenac" },
    { name: "Adhya Pharmex B-Complex Forte", cat: "capsules", composition: "Vitamin B Complex" },
    { name: "Adhya Pharmex Calci-D3", cat: "tablets", composition: "Calcium + Vit D3" },
    { name: "Adhya Pharmex Antiseptic Cream", cat: "ointments", composition: "Chlorhexidine + Cetrimide" },
    { name: "Adhya Pharmex Iron Tonic", cat: "syrups", composition: "Ferrous Ascorbate + Folic Acid" },
  ],
};

const brandProducts: Product[] = [];
let nextId = allProducts.length + 1000;
for (const b of brands) {
  const items = brandCatalog[b.slug] ?? [];
  items.forEach((it, i) => {
    const mrp = 90 + ((nextId * 41 + i * 17) % 850);
    const price = Math.round(mrp * 0.82);
    brandProducts.push({
      id: `b-${b.slug}-${i + 1}`,
      name: it.name,
      brand: b.name,
      category: it.cat,
      image: imgMap[it.cat],
      mrp, price,
      packing: it.cat === "syrups" ? "100ml Bottle" : it.cat === "injections" ? "1 Vial" : it.cat === "inhalers" ? "200 MDI" : it.cat === "ointments" ? "30g Tube" : it.cat === "drops" ? "10ml Bottle" : "Strip of 10",
      composition: it.composition,
      description: `${it.name} by ${b.name} — authentic, quality-assured pharmaceutical product distributed by Adhya Pharmex Healthcare. Manufactured under strict GMP standards. Store in a cool, dry place. Read leaflet before use.`,
    });
    nextId++;
  });
}

export const allBrandProducts = brandProducts;

export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

export const getProductsForBrand = (brandName: string) => {
  const own = brandProducts.filter((p) => p.brand.toLowerCase() === brandName.toLowerCase());
  const generic = allProducts.filter((p) => p.brand.toLowerCase() === brandName.toLowerCase());
  return [...own, ...generic];
};

export const brandSlugFromName = (name: string) =>
  brands.find((b) => b.name.toLowerCase() === name.toLowerCase())?.slug;
