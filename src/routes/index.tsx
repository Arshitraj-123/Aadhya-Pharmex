import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/site/Hero";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { Categories } from "@/components/site/Categories";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Stats } from "@/components/site/Stats";
import { CallbackSection } from "@/components/site/CallbackSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aadya Medicine Agencies — Trusted Pharmaceutical Distributor" },
      { name: "description", content: "Trusted pharmaceutical distributor delivering quality medicines to retailers. GSTIN: 09MHMPK6914Q1Z5. Based in Saharanpur, Uttar Pradesh." },
      { property: "og:title", content: "Aadya Medicine Agencies — Trusted Pharmaceutical Distributor" },
      { property: "og:description", content: "Quality medicines, dependable distribution. Serving retailers across Uttar Pradesh." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <Stats />
      <CallbackSection />
    </PageShell>
  );
}
