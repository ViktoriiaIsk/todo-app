import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";
import { toggleTodo, deleteTodoAsync } from "@/store/todoSlice"; 
import { fetchCategories } from "@/store/categorySlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; 
import EditTodoDialog from "./EditTodoDialog";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import TodoStats from "./TodoStats";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const filterCategory = useSelector((state: RootState) => state.todos.filterCategory);
  const filterStatus = useSelector((state: RootState) => state.todos.filterStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.color || "#6b7280";
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodoAsync(id)); 
  };

  // Filter todos based on category and status
  const filteredTodos = todos.filter((todo) => {
    const categoryId = categories.find(cat => cat.name === filterCategory)?.id;
    const categoryMatch = filterCategory === "All" || todo.category === categoryId;
    const statusMatch =
      filterStatus === "All" ||
      (filterStatus === "Completed" && todo.completed) ||
      (filterStatus === "Active" && !todo.completed);

    return categoryMatch && statusMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <>
      <Accordion type="single" collapsible className="space-y-2">
        {currentTodos.map((todo) => (
          <AccordionItem key={todo.id} value={todo.id}>
            <div className="flex items-center justify-between px-4 py-4 border rounded-lg bg-white shadow-sm hover:bg-gray-100 transition gap-4 min-h-[60px]">
              <div className="flex items-center gap-3 w-full">
                <Checkbox checked={todo.completed} onCheckedChange={() => dispatch(toggleTodo(todo.id))} />
                <div className="flex justify-between w-full">
                  <p className={`text-base ${todo.completed ? "line-through text-gray-400" : "text-gray-900"} `}>
                    {todo.text}
                  </p>
                  <Badge 
                    style={{ backgroundColor: getCategoryColor(todo.category) }} 
                    className="text-xs px-2 py-1 text-white"
                  >
                    {getCategoryName(todo.category)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <EditTodoDialog 
                  id={todo.id} 
                  currentText={todo.text} 
                  currentCategory={todo.category} 
                  triggerButton={
                    <Button variant="outline" size="icon" className="hover:bg-gray-200">
                      <Pencil size={16} />
                    </Button>
                  } 
                />
                <Button variant="outline" size="icon" onClick={() => handleDelete(todo.id)}>
                  <X size={16} />
                </Button>
              </div>
            </div>
            <AccordionContent className="px-4 py-2 bg-gray-50 text-gray-600">
              {todo.description || "No description provided."}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <TodoStats />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default TodoList;
