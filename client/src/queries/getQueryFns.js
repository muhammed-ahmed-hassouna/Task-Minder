import api from "../configs/api";

// Get All Todos of user
export async function getTodosUser({ currentPage }) {
  const queryString = `?page=${currentPage}&pageSize=5`;
  const { data } = await api.get(`/todo/getAllTodosUser${queryString}`);
  return data;
}
