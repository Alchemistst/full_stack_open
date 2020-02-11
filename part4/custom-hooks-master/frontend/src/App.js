import React, { useState, useEffect, useCallback} from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const fetchAll = useCallback(() =>{
    axios
    .get(`${baseUrl}/`)
    .then(res => {
      console.log(res.data)
      setResources(res.data)})
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(`${baseUrl}/`, resource)
      .then(res => fetchAll())
  }

  useEffect(() => {
    fetchAll()
  },[fetchAll])

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')


  const [notes, noteService] = useResource('http://localhost:3005/api/notes')
  const [persons, personService] = useResource('http://localhost:3005/api/phonebook')


  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ note: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.note}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App