import { fetchAPI, Post } from "@/lib/api";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
    try {
        const post = await fetchAPI(`/posts/${slug}`);
        return post;
    } catch (error) {
        return null;
    }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post: Post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Predictions
            </Link>

            <header className="mb-8 space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.match_date ? format(new Date(post.match_date), "MMM d, yyyy • HH:mm") : "Date TBD"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>Editor</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap gap-4 mt-6 p-4 bg-card rounded-lg border border-white/5">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Match</span>
                        <span className="font-semibold">{post.home_team} vs {post.away_team}</span>
                    </div>
                    {post.prediction && (
                        <div className="flex flex-col border-l border-white/10 pl-4">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Prediction</span>
                            <span className="font-semibold text-primary">{post.prediction}</span>
                        </div>
                    )}
                    {post.odds && (
                        <div className="flex flex-col border-l border-white/10 pl-4">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Odds</span>
                            <span className="font-semibold text-accent">{post.odds}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
                <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
        </article>
    );
}
