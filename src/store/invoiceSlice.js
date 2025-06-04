import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  invoiceList: ["hehesss", 'ssss'],
  filter: "all",
  isFormOpen: false,
  selectedInvoice: null,
}

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null; // Reset selected invoice when form is closed
      }
    }
  }
})
export const { toggleForm } = InvoiceSlice.actions;

export default InvoiceSlice.reducer;