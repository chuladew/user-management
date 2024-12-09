import { useCallback, forwardRef, Fragment, useState, useMemo, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { selectAllUsers, useDeleteUserMutation, useGetUsersQuery } from './userSlice'
import { RootState } from "../../store/store";
import { ColumnData, Order, QueryParams, User } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import Loading from '../../components/Loading'
import SimpleAlert from '../../components/SimpleAlert'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const userColumns = [
    { id: 'firstName', label: 'First Name', dataKey: 'firstName', sortable: true, numeric: false, disablePadding: false },
    { id: 'lastName', label: 'Last Name', dataKey: 'lastName', sortable: true, numeric: false, disablePadding: false },
    { id: 'age', label: 'Age', dataKey: 'age', sortable: true, width: 75, numeric: true, disablePadding: false },
    { id: 'gender', label: 'Gender', dataKey: 'gender', sortable: true, filter: 'true', numeric: false, disablePadding: false },
    { id: 'email', label: 'Email', dataKey: 'email', sortable: true, width: 250, numeric: false, disablePadding: false },
    { id: 'country', label: 'Country', dataKey: 'country', sortable: true, numeric: false, disablePadding: false },
    { id: 'city', label: 'City', dataKey: 'city', sortable: true, numeric: false, disablePadding: false },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User ) => void;
    order: Order;
    orderBy: string;
}
  
function EnhancedTableHead(props: EnhancedTableProps) {
    const theme = useTheme();
    console.log('theme', theme);
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
      (property: keyof User) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
            {userColumns.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    style={{ width: headCell.width }}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id as keyof User)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}
            <TableCell key={`actions`} align="center" padding="none" style={{ width: 100 }}></TableCell>
        </TableRow>
    );
}

interface UserTableProps {
    searchQuery: string;
    setSelectedUser: Function;
}

const UsersTable = ({ searchQuery = '', setSelectedUser }: UserTableProps) => {
    const totalCount = useSelector((state: RootState) => state.api?.queries?.getUsers?.data?.pagination?.items);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

    const [queryParams, setQueryParams] = useState({
        page: 1,
        limit: 100,
        order: 'asc',
        orderBy: 'firstName',
        loadMore: false,
        searchQuery
    });
    const {
        isLoading,
        isError
    } = useGetUsersQuery(queryParams as QueryParams);

    const [
        deleteUser,
    ] = useDeleteUserMutation()

    const usersList = useSelector(selectAllUsers);

    const handleRequestSort = useCallback((
        _: React.MouseEvent<unknown>,
        property: keyof User,
      ) => {
        const isAsc = queryParams.orderBy === property && queryParams.order === 'asc';
        setQueryParams({
            page: queryParams.page,
            limit: queryParams.limit,
            order: isAsc ? 'desc' : 'asc',
            orderBy: property as string,
            loadMore: false,
            searchQuery: queryParams.searchQuery,
        });
    }, [queryParams]);

    const onClickEdit = useCallback((_: React.MouseEvent<unknown>, row: User) => {
        setSelectedUser(row);
    }, []);

    const onClickDelete = useCallback((e: React.MouseEvent<unknown>, row: User) => {
        setDeleteUserId(row.id);
        setIsDialogOpen(true);
    }, []);

    const confirmDelete = useCallback(() => {
        if (deleteUserId) {
            deleteUser(deleteUserId);
        }
        setIsDialogOpen(false);
    }, [deleteUserId]);

    const onTableRowClick = useCallback((_: any, item: User) => {
        setSelectedUser(item);
    }, [])

    const VirtuosoTableComponents: TableComponents<User> = useMemo(() =>{
        return {
            Scroller: forwardRef<HTMLDivElement>((props, ref) => (
                <TableContainer component={Paper} {...props} ref={ref} />
            )),
            Table: (props) => (
                <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
            ),
            TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
                <TableHead {...props} ref={ref} />
            )),
            TableRow: forwardRef<HTMLTableRowElement>((props, ref) => (
                <TableRow {...props} sx={{ cursor: 'pointer' }} ref={ref} hover={true} onClick={(e) => onTableRowClick(e, props?.item)} />
            )),
            TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
                <TableBody {...props} ref={ref} />
            )),
        }
    }, []);

    const MemoizedRowContent = memo(({ index, row }: { index: number, row: User}) => {
        return (
            <Fragment>
                {userColumns.map(({ dataKey, width, numeric, disablePadding }: ColumnData) => (
                    <StyledTableCell
                        key={`${dataKey as string}_${index}`}
                        style={{ width: width }}
                        align={numeric || false ? 'right' : 'left'}
                        padding={disablePadding ? 'none' : 'normal'}
                    >
                        { (row as any)[dataKey] }
                    </StyledTableCell>
                ))}
                <StyledTableCell key={`actions_${index}`} style={{ width: 100 }} align="center" padding="none">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="edit" onClick={(e) => onClickEdit(e, row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={(e) => onClickDelete(e, row)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </StyledTableCell>
            </Fragment>
        );
    });

    const fixedHeaderContent = useCallback(() => {
        return (
            <EnhancedTableHead
                order={queryParams.order as Order}
                orderBy={queryParams.orderBy as string}
                onRequestSort={handleRequestSort}
            />
        );
    }, []);

    const rowContent = useCallback((_index: number, row: User) => {
        return (
            <MemoizedRowContent index={_index} row={row} />
        );
    }, []);

    const fetchNextPage = useCallback(() => {
        if (totalCount && usersList.length >= totalCount) return;
        setQueryParams({
            page: queryParams.page + 1,
            limit: queryParams.limit,
            order: queryParams.order,
            orderBy: queryParams.orderBy,
            loadMore: true,
            searchQuery: queryParams.searchQuery,
        })
    },  [queryParams]);

    useEffect(() => {
        setQueryParams({
            ...queryParams,
            searchQuery
        });
    }, [searchQuery]);

    if (isLoading) return <Loading />
    if (isError) return <SimpleAlert severity="error" message={'Something went wrong while fetching users'} />
    
    return (
        <>
            <ConfirmDialog
                open={isDialogOpen}
                title={'Delete User Confirmation'}
                message={`Are you sure you want to delete user id ${deleteUserId}`}
                btns={[
                    {
                        label: 'Confirm',
                        onClick: confirmDelete,
                    },
                    {
                        label: 'Cancel',
                        onClick: () => setIsDialogOpen(false)
                    },
                ]}
            />
            <Paper style={{ height: '80vh', width: '100%' }}>
                <TableVirtuoso
                    data={usersList}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                    fixedFooterContent={
                        isLoading
                            ? () => <div className="bg-grayscale-700">Loading...</div>
                            : undefined
                    }
                    endReached={fetchNextPage}
                    overscan={200}
                />
            </Paper>
        </>
    );
}

export default memo(UsersTable)