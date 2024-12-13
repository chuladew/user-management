export interface columnDefType {
  id: string;
  header: string;
  accessorKey: string;
  filterVariant:
    | "text"
    | "autocomplete"
    | "checkbox"
    | "date"
    | "date-range"
    | "datetime"
    | "datetime-range"
    | "multi-select"
    | "range"
    | "range-slider"
    | "select"
    | "time"
    | "time-range"
    | undefined;
  sortable: boolean;
  numeric: boolean;
  size?: number;
  filterFn?: string;
  filterSelectOptions?: any[];
  enableColumnFilter?: boolean;
}

export type DataRange = {
  start: number;
  end: number;
};

export interface ColumnData {
  id: string;
  dataKey: string | number;
  label: string;
  numeric?: boolean;
  width?: number;
  disablePadding?: boolean;
}

export interface SortOption {
  desc: boolean;
  id: string;
}

export interface ColumnFilter {
  id: string;
  value: any;
}

export type Order = "asc" | "desc";

export interface QueryParams {
  page?: number | null;
  limit?: number | null;
  sorting?: SortOption[];
  query?: string;
  columnFilters?: ColumnFilter[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  country: string;
}
