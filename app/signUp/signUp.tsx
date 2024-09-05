'use client'
import React, {useState} from 'react';
import styles from './signUp.module.css'

type User = {
    username: string,
    password: string,
    repassword: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    country: string,
    city: string,
    address: string,
}

function SignUp() {

    const [user, setUser] = useState<User>({
        username: '',
        password: '',
        repassword: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        city: '',
        address: '',
    });

    function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        const {name, value} = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('Użytkownik został pomyślnie zarejestrowany.');
            } else {
                const errorData = await response.json();
                console.log(`Błąd: ${errorData.error}`);
            }
        } catch (error) {
            console.log('Wystąpił błąd podczas rejestracji.');
        }
    };

    return (
        <main>
            <section className={styles.page}>
                <form action="POST" className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.accData}>
                        <div className={styles.leftSide}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">E-mail:
                                    <span className={styles.required}>*</span>
                                </label>
                                <input type="text" id="email" name="email" value={user.email} onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="username">Username:
                                    <span className={styles.required}>*</span>
                                </label>
                                <input type="text" id="username" name="username" value={user.username}
                                       onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password:
                                    <span className={styles.required}>*</span>
                                </label>
                                <input type="password" id="password" name="password" value={user.password}
                                       onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="repassword">Repeat password:
                                    <span className={styles.required}>*</span>
                                </label>
                                <input type="password" id="repassword" name="repassword" value={user.repassword}
                                       onChange={handleInput}/>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">First name:
                                    <span className={styles.required}>*</span>
                                </label>
                                <input type="text" id="firstName" name="firstName" value={user.firstName}
                                       onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last name:
                                    <span className={styles.required}>*</span>
                                </label>
                                <input type="text" id="lastName" name="lastName" value={user.lastName}
                                       onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={user.phone} onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" name="country" value={user.country}
                                       onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" value={user.city} onChange={handleInput}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" value={user.address}
                                       onChange={handleInput}/>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Sign up" className={styles.btn}/>
                </form>
            </section>
        </main>

    );
}

export default SignUp;