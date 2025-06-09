import styles from "../styles/userboard.module.css";
import Comments from "./comments";
import FatigueGraph from "./fatigue";
import GoalGraph from "./goal";
import HealthReport from "./report";
import SurveyGraph from "./survey";

export default function UserBoard() {
  return (
    <div className={styles.container}>
      <section className={styles.comments}>
        <Comments />
      </section>
      <section className={styles.graphContainer}>
        <div className={styles.fatigueGraph}>
          <FatigueGraph />
        </div>
        {/* Divider 추가 */}
        <div className={styles.divider}></div>
        <div className={styles.goalGraph}>
          <GoalGraph />
        </div>
        {/* Divider 추가 */}
        <div className={styles.divider}></div>
        <div className={styles.surveyGraph}>
          <SurveyGraph />
        </div>
      </section>
      <section className={styles.healthReport}>
        <HealthReport />
      </section>
    </div>
  );
}
