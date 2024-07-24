'use client'
import React, {useState} from 'react';
import styles from './signIn.module.css'

type LogIn = {
    username: string,
    password: string
}

function SignIn() {
    const [user, setUser] = useState<LogIn>({
            username: '',
            password: ''
        })

    function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        const {name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }


    return (
        <section className={styles.page}>
            <form action="POST" className={styles.form}>
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
                    <input type="password" id="password" name="password" value={user.password} onChange={handleInput}/>
                </div>
                <input type="submit" value="Sign in" className={styles.btn}/>
            </form>
        </section>
    );
}

export default SignIn;