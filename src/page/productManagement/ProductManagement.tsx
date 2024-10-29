import React from 'react';
import styles from './ProductManagement.module.scss'
import DataTableGrid from "../../component/DataTableGrid";
import {productMockData} from "../../utils/common/ProductRandom";

// 테이블 헤더 설정
const headers = [
    { key: 'productNumber', label: '상품번호' },
    { key: 'category', label: '카테고리' },
    { key: 'productName', label: '상품이름' },
    { key: 'recentOrderDate', label: '최근주문날짜' },
    { key: 'salesStatus', label: '판매상태' },
    { key: 'stockStatus', label: '재고상태' },
    { key: 'productPrice', label: '상품 금액' },
];

const ProductManagement = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>상품관리</span>
                <div className={styles.searchFilterContainer}>
                    <div className={styles.filterItem}>
                        <span className={styles.label}>검색</span>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="검색어를 입력해 주세요"
                                className={styles.searchInput}
                            />
                            <i className="fas fa-search"></i> {/* Font Awesome 아이콘 */}
                        </div>
                    </div>
                    <div className={styles.filterItem}>
                        <span className={styles.label}>판매 상태</span>
                        <select className={styles.select}>
                            <option>판매중</option>
                            <option>매진</option>
                        </select>
                    </div>
                    <div className={styles.filterItem}>
                        <span className={styles.label}>재고 상태</span>
                        <select className={styles.select}>
                            <option>50개 미만</option>
                            <option>100개 미만</option>
                            <option>100개 이상</option>
                        </select>
                    </div>
                    <button className={styles.searchButton}>검색하기</button>
                </div>
            </div>
            <DataTableGrid columnCount={headers.length + 1} headers={headers} data={productMockData} />
        </div>
    );
};

export default ProductManagement;
