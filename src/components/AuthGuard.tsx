import {useUserSession} from "../hooks/useUserSession.ts";
import {Outlet} from "react-router";

export default function AuthGuard() {
    const {user,isLoggedIn} =useUserSession();
    if (!isLoggedIn){
        return <div>You are not logged in</div>;
    }
    return <Outlet/>
}