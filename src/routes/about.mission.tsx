import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Globe, Users, ShieldCheck } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/about/mission")({
  head: () => ({
    meta: [
      { title: "Mission & Vision — Aadya Pharmex Healthcare" },
      { name: "description", content: "Our mission is to make quality medicine accessible to every retailer in India. Our vision is to build the country's most trusted pharmaceutical distribution network." },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Purpose & Direction" title="Our Mission and Vision" subtitle="Healthcare access starts with a reliable supply chain." />
      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 max-w-6xl">
          {[
            { icon: Target, title: "Our Mission", text: "To be the most reliable distribution partner for pharmacies, hospitals and clinics across India — ensuring authentic, quality-tested medicines reach every patient who needs them.", color: "from-primary to-primary-glow" },
            { icon: Eye, title: "Our Vision", text: "To build India's most trusted pharmaceutical network by 2030, integrating technology, ethics, and human care at every touchpoint of the supply chain.", color: "from-accent to-accent-glow" },
          ].map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-card border border-border/50 shadow-elegant overflow-hidden">
              <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl`} />
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-5 shadow-glow`}>
                <c.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">{c.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Our <span className="text-gradient-primary">Core Values</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { icon: Heart, t: "Patient First", d: "Every decision answers to patient outcomes." },
              { icon: ShieldCheck, t: "Integrity", d: "100% authentic, fully traceable supply." },
              { icon: Users, t: "Partnership", d: "Long-term relationships with retailers & brands." },
              { icon: Globe, t: "Reach", d: "Equitable access across urban and rural India." },
            ].map((v, i) => (
              <motion.div key={v.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover-lift">
                <v.icon className="w-7 h-7 text-accent mb-3" />
                <h3 className="font-semibold">{v.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}