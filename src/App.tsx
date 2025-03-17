import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "@/store/todoSlice";
import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, [dispatch]);

  return (
    <Layout>
      <TodoList />
    </Layout>
  );
};

export default App;
