import { configureStore } from "@reduxjs/toolkit";
import InvoiceReducer from "./invoiceSlice";
export const store = configureStore({
  reducer: {
    invoice: InvoiceReducer,
  },
})
