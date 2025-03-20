import React, { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { fetchCategories } from "@/store/categorySlice";
import { addTodoAsync } from "@/store/todoSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AddTodoForm = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories()); 
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !category) return;
  
    const selectedCategory = categories.find((c) => c.name === category);
    dispatch(addTodoAsync({ text, category: selectedCategory?.id || "" })); 
  
    toast.success(`Task "${text}" added!`);
    setText("");
    setCategory(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4 p-2 bg-white shadow-sm rounded-lg">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border-gray-300 focus:border-gray-500 rounded-md"
      />
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger className="w-[140px] text-sm border-gray-300 focus:ring-gray-500">
          <SelectValue placeholder="Choose category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">
        + Add
      </Button>
    </form>
  );
};

export default AddTodoForm;
