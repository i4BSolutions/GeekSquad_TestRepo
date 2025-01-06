import  Link  from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1>404 - Page Not Found</h1>

      <iframe
        src="https://giphy.com/embed/jaf4JwRREzsuGMkkDk"
        width="480"
        height="360"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>

        <p>Could not find requested resource</p>
        <Link href="/">Return Home 🏠</Link>
   
    </div>
  );
}