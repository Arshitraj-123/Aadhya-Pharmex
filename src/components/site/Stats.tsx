import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 400, suffix: "+", label: "Retailers Served" },
  { value: 8000, suffix: "+", label: "Products in Catalog" },
  { value: 50, suffix: "+", label: "Partner Brands" },
  { value: 20, suffix: "+", label: "Years Experience" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, to, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-white/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-float-slow" />
      </div>
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold tracking-tight">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest opacity-80">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}