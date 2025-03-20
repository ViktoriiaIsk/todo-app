import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const TodoStats = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="flex justify-between p-4 bg-gray-100 rounded-lg mt-4 text-sm">
      <span><strong>Total:</strong> {totalTodos} todos</span>
      <span><strong>Active:</strong> {activeTodos} todos</span>
      <span><strong>Completed:</strong> {completedTodos} todos</span>
      <span><strong>{completionPercentage}% completed</strong></span>
    </div>
  );
};

export default TodoStats;
