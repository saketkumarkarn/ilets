interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={['text-center max-w-2xl mx-auto', className].filter(Boolean).join(' ')}>
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 bg-blue-700 rounded-full" aria-hidden="true" />
    </div>
  );
}
