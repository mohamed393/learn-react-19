import './App.css'
import {useNavigate} from "react-router";
export default function App() {
    const navigate=useNavigate();
    const handelClick=()=>{
        console.log('cliecked');
        navigate('/contact')
    }

    return (
       <div>
           <p>Home</p>
           <button onClick={handelClick}>Contact Programmatically</button>
       </div>

);
}