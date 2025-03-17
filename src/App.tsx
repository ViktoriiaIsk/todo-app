import { useEffect } from "react";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { fetchTodos } from "@/store/todoSlice";
import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, [dispatch]);

  return (
    <Layout>
        <Toaster richColors position="top-right" /> 
      <AddTodoForm />
      <TodoList />
    </Layout>
  );
};

export default App;
