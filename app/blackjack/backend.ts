type Card = {
    name: string;
    value: number;
}

const cardValues: Card[] = [
    {name: 'ace-club.png', value: 11},
    {name: 'ace-diamond.png', value: 11},
    {name: 'ace-heart.png', value: 11},
    {name: 'ace-spade.png', value: 11},
    {name: 'deck.png', value: 0},
    {name: 'eight-club.png', value: 8},
    {name: 'eight-diamond.png', value: 8},
    {name: 'eight-heart.png', value: 8},
    {name: 'eight-spade.png', value: 8},
    {name: 'five-club.png', value: 5},
    {name: 'five-diamond.png', value: 5},
    {name: 'five-heart.png', value: 5},
    {name: 'five-spade.png', value: 5},
    {name: 'four-club.png', value: 4},
    {name: 'four-diamond.png', value: 4},
    {name: 'four-heart.png', value: 4},
    {name: 'four-spade.png', value: 4},
    {name: 'jack-club.png', value: 10},
    {name: 'jack-diamond.png', value: 10},
    {name: 'jack-heart.png', value: 10},
    {name: 'jack-spade.png', value: 10},
    {name: 'king-club.png', value: 10},
    {name: 'king-diamond.png', value: 10},
    {name: 'king-heart.png', value: 10},
    {name: 'king-spade.png', value: 10},
    {name: 'nine-club.png', value: 9},
    {name: 'nine-diamond.png', value: 9},
    {name: 'nine-heart.png', value: 9},
    {name: 'nine-spade.png', value: 9},
    {name: 'queen-club.png', value: 10},
    {name: 'queen-diamond.png', value: 10},
    {name: 'queen-heart.png', value: 10},
    {name: 'queen-spade.png', value: 10},
    {name: 'seven-club.png', value: 7},
    {name: 'seven-diamond.png', value: 7},
    {name: 'seven-heart.png', value: 7},
    {name: 'seven-spade.png', value: 7},
    {name: 'six-club.png', value: 6},
    {name: 'six-diamond.png', value: 6},
    {name: 'six-heart.png', value: 6},
    {name: 'six-spade.png', value: 6},
    {name: 'ten-club.png', value: 10},
    {name: 'ten-diamond.png', value: 10},
    {name: 'ten-heart.png', value: 10},
    {name: 'ten-spade.png', value: 10},
    {name: 'three-club.png', value: 3},
    {name: 'three-diamond.png', value: 3},
    {name: 'three-heart.png', value: 3},
    {name: 'three-spade.png', value: 3},
    {name: 'two-club.png', value: 2},
    {name: 'two-diamond.png', value: 2},
    {name: 'two-heart.png', value: 2},
    {name: 'two-spade.png', value: 2}
];


function checkScore(cards: Card[]): number {
    let totalValue: number = 0;
    cards.forEach(card => {
        totalValue += card.value;
    });
    return totalValue;
}


function getRandomItem<T>(items: T[]): T {
    const randomIndex:number = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function getCard(cards:Card[]):Card{
    const card:Card = getRandomItem(cards);
    return card;
}