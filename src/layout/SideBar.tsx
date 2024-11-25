import React from 'react';
import {NavLink} from 'react-router-dom';
import {FaHome, FaClipboardList, FaBox, FaUsers, FaChartBar} from 'react-icons/fa';
import styles from "./SideBar.module.scss";

// URL과 링크 텍스트를 배열로 정의
const links = [
    {path: "/dashBoard", label: "대시보드", icon: <FaHome/>},
    {path: "/order-management", label: "주문 관리", icon: <FaClipboardList/>},
    {path: "/product-management", label: "상품 관리", icon: <FaBox/>},
    {path: "/customer-inquiries", label: "고객 문의", icon: <FaUsers/>},
    {path: "/sales-analysis", label: "판매 분석", icon: <FaChartBar/>},
];

const SideBar = () => {
    return (
        <nav className={styles.container}>
            <header className={styles.header}>
                <h1>everypet</h1>
                <h3>사장님</h3>
            </header>
            <nav className={styles.navContainer}>
                {links.map((link, _index) => (
                    <NavLink
                        key={link.path}
                        className={({isActive}) =>
                            isActive ? `${styles.nav} ${styles.active}` : styles.nav
                        }
                        to={link.path}
                    >
                        <span className={styles.icon}>{link.icon}</span>
                        <span className={styles.label}>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </nav>
    );
};

export default SideBar;
