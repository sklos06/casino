import React from 'react';
import styles from './form.module.css'

function Form() {
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
                    <input type="button" value="Log in" className={styles.btn}/>
                </div>
            </form>
            <div className={styles.signUp}>
                <p>Sign up - if you do not have account yet</p>
            </div>
        </section>
    );
}

export default Form;