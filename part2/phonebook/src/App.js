import React, { useState } from 'react'
import NewName from './components/NewName'
import DisplayContacts from './components/DisplayContacts'
import Search from './components/Search'

const App = () => {
    
    //STATE:
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas',number: '040-1234567'},
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122'}
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ newSearch, setNewSearch] = useState('')
    //END of STATE
    
    return (
      <div>
        <h2>Phonebook</h2>

        <Search 
          newSearch={newSearch} 
          setNewSearch={setNewSearch}
        />
        
        <NewName 
          persons = {persons}
          setPersons = {setPersons}
          newName = {newName}
          setNewName = {setNewName}
          newNumber = {newNumber}
          setNewNumber = {setNewNumber}
        /> 
        
        <DisplayContacts 
          persons= {persons}
          newSearch= {newSearch}
        />
      </div>
    )
  }
  
  export default App