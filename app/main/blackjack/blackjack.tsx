'use client'
import React, {useState, useEffect, useRef} from 'react';
import styles from './blackjack.module.css'
import EndGame from "@/app/main/blackjack/endGame";

// Define the Blackjack component
function Blackjack() {

    // Type definitions for card and hand
    type Card = {
        img: string;   // Image path of the card
        value: number; // Value of the card in blackjack
    };

    type Hand = {
        cards: Card[];      // Array of card objects in the hand
        totalValue: number;
        aceCount: number;// Total value of the cards in hand
    };

    interface Player {
        username: string;   // Player's username
        money: number;      // Player's available money
    }

    // Initialize state variables
    const [deck, setDeck] = useState<Card[]>([]); // Deck of cards
    const [playerHand, setPlayerHand] = useState<Hand>({cards: [], totalValue: 0, aceCount: 0}); // Player's hand
    const [croupierHand, setCroupierHand] = useState<Hand>({cards: [], totalValue: 0, aceCount: 0}); // Dealer's hand
    const [initialized, setInitialized] = useState<boolean>(false); // Game initialization flag
    const [isStopped, setIsStopped] = useState<boolean>(false); // Game stop flag
    const [startGame, setStartGame] = useState<boolean>(false); // Start game flag
    const [player, setPlayer] = useState<Player>({username: "Guest", money: 0}); // Player data
    const [bet, setBet] = useState<number>(); // Bet amount
    const [newMoney, setNewMoney] = useState<number>(0); // Value of player's money after changes
    const isBet = useRef<boolean>(false);
    const multiplier = useRef<number>(1);
    const [endGameText, setEndGameText] = useState<string>("");
    const isDoubleDown = useRef(false);
    let endGameFunction: (() => void) | null = null;

    // Basic deck of cards (standard 52-card deck)
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

    const handleMount = (showEndGame: () => void) => {
        endGameFunction = showEndGame; // Przechowujemy funkcję showEndGame

    };
    // Fetch player data when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/playerData', {method: 'GET', credentials: 'include'});
                if (response.ok) {
                    const data = await response.json();
                    setPlayer({money: data.money, username: data.username});
                } else {
                    const errorData = await response.json();
                    console.log(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.log('Error fetching player data.');
            }
        };
        fetchData();
    }, []);


    // Start the game by resetting hands and deck when the "startGame" flag changes
    useEffect(() => {
        if (startGame) {
            setDeck(basicDeck); // Reset deck
            setPlayerHand({cards: [], totalValue: 0, aceCount: 0}); // Reset player hand
            setCroupierHand({cards: [], totalValue: 0, aceCount: 0}); // Reset dealer hand
            setIsStopped(false); // Reset stopped state
            setInitialized(true); // Set initialized to true
            setStartGame(false); // Reset start game flag
            isDoubleDown.current = false;
        }
    }, [startGame]);

    // Function to get a random card from the deck
    function getRandomCard<T>(cards: T[]): T {
        const randomIndex: number = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
    }

    // Remove card from deck
    const removeCardFromDeck = (card: Card) => {
        setDeck((prevDeck) => prevDeck.filter((c) => c !== card));
    };


    // Function to handle player "HIT" action
    function handleHit(): void {
        if (deck.length > 0 && !isStopped && playerHand.totalValue < 21) {
            const newCard: Card = getRandomCard(deck); // Get a random card from the deck

            setPlayerHand((prevHand) => {
                const newTotalValue:number = prevHand.totalValue + newCard.value;
                const newAceCount: number =  newCard.value==11 ? prevHand.aceCount + 1 : prevHand.aceCount;
                return {
                    cards: [...prevHand.cards, newCard],
                    totalValue: newTotalValue,
                    aceCount: newAceCount
                };
            });
            removeCardFromDeck(newCard);
        }
    }


    // Deal initial cards to the dealer and player when game is initialized
    useEffect(() => {
        if (initialized) {
            if (deck.length > 0) {
                // Give dealer an initial card
                const initialCard: Card = getRandomCard(deck);
                setCroupierHand((prevHand) => {
                    const newTotalValue = prevHand.totalValue + initialCard.value;
                    const newAceCount: number =  initialCard.value==11 ? prevHand.aceCount + 1 : prevHand.aceCount;
                    return {
                        cards: [...prevHand.cards, initialCard],
                        totalValue: newTotalValue,
                        aceCount: newAceCount
                    };
                });
                removeCardFromDeck(initialCard);
            }
            handleHit(); // Give player two initial cards
            handleHit();
            setInitialized(false); // Reset initialization flag
        }
    }, [initialized]);


    // Croupier (dealer) turn logic
    function croupierTurn(): void {
        if (deck.length > 0 && croupierHand.totalValue <= playerHand.totalValue && croupierHand.totalValue < 17) {

            const newCard: Card = getRandomCard(deck);
            setCroupierHand((prevHand) => {

                if((croupierHand.totalValue + newCard.value)>21){
                    while(croupierHand.aceCount>0 && (croupierHand.totalValue+newCard.value)>21){
                        prevHand.totalValue-=10;
                        prevHand.aceCount-=1;
                    }
                }
                let newTotalValue = prevHand.totalValue + newCard.value;
                let newAceCount: number =  newCard.value==11 ? prevHand.aceCount + 1 : prevHand.aceCount;

                return {
                    cards: [...prevHand.cards, newCard],
                    totalValue: newTotalValue,
                    aceCount: newAceCount
                };
            });
            removeCardFromDeck(newCard);
        }
    }

    // Handle player "STAND" action
    function handleStand(): void {
        setIsStopped(true); // Stop player actions
        if (!isStopped) croupierTurn(); // Dealer's turn
    }

    // Monitor player's hand for bust or blackjack
    useEffect(() => {

        if (playerHand.totalValue > 21) {
            if(playerHand.aceCount > 0){
                setPlayerHand(prevHand => ({
                    ...prevHand,
                    totalValue: prevHand.totalValue - 10,
                    aceCount: prevHand.aceCount - 1
                }));
            }else{
                setIsStopped(true);
                console.log("YOU LOST");
                setBet(undefined);
                setEndGameText("😢 You Lost 😢");

                isBet.current = false;
                console.log(playerHand);
                console.log(croupierHand);
                if (endGameFunction) {
                    endGameFunction();
                }
            }
        } else if (playerHand.totalValue === 21) {
            croupierTurn(); // Dealer's turn on player blackjack
        }
        if (isDoubleDown.current && playerHand.totalValue <= 21) {
            croupierTurn();
        }
    }, [playerHand]);

    // Check the result based on dealer's hand and player's hand
    useEffect(() => {
        if(croupierHand.aceCount > 0 && croupierHand.totalValue>21){
            setCroupierHand(prevHand => ({
                ...prevHand,
                totalValue: prevHand.totalValue - 10,
                aceCount: prevHand.aceCount - 1
            }));
        }else if (croupierHand.cards.length > 1 && croupierHand.totalValue < playerHand.totalValue && croupierHand.totalValue < 17) {

            setTimeout(croupierTurn, 1000); // Dealer hits again
        }
        // Win/Loss/Draw logic
        // Check if player has Blackjack
        else if (playerHand.cards.length === 2 && playerHand.totalValue === 21 && croupierHand.cards.length > 1) {
            // Check if dealer also has Blackjack
            if (croupierHand.cards.length === 2 && croupierHand.totalValue === 21) {
                console.log("DRAW! Both you and the dealer have Blackjack.");
                setEndGameText("PUSH!!!");
                setBet(undefined);
                console.log(playerHand);
                console.log(croupierHand);

                if (endGameFunction) {
                    endGameFunction();
                }
            } else if (croupierHand.totalValue >= 17) {
                console.log("BLACKJACK! YOU WON!");
                setEndGameText("🏆 You Win! 🏆");
                console.log(playerHand);
                console.log(croupierHand);

                setBet(undefined);
                if (endGameFunction) {
                    endGameFunction();
                }
                multiplier.current = 2.5;
                if (bet) {
                    setNewMoney(m =>
                        m + bet * multiplier.current
                    )
                }

            }
            isBet.current = false;
        }
        // Check if dealer has Blackjack
        else if (croupierHand.cards.length === 2 && croupierHand.totalValue === 21) {
            console.log("YOU LOST! Dealer has Blackjack.");
            setEndGameText("😢 You Lost 😢");
            console.log(playerHand);
            console.log(croupierHand);

            setBet(undefined);
            if (endGameFunction) {
                endGameFunction();
            }
            isBet.current = false;
        } else if (croupierHand.totalValue > playerHand.totalValue && croupierHand.totalValue <= 21) {
            console.log("YOU LOST!");
            setEndGameText("😢 You Lost 😢");
            console.log(playerHand);
            console.log(croupierHand);

            setBet(undefined);
            if (endGameFunction) {
                endGameFunction();
            }
            isBet.current = false;
        } else if (croupierHand.totalValue === playerHand.totalValue && croupierHand.totalValue !== 0 && croupierHand.totalValue >= 17) {
            console.log("DRAW!");
            setEndGameText("PUSH!!!");
            console.log(playerHand);
            console.log(croupierHand);

            setBet(undefined);
            if (endGameFunction) {
                endGameFunction();
            }
            if (bet) {
                setNewMoney(m => m + bet);
            }
            isBet.current = false;
        } else if ((croupierHand.totalValue < playerHand.totalValue && croupierHand.totalValue >= 17) || croupierHand.totalValue > 21) {
            console.log("YOU WON!");
            setEndGameText("🏆 You Win! 🏆");
            console.log(playerHand);
            console.log(croupierHand);

            setBet(undefined);
            if (endGameFunction) {
                endGameFunction();
            }
            multiplier.current = 2;
            if (bet) {
                setNewMoney(m =>
                    m + bet * multiplier.current
                )
            }

            isBet.current = false;
        }
    }, [croupierHand]);


    // Handle bet input change
    function handleBetInput(event: React.ChangeEvent<HTMLInputElement>): void {
        if (!isBet.current) {
            const stake: number = Number(event.target.value);
            setBet(stake); // Set the bet amount
        }
    }


    // Place a bet and deduct money from player's balance
    function handleBet(): void {

        if (bet && !isBet.current) {
            if (bet <= 0) {
                console.log("Bet must be a positive amount.");
            } else if (bet > player.money) {
                console.log("You can't bet more than you have.");
            } else {
                setStartGame(true);
                setNewMoney(player.money - bet); // Deduct bet from player's money
                isBet.current = true;
            }
        }


    }

    // Update player's money on the server
    const updateMoney = async () => {
        try {
            const response = await fetch('/api/playerData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: player.username, money: newMoney})
            });
            if (response.ok) {
                console.log('Successfully updated user balance');
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.log(`Error updating player balance. ${error}`);
        }
    };
    // Trigger update money when player's money changes
    useEffect(() => {
        if (newMoney !== 0) {
            setPlayer((prevPlayer) => {
                return {...prevPlayer, money: newMoney};
            });
            updateMoney();
        }
    }, [newMoney]);


    function handleDoubleDown(): void {
        if (bet) {
            isDoubleDown.current = true;
            setNewMoney(player.money - bet);
            handleHit();
        }
        setBet((prevBet) => {
            if (prevBet && isBet.current) {
                return prevBet * 2;
            }
        });

    }

    // JSX rendering the game UI
    return (
        <>
            <div className={styles.blackjackPage}>
                <header className={styles.userData}>
                    <p>User: {player.username}</p>
                    <p>Your money: {player.money}</p>
                    <p>Bet: {bet}</p>
                </header>
                <main>
                    <div className={styles.table}>
                        {playerHand.cards.length ?
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
                            : null
                        }
                        {playerHand.cards.length ?
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
                            : null
                        }
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.btn} onClick={handleHit}>HIT</button>
                        <button className={styles.btn} onClick={handleStand}>STAND</button>
                        <button className={styles.btn} onClick={handleDoubleDown}>DOUBLE DOWN</button>
                    </div>
                    <div className={styles.buttonsBet}>
                        <input className={styles.input} type="number" value={bet ?? ""} onChange={handleBetInput}
                               placeholder="0"/>
                        <button className={styles.btn} onClick={handleBet}>BET</button>
                    </div>
                </main>
            </div>
            <EndGame text={endGameText} onMount={handleMount}/>
        </>
    );
}

export default Blackjack;