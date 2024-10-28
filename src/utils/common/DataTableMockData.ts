interface DataItem {
    id: string;
    category: string;
    name: string;
    date: string;
    status: string;
}

const categories = ['배송', '제품 품질', '환불'];
const names = ['콩콩이주인', '샘플 이름 데이터 A', '샘플 이름 데이터 B', '샘플 이름 데이터 C', '샘플 이름 데이터 D'];
const statuses = ['완료', '미완료'];

function getRandomItem(array: any[]) {
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

// 총 50개의 데이터를 생성하여 5페이지 분량으로 나눔
export const mockData: DataItem[] = Array.from({ length: 50 }, (_, index) => ({
    id: `A12412${index + 1}`,
    category: getRandomItem(categories),
    name: getRandomItem(names),
    date: generateRandomDate(),
    status: getRandomItem(statuses),
}));
