import Link from "next/link"

export default function Footer() {
    return (
        <footer className="text-xs text-smoke py-10 flex justify-between">
            <div>Inspired By <a href="http://peterforgacs.github.io/" className="text-bluemoon underline">Peter Forgacs</a>' notes.txt</div>
            <nav className="font-thin text-xs tracking-wider text-smoke">
                <ul className="flex divide-x divide-smoke divide-dotted underline">
                    <li className="px-3 pl-0"><Link href="/home"><a>Home</a></Link></li>
                    <li className="px-3"><Link href="/about"><a>About</a></Link></li>
                    <li className="px-3"><Link href="/writing"><a>Writing</a></Link></li>
                    <li className="px-3 pr-0"><Link href="/projects"><a>Projects</a></Link></li>
                </ul>
            </nav>
        </footer>
    )
}