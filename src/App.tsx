import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";
import Filters from "./components/Filters";
import { useFetchTodosQuery } from "@/store/todoSlice";

const App = () => {
  const { isLoading, error } = useFetchTodosQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <Layout>
      <Toaster richColors position="top-right" />
      <AddTodoForm />
      <Filters />
      <TodoList />
    </Layout>
  );
};

export default App;
