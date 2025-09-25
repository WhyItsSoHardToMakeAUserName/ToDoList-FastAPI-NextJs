import { decodeToken } from "@/utils/token";
//api url надо вынести в .env но для теста пойдет и так
export const fetchTasks = async (token: string) => {
  const response = await fetch("http://127.0.0.1:8000/task/", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

export const createTask = async (token: string, title: string) => {
  const decoded = decodeToken(token);
  if (!decoded?.user_id) throw new Error("Invalid token: missing user_id");

  const response = await fetch("http://127.0.0.1:8000/task/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: decoded.user_id,
      title: title,
      completed: false,
    }),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

export const updateTask = async (
  token: string,
  id: number,
  completed: boolean,
) => {
  const response = await fetch(`http://127.0.0.1:8000/task/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
};

export const deleteTask = async (token: string, id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/task/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return response.json();
};
