type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-sky-800">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-pretty text-base font-medium leading-7 text-slate-700 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
