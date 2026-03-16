interface SectionHeaderProps {
  tagline?: string;
  heading: string;
  text?: string;
  center?: boolean;
}

const SectionHeader = ({ tagline, heading, text, center = true }: SectionHeaderProps) => (
  <div className={`flex flex-col gap-4 max-w-[768px] ${center ? "items-center text-center mx-auto" : "items-start"}`}>
    {tagline && <span className="text-base font-semibold text-foreground">{tagline}</span>}
    <div className="flex flex-col gap-6">
      <h2 className="text-5xl font-bold leading-[1.2] text-foreground">{heading}</h2>
      {text && <p className="text-lg text-foreground">{text}</p>}
    </div>
  </div>
);

export default SectionHeader;
