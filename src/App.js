import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Library } from './components/Library/Library'
import { Learn } from './components/Learn/Learn';
import { Games } from './components/Games/Games';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { WriteIt } from './components/Games/AppGames/WriteIt';
import { CheckIt } from './components/Games/AppGames/CheckIt';

export const App = () => {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const [playWords, setPlayWords] = useState(library.slice(-10));
  const [correctWords, setCorrectWords] = useState(0);
  const [errorWords, setErrorWords] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setPoints(points + correctWords)
  }, [correctWords])

  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word);
    speakInstance.voice = speechSynthesis.getVoices()[1]
    speechSynthesis.speak(speakInstance)
  }  
  return (
    <div>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/library' element={
            <Library library={library} 
                      setLibrary={setLibrary} 
            />
          } />
          <Route path='/games' element={<Games />} />
          <Route path='/game/write-it' element={
            <WriteIt library={library} 
                      playWords={playWords} 
                      wordIndex={wordIndex} 
                      setWordIndex={setWordIndex}
                      correctWords={correctWords}
                      setCorrectWords={setCorrectWords}
                      errorWords={errorWords}
                      setErrorWords={setErrorWords}
                      points={points}
                      speak={speak} 
            />
          } />
          <Route path='/game/check-it' element={
            <CheckIt library={library} 
                      playWords={playWords} 
                      wordIndex={wordIndex} 
                      setWordIndex={setWordIndex}
                      correctWords={correctWords}
                      setCorrectWords={setCorrectWords}
                      errorWords={errorWords}
                      setErrorWords={setErrorWords}
                      points={points}
                      speak={speak} 
            />
          } />
          <Route path='/learn' element={
            <Learn speak={speak} 
                    library={library} 
                    wordIndex={wordIndex} 
                    setWordIndex={setWordIndex} 
            />
          } />
        </Routes>

      </BrowserRouter>  
    </div>
  );
}

