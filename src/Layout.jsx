
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow px-4 py-6 bg-gray-700">
                <Outlet /> 
            </main>
        </div>
    )
}
