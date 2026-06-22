import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Adhya Pharmex Healthcare" },
      { name: "description", content: "Discover Adhya Pharmex Healthcare — a trusted pharmaceutical distributor with 20+ years of expertise serving 400+ retailers nationwide." },
      { property: "og:title", content: "About Us — Adhya Pharmex Healthcare" },
      { property: "og:description", content: "20+ years of pharmaceutical distribution excellence." },
    ],
  }),
  component: AboutPage,
});

const subPages = [
  { to: "/about/history", title: "Company History", desc: "Two decades of pharmaceutical excellence" },
  { to: "/about/mission", title: "Mission & Vision", desc: "Healthcare access for every corner of India" },
  { to: "/about/ceo", title: "CEO Desk", desc: "A message from our founder" },
  { to: "/about/certifications", title: "Certifications", desc: "WHO-GMP, ISO 9001:2015 & more" },
  { to: "/about/testimonials", title: "Testimonials", desc: "What our partners say about us" },
  { to: "/about/brands", title: "Brands We Work With", desc: "50+ leading pharmaceutical companies" },
] as const;

function AboutPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="About Adhya Pharmex" title="Distributing Trust Since 2003" subtitle="Two decades of building India's most reliable pharmaceutical supply network." />

      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold leading-tight">An <span className="text-gradient-primary">overview</span> of who we are</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Adhya Pharmex Healthcare is a leading pharmaceutical distributor headquartered in Mumbai with a presence across 12 states. Since 2003, we have built a reputation for authenticity, on-time delivery and an uncompromising quality standard.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our 8000+ product catalog covers every major therapeutic segment — from acute care and chronic disease management to wellness, vitamins and specialty injections.
            </p>
            <Button asChild variant="hero" className="mt-6"><Link to="/contact">Partner With Us <ArrowRight className="w-4 h-4" /></Link></Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, t: "Mission", d: "Reliable medicine access for every retailer." },
              { icon: Eye, t: "Vision", d: "India's most trusted pharma network by 2030." },
              { icon: Heart, t: "Care", d: "Every shipment carries patient outcomes." },
              { icon: Target, t: "Quality", d: "Zero compromise on safety standards." },
            ].map((c, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-card border border-border/50 shadow-md">
                <c.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Explore <span className="text-gradient-primary">More</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subPages.map((p, i) => (
              <motion.div key={p.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={p.to} className="group block p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover-lift">
                  <h3 className="font-semibold group-hover:text-primary transition-smooth">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold gap-1 group-hover:gap-2 transition-smooth">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}