import React from 'react';
import styles from './CustomerInquiries.module.scss';
import CustomerInquiriesGrid from "../../component/CustomerInquiriesGrid";

const CustomerInquiries = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>고객문의</span>
                <div className={styles.searchFilterContainer}>
                    <div className={styles.filterItem}>
                        <label className={styles.label}>검색</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="검색어를 입력해 주세요"
                                className={styles.searchInput}
                            />
                            <i className="fas fa-search"></i> {/* 아이콘을 위한 폰트어썸 사용 */}
                        </div>
                    </div>
                    <div className={styles.filterItem}>
                        <label className={styles.label}>문의 카테고리</label>
                        <select className={styles.select}>
                            <option>배송</option>
                            <option>제품 품질</option>
                            <option>환불</option>
                        </select>
                    </div>
                    <div className={styles.filterItem}>
                        <label className={styles.label}>답변 상태</label>
                        <select className={styles.select}>
                            <option>완료</option>
                            <option>미완료</option>
                        </select>
                    </div>
                    <button className={styles.searchButton}>검색하기</button>
                </div>
            </div>

            <CustomerInquiriesGrid/>
        </div>
    );
};

export default CustomerInquiries;
