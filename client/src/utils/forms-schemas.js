import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  country: yup.string().required("Country code is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/,
      "Invalid password. Password must have 8 characters, with at least 1 number, uppercase, and special character",
    )
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/,
      "Invalid password. Password must have 8 characters, with at least 1 number, uppercase, and special character",
    ),
});

export const addTaskSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  task: yup.string().required("Task description is required"),
  priority: yup.string().required("Priority is required"),
  status: yup.string().required("Status is required"),
});

export const updateTaskSchema = yup.object().shape({
  subject: yup.string().optional(),
  task: yup.string().optional(),
  priority: yup.string().optional(),
  status: yup.string().optional(),
});
