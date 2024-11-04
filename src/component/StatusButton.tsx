import React from 'react';
import styles from './StatusButton.module.scss';

// 모든 상태값을 옵셔널로 받아옴
interface StatusButtonProps {
    orderStatus?: string;
    shippingStatus?: string;
    salesStatus?: string;
    answerStatus?: string;
}

/**
 * StatusButton 컴포넌트의 props입니다.
 * 각 상태값을 옵셔널로 받아 해당 상태에 맞는 스타일 클래스를 반환합니다.
 *
 * @param orderStatus - 주문 상태 (예: '접수전', '접수완료', '환불요청', '주문취소').
 * @param shippingStatus - 배송 상태 (예: '배송전', '배송중', '배송취소', '배송완료').
 * @param salesStatus - 판매 상태 (예: '판매중', '매진').
 * @param answerStatus - 응답 상태 (예: '완료', '미완료').
 *
 * @returns 상태에 맞는 버튼을 렌더링합니다.
 */

const StatusButton = ({
                          orderStatus,
                          shippingStatus,
                          salesStatus,
                          answerStatus,
                      }: StatusButtonProps) => {

    // 각 상태에 맞는 클래스 이름 반환
    const getStatusClass = () => {
        // orderStatus 조건
        if (orderStatus) {
            switch (orderStatus) {
                case '접수전':
                    return styles.grayButton;
                case '접수완료':
                    return styles.greenButton;
                case '환불요청':
                case '주문취소':
                    return styles.redButton;
                default:
                    return '';
            }
        }
        // shippingStatus 조건
        if (shippingStatus) {
            switch (shippingStatus) {
                case '배송전':
                    return styles.grayButton;
                case '배송중':
                    return styles.yellowButton;
                case '배송취소':
                    return styles.redButton;
                case '배송완료':
                    return styles.greenButton;
                default:
                    return '';
            }
        }
        // salesStatus 조건
        if (salesStatus) {
            switch (salesStatus) {
                case '판매중':
                    return styles.greenButton;
                case '매진':
                    return styles.redButton;
                default:
                    return '';
            }
        }
        // answerStatus 조건
        if (answerStatus) {
            switch (answerStatus) {
                case '완료':
                    return styles.greenButton;
                case '미완료':
                    return styles.redButton;
                default:
                    return '';
            }
        }
    };

    return (
        <button className={`${styles.button} ${getStatusClass()}`}>
            <span>
                {orderStatus || shippingStatus || salesStatus || answerStatus}
            </span>
        </button>
    );
};

export default StatusButton;
