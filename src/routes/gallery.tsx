import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import tablet from "@/assets/product-tablet.jpg";
import syrup from "@/assets/product-syrup.jpg";
import injection from "@/assets/product-injection.jpg";
import capsule from "@/assets/product-capsule.jpg";
import ointment from "@/assets/product-ointment.jpg";
import vitamins from "@/assets/product-vitamins.jpg";
import drops from "@/assets/product-drops.jpg";
import inhaler from "@/assets/product-inhaler.jpg";
import callback from "@/assets/callback-pharma.jpg";
import hero from "@/assets/hero-pharma.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Aadya Pharmex Healthcare" },
      { name: "description", content: "Tour our facilities, products and team behind India's most trusted pharmaceutical distribution network." },
      { property: "og:image", content: hero },
    ],
  }),
  component: GalleryPage,
});

const images = [hero, callback, tablet, syrup, injection, capsule, ointment, vitamins, drops, inhaler, hero, callback];

function GalleryPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Behind the Scenes" title="Our Gallery" subtitle="A glimpse of our products, facilities and the people who make it all possible." />
      <section className="py-20">
        <div className="container mx-auto px-4 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-elegant transition-smooth group">
              <img src={img} alt="" className="w-full h-auto group-hover:scale-110 transition-smooth duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}