'use client'
import React, {useEffect, useState} from 'react';
import styles from "./pokertexasholdem.module.css"


function Poker() {

    type Card = {
        img: string;
        value: number;
        suits: string
    }
    type Hand = {
        cards: Card[],
        hand: string;
    }

    // Przypisanie wartości do kart
    const basicDeck: Card[] = [
        {img: 'ace-club.png', value: 11, suits: `club`},
        {img: 'ace-diamond.png', value: 11, suits: `diamond`},
        {img: 'ace-heart.png', value: 11, suits: `heart`},
        {img: 'ace-spade.png', value: 11, suits: `spade`},
        {img: 'king-club.png', value: 10, suits: `club`},
        {img: 'king-diamond.png', value: 10, suits: `diamond`},
        {img: 'king-heart.png', value: 10, suits: `heart`},
        {img: 'king-spade.png', value: 10, suits: `spade`},
        {img: 'queen-club.png', value: 10, suits: `club`},
        {img: 'queen-diamond.png', value: 10, suits: `diamond`},
        {img: 'queen-heart.png', value: 10, suits: `heart`},
        {img: 'queen-spade.png', value: 10, suits: `spade`},
        {img: 'jack-club.png', value: 10, suits: `club`},
        {img: 'jack-diamond.png', value: 10, suits: `diamond`},
        {img: 'jack-heart.png', value: 10, suits: `heart`},
        {img: 'jack-spade.png', value: 10, suits: `spade`},
        {img: 'ten-club.png', value: 10, suits: `club`},
        {img: 'ten-diamond.png', value: 10, suits: `diamond`},
        {img: 'ten-heart.png', value: 10, suits: `heart`},
        {img: 'ten-spade.png', value: 10, suits: `spade`},
        {img: 'nine-club.png', value: 9, suits: `club`},
        {img: 'nine-diamond.png', value: 9, suits: `diamond`},
        {img: 'nine-heart.png', value: 9, suits: `heart`},
        {img: 'nine-spade.png', value: 9, suits: `spade`},
        {img: 'eight-club.png', value: 8, suits: `club`},
        {img: 'eight-diamond.png', value: 8, suits: `diamond`},
        {img: 'eight-heart.png', value: 8, suits: `heart`},
        {img: 'eight-spade.png', value: 8, suits: `spade`},
        {img: 'seven-club.png', value: 7, suits: `club`},
        {img: 'seven-diamond.png', value: 7, suits: `diamond`},
        {img: 'seven-heart.png', value: 7, suits: `heart`},
        {img: 'seven-spade.png', value: 7, suits: `spade`},
        {img: 'six-club.png', value: 6, suits: `club`},
        {img: 'six-diamond.png', value: 6, suits: `diamond`},
        {img: 'six-heart.png', value: 6, suits: `heart`},
        {img: 'six-spade.png', value: 6, suits: `spade`},
        {img: 'five-club.png', value: 5, suits: `club`},
        {img: 'five-diamond.png', value: 5, suits: `diamond`},
        {img: 'five-heart.png', value: 5, suits: `heart`},
        {img: 'five-spade.png', value: 5, suits: `spade`},
        {img: 'four-club.png', value: 4, suits: `club`},
        {img: 'four-diamond.png', value: 4, suits: `diamond`},
        {img: 'four-heart.png', value: 4, suits: `heart`},
        {img: 'four-spade.png', value: 4, suits: `spade`},
        {img: 'three-club.png', value: 3, suits: `club`},
        {img: 'three-diamond.png', value: 3, suits: `diamond`},
        {img: 'three-heart.png', value: 3, suits: `heart`},
        {img: 'three-spade.png', value: 3, suits: `spade`},
        {img: 'two-club.png', value: 2, suits: `club`},
        {img: 'two-diamond.png', value: 2, suits: `diamond`},
        {img: 'two-heart.png', value: 2, suits: `heart`},
        {img: 'two-spade.png', value: 2, suits: `spade`}
    ];
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerMainHand, setPlayerMainHand] = useState<Hand>({
        cards: [],
        totalValue: 0
    })
    const [tableCards, setTableCards] = useState<Hand>({
        cards: [],
        totalValue: 0
    })
    const [player1Hand, setPlayer1Hand] = useState<Hand>({
        cards: [],
        totalValue: 0
    })
    const [player2Hand, setPlayer2Hand] = useState<Hand>({
        cards: [],
        totalValue: 0
    })
    const [player3Hand, setPlayer3Hand] = useState<Hand[] | null>(null)

    function getRandomCard<T>(cards: T[]): T {
        const randomIndex: number = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
    }

    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        setDeck(basicDeck);
        setInitialized(true);
    }, []);

    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            if (initialized && deck.length > 0) {
                const initialCard: Card = getRandomCard(deck);
                setPlayerMainHand(p => ({
                    ...p,
                    cards: [...p.cards, initialCard],
                }));
                setDeck(d => d.filter(card => card !== initialCard));
            }
        }
    }, [initialized]);

    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            if (initialized && deck.length > 0) {
                const initialCard: Card = getRandomCard(deck);
                setTableCards(t => ({
                    ...t,
                    cards: [...t.cards, initialCard],
                }));
                setDeck(d => d.filter(card => card !== initialCard));
            }
        }
    }, [initialized]);

    return (
        <div className={styles.page}>
            <header>

            </header>
            <main>
                <div className={styles.tables}>
                    <div className={styles.cardsPlace}>
                        {tableCards.cards.map((card, index) => (
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
                    <div className={styles.hand}>
                            {playerMainHand.cards.map((card, index) => (
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
            </main>
        </div>
    );
}

export default Poker;