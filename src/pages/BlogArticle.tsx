import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blog";
import { getProduct } from "@/data/products";
import { ArrowLeft } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  const relatedProduct = article.relatedProduct
    ? products.find((p) => p.slug === article.relatedProduct)
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Baseline Nutrition" },
  };

  return (
    <div className="flex flex-col items-start w-full">
      <Helmet>
        <title>{article.title} | Baseline Nutrition</title>
        <meta name="description" content={article.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AnnouncementBar />
      <Navbar />

      <article className="w-full bg-background py-12 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-[760px] mx-auto flex flex-col gap-8">
          {/* Back link */}
          <Link to="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                {article.pillar}
              </span>
              <span className="text-xs text-muted-foreground">{article.readTime}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-foreground uppercase tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{article.author}</span>
              <span>·</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>

          {/* Hero image */}
          <div className="w-full rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover"
              width={1024}
              height={576}
            />
          </div>

          {/* Article body */}
          <div className="flex flex-col gap-8">
            {article.content.map((section, i) => (
              <div key={i} className="flex flex-col gap-3">
                {section.heading && (
                  <h2 className="text-lg md:text-xl font-bold text-foreground">{section.heading}</h2>
                )}
                {section.body.split("\n\n").map((paragraph, j) => (
                  <p key={j} className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Related product CTA */}
          {relatedProduct && (
            <div className="border border-border rounded-lg p-6 flex flex-col sm:flex-row items-center gap-4 bg-secondary">
              <img
                src={relatedProduct.images[0]}
                alt={relatedProduct.name}
                className="w-20 h-20 object-contain rounded"
                loading="lazy"
              />
              <div className="flex flex-col gap-1 flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Featured Product</span>
                <span className="text-sm font-bold text-foreground">{relatedProduct.name}</span>
                <span className="text-xs text-muted-foreground">{relatedProduct.tagline}</span>
              </div>
              <Link
                to={`/product/${relatedProduct.slug}`}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                View Product
              </Link>
            </div>
          )}

          {/* More articles */}
          <div className="border-t border-border pt-8 flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground">More Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blogArticles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 2)
                .map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="flex gap-3 p-3 border border-border rounded-lg hover:border-primary/30 transition-all group"
                  >
                    <img src={a.image} alt={a.title} className="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{a.category}</span>
                      <span className="text-xs font-bold text-foreground leading-snug">{a.title}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogArticle;
