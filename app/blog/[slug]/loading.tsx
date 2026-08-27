/**
 * Shown while the async server component below fetches the post from Sanity.
 * Without this, Next.js renders nothing at all for the full duration of that
 * fetch (no URL change, no visual feedback) — on a slow connection that reads
 * as "the link doesn't work." See BlogPostPage in ./page.tsx.
 */
export default function LoadingBlogPost() {
  return (
    <main className="flex-1 animate-pulse">
      <section className="bg-surface-alt px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 h-4 w-28 rounded bg-border" />
          <div className="mx-auto mb-3 h-4 w-20 rounded-full bg-border" />
          <div className="mx-auto mt-5 h-7 w-full max-w-lg rounded bg-border" />
          <div className="mx-auto mt-3 h-7 w-2/3 max-w-sm rounded bg-border" />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <div className="h-4 w-24 rounded bg-border" />
            <div className="h-4 w-20 rounded bg-border" />
            <div className="h-4 w-20 rounded bg-border" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          <div className="mb-2 h-56 w-full rounded-xl bg-surface-alt sm:h-72" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-full rounded bg-surface-alt" />
            <div className="h-4 w-full rounded bg-surface-alt" />
            <div className="h-4 w-5/6 rounded bg-surface-alt" />
            <div className="h-4 w-full rounded bg-surface-alt" />
            <div className="h-4 w-3/4 rounded bg-surface-alt" />
          </div>
        </div>
      </section>
    </main>
  );
}
