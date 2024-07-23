import React from 'react';
import styles from './signUp.module.css'

function SignUp() {
    return (
        <section className={styles.page}>
            <form action="POST" className={styles.form}>
                <div className={styles.accData}>
                    <div className={styles.leftSide}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-mail:
                                <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="email"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Username:
                                <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="username"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password:
                                <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="password"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="repassword">Repeat password:
                                <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="repassword"/>
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First name:
                                <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="firstName"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last name:
                                <span className={styles.required}>*</span>
                            </label>
                            <input type="text" id="lastName"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" id="phone"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="country">Country:</label>
                            <input type="text" id="country"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address"/>
                        </div>
                    </div>
                </div>
                <input type="button" value="Sign up" className={styles.btn}/>
            </form>
        </section>

    );
}

export default SignUp;