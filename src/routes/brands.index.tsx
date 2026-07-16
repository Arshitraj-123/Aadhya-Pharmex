import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { BrandCard } from "@/components/site/BrandCard";
import { brands } from "@/data/brands";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Pharmaceutical Brands — Aadya Pharmex Healthcare" },
      { name: "description", content: "Explore 50+ trusted pharmaceutical brands distributed by Aadya Pharmex Healthcare — Cipla, Sun Pharma, Dr. Reddy's, Lupin and more." },
      { property: "og:title", content: "Pharmaceutical Brands — Aadya Pharmex Healthcare" },
      { property: "og:description", content: "Browse trusted pharma brands distributed by Aadya Pharmex Healthcare." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Trusted Partners"
        title="Our Pharmaceutical Brands"
        subtitle="We proudly distribute medicines from the world's most trusted pharmaceutical manufacturers."
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((b, i) => <BrandCard key={b.slug} brand={b} index={i} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}