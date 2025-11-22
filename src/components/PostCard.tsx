import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Post } from "@/lib/api";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="group relative bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-6 relative">
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.match_date ? format(new Date(post.match_date), "MMM d, yyyy • HH:mm") : "Date TBD"}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                    </Link>
                </h3>

                <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.summary || post.content.substring(0, 100)}...
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs">Match</span>
                            <span className="font-medium">{post.home_team} vs {post.away_team}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-primary font-medium text-sm">
                        Read Prediction <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
}
