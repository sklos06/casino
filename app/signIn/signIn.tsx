'use client'
import React, {useState} from 'react';
import styles from './signIn.module.css'
import {useRouter} from 'next/navigation';
import 'boxicons/css/boxicons.min.css';



const SECRET_KEY = process.env.JWT_SECRET || 'admin';

type LogIn = {
    username: string,
    password: string
}
type User = {
    firstName: string,
    lastName: string,
    money: number
}

function SignIn() {
    const [user, setUser] = useState<LogIn>({
        username: '',
        password: ''
    })
    const [userData, setUserData] = useState<User>({
        firstName: 'Guest',
        lastName: 'Guest',
        money: 0
    })

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
        <main className={styles.page}>
            <section className={styles.wrapper}>
                <h2>Welcome!</h2>
                <form onSubmit={handleSubmit} action="POST" className={styles.form}>
                    <div className={styles.inputField}>
                        <input type="text" id="username" name="username" placeholder="Username" value={user.username} onChange={handleInput}
                               required/>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className={styles.inputField}>
                        <input type="password" id="password" name="password"  placeholder="Password" value={user.password}
                               onChange={handleInput} required/>
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <a href="#" className={styles.forgot}><p>Forgot password</p></a>
                    <input type="submit" value="Sign in" className={styles.btn}/>
                    <p>Do not have an account?<a href="#" className={styles.signUp}>sign up</a></p>
                </form>
            </section>
        </main>
    );
}

export default SignIn;