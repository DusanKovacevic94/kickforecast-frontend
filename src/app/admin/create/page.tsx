"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePostPage() {
    const { token, isAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        summary: "",
        home_team: "",
        away_team: "",
        prediction: "",
        odds: "",
        match_date: "",
        is_published: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Auto-generate slug from title
        if (name === "title") {
            setFormData((prev) => ({
                ...prev,
                title: value,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        setLoading(true);

        try {
            await fetchAPI("/posts/", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    ...formData,
                    match_date: formData.match_date ? new Date(formData.match_date).toISOString() : null
                }),
            });
            router.push("/admin");
        } catch (error) {
            alert("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold mb-8">Create New Prediction</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl border border-white/10">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Home Team</label>
                            <input
                                name="home_team"
                                value={formData.home_team}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Away Team</label>
                            <input
                                name="away_team"
                                value={formData.away_team}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Match Date</label>
                            <input
                                type="datetime-local"
                                name="match_date"
                                value={formData.match_date}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary [color-scheme:dark]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Odds</label>
                            <input
                                name="odds"
                                value={formData.odds}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                placeholder="e.g. 2.50"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Prediction</label>
                            <input
                                name="prediction"
                                value={formData.prediction}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                placeholder="e.g. Home Win & Over 2.5 Goals"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Summary</label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-20"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-64 font-mono"
                                required
                            />
                        </div>

                        <div className="col-span-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_published"
                                checked={formData.is_published}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                                className="w-4 h-4 rounded border-white/10 bg-secondary/50 text-primary focus:ring-primary"
                                id="publish"
                            />
                            <label htmlFor="publish" className="text-sm font-medium">Publish immediately</label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Prediction"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
