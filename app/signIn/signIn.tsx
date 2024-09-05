'use client'
import React, {useState} from 'react';
import styles from './signIn.module.css'
import { useRouter } from 'next/navigation';

type LogIn = {
    username: string,
    password: string
}

function SignIn() {
    const [user, setUser] = useState<LogIn>({
        username: '',
        password: ''
    })
    // const  [userData, setUserData] = useState<User>({
    //     name:"Guest",
    //     money: 10000
    // })

    function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        const {name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Użytkownik został pomyślnie zalogowany.');
                const data = await response.json();

                if (data.redirectUrl) {
                    router.push(data.redirectUrl);
                }
            } else {
                const errorData = await response.json();
                console.log(`Błąd: ${errorData.error}`);
            }
        } catch (error) {
            console.log('Wystąpił błąd podczas logowania.');
        }
    };

    return (
        <main>
            <section className={styles.page}>
                <form onSubmit={handleSubmit} action="POST" className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:
                            <span className={styles.required}>*</span>
                        </label>
                        <input type="text" id="username" name="username" value={user.username} onChange={handleInput}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:
                            <span className={styles.required}>*</span>
                        </label>
                        <input type="password" id="password" name="password" value={user.password}
                               onChange={handleInput}/>
                    </div>
                    <input type="submit" value="Sign in" className={styles.btn}/>
                </form>
            </section>
        </main>
    );
}

export default SignIn;