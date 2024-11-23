"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const filter = ["Africa", "America", "Asia", "Europe", "Oceania"];

interface FilterProps {
  setFilter: (e: string) => void;
  filterValue: string;
}

export default function Filter({ setFilter, filterValue }: FilterProps) {
  const [showFilterList, setShowFilterList] = useState<boolean>(false);
  const showFilter = () => setShowFilterList((prev) => !prev);
  return (
    <div className="px-4 py-4 dark:bg-darkBlue bg-white w-56 rounded-lg relative shadow-lg">
      <div className="flex  justify-between items-center" onClick={showFilter}>
        {filterValue}{" "}
        <ChevronDown
          className={`${
            showFilterList ? "rotate-180" : "rotate-0 transition-all"
          }`}
        />
      </div>
      {showFilterList && (
        <div className="absolute dark:bg-darkBlue w-full px-4 bg-white left-0 top-[110%] py-4 space-y-2 rounded-lg shadow-lg">
          <p
            onClick={() => {
              setFilter("Filter by Region");
              showFilter();
            }}
          >
            Filter by Region
          </p>
          {filter.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                setFilter(item);
                showFilter();
              }}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
