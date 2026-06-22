import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import callbackImg from "@/assets/callback-pharma.jpg";

export function CallbackSection() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Request received! Our team will call you within 1 hour.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
              <img
                src={callbackImg}
                alt="Pharmacist"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />

              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5 text-white">
                <p className="text-sm opacity-80">Customer Care Hotline</p>
                <p className="text-2xl font-bold">+91 99999 99999</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-glow-accent animate-float">
              <Phone className="w-10 h-10 text-accent-foreground" />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-3">
              Request a Call Back
            </span>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Let's discuss your{" "}
              <span className="text-gradient-primary">
                requirements
              </span>
            </h2>

            <p className="mt-3 text-muted-foreground">
              Share your details and our pharma specialist will get in touch within an hour.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              <Field
                icon={User}
                name="name"
                placeholder="Full Name"
                required
              />

              <Field
                icon={Phone}
                name="phone"
                placeholder="Phone Number"
                required
                type="tel"
              />

              <Field
                icon={Mail}
                name="email"
                placeholder="Email Address"
                type="email"
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2 relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />

                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={loading}
                className="sm:col-span-2"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Submit Request
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  className = "",
  ...props
}: {
  icon: React.ElementType;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative ${className}`}>
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

      <input
        {...props}
        className="w-full pl-11 pr-4 h-12 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-smooth"
      />
    </div>
  );
}