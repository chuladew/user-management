import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import apiSlice from "../api/apiSlice";
import { QueryParams, User } from "../../types";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { defaultPageSize } from "../../constants";
import { getUrl } from "../../utils/apiUtils";

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState({
  pagination: {
    totalCount: 0,
  },
});

export const transformResponse = (
  users: User[],
  meta: FetchBaseQueryMeta | undefined
) => {
  const normalizedState = usersAdapter.setAll(initialState, users);
  return {
    ...normalizedState,
    pagination: {
      totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
    },
  };
};

export const providesTags = (result: any) =>
  result
    ? [
        ...result.ids.map((id: number) => ({ type: "Users" as const, id })),
        { type: "Users", id: "PARTIAL-LIST" },
      ]
    : [{ type: "Users", id: "PARTIAL-LIST" }];

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
    getUsers: builder.query<EntityState<User, string>, QueryParams>({
      query: (queryParams: QueryParams) => getUrl(queryParams),
      transformResponse: (res: User[], meta) => transformResponse(res, meta),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.sorting !== previousArg?.sorting ||
          currentArg?.query !== previousArg?.query ||
          currentArg?.columnFilters !== previousArg?.columnFilters
        );
      },
      providesTags: (result) => providesTags(result),
    }),
    addUser: builder.mutation<User, User>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, User>({
      query: (payload: User) => {
        return {
          url: `/users/${payload.id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: (result, error, user) => [
        { type: "Users", id: user.id },
        { type: "Users", id: "PARTIAL-LIST" },
      ],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Users", id },
        { type: "Users", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select({
  page: 1,
  limit: defaultPageSize,
  query: "",
  sorting: [],
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(
    (state: RootState) => selectUsersResult(state)?.data ?? initialState
  );

export default usersApiSlice;
