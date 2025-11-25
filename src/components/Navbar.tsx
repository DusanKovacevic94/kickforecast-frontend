import Link from "next/link";
import { Trophy, Search, Menu } from "lucide-react";

export function Navbar() {
    return (
        <header className="bg-secondary text-white border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Top Bar */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Trophy className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                        <span className="text-4xl font-logo text-white tracking-wide group-hover:text-primary transition-colors">
                            KickForecast
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-bold uppercase hover:text-primary transition-colors">Home</Link>
                        <Link href="/news" className="text-sm font-bold uppercase hover:text-primary transition-colors">News</Link>
                        <Link href="/features" className="text-sm font-bold uppercase hover:text-primary transition-colors">Features</Link>
                        <Link href="/predictions" className="text-sm font-bold uppercase hover:text-primary transition-colors">Predictions</Link>
                        <Link href="/stats" className="text-sm font-bold uppercase hover:text-primary transition-colors">Stats</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:text-primary transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="md:hidden p-2 hover:text-primary transition-colors">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Secondary Nav (Leagues) */}
            <div className="bg-[#0a0a0a] border-b border-gray-800 hidden md:block">
                <div className="container mx-auto px-6 md:px-12 flex gap-6 overflow-x-auto py-2 max-w-7xl">
                    <Link href="/premier-league" className="text-xs font-bold text-gray-400 uppercase hover:text-success whitespace-nowrap">Premier League</Link>
                    <Link href="/champions-league" className="text-xs font-bold text-gray-400 uppercase hover:text-success whitespace-nowrap">Champions League</Link>
                    <Link href="/la-liga" className="text-xs font-bold text-gray-400 uppercase hover:text-success whitespace-nowrap">La Liga</Link>
                    <Link href="/serie-a" className="text-xs font-bold text-gray-400 uppercase hover:text-success whitespace-nowrap">Serie A</Link>
                    <Link href="/bundesliga" className="text-xs font-bold text-gray-400 uppercase hover:text-success whitespace-nowrap">Bundesliga</Link>
                </div>
            </div>
        </header>
    );
}
