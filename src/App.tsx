import styles from './App.module.scss';
import SideBar from "./layout/SideBar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function App() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/dashBoard')
        }

    }, [location.pathname, navigate]);

    return (
        <div className={styles.container}>
            <SideBar/>
            <Outlet/>
        </div>
    );
}

export default App;
