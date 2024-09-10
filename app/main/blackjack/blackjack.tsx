'use client'
import React, {useState, useEffect} from 'react';
import styles from './blackjack.module.css'
import {func} from "prop-types";

function Blackjack() {

    type Card = {
        img: string;
        value: number;
    }
    type Hand = {
        cards: Card[],
        totalValue: number
    }

    interface Player {
        username: string,
        money: number
    }

    const [text, setText] = useState<string>("PLAY");
    const basicDeck: Card[] = [
        {img: 'ace-club.png', value: 11},
        {img: 'ace-diamond.png', value: 11},
        {img: 'ace-heart.png', value: 11},
        {img: 'ace-spade.png', value: 11},
        {img: 'king-club.png', value: 10},
        {img: 'king-diamond.png', value: 10},
        {img: 'king-heart.png', value: 10},
        {img: 'king-spade.png', value: 10},
        {img: 'queen-club.png', value: 10},
        {img: 'queen-diamond.png', value: 10},
        {img: 'queen-heart.png', value: 10},
        {img: 'queen-spade.png', value: 10},
        {img: 'jack-club.png', value: 10},
        {img: 'jack-diamond.png', value: 10},
        {img: 'jack-heart.png', value: 10},
        {img: 'jack-spade.png', value: 10},
        {img: 'ten-club.png', value: 10},
        {img: 'ten-diamond.png', value: 10},
        {img: 'ten-heart.png', value: 10},
        {img: 'ten-spade.png', value: 10},
        {img: 'nine-club.png', value: 9},
        {img: 'nine-diamond.png', value: 9},
        {img: 'nine-heart.png', value: 9},
        {img: 'nine-spade.png', value: 9},
        {img: 'eight-club.png', value: 8},
        {img: 'eight-diamond.png', value: 8},
        {img: 'eight-heart.png', value: 8},
        {img: 'eight-spade.png', value: 8},
        {img: 'seven-club.png', value: 7},
        {img: 'seven-diamond.png', value: 7},
        {img: 'seven-heart.png', value: 7},
        {img: 'seven-spade.png', value: 7},
        {img: 'six-club.png', value: 6},
        {img: 'six-diamond.png', value: 6},
        {img: 'six-heart.png', value: 6},
        {img: 'six-spade.png', value: 6},
        {img: 'five-club.png', value: 5},
        {img: 'five-diamond.png', value: 5},
        {img: 'five-heart.png', value: 5},
        {img: 'five-spade.png', value: 5},
        {img: 'four-club.png', value: 4},
        {img: 'four-diamond.png', value: 4},
        {img: 'four-heart.png', value: 4},
        {img: 'four-spade.png', value: 4},
        {img: 'three-club.png', value: 3},
        {img: 'three-diamond.png', value: 3},
        {img: 'three-heart.png', value: 3},
        {img: 'three-spade.png', value: 3},
        {img: 'two-club.png', value: 2},
        {img: 'two-diamond.png', value: 2},
        {img: 'two-heart.png', value: 2},
        {img: 'two-spade.png', value: 2}
    ];
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Hand>({
        cards: [],
        totalValue: 0
    })
    const [croupierHand, setCroupierHand] = useState<Hand>({
        cards: [],
        totalValue: 0
    })
    const [initialized, setInitialized] = useState<boolean>(false);
    const [isStopped, setIsStoppped] = useState<boolean>(false);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>({
        username: "Guest",
        money: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/playerData', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setPlayer({
                        money: data.money,
                        username: data.username,
                    });
                } else {
                    const errorData = await response.json();
                    console.log(`Błąd: ${errorData.error}`);
                }
            } catch (error) {
                console.log('Wystąpił błąd podczas pobierania punktów.');
            }
        };
        fetchData();

    }, []);
    useEffect(() => {
        if (startGame) {
            setDeck(basicDeck);
            setPlayerHand({
                cards: [],
                totalValue: 0
            });
            setCroupierHand({
                cards: [],
                totalValue: 0
            })
            setIsStoppped(false);
            setInitialized(true);
            setStartGame(false);
        }
    }, [startGame])

    function getRandomCard<T>(cards: T[]): T {
        const randomIndex: number = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
    }

    function handleHit(): void {
        if (deck.length > 0 && !(isStopped)) {
            const newCard: Card = getRandomCard(deck);
            setPlayerHand(p => {
                const newTotalValue: number = p.totalValue + newCard.value;
                return {
                    cards: [...p.cards, newCard],
                    totalValue: newTotalValue
                };
            });
            setDeck(d => d.filter(card => card !== newCard));
        }
    }


    useEffect(() => {
        if (initialized) {
            if (deck.length > 0) {
                const initialCard: Card = getRandomCard(deck);
                setCroupierHand(c => {
                    const newTotalValue: number = c.totalValue + initialCard.value;
                    return {
                        cards: [initialCard],
                        totalValue: newTotalValue
                    };
                });
                setDeck(d => d.filter(card => card !== initialCard));
            }
            handleHit()
            handleHit()
            setInitialized(false);
        }
    }, [initialized]);

    function croupierTurn(): void {
        if (deck.length > 0 && croupierHand.totalValue <= playerHand.totalValue && croupierHand.totalValue < 17) {
            const newCard: Card = getRandomCard(deck);
            setCroupierHand(c => {
                const newTotalValue: number = c.totalValue + newCard.value;
                return {
                    cards: [...c.cards, newCard],
                    totalValue: newTotalValue
                };
            });
            setDeck(d => d.filter(card => card !== newCard));
        }
    }

    function handleStand(): void {
        setIsStoppped(true);
        if (!(isStopped)) croupierTurn();
    }

    useEffect(() => {
        if (playerHand.totalValue > 21) {
            setIsStoppped(true);
            console.log("YOU LOST");
        } else if (playerHand.totalValue === 21) {
            console.log("BLACKJACK");
            setIsStoppped(true);
            croupierTurn();
        }
    }, [playerHand]);

    useEffect(() => {
        if (croupierHand.cards.length > 1 && croupierHand.totalValue < playerHand.totalValue && croupierHand.totalValue < 17) {
            setTimeout(croupierTurn, 1000);
        }
        if (croupierHand.totalValue > playerHand.totalValue && croupierHand.totalValue <= 21) {
            console.log("YOU LOST!");
        } else if (croupierHand.totalValue === playerHand.totalValue && croupierHand.totalValue === 21) {
            console.log("DRAW!");
        } else if ((croupierHand.totalValue < playerHand.totalValue && croupierHand.totalValue >= 17) || croupierHand.totalValue > 21) {
            console.log("YOU WON!");
        }
    }, [croupierHand]);

    function handlePlay(): void {
        setStartGame(true);
        setText("PLAY AGAIN");
    }

    return (
        <div className={styles.blackjackPage}>
            <header>
                <p>{player.username}</p>
                <p>Your money: {player.money}</p>
            </header>
            <main>
                <div className={styles.table}>
                    <div className={styles.hand}>
                        <div className={styles.cards}>
                            {croupierHand.cards.map((card, index) => (
                                card ? (
                                    <img
                                        key={index}
                                        alt={card.img}
                                        className={styles.card}
                                        src={`/images/cards/${card.img}`}
                                    />
                                ) : null
                            ))}
                        </div>
                        <div className={styles.totalValue}>{croupierHand.totalValue}</div>
                    </div>
                    <div className={styles.hand}>
                        <div className={styles.totalValue}>{playerHand.totalValue}</div>
                        <div className={styles.cards}>
                            {playerHand.cards.map((card, index) => (
                                card ? (
                                    <img
                                        key={index}
                                        alt={card.img}
                                        className={styles.card}
                                        src={`/images/cards/${card.img}`}
                                    />
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.btn} onClick={handleHit}>HIT</button>
                    <button className={styles.btn} onClick={handleStand}>STAND</button>
                    <button className={styles.btn}>DOUBLE DOWN</button>
                    <button className={styles.btn} onClick={handlePlay}>{text}</button>
                </div>
            </main>
        </div>
    );
}

export default Blackjack;