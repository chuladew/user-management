import qs from "qs";
import apiSlice from "../api/apiSlice";

interface StatOption {
  label: string;
  value: any;
}

const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatOption[], Record<string, string>>({
      query: (queryParams) =>
        `/stats${queryParams ? `?${qs.stringify(queryParams)}` : ""}`,
    }),
  }),
});

export const { useGetStatsQuery } = statsApiSlice;

export default statsApiSlice;
