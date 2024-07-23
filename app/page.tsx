import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
        <Link href="signIn"><input type="button" value="Log in"/></Link>
        <Link href="signUp"><input type="button" value="Sign up"/></Link>
    </main>
  )
}
