import React from 'react'
import Text from './text'
import Emoji from './emoji'
import './index.css'
import { IoMdSend } from 'react-icons/io'


const App = () => {
  return(
    <main>
      <div className="app_container">
        <Text />
        <Emoji />
        <button>
          <IoMdSend />
        </button>
      </div>
    </main>
  )
}

export default App