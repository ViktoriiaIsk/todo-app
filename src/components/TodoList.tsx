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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import TodoStats from "./TodoStats";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const filterCategory = useSelector((state: RootState) => state.todos.filterCategory);
  const filterStatus = useSelector((state: RootState) => state.todos.filterStatus);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);

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

  const filteredTodos = todos.filter((todo) => {
    const categoryId = categories.find(cat => cat.name === filterCategory)?.id;
    const categoryMatch = filterCategory === "All" || todo.category === categoryId;
    const statusMatch =
      filterStatus === "All" ||
      (filterStatus === "Completed" && todo.completed) ||
      (filterStatus === "Active" && !todo.completed);

    return categoryMatch && statusMatch;
  });

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
                <div className="w-full">
                  <p className={`text-base ${todo.completed ? "line-through text-gray-400" : "text-gray-900"} `}>
                    {todo.text}
                  </p>
                </div>
                <Badge 
                  style={{ backgroundColor: getCategoryColor(todo.category) }} 
                  className="text-xs px-2 py-1 text-white"
                >
                  {getCategoryName(todo.category)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {/* Trigger for EditTodoDialog */}
                <AccordionTrigger className="p-2 rounded-lg hover:bg-gray-200 transition">
                 
                </AccordionTrigger>
                <EditTodoDialog 
                  id={todo.id} 
                  currentText={todo.text} 
                  currentCategory={todo.category} 
                  triggerButton={
                    <Button variant={"ghost"} size="icon" className="hover:bg-gray-200">
                      <Pencil size={16} />
                    </Button>
                  } 
                />
                <Button variant={"ghost"} size="icon" onClick={() => handleDelete(todo.id)}>
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
{/* Pagination Controls */}
<div className="flex justify-between items-center mt-4">
  <div className="flex items-center gap-2">
    <span className="text-gray-700">Show:</span>
    <select 
      className="border rounded-md px-2 py-1 text-sm"
      value={todosPerPage}
      onChange={(e) => {
        setCurrentPage(1);
        setTodosPerPage(Number(e.target.value));
      }}
    >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={15}>15 per page</option>
    </select>
  </div>

  <div className="flex items-center gap-2">
    <Button 
      onClick={() => setCurrentPage(1)} 
      disabled={currentPage === 1}
      className="bg-transparent border border-gray-300 text-gray-700 px-3 py-1 rounded-md 
      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      First
    </Button>
    <Button 
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
      disabled={currentPage === 1}
      className="bg-transparent border border-gray-300 text-gray-700 px-3 py-1 rounded-md 
      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </Button>
    <span className="text-gray-700">
      Page {currentPage} of {totalPages}
    </span>
    <Button 
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
      disabled={currentPage === totalPages}
      className="bg-transparent border border-gray-300 text-gray-700 px-3 py-1 rounded-md 
      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </Button>
    <Button 
      onClick={() => setCurrentPage(totalPages)} 
      disabled={currentPage === totalPages}
      className="bg-transparent border border-gray-300 text-gray-700 px-3 py-1 rounded-md 
      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Last
    </Button>
  </div>
</div>
{/*line gray 200*/}
      <div className="w-full h-0.5 bg-gray-200 mt-4"></div>

      <TodoStats />
    </>
  );
};

export default TodoList;
