"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { fetchAPI, Post } from "@/lib/api";
import Link from "next/link";
import { Plus, Trash2, Edit, LogOut } from "lucide-react";

export default function AdminDashboard() {
    const { token, isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin/login");
            return;
        }

        const loadPosts = async () => {
            try {
                const data = await fetchAPI("/posts/cms/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPosts(data);
            } catch (error) {
                console.error("Failed to load posts", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [isAuthenticated, token, router]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await fetchAPI(`/posts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(posts.filter((p) => p.id !== id));
        } catch (error) {
            alert("Failed to delete post");
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">CMS Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/create"
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> New Post
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <div className="bg-card rounded-xl border border-white/10 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-secondary/50 text-gray-400 text-sm uppercase">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Match</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium">{post.title}</td>
                                        <td className="p-4 text-gray-400">
                                            {post.home_team} vs {post.away_team}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${post.is_published
                                                        ? "bg-green-500/10 text-green-500"
                                                        : "bg-yellow-500/10 text-yellow-500"
                                                    }`}
                                            >
                                                {post.is_published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No posts found. Create your first prediction!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
