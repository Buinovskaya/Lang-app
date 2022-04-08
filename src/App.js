import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Library } from './components/Library/Library'
import { Learn } from './components/Learn/Learn';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './App.module.css'

export const App = () => {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const progressBarWidth ={
    width: `${(100 / library.slice(-10).length) * (wordIndex+1)}vw`
  }

  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word);
    speakInstance.voice = speechSynthesis.getVoices()[1]
    speechSynthesis.speak(speakInstance)
  }  
  console.log(speechSynthesis.getVoices())
  return (
    <div>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/library' element={<Library library={library} setLibrary={setLibrary} />} />
          <Route path='/learn' element={ 
          <React.Fragment>
             <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={progressBarWidth}></div> 
            </div>
            <Learn speak={speak} library={library} wordIndex={wordIndex} setWordIndex={setWordIndex} />
            <div onClick={() => {
              if(wordIndex === library.length - 1) {
                setWordIndex(0)
              }else{
                setWordIndex(wordIndex+1)
              }
              
            }} className={styles.btnNext}></div>
          </React.Fragment>} 
          />
        </Routes>

      </BrowserRouter>  
    </div>
  );
}

