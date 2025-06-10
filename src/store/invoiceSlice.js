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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
      saveState(state);
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      state.isFormOpen = false;
    },
    markAsPaid: (state, action) => {
      const invoice = state.invoiceList.find((inv) => inv.id === action.payload);
      if (invoice) {
        invoice.status = "paid";
        state.selectedInvoice = null; // Update selected invoice if needed
        state.isFormOpen = false;
        saveState(state);
      }
    },
    deleteInvoice: (state, action) => {
      state.invoiceList = state.invoiceList.filter(
        (inv) => inv.id !== action.payload
      );
      state.selectedInvoice = null; // Reset selected invoice if deleted
      saveState(state);
    },
    updateInvoice: (state, action) => {
      const updatedInvoice = action.payload;
      const invoiceIndex = state.invoiceList.findIndex((inv) => inv.id === updatedInvoice.id);
      if (invoiceIndex !== -1) {
        state.invoiceList[invoiceIndex] = {
          ...state.invoiceList[invoiceIndex],
          ...updatedInvoice,
          amount: calculateAmount(updatedInvoice.items || state.invoiceList[invoiceIndex].items),
        };
        state.selectedInvoice = null;
        state.isFormOpen = false;
        saveState(state);
      }
    }

  },
});

export const { addInvoice, toggleForm, setFilter, setSelectedInvoice, markAsPaid, deleteInvoice, updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
