import React from 'react'
import Person from './Person'

//DisplayContacts renders the contacts according with the search field.

const DisplayContacts = ({persons, newSearch}) => {
  
    //renderNumbers renders all numbers if search field is empty. Renders matches if search field is being used.
    const renderNumbers = ()=> {
        
      if (newSearch === ''){
        return persons.map((person)=><Person key={person.name} name={person.name} number={person.number}/>)
      }else{
        let re = new RegExp(newSearch, 'i')
        let personsFiltered = persons.filter((person)=> re.test(person.name))
        return personsFiltered.map((person)=><Person key={person.name} name={person.name} number={person.number}/>)
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