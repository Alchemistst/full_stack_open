import React from 'react'

const Country = ({name, setSearch, filteredCountries, setFilteredCountries}) => {

    const instaFilter = () => {
        //instaFilter controls the action to take when pressing show button. filteredCountries is set immediately to one country so the country is displayed with CountryInfo
        setFilteredCountries(filteredCountries.filter((country)=>country.name === name))
        setSearch(name)
    }

    return(
        <div>
            {name} <button onClick={()=>instaFilter()}>Show</button>
        </div>
    )
}

export default Country