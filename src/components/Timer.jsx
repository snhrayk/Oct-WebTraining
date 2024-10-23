import React, { useEffect, useState } from "react";
import styles from "./styles/Timer.module.css";

function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [juiceHeight, setJuiceHeight] = useState(52);
  const [timerColor, setTimerColor] = useState("--base");

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setJuiceHeight((prevHeight) => prevHeight - 52 / 60);

        // ジュースの高さが一定値以下になったら色を切り替える
        if (juiceHeight < 32) {
          setTimerColor("--main");
        } else {
          setTimerColor("--base");
        }
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, juiceHeight]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(60);
    setJuiceHeight(52);
    setTimerColor("--base"); // リセット時に色も元に戻す
  };

  return (
    <div className={styles.cup}>
      <div className={styles.juice} style={{ height: `${juiceHeight}rem` }}>
        <div className={styles.timer}>
          <h2 style={{ color: `var(${timerColor})` }}>
            {`${Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}:${(timeLeft % 60)
              .toString()
              .padStart(2, "0")}`}
          </h2>
          {!isRunning && timeLeft === 60 && (
            <button
              className={styles.startBtn}
              onClick={startTimer}
              style={{ backgroundColor: `var(${timerColor})` }}
            >
              START
            </button>
          )}

          {isRunning && (
            <div className={styles.btnWrap}>
              <button
                className={styles.resetBtn}
                onClick={resetTimer}
                style={{ borderColor: `var(${timerColor})` }}
              >
                <img src="../img/reset.svg" alt="リセット" />
              </button>
              <button
                className={styles.pauseBtn}
                onClick={pauseTimer}
                style={{ backgroundColor: `var(${timerColor})` }}
              >
                <img src="../img/pause.svg" alt="ポーズ" />
              </button>
            </div>
          )}

          {!isRunning && timeLeft < 60 && timeLeft > 0 && (
            <div className={styles.btnWrap}>
              <button
                className={styles.resetBtn}
                onClick={resetTimer}
                style={{ borderColor: `var(${timerColor})` }}
              >
                <img src="../img/reset.svg" alt="リセット" />
              </button>
              <button
                className={styles.playBtn}
                onClick={startTimer}
                style={{ backgroundColor: `var(${timerColor})` }}
              >
                <img src="../img/play.svg" alt="再生" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.straw}></div>
    </div>
  );
}

export default Timer;
