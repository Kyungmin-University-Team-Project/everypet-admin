import React, { useState } from 'react';
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

const DashBoard = () => {
    const productIdUUID = crypto.randomUUID();
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
            const file = files[0];
            setData((prev) => ({
                ...prev,
                [name]: file,
            }));
        } else {
            const value = type === 'number' ? Number(e.target.value) : e.target.value;
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div>
            <input type="text" name="memberId" onChange={handleOnChange} placeholder="아이디" />
            <input type="number" name="numberOfProduct" onChange={handleOnChange} placeholder="제품수량" />
            <input type="file" name="productImage" onChange={handleOnChange} placeholder='상품 설명 이미지 삽입'/>
            <input type="file" name="productDescriptionImage" onChange={handleOnChange} placeholder='상품 대표 이미지 삽입'/>
            <input type="number" name="productDiscountRate" onChange={handleOnChange} placeholder="할인율" />
            <input type="text" name="productMainCategory" onChange={handleOnChange} placeholder="카테고리(강아지)" />
            <input type="text" name="productName" onChange={handleOnChange} placeholder="상품 이름" />
            <input type="number" name="productPrice" onChange={handleOnChange} placeholder="가격" />
            <input type="text" name="productSalesStatusYN" onChange={handleOnChange} placeholder="세일 동의(Y/N)만 입력" />
            <input type="text" name="productSubCategory" onChange={handleOnChange} placeholder="사료(장난감)" />
            <button onClick={handleOnSubmit}>Submit</button>
        </div>
    );
};

export default DashBoard;
