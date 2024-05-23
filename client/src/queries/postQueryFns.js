import api from "../configs/api";

// Sign Up
export async function signUpUser(formData) {
  const { data } = await api.post(`/user/register`, { ...formData });
  return data;
}

// Log in
export async function LogInUser(formData) {
  const { data } = await api.post(`/auth/login`, { ...formData });
  return data;
}

// Add Task
export async function createTask({ createData }) {
  const { data } = await api.post(`/todo/createTodo`, { ...createData });
  return data;
}
