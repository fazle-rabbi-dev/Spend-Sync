import { create } from "zustand";
import { getCurrentUser, signOutAccount } from "@/lib/appwrite/api";

// =====================================================================================================================
// Auth
// =====================================================================================================================
export const useAuthStore = create((set, get) => ({
  isLoggedIn: true,
  isAuthLoading: true,
  user: null,

  checkAuth: async () => {
    const res = await getCurrentUser();
    console.log({ res });
    set({
      isLoggedIn: res?.$id ? true : false,
      isAuthLoading: false,
      user: res
    });
  },

  setAuth: user => {
    set({
      isLoggedIn: !!user,
      isAuthLoading: false,
      user
    });
  },

  logOut: async () => {
    set({
      isAuthLoading: true
    });

    const res = await signOutAccount();
    set({
      isLoggedIn: false,
      isAuthLoading: false,
      user: null
    });
  }
}));

// =====================================================================================================================
// Expense
// =====================================================================================================================
export const useExpenseStore = create((set, get) => ({
  // Expense Modal For (Create & Edit) Expense
  actionType: "add",
  isOpenModal: false,
  editableItem: null,
  isOpenDeleteModal: false,
  deleteItem: null,
  filteredExpenses: [],
  searchText: "",
  isOpenDetails: false,
  clickedItem: "",
  
  toggleModal: (type, clickedItem) => {
    if (type === "edit") {
      set({ editableItem: clickedItem });
    }

    set({
      isOpenModal: !get().isOpenModal,
      actionType: type === "edit" ? "edit" : "add"
    });
  },

  toggleDeleteModal: clickedItem => {
    set({
      isOpenDeleteModal: !get().isOpenDeleteModal,
      deleteItem: clickedItem || null
    });
  },

  setFilteredExpenses: value => {
    set({
      filteredExpenses: value
    });
  },
  
  setSearchText: (value) => {
    set({ searchText: value })
  },
  
  toggleDetails: (item) => {
    set({
      isOpenDetails: !get().isOpenDetails,
      clickedItem: item
    });
  }
}));

// =====================================================================================================================
// For Darkmode
// =====================================================================================================================
export const useThemeStore = create(set => ({
  darkMode: localStorage.getItem("darkMode") === "true",

  toggleDarkMode: () => {
    set(state => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", newDarkMode.toString());

      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return { darkMode: newDarkMode };
    });
  },

  enableDarkMode: () => {
    localStorage.setItem("darkMode", "true");
    document.documentElement.classList.add("dark");
  }
}));
