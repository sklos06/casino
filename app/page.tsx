import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/signup"><input type="button" value="Get started!"/></Link>
    </main>
  )
}
