import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function NavSearch() {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />
      <Input
        type="text"
        placeholder="Cari produk yang anda inginkan"
        className="w-full bg-transparent pl-10 text-sm text-muted-foreground shadow-none md:text-base"
      />
    </div>
  );
}
