import React, {useState} from 'react';
import styles from './CustomerInquiriesGrid.module.scss';

const categories = ['배송', '제품 품질', '환불'];
const names = ['콩콩이주인', '샘플 이름 데이터 A', '샘플 이름 데이터 B', '샘플 이름 데이터 C', '샘플 이름 데이터 D'];
const statuses = ['완료', '미완료'];

function getRandomItem(array: any) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate() {
    const year = 2024;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

const mockData = Array.from({length: 50}, (_, index) => ({
    id: `A12412${index + 1}`,
    category: getRandomItem(categories),
    name: getRandomItem(names),
    date: generateRandomDate(),
    status: getRandomItem(statuses),
}));

const CustomerInquiriesGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(mockData.length / itemsPerPage);
    const currentData = mockData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={styles.pagination}>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        className={currentPage === index + 1 ? styles.active : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className={styles.gridContainer}>

                <div className={styles.gridHeader}>
                    <input type="checkbox"/>
                    <span>문의번호</span>
                    <span>문의 카테고리</span>
                    <span>고객 이름</span>
                    <span>문의 날짜</span>
                    <span>답변 상태</span>
                </div>

                <div className={styles.gridBody}>
                    {currentData.map((item, index) => (
                        <div className={styles.gridRow} key={index}>
                            <input type="checkbox"/>
                            <span>{item.id}</span>
                            <span>{item.category}</span>
                            <span>{item.name}</span>
                            <span>{item.date}</span>
                            <span className={item.status === '완료' ? styles.statusComplete : styles.statusPending}>
                            {item.status}
                        </span>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default CustomerInquiriesGrid;
