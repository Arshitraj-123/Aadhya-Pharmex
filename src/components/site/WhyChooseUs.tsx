import { motion } from "framer-motion";
import { ShieldCheck, Truck, Award, Clock, Users, BadgeCheck } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "WHO-GMP Certified", desc: "All medicines manufactured under strict quality protocols and global standards." },
  { icon: Truck, title: "Pan-India Distribution", desc: "Reliable logistics covering 400+ retailers with cold-chain capability." },
  { icon: Award, title: "Premium Brands", desc: "Authorized distributor for 50+ leading pharmaceutical companies." },
  { icon: Clock, title: "On-Time Delivery", desc: "97% on-time delivery rate with real-time order tracking." },
  { icon: Users, title: "Expert Team", desc: "Pharmacists and supply chain specialists with 20+ years of experience." },
  { icon: BadgeCheck, title: "Authentic Products", desc: "100% genuine medicines with full batch traceability." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-soft relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-3">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold">Built on <span className="text-gradient-primary">Trust & Quality</span></h2>
          <p className="mt-3 text-muted-foreground">Everything we do is engineered for reliability, safety, and care.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, rotate: -0.5 }}
              className="group p-7 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-elegant transition-smooth"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-5 group-hover:scale-110 transition-bounce">
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}