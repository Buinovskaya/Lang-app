import React from "react";
import * as styles from './Dashboard.module.css'
import PlayButton from './../../assets/img/play.svg'

const Dashboard = () => {
    return (
        <section className={styles.default.dashboardContainer}>
            <div className={styles.default.gameBlock}>
                <p>The most popular game is <br />
                    <b>Sreak IT</b>
                </p>
                <img className={styles.default.btnPlay} src={PlayButton} alt="" />
                <button className={styles.default.btnRandom}>Play random game</button>
            </div>
            <div className={styles.default.pointsBlock}>
                <span>Common expierence</span>
                <h3>238 points</h3>
            </div>
            <div className={styles.default.levelBlock}>
                <span>level</span>
                <h3>7 level</h3>
                <p>Learn 750 new words in one course</p>

                <div className={styles.default.levelBackground}></div>
            </div>
        </section>
    )
}

export default Dashboard