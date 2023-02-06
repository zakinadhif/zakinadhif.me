export default function Content({ children }) {
    return (
        <div className="flex flex-col min-h-full py-16 relative">
            {children}
        </div>
    )
}
