"use client";

import { useEffect, useState } from "react";
import styles from "../styles/goal.module.css";

type GoalCategory = "신체" | "영양" | "마음" | "수면";

interface GoalData {
  color: string;
  lastMonth: number;
  thisMonth: number;
}

export default function GoalGraph() {
  const [goalData, setGoalData] = useState<Record<GoalCategory, GoalData>>();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되는 랜덤 데이터 생성
    const generateData = () => ({
      신체: {
        color: "#F8AC45",
        lastMonth: Math.random() * 100,
        thisMonth: Math.random() * 100,
      },
      영양: {
        color: "#6AAFA1",
        lastMonth: Math.random() * 100,
        thisMonth: Math.random() * 100,
      },
      마음: {
        color: "#E389B5",
        lastMonth: Math.random() * 100,
        thisMonth: Math.random() * 100,
      },
      수면: {
        color: "#8E91BE",
        lastMonth: Math.random() * 100,
        thisMonth: Math.random() * 100,
      },
    });

    setGoalData(generateData());
  }, []);

  if (!goalData) return null;

  return (
    <>
      <h2 className={styles.title}>Goal Graph</h2>
      <div className={styles.graphContainer}>
        {Object.entries(goalData).map(([category, data]) => (
          <div key={category} className={styles.categoryItem}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <BarChart
              percentage={data.thisMonth}
              color={data.color}
              label={getCurrentMonthYear()}
            />
            <BarChart
              percentage={data.lastMonth}
              color={data.color}
              label={getLastMonthYear()}
              opacity={0.5}
            />
          </div>
        ))}
      </div>
    </>
  );
}

const BarChart = ({
  percentage,
  color,
  label,
  opacity = 1,
}: {
  percentage: number;
  color: string;
  label: string;
  opacity?: number;
}) => (
  <div className={styles.barContainer}>
    <div className={styles.barBackground}>
      <div
        className={styles.barFill}
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          opacity,
        }}
      />
      <span className={styles.percentageText}>{`${Math.round(
        percentage
      )}%`}</span>
    </div>
    <span className={styles.dateLabel}>{label}</span>
  </div>
);

// 날짜 포맷팅 유틸리티 함수
const getCurrentMonthYear = () => {
  const date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

const getLastMonthYear = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};
