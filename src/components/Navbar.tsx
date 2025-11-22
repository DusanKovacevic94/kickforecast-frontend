import Link from "next/link";
import { Trophy } from "lucide-react";

export function Navbar() {
    return (
        <nav className="border-b border-white/10 bg-secondary/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Trophy className="w-6 h-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        KickForecast
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
                        Predictions
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}
