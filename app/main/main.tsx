'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";

function Main() {
    const [money, setMoney] = useState<number | null>(null);

    useEffect(() => {
        const fetchMoney = async () => {
            try {
                const response = await fetch('/api/money', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setMoney(data.money);
                } else {
                    const errorData = await response.json();
                    console.log(`Błąd: ${errorData.error}`);
                }
            } catch (error) {
                console.log('Wystąpił błąd podczas pobierania punktów.');
            }
        };

        fetchMoney();
    }, []);
    return (
        <>
            <Link href={"./main/blackjack"}>
                <button>Blackjack</button>
            </Link>
            {money !== null ? <p>Your wallet: {money}</p> : <p>Loading...</p>}
        </>
    );
}

export default Main;