interface SectionHeaderProps {
  tagline?: string;
  heading: string;
  text?: string;
  center?: boolean;
}

const SectionHeader = ({ tagline, heading, text, center = true }: SectionHeaderProps) => (
  <div className={`flex flex-col gap-4 max-w-[768px] ${center ? "items-center text-center mx-auto" : "items-start"}`}>
    {tagline && <span className="text-sm font-semibold text-primary uppercase tracking-widest">{tagline}</span>}
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-black leading-[1.1] text-foreground uppercase tracking-tight">{heading}</h2>
      {text && <p className="text-lg text-muted-foreground">{text}</p>}
    </div>
  </div>
);

export default SectionHeader;
