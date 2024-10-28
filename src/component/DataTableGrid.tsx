import React, { useState } from 'react';
import styles from './DataTableGrid.module.scss';
import {DataTableGridProps} from "../typing/component/dataTable";


const DataTableGrid: React.FC<DataTableGridProps> = ({ headers, columnCount, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지당 10개씩 표시

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // grid-template-columns 스타일을 동적으로 설정
    const gridTemplateColumnsStyle = {
        gridTemplateColumns: `50px repeat(${columnCount - 1}, 1fr)`,
    };

    return (
        <>
            {/* 페이지네이션 버튼 */}
            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                        className={currentPage === index + 1 ? styles.active : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* 데이터 테이블 */}
            <div className={styles.gridContainer} >
                {/* 헤더 */}
                <div className={styles.gridHeader} style={gridTemplateColumnsStyle}>
                    <input type="checkbox" />
                    {headers.map((header) => (
                        <span key={header.key}>{header.label}</span>
                    ))}
                </div>

                {/* 데이터 */}
                <div className={styles.gridBody}>
                    {currentData.map((item, index) => (
                        <div className={styles.gridRow} key={index} style={gridTemplateColumnsStyle}>
                            <input type="checkbox" />
                            {headers.map((header) => (
                                <span key={header.key}>{item[header.key]}</span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DataTableGrid;
