import React from 'react';
import styles from './signIn.module.css'

function SignIn() {
    return (
        <section className={styles.page}>
            <form action="POST" className={styles.form}>
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
                    <input type="button" value="Sign in" className={styles.btn}/>
                </div>
            </form>
        </section>
    );
}

export default SignIn;