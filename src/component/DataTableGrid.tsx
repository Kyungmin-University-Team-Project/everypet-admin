import React, {useState} from 'react';
import styles from './DataTableGrid.module.scss';
import {DataTableGridProps} from "../typing/component/dataTable";
import StatusButton from "./StatusButton";


const DataTableGrid: React.FC<DataTableGridProps> = ({headers, columnCount, data}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지당 10개씩 표시

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const gridTemplateColumnsStyle = {
        gridTemplateColumns: `50px repeat(${columnCount - 1}, 1fr)`,
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // 이부분을 이용해 모달창을 띄워서 정보를 보여주는 작업을 진행
    // 또는 각각의 번호를 이용해서
    const consoleRow = (e : any) => {
        console.log(e)
    }

    return (
        <>
            {/* 페이지네이션 버튼 */}
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

            {/* 데이터 테이블 */}
            <div className={styles.gridContainer}>
                {/* 헤더 */}
                <div className={styles.gridHeader} style={gridTemplateColumnsStyle}>
                    <input type="checkbox"/>
                    {headers.map((header) => (
                        <span key={header.key}>{header.label}</span>
                    ))}
                </div>

                {/* 데이터 */}
                <div className={styles.gridBody}>
                    {currentData.map((item, index) => (
                        <div
                            className={styles.gridRow}
                            key={index}
                            style={gridTemplateColumnsStyle}
                            onClick={() => consoleRow(item)}
                        >
                            <input type="checkbox"/>
                            {headers.map((header) => {
                                if (header.key === "orderStatus") {
                                    return (
                                        <StatusButton
                                            orderStatus={item[header.key]}
                                        />
                                    );
                                } else if (header.key === "shippingStatus") {
                                    return (
                                        <StatusButton
                                            shippingStatus={item[header.key]}
                                        />
                                    );
                                } else if (header.key === "salesStatus") {
                                    return (
                                        <StatusButton
                                            salesStatus={item[header.key]}
                                        />
                                    );
                                } else if (header.key === "answerStatus") {
                                    return (
                                        <StatusButton
                                            answerStatus={item[header.key]}
                                        />
                                    );
                                } else {
                                    return <span key={header.key}>{item[header.key]}</span>;
                                }
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DataTableGrid;
