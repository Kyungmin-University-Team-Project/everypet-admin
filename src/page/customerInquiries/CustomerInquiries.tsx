import React from 'react';
import styles from './CustomerInquiries.module.scss';
import DataTableGrid from "../../component/DataTableGrid";
import {mockData} from "../../utils/common/DataTableMockData";

// 테이블 헤더 설정
const headers = [
    {key: 'id', label: '문의번호'},
    {key: 'category', label: '문의 카테고리'},
    {key: 'name', label: '고객 이름'},
    {key: 'date', label: '문의 날짜'},
    {key: 'status', label: '답변 상태'},
];

const CustomerInquiries = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>고객문의</span>
                <div className={styles.searchFilterContainer}>
                    <div className={styles.filterItem}>
                        <span className={styles.label}>검색</span>
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
                        <span className={styles.label}>문의 카테고리</span>
                        <select className={styles.select}>
                            <option>배송</option>
                            <option>제품 품질</option>
                            <option>환불</option>
                        </select>
                    </div>
                    <div className={styles.filterItem}>
                        <span className={styles.label}>답변 상태</span>
                        <select className={styles.select}>
                            <option>완료</option>
                            <option>미완료</option>
                        </select>
                    </div>
                    <button className={styles.searchButton}>검색하기</button>
                </div>
            </div>
            <DataTableGrid columnCount={headers.length + 1} headers={headers} data={mockData}/>
        </div>
    );
};

export default CustomerInquiries;
