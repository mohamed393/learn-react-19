import type {CityData} from "../types/cityData.ts";
import type {WeatherData} from "../types/weatherData.ts";
import {useEffect, useState} from "react";
import {getWeatherDescription} from "../utils/getWeatherCodeDescription.ts";
type Props = {
    city:CityData;
    removeCityCard:(id:number) => void;
}
export default function WeatherCard({city,removeCityCard}: Props) {
    const [weather,setWeather] = useState<WeatherData | null>(null);
    const fetchWeather = async () => {
        const response =await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
        const data:WeatherData=await response.json();
        setWeather(data);
    }
    useEffect(() => {
        fetchWeather();
    },[city.updatedAt])
    return (<div className='flex flex-col border border-gray-300 rounded-md p-2'>
        <div className='flex justify-between'>
        <h1>{city.name},{city.country}</h1>
            <div onClick={()=>removeCityCard(city.id)} className='cursor-pointer'>❎</div>
        </div>
         <p className='text-4xl font-bold'>{weather?.current_weather.temperature} {weather?.current_weather_units.temperature}</p>
        <p className='text-sm'>{getWeatherDescription(weather?.current_weather.weathercode??0)}</p>
        <p className='text-sm border border-gray-300 rounded-md p-2'>Wind{weather?.current_weather.windspeed}</p>
        <p className='text-xs text-gray-700'>Last Updated At {city?.updatedAt}</p>
    </div>)
}