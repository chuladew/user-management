import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_RowVirtualizer,
  MRT_RowSelectionState,
  MRT_Row,
  MRT_ActionMenuItem,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { columnDefType, QueryParams, User } from "../types";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../features/users/userApiSlice";
import { setSelectedUser } from "../features/users/userSlice";
import useDeleteUser from "../hooks/useDeleteUser";
import { defaultPageSize, userColumnDefinitions } from "../constants";

const DataTable = () => {
  const dispatch = useDispatch();
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [rowCount, setRowCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeleting] = useDeleteUser(deleteUserId, setDeleteUserId);

  const [queryParams, setQueryParams]: [QueryParams, Function] = useState({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    query: "",
    sorting: [],
  } as QueryParams);

  const { data, isLoading, isError } = useGetUsersQuery(queryParams);
  const usersList = useSelector(selectAllUsers);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => userColumnDefinitions as columnDefType[],
    []
  );

  useEffect(() => {
    setRowCount(data?.pagination?.totalCount ?? 0);
    setQueryParams({
      page: pagination.pageIndex ?? 1,
      limit: pagination.pageSize ?? defaultPageSize,
      query: globalFilter,
      sorting,
      columnFilters,
    });
  }, [data, pagination, columnFilters, globalFilter, sorting]);

  const onClickEdit = useCallback(
    (_: React.MouseEvent<unknown>, row: MRT_Row<User>) => {
      dispatch(setSelectedUser(row.original));
    },
    [dispatch, setSelectedUser]
  );

  const onClickDelete = useCallback(
    (e: React.MouseEvent<unknown>, row: MRT_Row<User>) => {
      e.preventDefault();
      e.stopPropagation();
      setDeleteUserId(row.id);
    },
    [setDeleteUserId]
  );

  const table = useMaterialReactTable({
    columns,
    data: usersList,
    enableColumnFilterModes: false,
    enableRowSelection: false,
    enableMultiRowSelection: false,
    getRowId: (row) => row.id,
    initialState: {
      showColumnFilters: true,
      columnPinning: { right: ["mrt-row-actions"] },
    },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableRowActions: true,
    enableFacetedValues: true,
    enableRowVirtualization: true,
    positionActionsColumn: "last",
    columnFilterDisplayMode: "popover",
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderRowActionMenuItems: ({ closeMenu, cell, row, table }) => [
      <MRT_ActionMenuItem
        icon={<EditIcon />}
        key="edit"
        label="Edit"
        onClick={(e) => {
          closeMenu();
          onClickEdit(e, row as MRT_Row<User>);
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<DeleteIcon />}
        key="delete"
        label="Delete"
        onClick={(e) => {
          closeMenu();
          onClickDelete(e, row as MRT_Row<User>);
        }}
        table={table}
      />,
    ],
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading: isLoading || isDeleting,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isLoading,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
