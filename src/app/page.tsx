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
    <div className="flex flex-col md:flex-row gap-12">
      {/* Main Content Area */}
      <div className="flex-1">
        <div className="border-b-4 border-primary mb-8">
          <h1 className="text-3xl font-bold font-heading uppercase inline-block bg-primary text-white px-4 py-2">
            Match Previews
          </h1>
        </div>

        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-card border border-gray-800 rounded-lg">
            <p className="text-gray-400">No match previews available.</p>
          </div>
        )}
      </div>

      {/* Sidebar (Mimicking F365) */}
      <aside className="w-full md:w-80 space-y-8">
        {/* Sidebar Widget 1 */}
        <div className="bg-card border border-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold font-heading uppercase border-b-2 border-primary mb-4 pb-2 text-white">
            Trending
          </h3>
          <ul className="space-y-3">
            <li className="text-sm font-bold text-gray-300 hover:text-primary cursor-pointer border-b border-gray-800 pb-2">
              Man City vs Liverpool: Combined XI
            </li>
            <li className="text-sm font-bold text-gray-300 hover:text-primary cursor-pointer border-b border-gray-800 pb-2">
              5 conclusions from the weekend
            </li>
            <li className="text-sm font-bold text-gray-300 hover:text-primary cursor-pointer border-b border-gray-800 pb-2">
              Transfer Gossip: Real Madrid want Haaland
            </li>
          </ul>
        </div>

        {/* Sidebar Widget 2 */}
        <div className="bg-secondary text-white p-4 rounded-lg border border-gray-800">
          <h3 className="text-xl font-bold font-heading uppercase border-b-2 border-primary mb-4 pb-2">
            Newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Get the latest football news and predictions delivered to your inbox.
          </p>
          <input type="email" placeholder="Your email address" className="w-full p-2 text-black mb-2 rounded-sm" />
          <button className="w-full bg-primary text-white font-bold uppercase py-2 hover:bg-red-700 transition-colors rounded-sm">
            Subscribe
          </button>
        </div>
      </aside>
    </div>
  );
}
