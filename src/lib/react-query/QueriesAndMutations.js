import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import {
  createUserAccount,
  signInAccount,
  createExpense,
  updateExpense,
  getExpenses,
  getTrashedExpenses,
  deleteExpense,
  moveToTrashExpense,
  restoreExpenseFromTrash
} from "../appwrite/api.js";

// =====================================================================================================================
// AUTHENTICATION
// =====================================================================================================================
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: user => createUserAccount(user)
  });
};

export const useSigninAccount = () => {
  return useMutation({
    mutationFn: user => signInAccount(user)
  });
};


// =====================================================================================================================
// EXPENSE CRUD OPERATION
// =====================================================================================================================
export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expense => createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAY_EXPENSES] });
    }
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};

export const useGetTodayExpenses = data => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TODAY_EXPENSES],
    queryFn: () => getExpenses(data),
    enabled: !!data?.userId,
    refetchOnWindowFocus: false
  });
};

export const useGetAllExpenses = data => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_EXPENSES],
    queryFn: () => getExpenses(data),
    enabled: !!data?.userId,
    refetchOnWindowFocus: false
  });
};

export const useGetTrashedExpenses = userId => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TRASHED_EXPENSES],
    queryFn: () => getTrashedExpenses(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false
  });
};

export const useMoveToTrashExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => moveToTrashExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};

export const useRestoreExpenseFromTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => restoreExpenseFromTrash(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => deleteExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
};

