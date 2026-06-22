import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Adhya Pharmex Healthcare" },
      { name: "description", content: "Get in touch with Adhya Pharmex Healthcare. Request a callback, send an enquiry or visit our Mumbai headquarters." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Contact Us" title="Let's Talk Pharmaceuticals" subtitle="Whether you're a retailer, manufacturer or patient — we're here to help." />

      <section className="py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1fr_1.4fr] gap-10 max-w-6xl">
          <div className="space-y-4">
            {[
              { icon: MapPin, t: "Headquarters", d: "14 Pharma Street, Industrial Area\nMumbai, Maharashtra 400001" },
              { icon: Phone, t: "Phone", d: "+91 99999 99999\n+91 88888 88888" },
              { icon: Mail, t: "Email", d: "hello@medonix.com\nsales@medonix.com" },
              { icon: Clock, t: "Working Hours", d: "Mon – Sat: 9:00 AM – 7:00 PM\nSunday: Closed" },
            ].map((c, i) => (
              <motion.div key={c.t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ x: 4 }} className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-smooth flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{c.t}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line mt-0.5">{c.d}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-8 rounded-3xl bg-card border border-border/50 shadow-elegant">
            <h2 className="text-2xl font-bold">Send Us a Message</h2>
            <p className="text-sm text-muted-foreground mt-1">Fill in the form and our team will reach out within 24 hours.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Field icon={User} name="name" placeholder="Your Name" required />
              <Field icon={Phone} name="phone" placeholder="Phone Number" type="tel" required />
              <Field icon={Mail} name="email" placeholder="Email Address" type="email" required className="sm:col-span-2" />
              <div className="sm:col-span-2 relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                <textarea name="message" placeholder="Your message..." rows={5} required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth resize-none" />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={loading} className="sm:col-span-2">
                {loading ? "Sending..." : (<>Send Message <Send className="w-4 h-4" /></>)}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ icon: Icon, className = "", ...props }: { icon: React.ElementType; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative ${className}`}>
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input {...props} className="w-full pl-11 pr-4 h-12 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth" />
    </div>
  );
}