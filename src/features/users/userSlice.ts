import {
    createSelector,
    createEntityAdapter,
    EntityState
} from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { apiSlice } from "../api/apiSlice";
import { QueryParams, User } from "../../types";

interface UserResponse<T> {
  data: T[]
  first: number
  items: number
  last: number
  next: number
  pages: number
  prev: number
  page: number  
}

const usersAdapter = createEntityAdapter<User>()
const initialState = usersAdapter.getInitialState({
  pagination: {
    first: 0,
    items: 0,
    last: 0,
    next: 0,
    pages: 0,
    prev: 0,
    page: 0 
  }
})

export const getUrl = (queryParams: QueryParams) => {
  const { page, limit, order, orderBy, searchQuery } = queryParams
  let url = '/users'
  if (page && limit) {
    url += `?_page=${page}&_per_page=${limit}`
  }
  if (order && orderBy) {
    const orderOp = (order === 'asc' ? '' : '-' )
    url += `&_sort=${orderOp}${orderBy}`
  }
  if (searchQuery) {
    url += `&firstName=${searchQuery}`
  }
  return { url };
}

export const transformResponse = (res: UserResponse<User>, _: any, args: QueryParams) => {
  const normalizedState = usersAdapter.setAll(initialState, res.data);
  return {
    ...normalizedState,
    pagination: {
      first: res.first,
      items: res.items,
      last: res.last,
      next: res.next,
      pages: res.pages,
      prev: res.prev,
      page: args.page 
    }
  };
};

export const providesTags = (result: any) =>
  result
    ? [
        ...result.ids.map((id: number) => ({ type: 'Users' as const, id })),
        { type: 'Users', id: 'PARTIAL-LIST' },
      ]
    : [{ type: 'Users', id: 'PARTIAL-LIST' }];


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query<User, string>({
          query: (id) => `/users/${id}`,
        }),
        getUserStats: builder.query<User, string>({
          query: () => '/users',
        }),
        getUsers: builder.query<EntityState<User, string>, QueryParams>({
          query: (queryParams: QueryParams) => getUrl(queryParams),
          transformResponse: (res: UserResponse<User>, _, args) => transformResponse(res, _, args),
          serializeQueryArgs: ({ endpointName }) => endpointName,
          forceRefetch({ currentArg, previousArg }) {
            return currentArg?.page !== previousArg?.page ||
              currentArg?.order !== previousArg?.order ||
              currentArg?.orderBy !== previousArg?.orderBy ||
              currentArg?.searchQuery !== previousArg?.searchQuery
          },
          merge: (currentCache, newItems, otherArgs) => {
            if (currentCache.ids.length > 0 && otherArgs.arg.loadMore) {
              return usersAdapter.addMany(currentCache, newItems.entities)
            }
            return newItems;
          },
          providesTags: (result) => providesTags(result)
        }),
        addUser: builder.mutation<User, User>({
          query: (body) => ({
            url: `/users`,
            method: 'POST',
            body,
          }),
          invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation<User, Partial<User>>({
          query: ({ id, ...patch }) => ({
            url: `/users/${id}`,
            method: 'PATCH',
            body: patch,
          }),
          invalidatesTags: (result, error, user) => [
            { type: 'Users', id: user.id},
            { type: 'Users', id: 'PARTIAL-LIST' },
          ],
        }),
        deleteUser: builder.mutation<void, string>({
          query: (id) => ({
            url: `/users/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: (result, error, id) => [
            { type: 'Users', id },
            { type: 'Users', id: 'PARTIAL-LIST' },
          ],
        }),
    })
})

export const {
    useGetUserByIdQuery,
    useGetUsersQuery,
    useGetUserStatsQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select({
  page: 1,
  limit: 100,
  order: 'asc',
  orderBy: 'firstName'
})

export const selectUserStatsResult = usersApiSlice.endpoints.getUserStats.select('')

const selectUserStatsData = createSelector(
    selectUserStatsResult,
    userStatsResult => userStatsResult.data
)

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
)

export const selectGroupedUsersData = createSelector(
  (state: RootState) => selectUserStatsData(state) ?? [],
  (users: User[]) => {
    return users.reduce((acc, { country, age }) => {
      acc[country] ??= { label: country, value: 0};
      acc[country].value += 1;
      return acc;
    }, {} as Record<string, { label: string, value: number }>)
  }
);