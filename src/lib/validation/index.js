import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  // username: yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(32, 'Password cannot exceed 32 characters'),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  // username: yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(32, 'Password cannot exceed 32 characters'),
});

export const expenseSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  amount: yup.string().required('Amount is required').min(1, 'Amount must be at least 1'),
  type: yup.string().required('Type is required').oneOf(['Private', 'Public', 'Personal'], 'Invalid expense type'),
  date: yup.date().typeError('Please enter a valid date').required('Date is required')
});

