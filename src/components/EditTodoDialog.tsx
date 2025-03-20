import { useState } from "react";
import {  useSelector } from "react-redux";
import { editTodoAsync } from "@/store/todoSlice";
import { RootState } from "@/store/store";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useAppDispatch } from "@/store/store";
type EditTodoDialogProps = {
  id: string;
  currentText: string;
  currentCategory: string;
  triggerButton: React.ReactNode;
};
const EditTodoDialog = ({ id, currentText, currentCategory, triggerButton }: EditTodoDialogProps) => {
  const [open, setOpen] = useState(false); 
  const [text, setText] = useState(currentText);
  const [category, setCategory] = useState(currentCategory);
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const handleSave = () => {
    if (text.trim()) {
      const selectedCategory = categories.find((cat) => cat.name === category);
      if (!selectedCategory) return;

      dispatch(editTodoAsync({ id, text, category: selectedCategory.id })); 
      setOpen(false); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Input value={text} onChange={(e) => setText(e.target.value)} className="mb-2" />
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="w-full">
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
        <DialogFooter>
          <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-900">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog;
