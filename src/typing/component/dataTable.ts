export interface TableColumns {
    key: string;
    label: string;
}

export interface DataTableGridProps {
    columns: TableColumns[];
    columnCount: number;
    rowData: any[];
}
