import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="flex h-32 relative py-10 gap-7 items-center">
            <div className="hidden lg:block">
                <Image src="/assets/code.svg" width={74} height={41} />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start grow">
                <div className="font-bold text-3xl">zaki_nadhif.txt</div>
                <nav className="font-light text-sm tracking-widest text-bluemoon">
                    <ul className="flex divide-x divide-bluemoon divide-dotted">
                        <li className="px-6 pl-0"><Link href="/"><a className="hover:underline underline-offset-1">Home</a></Link></li>
                        <li className="px-6"><Link href="/about"><a className="hover:underline underline-offset-1">About</a></Link></li>
                        <li className="px-6"><Link href="/archives"><a className="hover:underline underline-offset-1">Writing</a></Link></li>
                        <li className="px-6 pr-0"><a href="https://github.com/cowdingus" className="hover:underline underline-offset-1">Projects</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}