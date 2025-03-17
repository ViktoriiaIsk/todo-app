import { useEffect } from "react";
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
      <AddTodoForm />
      <TodoList />
    </Layout>
  );
};

export default App;
