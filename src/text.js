import React, { useContext } from 'react'
import { AppContext } from './context'

const Text = () => {
  const {text, handleText} = useContext(AppContext)

  return(
    <textarea 
      value={text} 
      onChange={e => handleText(e.target.value)} 
      className="text_input" 
      type="text" 
      placeholder="Message"
    />
  )
}

export default Text