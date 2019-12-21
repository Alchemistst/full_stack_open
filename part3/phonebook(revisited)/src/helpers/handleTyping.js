//handleTyping updates the state of the variable assigned to the field as the user types
//Inputs=> setNew: method to change state / e:event object

const handleTyping = (setNew,e) => {
    setNew(e.target.value)
  }

  export default handleTyping