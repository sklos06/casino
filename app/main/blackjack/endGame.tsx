import { useState, useEffect } from 'react';
import styles from './blackjack.module.css';

interface EndGameProps {
    text: string,
    onMount: (showEndGame: () => void) => void;
}

export default function EndGame(props : EndGameProps) {
    const [show, setShow] = useState<boolean>(false);
    const showEndGame = () => {
        setShow(true);
        console.log("dsadsa");
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };
    useEffect(() => {
        props.onMount(showEndGame);
    }, [props]);
    return (
        <>
            {show && (
                <div className={styles.notification}>
                    {props.text}
                </div>
            )}
        </>
    );
}
