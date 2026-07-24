const imageModules = import.meta.glob("../assets/products/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function normalizeImageKey(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

const imageIndex = new Map<string, string>();

for (const [assetPath, src] of Object.entries(imageModules)) {
  const fileName = assetPath.split("/").pop() ?? assetPath;
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const key = normalizeImageKey(baseName);

  if (!imageIndex.has(key)) {
    imageIndex.set(key, src);
  }
}

export function resolveProductImage(productName: string, fallbackImage: string) {
  const normalizedName = normalizeImageKey(productName);

  if (!normalizedName) {
    return { image: fallbackImage, matched: false };
  }

  const exactMatch = imageIndex.get(normalizedName);
  if (exactMatch) {
    return { image: exactMatch, matched: true };
  }

  for (const [assetKey, assetSrc] of imageIndex.entries()) {
    if (normalizedName.includes(assetKey) || assetKey.includes(normalizedName)) {
      return { image: assetSrc, matched: true };
    }
  }

  return { image: fallbackImage, matched: false };
}
