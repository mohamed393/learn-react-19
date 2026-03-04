import { useState } from "react";
import type { CityData, CityDataResponse } from "../types/cityData.ts";

type Props = {
  addCity: (city: CityData) => void;
};

export default function SearchCity({ addCity }: Props) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<CityData[]>([]);

  const handleAddCity = (city: CityData) => {
    addCity({ ...city, updatedAt: new Date().toISOString() });
    setQuery("");
    setCities([]);
  };

  const handelSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length<3){
        setCities([]);
        return
    }
    // trigger api call to fetch weather data for the city
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${newQuery}`,
    );
    const data: CityDataResponse = await response.json();
    setCities(data.results || []);
    // console.log('results',data.results)
  };
  return (
    <div>
      <input
        placeholder="Search for city"
        value={query}
        onChange={handelSearch}
        className="w-full p-2 border border-gray-300  rounded-md"
      />
      <div className="flex flex-col gap-2">
        {cities.map((city) => (
          <button
            key={city.id}
            type="button"
            onClick={() => handleAddCity(city)}
            className="w-full rounded-md border border-gray-300 p-2 text-left hover:bg-gray-100"
          >
            {city.name}, {city.country}
          </button>
        ))}
      </div>
    </div>
  );
}
