import qs from "qs";
import { groupBy } from "lodash";
import { ColumnFilter, QueryParams, SortOption } from "../types";
import { userColumnDefinitions } from "../constants";

export const getStringifiedSortOptions = (
  sorting: SortOption[] | undefined
) => {
  if (!sorting?.length)
    return { sortColumns: undefined, sortOrders: undefined };
  return sorting.reduce(
    (acc, sort, i) => {
      acc.sortColumns += `${i > 0 ? "," : ""}${sort.id}`;
      acc.sortOrders += `${i > 0 ? "," : ""}${sort.desc ? "desc" : "asc"}`;
      return acc;
    },
    { sortColumns: "", sortOrders: "" }
  );
};

export const getStringifiedColumnFilters = (
  customFilters: ColumnFilter[] | undefined
) => {
  if (!customFilters?.length) return {};

  const columnDefs = groupBy(userColumnDefinitions, "id");

  return customFilters.reduce(
    (acc, opt) => {
      const columnDef = columnDefs[opt.id][0];
      if (columnDef.filterVariant === "range-slider") {
        const [start, end] = opt.value as [number, number];
        if (!start || !end) return acc;
        acc[`${opt.id}_gte`] = start;
        acc[`${opt.id}_lte`] = end;
      } else {
        if (columnDef.filterVariant === "select") {
          acc[`${opt.id}`] = opt.value;
        } else {
          acc[`${opt.id}_like`] = opt.value;
        }
      }
      return acc;
    },
    {} as Record<string, unknown>
  );
};

export const getUrl = (queryParams: QueryParams) => {
  const {
    page: _page,
    limit: _limit,
    sorting,
    query,
    columnFilters,
  } = queryParams;
  const { sortColumns, sortOrders } = getStringifiedSortOptions(sorting);
  const columnFiltersParams = getStringifiedColumnFilters(columnFilters);
  let queryStr = qs.stringify({
    _page,
    _limit,
    _sort: sortColumns,
    _order: sortOrders,
    q: query?.length ? query.trim() : undefined,
    ...columnFiltersParams,
  });
  return { url: `/users?${queryStr}` };
};

export const populateTags = (result: any, type: string) =>
  result?.ids?.length
    ? [
        ...result.ids.map((id: number) => ({ type, id })),
        { type, id: "PARTIAL-LIST" },
      ]
    : [{ type, id: "PARTIAL-LIST" }];
