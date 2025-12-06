interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: "left" | "center";
  animated?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  alignment = "left",
  animated = true,
}: Props) {
  return (
    <div
      className={`flex flex-col gap-2 ${alignment === "center" ? "items-center text-center" : ""}`}
      data-parallax-paused={animated ? undefined : "1"}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.24em] text-amber-200/80">
          {eyebrow}
        </p>
      ) : null}
      <div
        className={`firefly-parallax flex flex-col gap-1 text-sand ${alignment === "center" ? "items-center" : ""} sm:flex-row sm:items-baseline sm:gap-3`}
      >
        <span
          className={`font-display text-3xl leading-tight sm:text-4xl ${animated ? "animated-heading" : ""}`}
        >
          {title}
        </span>
        {subtitle ? (
          <span
            className={`whitespace-nowrap text-lg font-semibold leading-tight text-sand/80 sm:text-xl ${animated ? "animated-subtitle" : ""}`}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-sm text-sand/70">{description}</p>
      ) : null}
    </div>
  );
}
