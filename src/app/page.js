import Image from "next/image";
import styles from "./page.module.css";



export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Home</h1>
      <p>Welcome to the home page.</p>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={283}
        height={64}
      />
    </div>
  );
}
