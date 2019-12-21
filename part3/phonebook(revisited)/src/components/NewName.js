import React from 'react'
import contactsService from '../services/contacts'
import handleTyping from '../helpers/handleTyping'

//NewName components provides functionality for creating new contacts.

const NewName = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage}) =>{
    //handleSend updates the state of person so the newName typed is added
    const handleSend = (event) => {
      event.preventDefault()

      //Set new person
      const personObject = {
        name: newName,
        number: newNumber
      }


      //Updates contacts that already exist
      const match = persons.find(person => person.name === newName)
      if (match){
          if(window.confirm(`${newName} is already added to phonebook. Replace old number?`)){
            contactsService
            .updateNumber(match.id, personObject)
            .then(updatedPerson =>{
              //Updated person is added to the state
              const updatedPersons = [...persons]
              updatedPersons[persons.indexOf(match)] = updatedPerson
              setPersons(updatedPersons)
    
              //Restore defaults for fields
              setNewName('')
              setNewNumber('')

              //Notify user
              setMessage(
                {
                  mes : updatedPerson.name + " has been updated.",
                  err: 'message'
                })
              
              setTimeout(() =>
                setMessage('')
                , 5000
              )
            })
            .catch(err => {
              //Notify user
              setMessage(
                {
                  mes : err,
                  err: 'error'
                })
              
              setTimeout(() =>
                setMessage('')
                , 5000
              )
            })
          }
          return
      }

     
      //Send new person to server
      contactsService
        .newContact(personObject)
        .then(newPerson =>{
          //New person is added to the state
          setPersons(persons.concat(newPerson))

          //Restore defaults for fields
          setNewName('')
          setNewNumber('')

          //Notify user
          setMessage(
            {
              mes : newPerson.name + " has been added.",
              err: 'message'
            })
          
          setTimeout(() =>
            setMessage('')
            , 5000
          )
          
        })
        .catch(err => {
          setMessage(
            {
              mes: err.response.data.error,
              err: "error"
            }
          )
          setTimeout(() =>
            setMessage('')
            , 5000
          )
        })
      
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