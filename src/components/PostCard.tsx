import Link from "next/link";
import { Post } from "@/lib/api";
import { format } from "date-fns";

export function PostCard({ post }: { post: Post }) {
    return (
        <div className="flex flex-col bg-card border border-gray-800 rounded-lg overflow-hidden hover:border-primary transition-colors group h-full">
            {/* Image Section */}
            <div className="w-full h-48 relative shrink-0">
                <div className="absolute inset-0 bg-gray-800">
                    {/* Placeholder for image if no real image is available */}
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-gray-800 to-gray-900">
                        <span className="text-4xl font-bold opacity-20">KF</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                        <span>Match Preview</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400">{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                    </div>

                    <Link href={`/posts/${post.slug}`} className="group-hover:text-primary transition-colors block">
                        <h2 className="text-xl font-bold font-heading uppercase text-white mb-3 leading-tight line-clamp-2">
                            {post.title}
                        </h2>
                    </Link>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.summary}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-800/50 flex justify-between items-center">
                    <span className="text-xs font-bold text-success uppercase">
                        High Confidence
                    </span>
                    <Link href={`/posts/${post.slug}`} className="text-xs font-bold uppercase text-white bg-success px-3 py-1 rounded hover:bg-opacity-80 transition-all">
                        Read Analysis
                    </Link>
                </div>
            </div>
        </div>
    );
}
