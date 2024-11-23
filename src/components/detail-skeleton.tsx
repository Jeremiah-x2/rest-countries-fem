import { Skeleton } from "./ui/skeleton";

export default function DetailSkeleton() {
  return (
    <div className="space-y-8 gap-20 lg:flex lg:justify-between lg:items-center lg:space-y-0 lg:w-full">
      <Skeleton className="w-full h-[220px] lg:h-[400px] object-cover max-w-[500px]" />
      <div className="space-y-8 lg:space-y-4 lg:flex-1 ">
        <Skeleton className="font-bold text-xl w-20 h-4" />
        <div className="space-y-8 lg:flex flex-1   lg:justify-between lg:items-start lg:space-y-0 lg:pr-12">
          <ul className="space-y-3">
            <li>
              <span className="font-semibold">Native Name:</span>{" "}
              <Skeleton className="text-lightModeInput h-3 w-16" />
            </li>
            <li>
              <span className="font-semibold">Population:</span>{" "}
              <Skeleton className="text-lightModeInput h-3 w-16" />
            </li>
            <li>
              <span className="font-semibold">Region:</span>{" "}
              <Skeleton className="text-lightModeInput h-3 w-16" />
            </li>
            <li>
              <span className="font-semibold">Sub Region:</span>{" "}
              <Skeleton className="text-lightModeInput h-3 w-16" />
            </li>
            <li>
              <span className="font-semibold">Capital:</span>{" "}
              <Skeleton className="text-lightModeInput h-3 w-16" />
            </li>
          </ul>

          <ul className="space-y-3">
            <li>
              <span className="font-semibold">Top Level Domain:</span>{" "}
              <Skeleton className="text-lightModeInput h-3 w-16" />
            </li>
            <li>
              <span className="font-semibold">Currencies:</span>{" "}
              {new Array(3).fill(null).map((_item: null, i: number) => (
                <Skeleton className="text-lightModeInput h-3 w-16" key={i} />
              ))}
            </li>

            <li>
              <span className="font-semibold">Currencies:</span>{" "}
              {new Array(3).fill(null).map((_item: null, i: number) => (
                <Skeleton
                  className="text-lightModeInput h-3 w-16 inline-block"
                  key={i}
                />
              ))}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Border Countries:</h3>
          <div className="flex gap-4 flex-wrap">
            {new Array(3).fill(null).map((_item: null, i: number) => (
              <Skeleton className="text-lightModeInput h-3 w-16" key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
