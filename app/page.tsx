import styles from './page.module.css'
import Link from "next/link";


export default function Home() {

  return (
    <main className={styles.main}>
        <Link href="signIn"><input type="button" value="Sign in" className={styles.btn}/></Link>
        <Link href="signUp"><input type="button" value="Sign up" className={styles.btn}/></Link>
    </main>
  )
}
