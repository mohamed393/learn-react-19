import Header from "./components/Header.tsx";
import SearchCity from "./components/SearchCity.tsx";
import {useEffect, useState} from "react";
import type {CityData} from "./types/cityData.ts";
import WeatherCard from "./components/WeatherCard.tsx";

function App() {
const [cities,setCities]=useState<CityData[]>([]);
  const handelAddCity=(city:CityData)=>{
     setCities(prevCities => [...prevCities, city]);
  }
  const handelRemoveCity=(id:number)=>{
    const newCities = cities.filter(el=>el.id!==id);
    setCities(newCities);
  }
  const touchCities=()=>{
    let citiesCopy:CityData[]=[...cities];
    citiesCopy=citiesCopy.map(city=>({...city,updatedAt:new Date().toISOString()}))
    setCities(citiesCopy);
  }
  useEffect(() => {
    const interval =setInterval(()=>{
      touchCities()
    },5000);
    return ()=>clearInterval(interval)
  })
  return (
    <div className='px-8 py-6 flex flex-col gap-2'>
    <Header/>
      <SearchCity addCity={handelAddCity}/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {cities.length>0 &&cities.map(city=>(
          <WeatherCard city={city} key={city.id} removeCityCard={handelRemoveCity}/>
      ))}
      </div>

    </div>
  )
}

export default App
