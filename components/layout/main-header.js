import Link from "next/link";
import styles from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">nextevents</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events">all events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
