import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <div className="font-roboto-mono bg-[#161A26] text-whitesmoke">
            <div className="flex flex-col max-w-2xl w-full mx-auto min-h-screen">
                <div className="grow mt-8">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}
