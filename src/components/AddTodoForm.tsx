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
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full"
      />
      <Select onValueChange={setCategory} defaultValue={category}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Work">Work</SelectItem>
          <SelectItem value="Personal">Personal</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="px-4">+ Add</Button>
    </form>
  );
};

export default AddTodoForm;
