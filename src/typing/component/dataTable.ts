// 테이블 헤더 타입 정의
export interface TableHeader {
    key: string; // 데이터 키
    label: string; // 테이블 헤더에 표시될 텍스트
}

export interface DataTableGridProps {
    headers: TableHeader[]; // 테이블 헤더를 props로 받아옴
    columnCount: number; // 컬럼 개수
    data: any[]; // 표시할 데이터 (이 예제에서는 mockData로 사용)
}
