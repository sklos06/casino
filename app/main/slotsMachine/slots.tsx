'use client'
import React, { useState } from "react";
import styles from "./slots.module.css";

function Slots() {

    enum Symbols {
        Cherry = "Cherry",
        Lemon = "Lemon",
        Orange = "Orange",
        Plum = "Plum",
        Bell = "Bell",
        Star = "Star",
        Seven = "Seven",
    }

    const getRandomSymbol = (): Symbols => {
        const values = Object.values(Symbols);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex] as Symbols;
    };


    const [reels, setReels] = useState<Symbols[]>([
        Symbols.Cherry,
        Symbols.Cherry,
        Symbols.Cherry,
    ]);


    function handlePlay() {
        const newReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
        console.log(reels);
        setReels(newReels);
    }

    return (
        <div className={styles.page}>
            <div className={styles.reels}>
                <div className={styles.reel}>{reels[0]}</div>
                <div className={styles.reel}>{reels[1]}</div>
                <div className={styles.reel}>{reels[2]}</div>
            </div>
            <button className={styles.button} onClick={handlePlay}>
                PLAY
            </button>
        </div>
    );
}

export default Slots;
