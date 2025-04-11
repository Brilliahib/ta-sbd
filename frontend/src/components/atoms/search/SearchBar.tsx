"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-md items-center gap-2">
      <Input
        placeholder="Cari produk berdasarkan nama..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded-2xl shadow-sm"
      />
      <Button
        onClick={handleSearch}
        variant="secondary"
        className="rounded-2xl"
      >
        <Search className="mr-2 h-4 w-4" />
        Cari
      </Button>
    </div>
  );
};
