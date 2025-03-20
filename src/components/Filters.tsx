import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFilterCategory, setFilterStatus } from "@/store/todoSlice";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const filterCategory = useSelector((state: RootState) => state.todos.filterCategory);
  const filterStatus = useSelector((state: RootState) => state.todos.filterStatus);

  return (
    <div className="flex gap-4 mb-4">
      <Select value={filterCategory} onValueChange={(value) => dispatch(setFilterCategory(value))}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={(value) => dispatch(setFilterStatus(value))}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
