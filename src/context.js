import React, { createContext, useEffect, useState, useCallback } from 'react'

export const AppContext = createContext()

const Context = ({children}) => {
  const [text, changeText] = useState("")
  const [searchBar, changeSearchBar] = useState("")
  const [emojis, changeEmojis] = useState([])
  const [emojisLoaded, changeEmojisLoaded] = useState(false)
  const [searchedEmojis, changeSearchedEmojis] = useState([])
  const [windowActive, changeWindowActive] = useState(false)
  const [scrollHeights, changeScrollHeights] = useState([])


  // for textarea
  const handleText = useCallback((e) => {
    changeText(e)
  },[text])

  // fetch searched emojis
  const getSearched = useCallback(async() => {
    try{
      const response = await fetch(`https://emoji-api.com/emojis?search=${searchBar}&access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336`)
      const jsoned = await response.json()
      changeSearchedEmojis(jsoned)
    } catch(error) {
      console.log(error)
    }
  }, [searchBar])


  // fetch all emojis, activates only first time you open the emoji box
  const getAllEmojis = async() => {
    try {
      const response_1 = await fetch("https://emoji-api.com/categories/smileys-emotion?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_1 = await response_1.json()

      const response_2 = await fetch("https://emoji-api.com/categories/animals-nature?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_2 = await response_2.json()

      const response_3 = await fetch("https://emoji-api.com/categories/food-drink?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_3 = await response_3.json()

      const response_4 = await fetch("https://emoji-api.com/categories/travel-places?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_4 = await response_4.json()

      const response_5 = await fetch("https://emoji-api.com/categories/objects?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_5 = await response_5.json()

      const response_6 = await fetch("https://emoji-api.com/categories/symbols?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_6 = await response_6.json()

      const response_7 = await fetch("https://emoji-api.com/categories/flags?access_key=6d6b7b3e408f0b249bc81dac46a38db918a26336")
      const jsoned_7 = await response_7.json()

      changeEmojis([jsoned_1, jsoned_2, jsoned_3, jsoned_4, jsoned_5, jsoned_6, jsoned_7])
      changeEmojisLoaded(true)
    } catch(error){
      console.log(error)
    }

  }

  // handle clicking, when you click anywhere outsid emojis box the function closes it
  const handleClick = (e) => {
    if (e.target.parentElement.dataset.id !== "emoji_box"){
      changeWindowActive(false)
      changeSearchBar("")
    }
  }

  // handle scroll, to calculate and know which group of emojis the scroll bar is at now
  const handleScroll = (e) => {
    if(scrollHeights){
      scrollHeights.forEach((element, index) => {
        const x = (element - scrollHeights[0]) - e.target.scrollTop
        if (x < 100 && x > -scrollHeights[index]) {
          document.getElementsByClassName("emojis_list_item")[0].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[1].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[2].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[3].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[4].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[5].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[6].style.color = "#808B96"
          document.getElementsByClassName("emojis_list_item")[index].style.color = "white"
        }
      });
    }
  }

  // handles scrolling into the emoji category you chose
  const handleScrollTo = (e) => {
    e.target.scrollIntoView()
  }

  const handleScrollList = (e) => {
    document.getElementsByClassName("emoji_inner_box")[0].scrollTo(0, (e - scrollHeights[0]))
  }

  // calculating getBoundingClientRect().y every time the window get resized, to get accurate numbers for scrollHeights 
  const handleResize = useCallback(() => {
    if (windowActive && emojisLoaded && searchBar.length === 0) {
      changeScrollHeights([
        document.getElementsByClassName("single_emojis_box_splitter")[0].getBoundingClientRect().y,
        document.getElementsByClassName("single_emojis_box_splitter")[1].getBoundingClientRect().y,
        document.getElementsByClassName("single_emojis_box_splitter")[2].getBoundingClientRect().y,
        document.getElementsByClassName("single_emojis_box_splitter")[3].getBoundingClientRect().y,
        document.getElementsByClassName("single_emojis_box_splitter")[4].getBoundingClientRect().y,
        document.getElementsByClassName("single_emojis_box_splitter")[5].getBoundingClientRect().y,
        document.getElementsByClassName("single_emojis_box_splitter")[6].getBoundingClientRect().y
      ]) 
    } else {
      changeScrollHeights(false)
    }
  },[emojisLoaded, windowActive, searchBar])


  // to increase/decrease number of rows in textarea
  useEffect(() => {
    const x = document.getElementsByClassName("text_input")[0]
    if (x.scrollHeight > x.offsetHeight && x.scrollHeight) {
      x.style.height = `${x.scrollHeight}px`
    } else {
      if (x.scrollHeight === x.clientHeight && x.clientHeight > 36) {
        x.style.height = `${x.scrollHeight - 22.4}px`
      }
    }
    if (x.value.length === 0) {
      x.style.height = "36px"
    }
  }, [handleText])

  // useEffect to fetch all emojis (only once)
  useEffect(() => {
    if(!emojisLoaded && windowActive){
      getAllEmojis()
    }
  }, [windowActive, emojisLoaded])

  // for searchbar emojis
  useEffect(() => {
    if (searchBar.length > 0 && windowActive) {
      getSearched()
    }
  }, [windowActive, searchBar, getSearched])

  // clicks event listener
  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  },[])

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  useEffect(() => {
    handleResize()
  },[windowActive, emojisLoaded, handleResize])


  return(
    <AppContext.Provider value={{
      text,
      changeText,
      handleText,
      emojis,
      emojisLoaded,
      searchedEmojis,
      windowActive,
      changeWindowActive,
      searchBar,
      changeSearchBar,
      handleScroll,
      handleScrollTo,
      handleScrollList,
      scrollHeights
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default Context