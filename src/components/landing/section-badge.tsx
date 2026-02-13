export function SectionBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-monad/25 px-5 py-2">
      <div className="h-px w-6 bg-monad/25" />
      <span className="text-xs font-medium tracking-wider text-monad">
        {text}
      </span>
      <div className="h-px w-6 bg-monad/25" />
    </div>
  );
}
