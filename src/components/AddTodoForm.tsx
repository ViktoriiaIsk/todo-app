import React, { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { addTodoAsync } from "@/store/todoSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AddTodoForm = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTodoAsync({ text, category }));
    toast.success(`Task "${text}" added!`);
    setText("");
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
    <Select onValueChange={setCategory} defaultValue={category}>
      <SelectTrigger className="w-[140px] text-sm border-gray-300 focus:ring-gray-500">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Work">Work</SelectItem>
        <SelectItem value="Personal">Personal</SelectItem>
        <SelectItem value="Shopping">Shopping</SelectItem>
      </SelectContent>
    </Select>
    <Button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">
      + Add
    </Button>
  </form>
  );
};

export default AddTodoForm;
