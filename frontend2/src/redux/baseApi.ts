import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

import { TAGS } from "./tags";

export const baseApi = createApi({
  reducerPath: "api",
  bObjectObjectObjectaseQuery: baseQuery,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});