import CountryCard from "@/components/country-card";
import CountrySkeleton from "@/components/country-skeleton";
import Filter from "@/components/filter";
import SearchInput from "@/components/search-input";
import { supabase } from "@/config/supabase";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function HomePage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("Filter by Region");
  const {
    data: countriesData,
    isError: countriesError,
    isLoading: countriesLoading,
  } = useQuery({
    queryKey: ["countries", searchValue, filter],
    queryFn: async () => {
      const countriesQuery = supabase
        .from("countries")
        .select("*")
        .order("name", { ascending: true });
      if (searchValue) {
        countriesQuery.ilike("name", `${searchValue}%`);
      }
      if (filter !== "Filter by Region") {
        countriesQuery.ilike("region", `${filter}%`);
      }
      const countries = countriesQuery;
      return countries;
    },
  });

  return (
    <div className="px-3">
      <div className="my-8 space-y-4 md:flex md:items-center md:space-y-0 md:justify-between md:px-8">
        <SearchInput setValue={setSearchValue} />
        <Filter setFilter={setFilter} filterValue={filter} />
      </div>
      {countriesLoading && (
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-evenly">
          {new Array(10).fill(null).map((_item, i) => (
            <CountrySkeleton key={i} />
          ))}
        </div>
      )}

      {countriesData && (
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-evenly">
          {countriesData.data?.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      )}

      {countriesData &&
        countriesData.data?.length === 0 &&
        searchValue !== "" && (
          <div>
            <h4>No Country matches your search. Check your spelling</h4>
          </div>
        )}

      {countriesError && (
        <div>
          <h3>An Error Occured</h3>
        </div>
      )}
    </div>
  );
}
