import api from "../configs/api";

export async function updateTask({ updatedData, id }) {
  const { data } = await api.patch(`/todo/updateTodo/${id}`, { ...updatedData });
  return data;
}
