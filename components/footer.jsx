import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex items-center justify-between font-thin tracking-wider text-smoke text-xs content-center absolute bottom-0 w-full mb-6">
            <nav>
                <ul className="flex divide-x divide-smoke divide-dotted underline">
                    <li className="px-3 pl-0"><Link href="/"><a>Home</a></Link></li>
                    <li className="px-3"><Link href="/about"><a>About</a></Link></li>
                    <li className="px-3"><Link href="/archives"><a>Writing</a></Link></li>
                    <li className="px-3 pr-0"><a href="https://github.com/zakinadhif">Projects</a></li>
                </ul>
            </nav>
            <a className="sm:inline-block hidden" href="https://github.com/zakinadhif">GitHub</a>
        </footer>
    )
}
