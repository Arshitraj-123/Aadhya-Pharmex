import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import ceoImg from "@/assets/ceo.jpg";

export const Route = createFileRoute("/about/ceo")({
  head: () => ({
    meta: [
      { title: "CEO Desk — Adhya Pharmex Healthcare" },
      { name: "description", content: "A personal message from our CEO on the values, vision and people behind Adhya Pharmex Healthcare." },
      { property: "og:image", content: ceoImg },
    ],
  }),
  component: CeoPage,
});

function CeoPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="From the CEO" title="A Message From Our Leader" />
      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-[400px_1fr] gap-12 items-start max-w-6xl">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-3 bg-gradient-primary opacity-30 blur-3xl rounded-3xl" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
              <img src={ceoImg} alt="CEO" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="mt-5 text-center">
              <h3 className="text-xl font-bold">Mr. Rajiv Mehra</h3>
              <p className="text-sm text-muted-foreground">Founder & Chief Executive Officer</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Quote className="w-12 h-12 text-accent mb-4" />
            <p className="text-2xl font-medium leading-relaxed text-foreground">
              When we started Adhya Pharmex in 2003, our promise was simple: every medicine we deliver should be authentic, on-time, and traceable.
            </p>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>Twenty years later, that promise has grown into a network of 400+ partner retailers, 50+ leading brands, and 8000+ products. But the heart of what we do remains unchanged — patient outcomes start with a trustworthy supply chain.</p>
              <p>Our team works every day to make medicine access faster, safer, and fairer. From cold-chain logistics for biologicals to digital tracking for every retailer, we invest in the systems that make healthcare reliable.</p>
              <p>Thank you for being part of our journey. Whether you're a retailer, a manufacturer, or a patient receiving care — you make Adhya Pharmex what it is.</p>
            </div>
            <p className="mt-8 font-semibold">— Rajiv Mehra</p>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}