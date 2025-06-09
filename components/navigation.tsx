import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/navigation.module.css";

export default function Navigation() {
  const navItems = [
    { label: "회원 관리", path: "/" },
    { label: "설문 관리", path: "/" },
    { label: "설문 답변 관리", path: "/" },
    { label: "목표 관리", path: "/" },
    { label: "피로도 관리", path: "/" },
  ];

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
