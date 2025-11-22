import { PostCard } from "@/components/PostCard";
import { fetchAPI, Post } from "@/lib/api";

async function getPosts() {
  try {
    const posts = await fetchAPI("/posts/");
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <div className="space-y-8">
      <section className="text-center py-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Football Predictions & Analysis
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Expert analysis, statistics, and predictions for the top football leagues around the world.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No predictions available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
