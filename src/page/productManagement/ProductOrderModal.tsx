import React, {useRef, useState} from 'react';
import styles from "./ProductManagement.module.scss";
import axiosInstance from "../../utils/axios/axiosInstance";
import {API_URL} from "../../api/api";

interface ProductInsert {
    productName: string;
    productPrice: string;
    productDiscountRate: string;
    productImage: File | null;
    numberOfProduct: string;
    productDescriptionImage: File | null;
    productMainCategory: string;
    productSubCategory: string;
    productSalesStatusYN: string;
}

const ProductOrderModal = () => {
    const [open, setOpen] = useState(false);
    const modalBackground = useRef(null);
    const [data, setData] = useState<ProductInsert>({
        productName: '',
        productPrice: '',
        productDiscountRate: '',
        productImage:  null,
        numberOfProduct: '',
        productDescriptionImage: null,
        productMainCategory: '',
        productSubCategory: '',
        productSalesStatusYN: '',
    });
    const newFormData = new FormData();
    const handleOnSubmit = async () => {
        // formData 생성

        // form data 추가
        newFormData.append('productName', data.productName.toString());
        newFormData.append('productPrice', data.productPrice.toString());

        if (data.productDescriptionImage) {
            newFormData.append('productDescriptionImage', data.productDescriptionImage);
        }
        if (data.productImage) {
            newFormData.append('productImage', data.productImage);
        }

        newFormData.append('productDiscountRate', data.productDiscountRate.toString());
        newFormData.append('numberOfProduct', data.numberOfProduct);
        newFormData.append('productName', data.productName);
        newFormData.append('productMainCategory', data.productMainCategory);
        newFormData.append('productSubCategory', data.productSubCategory);
        newFormData.append('productSalesStatusYN', data.productSalesStatusYN);

        // formData는  multipart/form-data로 보내야한다.
        try {
            const response = await axiosInstance.post(`${API_URL}/product/insert`, newFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // type 파일인지 아닌지 확인 후 업데이트
        // files 파일 입력에서 선택한 파일을 상태에 추가
        const { name, files, type } = e.target;

        if (type === 'file' && files) {
            const maxSize = 5 * 1024 * 1024;
            const isImage = files[0].type.startsWith('image/');

            for (let i = 0; i<files.length; i++) {
                const file = files[i];
                const fileSize = file.size;
                if (isImage) {
                    if (fileSize > maxSize) {
                        alert('file 사이즈가 5MB을 초과 합니다.')
                        setData((prev) => ({
                            ...prev,
                            [name]: 'file 사이즈가 5MB을 초과 합니다.',
                        }));
                    } else {
                        setData((prev) => ({
                            ...prev,
                            [name]: file,
                        }));
                    }
                }
            }
        } else {
            const valued = type === 'number' ? Number(e.target.value) : e.target.value;
            setData((prev) => ({
                ...prev,
                [name]: valued,
            }));
        }
    };
    return (
        <div>
            <button onClick={() => setOpen(true)}>올리기</button>
            {
                open && (
                    <form className={styles.form_container} ref={modalBackground}
                         >
                        <div className={styles.modal_content}>

                            <input type="text" name="productName" onChange={handleOnChange}
                                   maxLength={20}
                                   placeholder="상품 이름"
                                   required/>
                            <input type="text" name="productPrice" onChange={handleOnChange}
                                   placeholder="가격"
                                   value={data.productPrice}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength) {
                                           e.target.value = e.target.value.slice(0, e.target.maxLength)
                                       }
                                   }}
                                   maxLength={8}
                            />
                            <label htmlFor="productImage">
                                <input type="file" name="productImage"
                                       accept=".jpg, .jpeg, .png"
                                       onChange={handleOnChange}
                                       placeholder='상품 설명 이미지 삽입(이미지 파일만 가능)'/>
                            </label>
                            <label htmlFor="productDescriptionImage">
                                <input type="file" name="productDescriptionImage"
                                       accept=".jpg, .jpeg, .png"
                                       onChange={handleOnChange}
                                       multiple
                                       placeholder='상품 대표 이미지 삽입(이미지 파일만 가능)'/>
                            </label>
                            <input type="text" name="productDiscountRate"
                                   value={data.productDiscountRate}
                                   onChange={handleOnChange}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength) {
                                           e.target.value = e.target.value.slice(0, e.target.maxLength)
                                       }
                                   }}
                                   maxLength={2}
                                   placeholder="할인율"/>
                            <input type="text" name="numberOfProduct"
                                   value={data.numberOfProduct}
                                   onChange={handleOnChange}
                                   placeholder="제품수량"
                                   maxLength={10}
                            />
                            <input type="text"
                                   value={data.productMainCategory}
                                   name="productMainCategory" onChange={handleOnChange}
                                   placeholder="대표 카테고리(cat)"/>
                            <input type="text"
                                   value={data.productSubCategory}
                                   name="productSubCategory" onChange={handleOnChange}
                                   placeholder="서브 카테고리(feed)"
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength) {
                                           e.target.value = e.target.value.slice(0, e.target.maxLength)
                                       }
                                   }}
                                   maxLength={7}
                            />
                            <div className={styles.input_radio_box}>
                                <p>상품 노출 상태</p>
                                <label>Y</label>
                                <input className={styles.input_radio} type="radio" name="productSalesStatusYN" value="Y"
                                       checked={data.productSalesStatusYN === "Y"}
                                       onChange={handleOnChange}/>

                                <label>
                                    N
                                </label>
                                <input className={styles.input_radio} type="radio" name="productSalesStatusYN" value="N"
                                       checked={data.productSalesStatusYN === "N"}
                                       onChange={handleOnChange}/>
                            </div>


                            <button onClick={() => {
                                handleOnSubmit();
                                setOpen(false);
                            }}>상품 등록
                            </button>
                            <button
                                onClick={e => {
                                    if (e.target === modalBackground.current) {
                                        setOpen(false);
                                    }
                                }}
                            className={styles.canse_btn}
                            >취소</button>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default ProductOrderModal;

