import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Badge } from "@/components/ui/badge";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
        >
          <div>
            <p className="text-lg font-medium">{todo.text}</p>
            <Badge variant="secondary">{todo.category}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
