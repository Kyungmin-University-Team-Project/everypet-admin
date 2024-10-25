import styles from './App.module.scss';
import SideBar from "./layout/SideBar";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className={styles.container}>
            <SideBar/>
            <Outlet/>
        </div>
    );
}

export default App;
