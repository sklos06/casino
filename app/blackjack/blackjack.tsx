import React from 'react';
import styles from './blackjack.module.css'

function Blackjack() {
    const [c]
    return (
        <main className={styles.blackjackPage}>
            <div className={styles.table}>
                <div className={styles.cards}>

                </div>
                <div className={styles.cards}>

                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.btn}>HIT</button>
                <button className={styles.btn}>STAND</button>
                <button className={styles.btn}>DOUBLE DOWN</button>
                <button className={styles.btn}>PLAY AGAIN</button>
            </div>
        </main>
    );
}

export default Blackjack;