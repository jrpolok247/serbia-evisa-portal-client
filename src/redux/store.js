import { configureStore } from "@reduxjs/toolkit";
import { visa } from "./api/visa/visaApi";


export const store = configureStore({
  reducer: {

    [visa.reducerPath]: visa.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(visa.middleware)


});

export default store;
