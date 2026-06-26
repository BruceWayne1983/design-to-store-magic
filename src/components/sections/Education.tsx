import { Link } from "react-router-dom";
import { blogArticles } from "@/data/blog";

const Education = () => (
  <section className="w-full bg-secondary py-16 md:py-28 px-4 md:px-8 lg:px-16">
    <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-3 text-center max-w-[640px] mx-auto">
        <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em]">Reading Room</span>
        <h2 className="text-2xl md:text-4xl font-black text-foreground uppercase tracking-tight">
          Ingredient & Training Notes
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Short, referenced write-ups on the actives we use, the protocols they sit inside, and what the trial data actually shows.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {blogArticles.map((a) => (
          <Link
            key={a.slug}
            to={`/blog/${a.slug}`}
            className="flex flex-col bg-background border border-border rounded-lg overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="w-full aspect-video overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={1024}
                height={576}
              />
            </div>
            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{a.category}</span>
                <span className="text-[10px] text-muted-foreground">{a.readTime}</span>
              </div>
              <h5 className="text-sm md:text-base font-bold text-foreground leading-snug">{a.title}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{a.description}</p>
              <span className="self-start mt-3 text-xs font-medium text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Read Article →
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/blog"
          className="px-6 py-3 border border-border text-sm font-bold text-foreground uppercase tracking-wider rounded hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          View All Articles
        </Link>
      </div>
    </div>
  </section>
);

export default Education;
