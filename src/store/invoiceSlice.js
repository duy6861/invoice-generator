import { createSlice } from "@reduxjs/toolkit";
import { format, addDays } from "date-fns";

// ✳️ Hằng số mặc định để tái sử dụng
const DEFAULT_STATE = {
  invoiceList: [],
  filter: "all",
  isFormOpen: false,
  selectedInvoice: null,
};

// ✳️ Helper: Tính tổng tiền
const calculateAmount = (items) =>
  items.reduce((total, item) => total + item.total, 0);

// ✳️ Helper: Lưu vào localStorage
const saveState = (state) => {
  try {
    localStorage.setItem("invoiceState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// ✳️ Helper: Load từ localStorage
const loadState = () => {
  try {
    const saved = localStorage.getItem("invoiceState");
    return saved ? JSON.parse(saved) : DEFAULT_STATE;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return DEFAULT_STATE;
  }
};

const initialState = loadState();

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, { payload }) => {
      const newInvoice = {
        ...payload,
        amount: calculateAmount(payload.items),
        status: payload.status || "pending",
        dueDate: payload.dueDate || format(addDays(new Date(), 30), "yyyy-MM-dd"),
      };

      state.invoiceList.push(newInvoice);
      state.isFormOpen = false;
      saveState(state);
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
      saveState(state);
    },
  },
});

export const { addInvoice, toggleForm } = invoiceSlice.actions;
export default invoiceSlice.reducer;
