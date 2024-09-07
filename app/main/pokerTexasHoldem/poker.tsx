import React, {useState} from 'react';

function Poker() {
    type Card = {
        img: string;
        value: number;
    }
    type Hand = {
        cards: Card[],
        totalValue: number
    }
    type tableHand = {
        cards: Card[],
        value: number
    }
    // Przypisanie wartości do kart
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
    const [player3Hand, setPlayer3Hand] = useState<Hand>({
        cards: [],
        totalValue: 0
    })



    return (
        <div>test szymon noooo</div>
    );
}

export default Poker;