export default function Menu (){

    let buttons:string[] = ["Blackjack", "Texas holdem", "Toss a coin", "Slot machine", "Roulette"]

    return (
        <div id="menu">
            <h1>CASINO VALHALLA</h1>
            <div>
                {buttons.map((button:string) => <input type="button" name={button} value={button}/>)}
            </div>
        </div>
 
    )
}