import authReducer from "../../reducers/auth";

const defaultSate = {};

test("should set up default auth state value", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual(defaultSate);
});

test("should set up login state", () => {
  const state = authReducer(undefined, { type: "LOGIN", uid: "sdfsf" });
  expect(state).toEqual({ uid: "sdfsf" });
});

test("should set up logout state", () => {
  const state = authReducer(undefined, { type: "LOGOUT" });
  expect(state).toEqual({});
});
