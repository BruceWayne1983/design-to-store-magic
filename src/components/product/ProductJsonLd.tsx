import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { ProductData } from "@/data/products";

interface ProductJsonLdProps {
  product: ProductData;
}

const ProductJsonLd = ({ product }: ProductJsonLdProps) => {
  const priceNum = product.price.replace(/[^0-9.]/g, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline + ". " + product.benefits.join(". "),
    image: product.images[0],
    brand: {
      "@type": "Brand",
      name: "Baseline Nutrition",
    },
    sku: product.slug,
    offers: {
      "@type": "Offer",
      url: `https://baselinenutrition.co.uk/product/${product.slug}`,
      priceCurrency: "GBP",
      price: priceNum,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Baseline Nutrition",
      },
    },
    category: "Dietary Supplements",
  };

  return (
    <Helmet>
      <title>{product.name} — Baseline Nutrition</title>
      <meta name="description" content={`${product.name} — ${product.tagline}. ${product.format}. ${product.price}. Clinically dosed, fully transparent.`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default ProductJsonLd;
