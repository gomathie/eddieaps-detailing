import Link from 'next/link';

const posts = [
  {
    slug: 'why-mobile-detailing-is-worth-it',
    title: 'Why Mobile Detailing Is Worth It',
    excerpt: 'Convenience, time savings, and showroom results for busy professionals.',
  },
  {
    slug: 'ceramic-coating-vs-wax',
    title: 'Ceramic Coating vs Wax',
    excerpt: 'A simple guide to choosing the right paint protection.',
  },
  {
    slug: 'how-often-should-you-detail',
    title: 'How Often Should You Detail Your Car?',
    excerpt: 'Learn the ideal maintenance schedule for your vehicle.',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-black text-white sm:text-5xl">Detailing Blog</h1>
          <p className="text-lg text-slate-400">Helpful guides and maintenance tips for keeping your vehicle in top shape.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="mb-3 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mb-6 text-slate-400">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="font-semibold text-blue-400">Read more →</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
