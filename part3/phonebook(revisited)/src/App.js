import React, { useState, useEffect } from 'react'
import contactsService from './services/contacts'

//Import Components
import NewName from './components/NewName'
import DisplayContacts from './components/DisplayContacts'
import Search from './components/Search'
import Message from './components/Message'

const App = () => {
    
    //STATE:
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newSearch, setNewSearch ] = useState('')
    const [ message, setMessage] = useState({
      mes : '',
      err : ''
    })
    //END of STATE
    
    //EFFECT HOOK:
    useEffect(() => {
      contactsService
        .getAll()
        .then(contacts => setPersons(contacts))
    }
    ,[])
    //END of EFFECTS

    return (
      <div>
        <h2>Phonebook</h2>

        <Message message = {message}/>

        <Search 
          newSearch = {newSearch} 
          setNewSearch = {setNewSearch}
        />
        
        <NewName 
          persons = {persons}
          setPersons = {setPersons}
          newName = {newName}
          setNewName = {setNewName}
          newNumber = {newNumber}
          setNewNumber = {setNewNumber}
          setMessage = {setMessage}
        /> 
        
        <DisplayContacts 
          persons = {persons}
          setPersons = {setPersons}
          newSearch = {newSearch}
          setMessage = {setMessage}
        />
      </div>
    )
  }
  
  export default App