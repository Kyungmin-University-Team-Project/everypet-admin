import React from 'react';
import styles from './CustomerInquiries.module.scss';
import DataTableGrid from "../../component/DataTableGrid";
import {mockData} from "../../utils/common/DataTableMockData";
import SearchInput from "../../component/SearchInput";


const CustomerInquiriesColumns = [
    {key: 'id', label: '문의번호'},
    {key: 'category', label: '문의 카테고리'},
    {key: 'name', label: '고객 이름'},
    {key: 'date', label: '문의 날짜'},
    {key: 'answerStatus', label: '답변 상태'},
];


const CustomerInquiries = () => {

    const placeHolder = "고객 이름 검색"
    // 추후에 api 개발시 연결
    const searchFn = (searchInput : string) => {
        console.log(searchInput);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>고객문의</span>
                <div className={styles.searchFilterContainer}>
                    <SearchInput placeHolder={placeHolder} searchFn={searchFn}/>
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
                </div>
            </div>
            <DataTableGrid
                columnCount={CustomerInquiriesColumns.length + 1}
                columns={CustomerInquiriesColumns}
                rowData={mockData}/>
        </div>
    );
};

export default CustomerInquiries;
