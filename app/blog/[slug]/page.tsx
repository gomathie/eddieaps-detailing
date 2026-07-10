import Link from 'next/link';

const posts: Record<string, { title: string; content: string }> = {
  'why-mobile-detailing-is-worth-it': {
    title: 'Why Mobile Detailing Is Worth It',
    content: 'Mobile detailing saves time, gives you a premium experience at home, and keeps your vehicle looking fresh without interrupting your schedule.'
  },
  'ceramic-coating-vs-wax': {
    title: 'Ceramic Coating vs Wax',
    content: 'Ceramic coatings offer longer-term protection and easier maintenance, while wax is a more affordable short-term solution.'
  },
  'how-often-should-you-detail': {
    title: 'How Often Should You Detail Your Car?',
    content: 'A deep detail every few months and regular upkeep between appointments helps preserve your paint and interior.'
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h1 className="mb-4 text-3xl font-black text-white">Post not found</h1>
          <Link href="/blog" className="font-semibold text-blue-400">Back to blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-10">
        <h1 className="mb-6 text-4xl font-black text-white">{post.title}</h1>
        <p className="text-lg leading-relaxed text-slate-400">{post.content}</p>
        <Link href="/blog" className="mt-8 inline-block font-semibold text-blue-400">← Back to blog</Link>
      </div>
    </main>
  );
}
