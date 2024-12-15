import { describe, expect, it } from "vitest";
import {
  getUrl,
  getStringifiedSortOptions,
  getStringifiedColumnFilters,
  populateTags,
} from "../apiUtils";

describe("getStringifiedSortOptions", () => {
  it("should return empty object when sorting is not defined", async () => {
    const sorting = undefined;
    const sortOptions = getStringifiedSortOptions(sorting);
    expect(sortOptions).toEqual({
      sortColumns: undefined,
      sortOrders: undefined,
    });
  });

  it("should return sort columns and orders when sorting is defined", async () => {
    const sorting = [
      { id: "name", desc: false },
      { id: "email", desc: true },
    ];
    const sortOptions = getStringifiedSortOptions(sorting);
    expect(sortOptions).toEqual({
      sortColumns: "name,email",
      sortOrders: "asc,desc",
    });
  });
});

describe("getStringifiedColumnFilters", () => {
  it("should return empty object when custom filters are not defined", async () => {
    const customFilters = undefined;
    const columnFilters = getStringifiedColumnFilters(customFilters);
    expect(columnFilters).toEqual({});
  });

  it("should return column filters when custom filters are defined", async () => {
    const customFilters = [
      { id: "firstName", value: "John" },
      { id: "age", value: [10, 20] },
    ];
    const columnFilters = getStringifiedColumnFilters(customFilters);
    expect(columnFilters).toEqual({
      firstName_like: "John",
      age_gte: 10,
      age_lte: 20,
    });
  });

  it("should return column filters when custom filters are defined with filter variant as select", async () => {
    const customFilters = [{ id: "gender", value: "Male" }];
    const columnFilters = getStringifiedColumnFilters(customFilters);
    expect(columnFilters).toEqual({ gender: "Male" });
  });
});

describe("getUrl", () => {
  it("should generate and return url when query and custom filters not defined", async () => {
    const queryParams = {
      page: 1,
      limit: 10,
      query: "",
      sorting: [],
      columnFilters: [],
    };
    const url = getUrl(queryParams);
    expect(url).toEqual({ url: "/users?_page=1&_limit=10" });
  });

  it("should generate and return url when global search query is given", async () => {
    const queryParams = {
      page: 1,
      limit: 10,
      query: "test",
      sorting: [],
      columnFilters: [],
    };
    const url = getUrl(queryParams);
    expect(url).toEqual({ url: "/users?_page=1&_limit=10&q=test" });
  });
});

describe("providesTags", () => {
  it("should return tags when type is given and result is empty", async () => {
    const result = { data: [], meta: {} };
    const type = "Users";
    const tags = populateTags(result, type);
    expect(tags).toEqual([{ type, id: "PARTIAL-LIST" }]);
  });

  it("should return tags when type is given and result is not empty", async () => {
    const result = { ids: [100, 200] };
    const type = "Users";
    const tags = populateTags(result, type);
    expect(tags).toEqual([
      { type: "Users", id: 100 },
      { type: "Users", id: 200 },
      { type: "Users", id: "PARTIAL-LIST" },
    ]);
  });
});
