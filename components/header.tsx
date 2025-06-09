import styles from "../styles/dashboardhead.module.css";

// Props 타입 정의
interface DashBoardHead {
  title: string;
}

export default function DashBoardHead({ title }) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>{title}</div>
      <button className={styles.logoutButton}>로그아웃</button>
    </header>
  );
}
