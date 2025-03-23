import { useFetchTodosQuery } from "@/store/todoSlice";

const TodoStats = () => {
  const { data: todos = [] } = useFetchTodosQuery();

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="flex justify-between mt-4 text-sm text-gray-500">
      <span>Total: {totalTodos} todos</span>
      <span>Active: {activeTodos} todos</span>
      <span>Completed: {completedTodos} todos</span>
      <span>{completionPercentage}% completed</span>
    </div>
  );
};

export default TodoStats;
