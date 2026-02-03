import { useState, useEffect } from "react";
import { api } from "./api";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 1. 載入資料 (Load)
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const backendTodos = await api.getTodos();
      // 轉換資料格式: Backend -> Frontend
      const frontendTodos: Todo[] = backendTodos.map((t) => ({
        id: t.id,
        text: t.content,
        complete: t.isCompleted, // Note: type mismatch might happen here, checking below
        completed: t.isCompleted,
        description: "No description stored", // Backend doesn't support description yet
        expanded: false,
      }));
      setTodos(frontendTodos);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const addTodo = async (newTodoItem: Todo) => {
    try {
      // 呼叫 API 建立真正的 Todo
      const savedTodo = await api.createTodo(newTodoItem.text);

      // 將回傳的 ID 和格式合併回前端狀態
      const newFrontendTodo: Todo = {
        ...newTodoItem,
        id: savedTodo.id,
        completed: savedTodo.isCompleted,
      };

      setTodos([...todos, newFrontendTodo]);
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todoToToggle = todos.find((t) => t.id === id);
    if (!todoToToggle) return;

    try {
      await api.toggleTodo(id, !todoToToggle.completed);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  const toggleDescription = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
  };

  return (
    <div className="container">
      <h1 className="title">Fullstack Todo List</h1>

      <AddTodo onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onToggleDescription={toggleDescription}
      />
    </div>
  );
}

export default App;

