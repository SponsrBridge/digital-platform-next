export default function BlogPostLoading() {
  return (
    <div className="pt-20 min-h-screen bg-brand-navy font-sans animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-4xl pt-8">
        <div className="h-4 w-32 bg-brand-border/30 rounded mb-8" />

        <div className="space-y-4 pb-8">
          <div className="h-5 w-24 bg-brand-border/30 rounded-full" />
          <div className="h-10 w-full bg-brand-border/30 rounded" />
          <div className="h-10 w-3/4 bg-brand-border/30 rounded" />
          <div className="h-6 w-full bg-brand-border/30 rounded" />
          <div className="h-6 w-5/6 bg-brand-border/30 rounded" />
          <div className="flex gap-6 pt-4 border-t border-brand-border">
            <div className="h-4 w-24 bg-brand-border/30 rounded" />
            <div className="h-4 w-32 bg-brand-border/30 rounded" />
            <div className="h-4 w-20 bg-brand-border/30 rounded" />
          </div>
        </div>

        <div className="h-[400px] bg-brand-border/30 rounded-xl mb-12" />

        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-5 w-full bg-brand-border/30 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
