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
      { title: "Aadya Pharmex Healthcare — Trusted Pharmaceutical Distributor" },
      { name: "description", content: "Premium pharmaceutical distributor delivering 8000+ medicines from 50+ leading brands to 400+ retailers across India. WHO-GMP certified." },
      { property: "og:title", content: "Aadya Pharmex Healthcare — Trusted Pharmaceutical Distributor" },
      { property: "og:description", content: "Premium medicines, dependable distribution. Serving 400+ retailers nationwide." },
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
