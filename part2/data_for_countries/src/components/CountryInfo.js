import React, {useEffect} from 'react'
import axios from 'axios'

//CountryInfo component displays information about last only country on FilteredCountries. 

const CountryInfo = ({country, weather, setWeather}) =>{
    
    const parsedName = country.capital.replace(' ', '%20') //Preparing country name for url
    
    //Effect for http request
    useEffect(() => {
        axios
            .get("http://api.weatherstack.com/current?access_key=2de2385f5a2a84eefb93047160eeabbc&query="+parsedName)
            .then(res => {setWeather(res.data)})
        }
        ,[parsedName, setWeather])
    
    //When request is fullfiled, all the data is rendered
    let renderWeather = []

    if (weather.length !== 0){
        renderWeather = 
        <div>
            <h2>Weather in {country.capital}</h2>
            <p><b>Temperature: </b>{weather.current.temperature} Celsius</p>
            <p><img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/></p>
            <p><b>Wind: </b> {weather.current.wind_speed} Km/h direction {weather.current.wind_dir}</p>
        </div>
    } else {
        //If request is not yet completed, show user the status
        renderWeather =
        <div>
            Loading weather info...
        </div>
    }

    return(
        <div>
            
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            
            <h2>Laguages</h2>
            <ul>
                {country.languages.map(
                    lang => <li key={lang.name}>{lang.name}</li>
                )}
            </ul>
            <img src={country.flag} alt={country.name}/>
            {renderWeather}
        </div>
        
    )
}

export default CountryInfo