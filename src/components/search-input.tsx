import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface SearchProps {
  setValue: (e: string) => void;
}

export default function SearchInput({ setValue }: SearchProps) {
  return (
    <div className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-5">
        <Search size={18} />
      </span>
      <input
        type="text"
        placeholder="Search for a country"
        className="w-full md:w-[500px] h-14 pl-12 bg-white shadow-lg rounded-lg dark:bg-darkBlue"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  );
}
