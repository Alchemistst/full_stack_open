import React from 'react'
import Person from './Person'
import contactsServices from '../services/contacts'

//DisplayContacts renders the contacts according with the search field.

const DisplayContacts = ({persons, setPersons, newSearch, setMessage}) => {
  
  const handleDelete = (person) =>{
    //When clicking a window pops up to tell the user to confirm the action. If confirmed, the contact is deleted.
    if (window.confirm(`Are you sure you want to delete '${person.name}'?`)) {
        contactsServices
            .deleteContact(person.id)
            .then(
                ()=>{
                    const match = persons.find(per => per === person)
                    //Deleted person is removed from the state
                    const updatedPersons = [...persons]
                    updatedPersons.splice(persons.indexOf(match),1)
                    
                    //Update state
                    setPersons(updatedPersons)

                    //Notify user
                    setMessage({
                      mes: person.name + " has been deleted.",
                      err: "message"
                    })

                    setTimeout(() =>
                    setMessage('')
                    , 5000)
                })
            .catch(err =>{
              //Notify user
              setMessage({
                mes: person.name + " has already been removed from server.",
                err: "error"
              })

              setTimeout(() =>
              setMessage('')
              , 5000)

            })
    }
  }

    //renderNumbers renders all numbers if search field is empty. Renders matches if search field is being used.
    const renderNumbers = ()=> {
      if (newSearch === ''){
        return persons.map((person)=><Person key={person.id} person={person} handleDelete={handleDelete}/>)
      }else{
        let re = new RegExp(newSearch, 'i')
        let personsFiltered = persons.filter((person)=> re.test(person.name))
        return personsFiltered.map((person)=><Person key={person.id} person={person} handleDelete={handleDelete}/>)
      }
    }
   
    return(
      <div>
        <h2>Contacts</h2>
        {renderNumbers()}
      </div>
      )   
}

export default DisplayContacts