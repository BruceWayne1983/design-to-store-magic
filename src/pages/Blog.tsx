import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blog";

const Blog = () => (
  <div className="flex flex-col items-start w-full">
    <Helmet>
      <title>Science-Led Resources | Baseline Nutrition Blog</title>
      <meta name="description" content="Deep dives into the mechanisms, ingredients and protocols behind every Baseline formula. Clinically-referenced, evidence-based nutrition science." />
    </Helmet>
    <AnnouncementBar />
    <Navbar />
    <section className="w-full bg-background py-16 md:py-28 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col gap-3 text-center max-w-[640px] mx-auto">
          <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Education</span>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Science-Led Resources
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Deep dives into the mechanisms, ingredients and protocols behind every Baseline formula.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="w-full aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={1024}
                  height={576}
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{article.category}</span>
                  <span className="text-[10px] text-muted-foreground">{article.readTime}</span>
                </div>
                <h2 className="text-sm md:text-base font-bold text-foreground leading-snug">{article.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{article.description}</p>
                <span className="self-start mt-3 text-xs font-medium text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Blog;
