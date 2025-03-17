import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeTodo } from "@/store/todoSlice"; 
import { toggleTodo } from "@/store/todoSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; 
import { X, Pencil, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleDelete = (id: string, text: string) => {
    dispatch(removeTodo(id));
    toast.error(`Task "${text}" deleted!`); 
  };

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div 
          key={todo.id} 
          className="flex items-center justify-between px-4 py-3 border rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={todo.completed} 
              onCheckedChange={() => dispatch(toggleTodo(todo.id))}
            />
            <div>
              <p className={`text-base ${todo.completed ? "line-through text-gray-400" : "text-gray-900"} `}>
                {todo.text}
              </p>
              <Badge className="text-xs px-2 py-1">{todo.category}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hover:bg-gray-200">
              <Pencil size={16} />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => handleDelete(todo.id, todo.text)}>
              <X size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
