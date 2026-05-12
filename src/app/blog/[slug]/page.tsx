import ClientRedirect from '@/components/ClientRedirect';
import { getAllPosts } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage() {
  return <ClientRedirect />;
}
