"use client";

// components/SurveyGraph.tsx
import { useEffect, useRef, useState } from "react";
import styles from "../styles/survey.module.css";

interface SurveyData {
  date: string;
  Physical?: number;
  Nutrition?: number;
  Mind?: number;
  Sleep?: number;
}

export default function SurveyGraph() {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columnWidth = 60;

  useEffect(() => {
    setSurveyData(generateSurveyData());
  }, []);

  const handleHorizontalScroll = (delta: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += delta;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Survey Graph</h2>
      <div className={styles.graphContainer}>
        <div className={styles.categoryColumn}>
          {["신체", "영양", "마음", "수면"].map((category) => (
            <div key={category} className={styles.categoryLabel}>
              {category}
            </div>
          ))}
        </div>

        <div
          className={styles.scrollableContainer}
          ref={scrollContainerRef}
          onWheel={(e) => handleHorizontalScroll(e.deltaY)}
        >
          <div style={{ width: `${surveyData.length * columnWidth}px` }}>
            <div className={styles.dataColumns}>
              {surveyData.map((data, index) => (
                <SurveyColumn key={index} data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SurveyColumn = ({ data }: { data: SurveyData }) => (
  <div className={styles.dataColumn}>
    <div className={styles.dateLabel}>{data.date}</div>

    {(["Physical", "Nutrition", "Mind", "Sleep"] as const).map((category) => (
      <SurveyCircle key={category} value={data[category]} category={category} />
    ))}
  </div>
);

const SurveyCircle = ({
  value,
  category,
}: {
  value?: number;
  category: keyof SurveyData;
}) => {
  if (value === undefined) return <div className={styles.emptyCircle} />;

  return (
    <div
      className={styles.valueCircle}
      style={{ backgroundColor: getColorForCategory(category, value) }}
    >
      {value}
    </div>
  );
};

const getColorForCategory = (category: string, value: number): string => {
  const baseColors = {
    Physical: "#18A0FB",
    Mind: "#18A0FB",
    Nutrition: "#FF7979",
    Sleep: "#FF7979",
  };

  const opacityMap = {
    low: "FF",
    medium: "4D",
    high: "4D",
    veryHigh: "FF",
  };

  if (["Physical", "Mind"].includes(category)) {
    if (value <= 40)
      return `${baseColors[category as keyof typeof baseColors]}${
        opacityMap.low
      }`;
    if (value <= 60)
      return `${baseColors[category as keyof typeof baseColors]}${
        opacityMap.medium
      }`;
    if (value <= 80) return "#FF79794D";
    return "#FF7979";
  }

  if (value <= 40) return "#FF7979";
  if (value <= 60) return "#FF79794D";
  if (value <= 80) return "#18A0FB4D";
  return "#18A0FB";
};

const generateSurveyData = (): SurveyData[] => {
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date(2024, 11, 31);
  const dateRange = endDate.getTime() - startDate.getTime();

  return Array.from({ length: 20 }, (_, i) => {
    const randomDate = new Date(
      startDate.getTime() + Math.random() * dateRange
    );
    const data: SurveyData = {
      date: `${randomDate.getFullYear()}\n${String(
        randomDate.getMonth() + 1
      ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`,
    };

    (["Physical", "Nutrition", "Mind", "Sleep"] as const).forEach(
      (category) => {
        if (Math.random() > 0.4) {
          data[category] = Math.floor(Math.random() * 40) + 30;
        }
      }
    );

    return data;
  }).sort(
    (a, b) =>
      new Date(a.date.replace("\n", "-")).getTime() -
      new Date(b.date.replace("\n", "-")).getTime()
  );
};
