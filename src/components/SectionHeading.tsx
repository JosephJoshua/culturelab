interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  alignment = "left",
}: Props) {
  return (
    <div
      className={`flex flex-col gap-2 ${alignment === "center" ? "items-center text-center" : ""}`}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.24em] text-amber-200/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="firefly-parallax font-display text-3xl text-sand sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm text-sand/70">{description}</p>
      ) : null}
    </div>
  );
}
