import { NavLink} from "react-router";
import './Navigation.css'
export default function Navigation() {
return (
    <nav className='flex gap-3'>
   <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
        <NavLink to='/blog'>Blog</NavLink>
    </nav>
)
}