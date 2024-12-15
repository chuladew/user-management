import userReducer, { setSelectedUser, initialState } from "../userSlice";
import { expect, it, describe } from "vitest";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
});

describe("setSelectedUser", () => {
  it("should set selected user", () => {
    const user = {
      id: "1",
      firstName: "Fredra",
      lastName: "Filippov",
      age: 70,
      gender: "Female",
      email: "ffilippov1@epa.gov",
      country: "Indonesia",
    };
    expect(userReducer(initialState, setSelectedUser(user))).toEqual({
      selectedUser: user,
    });
  });
});
