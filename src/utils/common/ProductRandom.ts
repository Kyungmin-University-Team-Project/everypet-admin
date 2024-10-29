interface ProductDataItem {
    productNumber: string;
    category: string;
    productName: string;
    recentOrderDate: string;
    salesStatus: string;
    stockStatus: string;
    productPrice: string;
}

const categories = ['사료', '장난감', '하네스', '케이지', '간식'];
const productNames = ['강남콩 두부', '샘플 데이터 A', '샘플 데이터 B', '샘플 데이터 C', '샘플 데이터 D'];
const salesStatuses = ['판매중', '매진'];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(): string {
    const year = 2024;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function generateRandomPrice(): string {
    const price = Math.floor(Math.random() * 100000) + 10000; // 최소 10,000 ~ 최대 110,000 KRW
    return `${price.toLocaleString()} KRW`;
}

function generateRandomStock(): string {
    const stock = Math.floor(Math.random() * 500); // 0 ~ 500개 사이의 랜덤 재고 수량
    return `${stock} pcs`;
}

// 총 50개의 데이터를 생성하여 5페이지 분량으로 나눔
export const productMockData: ProductDataItem[] = Array.from({ length: 50 }, (_, index) => ({
    productNumber: `A12412${index + 1}`,
    category: getRandomItem(categories),
    productName: getRandomItem(productNames),
    recentOrderDate: generateRandomDate(),
    salesStatus: getRandomItem(salesStatuses),
    stockStatus: generateRandomStock(),
    productPrice: generateRandomPrice(),
}));
