import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { removeTodo, toggleTodo } from "@/store/todoSlice"; 
import { fetchCategories } from "@/store/categorySlice"; 
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; 

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()); 
  }, [dispatch]);

  const getCategoryColor = (categoryName: string) => {
    return categories.find((c) => c.name === categoryName)?.color || "#6b7280"; // Серый по умолчанию
  };

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div 
          key={todo.id} 
          className="flex items-center justify-between px-4 py-3 border rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <Checkbox checked={todo.completed} onCheckedChange={() => dispatch(toggleTodo(todo.id))} />
            <div>
              <p className={`text-base ${todo.completed ? "line-through text-gray-400" : "text-gray-900"} `}>
                {todo.text}
              </p>
              <Badge 
                style={{ backgroundColor: getCategoryColor(todo.category) }} 
                className="text-xs px-2 py-1 text-white"
              >
                {todo.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hover:bg-gray-200">
              <Pencil size={16} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => dispatch(removeTodo(todo.id))}>
              <X size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
