import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const DisplayCountries = ({search, setSearch, filteredCountries, setFilteredCountries, weather, setWeather}) => {
    
    const renderCountries = () => {
        //renderCountries handles how to show countries. 
        if(search === ''){
            //Default message to let the user know how to use it.
            return(<div>Use the search box to find info about countries.</div>)
        }else{            
            if(filteredCountries.length > 10){
                //When more than 10 countries match the search citeria.
                return(<div>Too many matches, specify your search.</div>)
            }else{
                if (filteredCountries.length > 1){
                    //When the search criteria leave a result between 1 and 10 countries. In this case each country name is shown with a show button next to it.
                    return(
                        filteredCountries.map(country => 
                            <Country 
                                key={country.name} 
                                name={country.name}
                                filteredCountries={filteredCountries}
                                setFilteredCountries={setFilteredCountries} 
                                setSearch={setSearch}
                            />)
                    )
                }else if (filteredCountries.length === 1){
                    //When theres just one country, the info for that country is displayed.
                    return(
                        <CountryInfo 
                            country={filteredCountries[0]}  
                            weather={weather}
                            setWeather={setWeather}
                        />)
                }else{
                    //For no matches with the search criteria
                    return(<div>No matches :'(</div>)
                }
            }
        }
    }

    return(
        <div>
            {renderCountries()}
        </div>
    )
}

export default DisplayCountries