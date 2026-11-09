import { Link } from "react-router-dom"

export default function PageLayout({title, activePage, children, showNav = true}) {
    return (
        <main className="min-h-screen bg-[#F5F1E8] text-[#35372E]">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                {showNav && (
                    <nav className="mb-8 flex gap-8 border-b border-[#E8DDCC]">
                        <Link to="/" className={`pb-3 font-semibold ${activePage === "tasks" ? "border-b-4 border-[#59634A] text-[#59634A]" : ""}`}>Tasks</Link>
                        <Link to="/stats" className={`pb-3 font-semibold ${activePage === "stats" ? "border-b-4 border-[#59634A] text-[#59634A]" : ""}`}>Stats</Link>
                    </nav>
                )}

               {title && (
                    <header className="mb-6">
                        <h1 className="text-3xl font-bold">{title}</h1>
                    </header>
                )}

                {children}
            </div>
        </main>
    )

}