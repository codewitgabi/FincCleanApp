import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { logoutUser } from "../features/Auth/authSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  // baseUrl: "https://finccleanback.vercel.app/api",
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.originalStatus === 401)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "/auth/refresh",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logoutUser());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
