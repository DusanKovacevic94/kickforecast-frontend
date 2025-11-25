import { PostCard } from "@/components/PostCard";
import { fetchAPI, Post } from "@/lib/api";
import Link from "next/link";
import { format } from "date-fns";

async function getPosts() {
  try {
    // FIX: Revalidate every 60 seconds so new predictions appear automatically
    const posts = await fetchAPI("/posts/", { next: { revalidate: 60 } });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts: Post[] = await getPosts();
  const heroPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="flex flex-col lg:flex-row gap-12 relative">

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">

        {/* Hero Section - Match of the Day */}
        {heroPost && (
          <div className="mb-12">
            <div className="border-b-4 border-primary mb-6">
              <h1 className="text-3xl font-bold font-heading uppercase inline-block bg-primary text-white px-4 py-2">
                Match of the Day
              </h1>
            </div>
            {/* FIX: Changed border-gray-800 to border-white/10 for smoother dark mode contrast */}
            <div className="relative h-96 w-full rounded-xl overflow-hidden group border border-white/10">

              {/* Background Image Placeholder */}
              {/* FIX: used bg-secondary instead of bg-gray-800 */}
              <div className="absolute inset-0 bg-secondary">
                <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-background to-secondary">
                  <span className="text-9xl font-bold opacity-10 font-heading">KF</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 uppercase rounded animate-pulse">
                    Live Analysis
                  </span>
                  <span className="text-gray-300 text-sm font-bold uppercase">
                    {format(new Date(heroPost.created_at), "MMMM d, yyyy")}
                  </span>
                </div>
                <Link href={`/posts/${heroPost.slug}`} className="group-hover:text-primary transition-colors">
                  <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase text-white mb-4 leading-tight">
                    {heroPost.title}
                  </h2>
                </Link>
                <p className="text-gray-300 text-lg max-w-2xl line-clamp-2 mb-6">
                  {heroPost.summary}
                </p>
                <Link href={`/posts/${heroPost.slug}`} className="inline-block bg-success text-white font-bold uppercase px-6 py-3 rounded hover:bg-opacity-90 transition-all">
                  Read Full Prediction
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Latest Previews Grid */}
        <div className="mb-8">
          <div className="border-b-2 border-white/10 mb-6 flex justify-between items-end">
            <h2 className="text-2xl font-bold font-heading uppercase text-white pb-2 border-b-2 border-primary -mb-[2px]">
              Latest Previews
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-card border border-white/10 rounded-lg">
            <p className="text-gray-400">No match previews available.</p>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8 shrink-0">
        <div className="sticky top-24 space-y-8">

          {/* Sidebar Widget 1: Trending */}
          {/* FIX: Used bg-card and border-white/10 */}
          <div className="bg-card border border-white/10 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold font-heading uppercase border-b border-gray-700 mb-4 pb-2 text-primary">
              Trending Now
            </h3>
            <ul className="space-y-4">
              <li className="group cursor-pointer">
                <span className="text-xs font-bold text-success uppercase block mb-1">Transfer News</span>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  Real Madrid eyeing Haaland move next summer?
                </span>
              </li>
              <li className="group cursor-pointer">
                <span className="text-xs font-bold text-primary uppercase block mb-1">Opinion</span>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  Why Arsenal's defense is the best in Europe
                </span>
              </li>
              <li className="group cursor-pointer">
                <span className="text-xs font-bold text-success uppercase block mb-1">Tactics</span>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  De Zerbi's build-up play explained
                </span>
              </li>
            </ul>
          </div>

          {/* Sidebar Widget 2: Newsletter */}
          {/* FIX: Used bg-secondary for the widget base */}
          <div className="bg-gradient-to-br from-secondary to-background text-white p-6 rounded-xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary blur-3xl opacity-20 rounded-full"></div>
            <h3 className="text-xl font-bold font-heading uppercase mb-2 relative z-10">
              Join the Squad
            </h3>
            <p className="text-sm text-gray-400 mb-4 relative z-10">
              Get daily predictions and tactical analysis delivered to your inbox.
            </p>
            <input type="email" placeholder="Your email address" className="w-full p-3 bg-black/50 border border-gray-700 text-white mb-3 rounded focus:outline-none focus:border-primary transition-colors relative z-10" />
            <button className="w-full bg-primary text-white font-bold uppercase py-3 hover:bg-opacity-90 transition-colors rounded relative z-10">
              Subscribe
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}