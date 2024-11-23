import { Skeleton } from "./ui/skeleton";

export default function CountrySkeleton() {
  return (
    <div className="w-[250px] h-[300px] bg-white rounded-lg overflow-hidden shadow-[0_0_8px_-2px_rgba(0,0,0,0.5)]">
      <Skeleton className="w-full h-[45%] bg-slate-500" />

      <div className=" px-4 py-5 space-y-4">
        <Skeleton className="font-bold w-full h-4 text-lg" />
        <div>
          <ul>
            <li className="flex items-center">
              <span className="font-semibold">Population:</span>{" "}
              <Skeleton className="inline-flex flex-1 h-4" />
            </li>
            <li className="flex items-center">
              <span className="font-semibold">Region:</span>{" "}
              <Skeleton className="inline-flex flex-1 h-4" />
            </li>
            <li className="flex items-center">
              <span className="font-semibold">Capital:</span>{" "}
              <Skeleton className="inline-flex flex-1 h-4" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
