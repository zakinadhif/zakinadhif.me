import Link from "next/link"

export default function Footer() {
    return (
        <footer className="py-6 md:py-10 flex items-center justify-between font-thin tracking-wider text-smoke text-xs">
            <nav>
                <ul className="flex divide-x divide-smoke divide-dotted underline">
                    <li className="px-3 pl-0"><Link href="/"><a>Home</a></Link></li>
                    <li className="px-3"><Link href="/about"><a>About</a></Link></li>
                    <li className="px-3"><Link href="/archives"><a>Writing</a></Link></li>
                    <li className="px-3 pr-0"><a href="https://github.com/cowdingus">Projects</a></li>
                </ul>
            </nav>
            <a href="https://github.com/zakinadhif">GitHub</a>
        </footer>
    )
}
