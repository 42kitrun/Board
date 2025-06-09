import styles from "../styles/userinfo.module.css";

const userInfo = {
  nickname: "아미타민",
  gender: "M",
  age: 29,
  phoneNumber: "01051256854",
  registrationDate: "2024.09.18",
};

export default function UserInfo() {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfoItem}>
        <span className={styles.label}>(닉네임)</span>
        <span className={styles.value}>{userInfo.nickname}</span>
      </div>
      <div className={styles.userInfoItem}>
        <span className={styles.label}>(성별)</span>
        <span className={styles.value}>{userInfo.gender}</span>
      </div>
      <div className={styles.userInfoItem}>
        <span className={styles.label}>(나이)</span>
        <span className={styles.value}>{userInfo.age}</span>
      </div>
      <div className={styles.userInfoItem}>
        <span className={styles.label}>(핸드폰번호)</span>
        <span className={styles.value}>{userInfo.phoneNumber}</span>
      </div>
      <div className={styles.userInfoItem}>
        <span className={styles.label}>(가입일)</span>
        <span className={styles.value}>{userInfo.registrationDate}</span>
      </div>
    </div>
  );
}
