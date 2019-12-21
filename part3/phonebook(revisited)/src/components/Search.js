import React from 'react';
import handleTyping from '../helpers/handleTyping'

//Search component allows searching the phonebook. This component sends DisplayContacts component the value for displaying just the searched values.

const Search = ({newSearch,  setNewSearch}) =>{
    return(
      <div>
        Search: <input value={newSearch} onChange={(e) => handleTyping(setNewSearch, e)}/>
      </div>
    )
}

export default Search