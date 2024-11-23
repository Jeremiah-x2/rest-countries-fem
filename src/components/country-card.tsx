import { formatNumber } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area?: number; // Optional since some countries may not have an area
  timezones: string[];
  borders?: string[]; // Optional since some countries may not have borders
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  translations: {
    [key: string]: string; // Flexible structure for translations
  };
  flag: string;
  regionalBlocs?: {
    acronym: string;
    name: string;
  }[];
  cioc?: string; // Optional since not all countries have CIOC codes
  independent: boolean;
  gini?: number;
}

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      to={`/country/${country.name}`}
      className="w-[250px] h-[300px] dark:text-white dark:bg-darkBlue bg-white rounded-lg overflow-hidden shadow-[0_0_8px_-2px_rgba(0,0,0,0.5)]"
    >
      <div className="w-full h-[45%] bg-slate-500">
        <img
          src={country.flags.svg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" px-4 py-5 space-y-4">
        <h4 className="font-bold text-lg">{country.name}</h4>
        <div>
          <ul>
            <li>
              <span className="font-semibold">Population:</span>{" "}
              <span className="text-lightModeInput text-sm">
                {formatNumber(country.population)}
              </span>
            </li>
            <li>
              <span className="font-semibold">Region:</span>{" "}
              <span className="text-lightModeInput text-">
                {country.region}
              </span>
            </li>
            <li>
              <span className="font-semibold">Capital:</span>{" "}
              <span className="text-lightModeInput">{country.capital}</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
