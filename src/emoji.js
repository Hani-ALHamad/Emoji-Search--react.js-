import React, { useContext } from 'react'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import { AppContext } from './context'
import { FaSmile, FaLeaf, FaFlag, FaHeart, FaLightbulb } from 'react-icons/fa'
import { IoFastFood, IoAirplane } from 'react-icons/io5'


const Emoji = () => {
  const {
    windowActive, 
    changeWindowActive, 
    emojis, 
    searchedEmojis, 
    emojisLoaded, 
    searchBar, 
    changeSearchBar, 
    text, 
    changeText, 
    handleScroll, 
    handleScrollTo, 
    handleScrollList, 
    scrollHeights
  } = useContext(AppContext)

  return (
    <div data-id="emoji_box" className="emoji_main">
      <button data-id="emoji_box" onClick={() => changeWindowActive(!windowActive)}>
        <HiOutlineEmojiHappy data-id="emoji_box"/>
      </button>
      {windowActive ?
        <div className="emoji_box" data-id="emoji_box">
          <input 
            data-id="emoji_box" 
            type="text" 
            className="emoji_search" 
            placeholder="Search" 
            value={searchBar} 
            onChange={e => changeSearchBar(e.target.value)}
          />
          
          <div data-id="emoji_box" className="emoji_inner_box" onScroll={e => handleScroll(e)}>
          {emojisLoaded && searchBar.length === 0 ? 
          <>
            <div className="emojis_list" data-id="emoji_box">
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[0])}>
                <FaSmile data-id="emoji_box"/>
              </button>
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[1])}>
                <FaLeaf data-id="emoji_box"/>
              </button>
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[2])}>
                <IoFastFood data-id="emoji_box"/>
              </button>
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[3])}>
                <IoAirplane data-id="emoji_box"/>
              </button>
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[4])}>
                <FaLightbulb data-id="emoji_box"/>
              </button>
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[5])}>
                <FaHeart data-id="emoji_box"/>
              </button>
              <button className="emojis_list_item" data-id="emoji_box" onClick={e => handleScrollList(scrollHeights[6])}>
                <FaFlag data-id="emoji_box"/>
              </button>
            </div>

            <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
              <FaSmile data-id="emoji_box"/> &nbsp; Faces <span className="line" />
            </button>
            <div className="single_emojis_box" data-id="emoji_box">{emojis[0].map((item, index) =>(
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>  

              <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
                <FaLeaf data-id="emoji_box"/> &nbsp; Nature <span className="line" />
              </button>
              <div className="single_emojis_box" data-id="emoji_box">{emojis[1].map((item, index) => (
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>

              <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
                <IoFastFood data-id="emoji_box"/> &nbsp; Food <span className="line" />
              </button>
              <div className="single_emojis_box" data-id="emoji_box">{emojis[2].map((item, index) => (
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>

              <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
                <IoAirplane data-id="emoji_box"/> &nbsp; Travel <span className="line" />
              </button>
              <div className="single_emojis_box" data-id="emoji_box">{emojis[3].map((item, index) => (
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>

              <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
                <FaLightbulb data-id="emoji_box"/> &nbsp; Objects <span className="line" />
              </button>
              <div className="single_emojis_box" data-id="emoji_box">{emojis[4].map((item, index) => (
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>

              <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
                <FaHeart data-id="emoji_box"/> &nbsp; Symbols <span className="line" />
              </button>
              <div className="single_emojis_box" data-id="emoji_box">{emojis[5].map((item, index) => (
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>

              <button className="single_emojis_box_splitter" data-id="emoji_box" onClick={e => handleScrollTo(e)}>
                <FaFlag data-id="emoji_box"/> &nbsp; Flags <span className="line" />
              </button>
              <div className="single_emojis_box" data-id="emoji_box">{emojis[6].map((item, index) => (
              <button title={item.unicodeName} className="single_emoji" key={index} onClick={() => changeText(text + item.character)}>
                {item.character}</button>
            ))}</div>
          </>
            : emojisLoaded && searchBar.length > 0  && searchedEmojis !== null ?
                <div className="single_emojis_box" data-id="emoji_box">{searchedEmojis.map((item, index) => (
                <>{!item.parent ? 
                    <button title={item.unicodeName} 
                      className="single_emoji" 
                      key={index} 
                      onClick={() => changeText(text + item.character)}>
                        {item.character}
                    </button> 
                  : <></>}</>
              ))}</div>
          :
            <>
            <div className="loading">{searchedEmojis === null ? "No Results" : "Loading..."}</div>
            </>
        }
        </div>
      </div>
      :
      <></>
      }
    </div>
  )
}

export default Emoji