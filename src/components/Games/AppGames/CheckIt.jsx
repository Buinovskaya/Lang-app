import React, { useEffect, useState, useMemo} from "react";
import { NavLink } from "react-router-dom";
import classes from './AppGames.module.css'
import styles from '../../../App.module.css'
import { ProgressBar } from "../../ProgressBar/ProgressBar";

export const CheckIt = ({playWords, wordIndex, setWordIndex, library, correctWords, setCorrectWords, errorWords, setErrorWords, points, speak}) => {
    
    const [currentWords, setCurrentWords] = useState(['random', 'correct', 'random2']);
    const randomWords = useMemo(() => playWords.sort(() => Math.random() - 0.5), [])
    


    useEffect(() => {
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex + 1)%randomWords.length].word,
            randomWords[(wordIndex + 2)%randomWords.length].word,
        ].sort(() => Math.random() - 0.5))
    }, [correctWords])

    const checkWord = (word) => {
        if (word === randomWords[wordIndex].word) {
            speak(randomWords[wordIndex].translate)
            setCorrectWords(correctWords + 1)
            if(wordIndex !== playWords.length - 1){
                setWordIndex(wordIndex + 1)
            } else{
                alert('Game is over');
            } 
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
                <span>choose this word</span>
                <h3>{randomWords[wordIndex].word}</h3>
                <ul className={classes.btnContainer}>
                    {currentWords.map((word,index) => (
                        <li className={classes.btnCheck} onClick={() => checkWord(word)}>{word}</li>
                    ))}

                </ul>
            </section>
        </div>
        
    )
}