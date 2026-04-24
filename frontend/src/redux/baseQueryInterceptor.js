// baseQueryWithInterceptor.js
import { Mutex } from "async-mutex";
import { baseQuery } from "./baseQuery";
import { logout, setCredentials } from "./userData.slice";

const mutex = new Mutex();

export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  // Global error interceptor
  if (result.error) {
    console.error("API Error:", result.error);
  }

  // Auth interceptor (401)
  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "auth/refresh",
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          api.dispatch(setCredentials(refreshResult.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
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
