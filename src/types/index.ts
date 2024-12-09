export type columnDefType = {
    id: string
    label: string
    width?: number
    accessorKey: string
    filter?: string
    filterParams?: any
    sortable?: boolean
}

export type DataRange = {
    start: number
    end: number
}

export interface ColumnData {
    dataKey: string | number;
    label: string;
    numeric?: boolean;
    width?: number;
    disablePadding?: boolean
}

export type Order = 'asc' | 'desc';

export interface QueryParams {
    page?: number | null
    limit?: number | null
    order?: Order
    orderBy?: string
    loadMore?: boolean
    searchQuery?: string
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    country: string;
};