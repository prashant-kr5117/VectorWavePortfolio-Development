/**
 * Shown while BlogPage's async server component fetches posts from Sanity.
 * See app/blog/[slug]/loading.tsx for why this boundary matters.
 */
export default function LoadingBlog() {
  return (
    <main className="flex-1 animate-pulse">
      <section className="bg-surface-alt px-4 py-14 text-center sm:px-6 sm:py-16">
        <div className="mx-auto mb-6 h-5 w-16 rounded-full bg-border" />
        <div className="mx-auto h-7 w-full max-w-xl rounded bg-border" />
        <div className="mx-auto mt-4 h-4 w-2/3 max-w-md rounded bg-border" />
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 h-11 w-full max-w-md rounded-full bg-surface-alt" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-border">
                <div className="h-32 w-full bg-surface-alt" />
                <div className="flex flex-col gap-3 p-5">
                  <div className="h-4 w-16 rounded-full bg-surface-alt" />
                  <div className="h-4 w-full rounded bg-surface-alt" />
                  <div className="h-4 w-4/5 rounded bg-surface-alt" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
