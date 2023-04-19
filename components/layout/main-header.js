import Link from "next/link";
import styles from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">2023 Musical Lineup</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
