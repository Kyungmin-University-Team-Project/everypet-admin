import React, {useRef, useState} from 'react';
import styles from "./ProductManagement.module.scss";
import axiosInstance from "../../utils/axios/axiosInstance";

interface ProductInsert {
    memberId: string;
    numberOfProduct: number;
    productDescriptionImage: File | null;
    productDiscountRate: number;
    productId: string;
    productImage: File | null;
    productMainCategory: string;
    productName: string;
    productPrice: number;
    productSalesStatusYN: string;
    productSubCategory: string;
}

const ProductOrderModal = () => {
    const productIdUUID = crypto.randomUUID();
    const [open, setOpen] = useState(false);
    const modalBackground = useRef(null);
    const [data, setData] = useState<ProductInsert>({
        memberId: '',
        numberOfProduct: 0,
        productDescriptionImage: null,
        productDiscountRate: 0,
        productId: productIdUUID,
        productImage: null,
        productMainCategory: '',
        productName: '',
        productPrice: 0,
        productSalesStatusYN: 'Y',
        productSubCategory: '',
    });

    const handleOnSubmit = async () => {
        // formData 생성
        const newFormData = new FormData();

        // form data 추가
        newFormData.append('memberId', data.memberId);
        newFormData.append('numberOfProduct', data.numberOfProduct.toString());
        newFormData.append('productDiscountRate', data.productDiscountRate.toString());

        if (data.productDescriptionImage) {
            newFormData.append('productDescriptionImage', data.productDescriptionImage);
        }
        if (data.productImage) {
            newFormData.append('productImage', data.productImage);
        }

        newFormData.append('productPrice', data.productPrice.toString());
        newFormData.append('productMainCategory', data.productMainCategory);
        newFormData.append('productName', data.productName);
        newFormData.append('productSalesStatusYN', data.productSalesStatusYN);
        newFormData.append('productSubCategory', data.productSubCategory);

        // formData는  multipart/form-data로 보내야한다.
        try {
            const response = await axiosInstance.post('http://localhost:8080/product/insert', newFormData, {
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
            const file = files[0]?.size;
            const isImage = files[0].type.startsWith('image/');
                if (isImage) {
                    if (file > maxSize) {
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
                          onClick={e => {
                              if (e.target === modalBackground.current) {
                                  setOpen(false);
                              }
                          }}>
                        <div className={styles.modal_content}>
                            <input type="text" name="memberId" onChange={handleOnChange}
                                   maxLength={20}
                                   placeholder="아이디"
                            required/>
                            <input type="number" name="numberOfProduct" onChange={handleOnChange}
                                   placeholder="제품수량"
                                   value={data.numberOfProduct}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength) {
                                           e.target.value = e.target.value.slice(0, e.target.maxLength)
                                       }
                                   }}
                                   maxLength={4}
                            />
                            <input type="file" name="productImage"
                                   accept=".jpg, .jpeg, .png"
                                   onChange={handleOnChange}
                                   placeholder='상품 설명 이미지 삽입(이미지 파일만 가능)'/>
                            <input type="file" name="productDescriptionImage"
                                   accept=".jpg, .jpeg, .png"
                                   onChange={handleOnChange}
                                   placeholder='상품 대표 이미지 삽입(이미지 파일만 가능)'/>
                            <input type="number" name="productDiscountRate"
                                   onChange={handleOnChange}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength) {
                                           e.target.value = e.target.value.slice(0, e.target.maxLength)
                                       }
                                   }}
                                   maxLength={2}
                                   placeholder="할인율"/>
                            <input type="text" name="productMainCategory"
                                   onChange={handleOnChange}
                                   placeholder="카테고리(강아지)"
                                   maxLength={10}
                            />
                            <input type="text" name="productName" onChange={handleOnChange}
                                   placeholder="상품 이름"/>
                            <input type="number" name="productPrice" onChange={handleOnChange}
                                   placeholder="가격"
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > e.target.maxLength) {
                                           e.target.value = e.target.value.slice(0, e.target.maxLength)
                                       }
                                   }}
                                   maxLength={7}
                            />
                            <input type="text" name="productSalesStatusYN" onChange={handleOnChange}
                                   placeholder="세일 동의(Y/N)만 입력"
                                   maxLength={1}
                            />
                            <input type="text" name="productSubCategory" onChange={handleOnChange}
                                   placeholder="사료(장난감)"
                                   maxLength={10}
                            />
                            <button onClick={() => {
                                handleOnSubmit();
                                setOpen(false);
                            }}>상품 등록
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default ProductOrderModal;