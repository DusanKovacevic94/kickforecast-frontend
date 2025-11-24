import Link from "next/link";
import { Post } from "@/lib/api";
import { format } from "date-fns";

export function PostCard({ post }: { post: Post }) {
    return (
        <div className="flex flex-col md:flex-row gap-6 bg-card border border-gray-800 rounded-lg overflow-hidden hover:border-primary transition-colors group">
            {/* Image Section */}
            <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0">
                <div className="absolute inset-0 bg-gray-800">
                    {/* Placeholder for image if no real image is available */}
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <span className="text-4xl font-bold opacity-20">F365</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                    <span>Match Preview</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                </div>

                <Link href={`/posts/${post.slug}`} className="group-hover:text-primary transition-colors">
                    <h2 className="text-2xl font-bold font-heading uppercase text-white mb-3 leading-tight">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.summary}
                </p>

                <div className="mt-auto">
                    <Link href={`/posts/${post.slug}`} className="text-xs font-bold uppercase text-primary border-b-2 border-transparent hover:border-primary transition-all">
                        Read Full Preview
                    </Link>
                </div>
            </div>
        </div>
    );
}
