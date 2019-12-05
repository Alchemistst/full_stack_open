import React from 'react'

//SearchBox component provides a search box field and filters the countries based on search criteria.

const SearchBox = ({search, setSearch, countries, setFilteredCountries}) => {

    const handleSearchBox = (e) => {
        setSearch(e.target.value) //For updating search field
        
        //Filtering functionality
        const reg = new RegExp(e.target.value, "i")
        setFilteredCountries(countries.filter(country => reg.test(country.name)))
    }

    return(
        <div>
            Find countries <input value={search} onChange={(e) => handleSearchBox(e)} />
        </div>
    )
}

export default SearchBox
