import Navigation from "./Navigation/Navigation.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router";

export default function Layout(){
    return(<div>
        <Navigation/>
        <Outlet/>
        <Footer/>
    </div>)
}