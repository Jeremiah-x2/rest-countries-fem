import AddComment from "@/components/add-comment";
import BackButton from "@/components/back-button";
import CommentCard from "@/components/comment-card";
import DetailSkeleton from "@/components/detail-skeleton";
import { supabase } from "@/config/supabase";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export default function CountryDetailPage() {
  const { countryName }: { countryName?: string } = useParams();
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["country", countryName],
    queryFn: async () => {
      const country = await supabase
        .from("countries")
        .select("*")
        .or(`name.eq.${countryName},alpha3Code.eq.${countryName}`)
        .single();
      return country;
    },
  });
  const { data: comment, refetch } = useQuery({
    queryKey: ["comments", countryName],
    queryFn: async () => {
      const comments = await supabase
        .from("comments")
        .select("*")
        .or(`country_name.eq.${countryName}`);
      return comments;
    },
    refetchInterval: 60 * 1000,
  });

  console.log("Comment", comment);

  console.log("Data", country);
  return (
    <main>
      <BackButton />
      <div className="mt-8 flex justify-center">
        {country && (
          <div className="space-y-8 gap-20 lg:flex lg:justify-between lg:items-center lg:space-y-0 lg:w-full">
            <img
              src={country.data.flags.svg}
              alt=""
              className="w-full h-[220px] lg:h-[400px] object-cover max-w-[500px] rounded-md shadow-lg"
            />
            <div className="space-y-8 lg:space-y-4 lg:flex-1 ">
              <h3 className="font-bold text-xl">{country.data.name}</h3>
              <div className="space-y-8 lg:flex flex-1   lg:justify-between lg:items-start lg:space-y-0 lg:pr-12">
                <ul className="space-y-3">
                  <li>
                    <span className="font-semibold">Native Name:</span>{" "}
                    <span className="text-lightModeInput">
                      {country.data.nativeName}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Population:</span>{" "}
                    <span className="text-lightModeInput">
                      {country.data.population}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Region:</span>{" "}
                    <span className="text-lightModeInput">
                      {country.data.region}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Sub Region:</span>{" "}
                    <span className="text-lightModeInput">
                      {country.data.subregion}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Capital:</span>{" "}
                    <span className="text-lightModeInput">
                      {country.data.capital}
                    </span>
                  </li>
                </ul>

                <ul className="space-y-3">
                  <li>
                    <span className="font-semibold">Top Level Domain:</span>{" "}
                    <span className="text-lightModeInput">
                      {country.data.topLevelDomain}
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Currencies:</span>{" "}
                    {country.data.currencies.map(
                      ({ name }: { name: string }, i: number) => (
                        <span className="text-lightModeInput" key={i}>
                          {name}
                        </span>
                      )
                    )}
                  </li>

                  <li>
                    <span className="font-semibold">Currencies:</span>{" "}
                    {country.data.languages.map(
                      ({ name }: { name: string }, i: number) => (
                        <span className="text-lightModeInput mr-1" key={i}>
                          {name}
                        </span>
                      )
                    )}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Border Countries:</h3>
                <div className="flex gap-4 flex-wrap ">
                  {country.data.borders?.map((item: string, i: number) => (
                    <Link
                      key={i}
                      to={`/country/${item}`}
                      className="bg-white dark:bg-darkBlue inline px-4 py-1 rounded-sm shadow-[0px_0px_8px_rgba(0,0,0,0.4)]"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading && <DetailSkeleton />}

        {isError && <div>An Error Occured</div>}
      </div>

      <div className="mt-8 max-w-[600px] mx-auto lg:flex lg:flex-row-reverse lg:max-w-full lg:gap-20 items-start">
        <div className="lg:w-1/2">
          <h4 className="font-semibold text-lg mb-3">
            People's view about this country
          </h4>
          <p>
            Do you have any thoughts, insights or question on this country.
            Share those thoughts with others
          </p>

          <div className="mt-6">
            {comment && comment.data?.length === 0 && (
              <p>Be the first to comment</p>
            )}
            {comment && comment.data?.length !== 0 && (
              <div>
                {comment.data?.map((comment, index) => (
                  <CommentCard
                    key={index}
                    comment={comment}
                    refetch={refetch}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/2">
          <AddComment countryName={countryName!} refetch={refetch} />
        </div>
      </div>
    </main>
  );
}
