export default function Content({ children }) {
    return (
        <div className="flex flex-col min-h-full pt-12 pb-16 md:pt-16 md:pb-28 relative">
            {children}
        </div>
    )
}
