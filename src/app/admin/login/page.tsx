"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchAPI } from "@/lib/api";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/token`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await res.json();
            login(data.access_token);
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 bg-card rounded-xl border border-white/10 shadow-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">CMS Login</h1>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-secondary/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
