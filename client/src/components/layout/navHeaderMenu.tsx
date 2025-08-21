export default function NavHeaderMenu() {
    return (
        <nav className="h-16 border-t border-gray-200">
            <div className="flex items-center justify-center gap-12 h-full">
                    <nav className="flex items-center gap-24 font-medium text-md">
                        <a className="flex items-center justify-centern gap-2 cursor-pointer hover:text-gray-600">Autoclave
                        </a>
                        <a className="flex items-center justify-center gap-2 cursor-pointer hover:text-gray-600">Estética
                        </a>
                        <a className="flex items-center justify-center gap-2 cursor-pointer hover:text-gray-600">Micropigmentação
                        </a>
                        <a className="flex items-center justify-center gap-2 cursor-pointer hover:text-gray-600">Macas
                        </a>
                    </nav>
                </div>
        </nav>
    )
}