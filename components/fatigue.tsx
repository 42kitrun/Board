"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/fatigue.module.css";

interface DataPoint {
  date: Date;
  value: number;
}

export default function Fatigue() {
  const [data, setData] = useState<{
    daily: DataPoint[];
    weekly: DataPoint[];
    monthly: DataPoint[];
  }>({ daily: [], weekly: [], monthly: [] });
  const [zoomLevel, setZoomLevel] = useState(1); // 1-5: 새로운 줌 레벨
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  const containerWidth = 800;
  const graphHeight = 230;

  useEffect(() => {
    const generateData = () => {
      const startDate = new Date("2024-01-01");
      const endDate = new Date("2024-06-30");
      const days =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

      const daily = Array.from({ length: days }, (_, i) => ({
        date: new Date(startDate.getTime() + i * 86400000),
        value: Math.floor(Math.random() * 10) + 1,
      }));

      const aggregateData = (source: DataPoint[], interval: number) =>
        Array.from({ length: Math.ceil(source.length / interval) }, (_, i) => {
          const slice = source.slice(i * interval, (i + 1) * interval);
          return {
            date: slice[0].date,
            value: slice.reduce((sum, d) => sum + d.value, 0) / slice.length,
          };
        });

      const weekly = aggregateData(daily, 7);
      const monthly = aggregateData(daily, 30);

      return { daily, weekly, monthly };
    };

    setData(generateData());
  }, []);

  const getCurrentData = () => {
    switch (zoomLevel) {
      case 1:
      case 2:
        return data.daily;
      case 3:
        return data.weekly;
      case 4:
      case 5:
        return data.monthly;
      default:
        return data.daily;
    }
  };

  const currentData = getCurrentData();

  const getIntervalWidth = () => {
    switch (zoomLevel) {
      case 1:
        return 80;
      case 2:
        return 40;
      case 3:
        return 80;
      case 4:
        return 80;
      case 5:
        return 40;
      default:
        return 80;
    }
  };

  const graphWidth = Math.max(
    currentData.length * getIntervalWidth(),
    containerWidth
  );

  useEffect(() => {
    setIsScrollbarVisible(graphWidth > containerWidth);
  }, [graphWidth, containerWidth]);

  const calculateScrollbarThumbWidth = () => {
    const ratio = containerWidth / graphWidth;
    return `${ratio * 100}%`;
  };

  const getX = (index: number) =>
    (index / (currentData.length - 1)) * (graphWidth - 100) + 50;
  const getY = (value: number) => ((10 - value) / 9) * (graphHeight - 50) + 10;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setScrollOffset((prev) =>
      Math.max(0, Math.min(prev + e.deltaY, graphWidth - containerWidth))
    );
  };

  const handleScrollbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrollOffset(Number(e.target.value));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.max(1, prev - 1));
    setScrollOffset(0);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.min(5, prev + 1));
    setScrollOffset(0);
  };

  const getZoomLabel = () => {
    switch (zoomLevel) {
      case 1:
        return "일별";
      case 2:
        return "일별";
      case 3:
        return "주별";
      case 4:
        return "월별";
      case 5:
        return "월별";
      default:
        return "";
    }
  };

  const formatDate = (date: Date) => {
    switch (zoomLevel) {
      case 1:
      case 2:
        return `${date.getFullYear()}\n${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      case 3:
        const weekNumber = Math.ceil(date.getDate() / 7);
        return `${date.getFullYear()}\n${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-W${weekNumber}`;
      case 4:
      case 5:
        return `${date.getFullYear()}\n${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Fatigue Graph</div>
      <div className={styles.graphContainer} onWheel={handleWheel}>
        <svg className={styles.yAxis}>
          {[...Array(10)].map((_, i) => (
            <text key={i} x="15" y={getY(i + 1)} className={styles.yAxisLabel}>
              {i + 1}
            </text>
          ))}
        </svg>

        <div>
          <svg width={graphWidth} height={graphHeight}>
            <g transform={`translate(-${scrollOffset},0)`}>
              {[...Array(10)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  className={styles.gridLine}
                  x1="20"
                  x2={graphWidth}
                  y1={getY(i + 1)}
                  y2={getY(i + 1)}
                />
              ))}
              {currentData.map((_, i) => (
                <line
                  key={`v-${i}`}
                  className={styles.gridLine}
                  x1={getX(i)}
                  x2={getX(i)}
                  y1="14"
                  y2={graphHeight - 35}
                />
              ))}

              {currentData.map((point, i) => (
                <text
                  key={i}
                  x={getX(i)}
                  y={graphHeight}
                  className={styles.xAxisLabel}
                >
                  {formatDate(point.date)
                    .split("\n")
                    .map((line, idx) => (
                      <tspan
                        key={idx}
                        x={getX(i)}
                        dy={idx === 0 ? "-1em" : "1em"}
                      >
                        {line}
                      </tspan>
                    ))}
                </text>
              ))}

              <polyline
                className={styles.line}
                points={currentData
                  .map((d, i) => `${getX(i)},${getY(d.value)}`)
                  .join(" ")}
              />

              {currentData.map((d, i) => (
                <circle
                  key={i}
                  className={styles.dataPoint}
                  cx={getX(i)}
                  cy={getY(d.value)}
                />
              ))}
            </g>
          </svg>
        </div>

        <div className={styles.zoomControls}>
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
          <div className={styles.zoomLabel}>{getZoomLabel()}</div>
        </div>
      </div>

      <div
        className={styles.scrollbarContainer}
        style={{ display: isScrollbarVisible ? "block" : "none" }}
      >
        <input
          type="range"
          min="0"
          max={graphWidth - containerWidth}
          value={scrollOffset}
          onChange={handleScrollbarChange}
          className={styles.scrollbar}
          style={
            {
              "--thumb-width": calculateScrollbarThumbWidth(),
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
