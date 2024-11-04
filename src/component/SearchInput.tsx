import React, { useRef } from 'react';
import styles from './SearchInput.module.scss';
import { FaSearch } from "react-icons/fa";
import { SearchInputProps } from "../typing/component/searchFilter";

/**
 * 검색 인풋에 각 상황에 맞는 placeHolder 값과
 * 각 검색에 맞는 Api 를 넘겨받아 검색을 진행하고
 * rowData 를 fetching 하는 컴포넌트
 *
 * @param placeHolder - placeholder 값
 * @param searchFn - 서버와 연결할 Api 함수
 */

const SearchInput = ({ placeHolder, searchFn }: SearchInputProps) => {
    const searchText = useRef<HTMLInputElement | null>(null);

    return (
        <div className={styles.container}>
            <span className={styles.label}>
                검색
            </span>
            <div className={styles.inputWrapper}>
                <FaSearch className={styles.icon} />
                <input
                    type="text"
                    placeholder={placeHolder}
                    className={styles.searchInput}
                    ref={searchText}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (searchText.current) {
                                searchFn(searchText.current.value);
                                searchText.current.value = '';
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default SearchInput;
