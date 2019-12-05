import React, {useState, useEffect} from 'react';
import axios from 'axios'

//Components
import SearchBox from './components/SearchBox'
import DisplayCountries from './components/DisplayCountries'


const App = () =>{
    //STATE
    const [search, setSearch] = useState('') //Holds search box state
    const [countries, setCountries] = useState([]) //Stores the result from requesting the list of countries.
    const [filteredCountries, setFilteredCountries] = useState([]) //Stores how many countries have been filtered.
    const [weather, setWeather] = useState([]) //Stores weather data when filteredCountries has just one country
    //END OF STATE
    
    //EFFECT HOOKS
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setCountries(res.data)
            })
            
    }, [])
    //END OF EFFECTS

    return(
        <div>
            <SearchBox 
                search={search} 
                setSearch={setSearch}
                countries={countries}
                setFilteredCountries={setFilteredCountries} 
            />
            <DisplayCountries 
                search={search}
                setSearch={setSearch} 
                filteredCountries={filteredCountries}
                setFilteredCountries={setFilteredCountries}
                weather={weather}
                setWeather={setWeather}
            /> 
        </div>
    )
}

export default App