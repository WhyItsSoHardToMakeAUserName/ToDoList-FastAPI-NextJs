"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/api/v1/tasks";
import AuthGuard from "@/guards/AuthGuard";

// можно вынести в types
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksPage() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await fetchTasks(token!);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await createTask(token!, newTaskTitle.trim());
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    try {
      await updateTask(token!, id, !completed);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(token!, id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-light text-gray-900">Tasks</h1>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleCreateTask} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new task..."
                className="text-black flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Add
              </button>
            </div>
          </form>

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <button
                  onClick={() => handleToggleTask(task.id, task.completed)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>

                <span
                  className={`flex-1 ${task.completed ? "text-gray-400 line-through" : "text-gray-900"}`}
                >
                  {task.title}
                </span>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {tasks.length === 0 && !loading && (
              <div className="text-center text-gray-400 py-8">
                No tasks yet. Add one above.
              </div>
            )}

            {/* можно чтото по красивее  но думаю хватит */}
            {loading && (
              <div className="text-center text-gray-400 py-8">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
