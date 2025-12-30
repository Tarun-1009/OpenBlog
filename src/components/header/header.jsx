import react from 'react';
import LogoutBtn from "../header/LogoutBtn.jsx";
import {useSelector} from "react-redux";
import useNavigate from "react-router-dom";

function Header() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Singup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "all Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "add Post",
            slug: "/add-post",
            active: authStatus
        }        
    ]
    return <div id="header">
        <div id="nav-items">
            <ul>
                {navItems.map((item) => item.active ? (
                    <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}>{item.name}</button>
                    </li>
                ) : null
                )}
            </ul>
        </div> 
        {authStatus ? <LogoutBtn /> : null}
    </div>; 

}
export default Header;