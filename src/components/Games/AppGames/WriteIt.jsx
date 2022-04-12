import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import classes from './AppGames.module.css'
import styles from '../../../App.module.css'
import { ProgressBar } from "../../ProgressBar/ProgressBar";

export const WriteIt = ({playWords, wordIndex, setWordIndex, library, correctWords, setCorrectWords, errorWords, setErrorWords, points, speak}) => {
    const input = useRef()
    const [randomWords, setRandomWords] = useState(playWords.sort(() => Math.random() - 0.5))

    const checkWord = (event) => {
        event.preventDefault();
        if (input.current.value === randomWords[wordIndex].translate) {
            speak(randomWords[wordIndex].translate)
            setCorrectWords(correctWords + 1)
            if(wordIndex !== playWords.length - 1){
                setWordIndex(wordIndex + 1)
            } else{
                alert('Game is over');
            } 
            input.current.value = '';
        } else {
            setErrorWords(errorWords + 1)
        }
    }
    return (
        <div>
            <ProgressBar library={library} wordIndex={wordIndex}/>
            <nav className={styles.gameNav}>
                <NavLink className={styles.btnBack} to='/games' />
                <ul className={styles.results}>
                    <li>Errors: {errorWords}</li>
                    <li>Correct: {correctWords}</li>
                    <li>Points: {points}</li>
                </ul>
            </nav>
            
            <section className={classes.gameContainer}>
                <span>Write a translation for this word</span>
                <h3>{randomWords[wordIndex].word}</h3>
                    <form onSubmit={checkWord} className={classes.writeWordBlock}>
                        <input ref={input} type='text' />
                        <button className={classes.btnOk}>OK</button>
                    </form>
            </section>
        </div>
        
    )
}