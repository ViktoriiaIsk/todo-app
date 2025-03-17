import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import { removeTodo } from "@/store/todoSlice"; 
import { Button } from "@/components/ui/button"; 


const TodoList = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();
  
    const handleDelete = (id: string, text: string) => {
      dispatch(removeTodo(id));
      toast.error(`Task "${text}" deleted!`); 
    };
  
    return (
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div>
              <p className="text-lg font-medium">{todo.text}</p>
              <Badge variant="secondary">{todo.category}</Badge>
            </div>
            <Button variant="destructive" size="icon" onClick={() => handleDelete(todo.id, todo.text)}>
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
    );
  };
  
  export default TodoList;
