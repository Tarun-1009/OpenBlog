import react from 'react';
import authService from "../../appwrite/auth";
import {logout} from "../../store/store";
import {useDispatch} from "react-redux";

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout = () => {
            authService.logout().then(
                dispatch(logout())
            )
    }

    return <div id="logout-btn" onClick={handleLogout}>Logout</div>;
}

export default LogoutBtn;