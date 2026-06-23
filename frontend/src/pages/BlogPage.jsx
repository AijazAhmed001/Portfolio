import Blog from '../components/Blog';

export default function BlogPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <Blog preview={false} />
    </div>
  );
}
