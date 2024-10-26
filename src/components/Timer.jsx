import React, { useEffect, useState } from "react";
import styles from "./styles/Timer.module.css";

function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [juiceHeight, setJuiceHeight] = useState(48);
  const [svgVisible, setSvgVisible] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setJuiceHeight((prevHeight) => prevHeight - 48 / 60);

        if (timeLeft <= 2.5) {
          setSvgVisible(false);
        } else {
          setSvgVisible(true);
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
    setJuiceHeight(48);
    setSvgVisible(true);
  };

  return (
    <div className={styles.cup}>
      {/* ジュース */}
      <div className={styles.juice} style={{ height: `${juiceHeight}rem` }}>
        {/* ジュースの波 */}
        {svgVisible && (
          <svg
            id="wave"
            className={styles.wave}
            viewBox="0 0 1440 280"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stop-color="rgba(242, 108, 24, 1)" offset="0%"></stop>
                <stop stop-color="rgba(242, 122, 47, 1)" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              className={styles.waveBack}
              fill="url(#sw-gradient-0)"
              d="M0,168L60,154C120,140,240,112,360,116.7C480,121,600,159,720,186.7C840,215,960,233,1080,214.7C1200,196,1320,140,1440,121.3C1560,103,1680,121,1800,149.3C1920,177,2040,215,2160,224C2280,233,2400,215,2520,191.3C2640,168,2760,140,2880,140C3000,140,3120,168,3240,186.7C3360,205,3480,215,3600,191.3C3720,168,3840,112,3960,112C4080,112,4200,168,4320,182C4440,196,4560,168,4680,158.7C4800,149,4920,159,5040,140C5160,121,5280,75,5400,79.3C5520,84,5640,140,5760,144.7C5880,149,6000,103,6120,98C6240,93,6360,131,6480,154C6600,177,6720,187,6840,177.3C6960,168,7080,140,7200,144.7C7320,149,7440,187,7560,172.7C7680,159,7800,93,7920,88.7C8040,84,8160,140,8280,168C8400,196,8520,196,8580,196L8640,196L8640,280L8580,280C8520,280,8400,280,8280,280C8160,280,8040,280,7920,280C7800,280,7680,280,7560,280C7440,280,7320,280,7200,280C7080,280,6960,280,6840,280C6720,280,6600,280,6480,280C6360,280,6240,280,6120,280C6000,280,5880,280,5760,280C5640,280,5520,280,5400,280C5280,280,5160,280,5040,280C4920,280,4800,280,4680,280C4560,280,4440,280,4320,280C4200,280,4080,280,3960,280C3840,280,3720,280,3600,280C3480,280,3360,280,3240,280C3120,280,3000,280,2880,280C2760,280,2640,280,2520,280C2400,280,2280,280,2160,280C2040,280,1920,280,1800,280C1680,280,1560,280,1440,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z"
            ></path>
            <defs>
              <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
                <stop stop-color="rgba(242, 122, 47, 1)" offset="0%"></stop>
                <stop stop-color="rgba(242, 122, 47, 1)" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              className={styles.waveFront}
              fill="url(#sw-gradient-1)"
              d="M0,112L60,130.7C120,149,240,187,360,196C480,205,600,187,720,163.3C840,140,960,112,1080,107.3C1200,103,1320,121,1440,116.7C1560,112,1680,84,1800,70C1920,56,2040,56,2160,70C2280,84,2400,112,2520,144.7C2640,177,2760,215,2880,219.3C3000,224,3120,196,3240,186.7C3360,177,3480,187,3600,186.7C3720,187,3840,177,3960,168C4080,159,4200,149,4320,163.3C4440,177,4560,215,4680,214.7C4800,215,4920,177,5040,144.7C5160,112,5280,84,5400,102.7C5520,121,5640,187,5760,210C5880,233,6000,215,6120,205.3C6240,196,6360,196,6480,200.7C6600,205,6720,215,6840,200.7C6960,187,7080,149,7200,126C7320,103,7440,93,7560,112C7680,131,7800,177,7920,182C8040,187,8160,149,8280,112C8400,75,8520,37,8580,18.7L8640,0L8640,280L8580,280C8520,280,8400,280,8280,280C8160,280,8040,280,7920,280C7800,280,7680,280,7560,280C7440,280,7320,280,7200,280C7080,280,6960,280,6840,280C6720,280,6600,280,6480,280C6360,280,6240,280,6120,280C6000,280,5880,280,5760,280C5640,280,5520,280,5400,280C5280,280,5160,280,5040,280C4920,280,4800,280,4680,280C4560,280,4440,280,4320,280C4200,280,4080,280,3960,280C3840,280,3720,280,3600,280C3480,280,3360,280,3240,280C3120,280,3000,280,2880,280C2760,280,2640,280,2520,280C2400,280,2280,280,2160,280C2040,280,1920,280,1800,280C1680,280,1560,280,1440,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z"
            ></path>
          </svg>
        )}
        {/* タイマー */}
        <div className={styles.timer}>
          <h2>
            {`${Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}:${(timeLeft % 60)
              .toString()
              .padStart(2, "0")}`}
          </h2>
          {timeLeft === 0 ? (
            <button className={styles.restartBtn} onClick={resetTimer}>
              RESTART
            </button>
          ) : (
            <>
              {!isRunning && timeLeft === 60 && (
                <button className={styles.startBtn} onClick={startTimer}>
                  START
                </button>
              )}

              {!isRunning && timeLeft < 60 && timeLeft > 0 && (
                <div className={styles.btnWrap}>
                  <button className={styles.resetBtn} onClick={resetTimer}>
                    <img src="../img/reset.svg" alt="リセット" />
                  </button>
                  <button className={styles.playBtn} onClick={startTimer}>
                    <img src="../img/play.svg" alt="再生" />
                  </button>
                </div>
              )}

              {isRunning && (
                <div className={styles.btnWrap}>
                  <button className={styles.resetBtn} onClick={resetTimer}>
                    <img src="../img/reset.svg" alt="リセット" />
                  </button>
                  <button className={styles.pauseBtn} onClick={pauseTimer}>
                    <img src="../img/pause.svg" alt="ポーズ" />
                  </button>
                </div>
              )}
            </>
          )}{" "}
        </div>
      </div>
      {/* ストロー */}
      <div className={styles.straw}></div>
    </div>
  );
}

export default Timer;
