import { useState, useEffect } from 'react'
import personService from './services/personService'

const Person = ( props ) => {  
  return (    
    <li>
      {props.person.name} {props.person.number}
    </li>  
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person} />        
      )}
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNameChange}
        /> 
      </div>
      <div>
        number: 
        <input 
          value={newNumber}
          onChange={handleNumberChange}
        /> 
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])
  
  const personObject = {
    name: newName,
    number: newNumber,
    id: persons.length + 1,
  }
 
  const addPerson = (event) => {    
    event.preventDefault()    
    

    if (!persons.find(person => person.name === newName)) {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))      
          setNewName('')
          setNewNumber('') 
        })
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App