import React from 'react';
import handleTyping from '../helpers/handleTyping'


//NewName components provides functionality for creating new contacts.

const NewName = ({persons, setPersons, newName,setNewName,newNumber,setNewNumber}) =>{
    //handleSend updates the state of person so the newName typed is added
    const handleSend = (event) => {
      event.preventDefault()

      //Prevents contacts for being stored empty
      if (newName.length * newNumber.length === 0) return

      //Prevents storing contact that already exist
      if (persons.find(person => person.name === newName)){
          window.alert(`${newName} is already added to phonebook`)
          return
      }

      //Set new person
      const personObject = {
          name: newName,
          number: newNumber
      }
      setPersons(persons.concat(personObject))

      //Restore defaults for fields
      setNewName('')
      setNewNumber('')
  }

  return(
    <div>
      <h2>Add new</h2>
      <form>
            <div>
              Name: <input value={newName} onChange={(e) => handleTyping(setNewName, e)}/>
            </div>
            <div>
              Number: <input value={newNumber} onChange={(e) => handleTyping(setNewNumber, e)}/>
            </div>
            <div>
              <button type="submit" onClick={handleSend}>add</button>
            </div>
          </form>
    </div>
  )
}

export default NewName