import { Outlet } from "react-router";
import { Background } from "./components/Background";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";


 
export function Layout()
{
    return <div className="relative min-h-screen bg-black">
        <Background />
        <div className="relative z-10">
            <Navigation />
                <Outlet></Outlet>
            <Footer />
        </div>
    </div>

}