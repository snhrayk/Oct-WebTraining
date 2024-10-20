import React from "react";
import styles from "./styles/Timer.module.css";

function Timer() {
  return (
    <div className={styles.cup}>
      <div className={styles.juice}>
        <div className={styles.timer}>
          <h2>01:00</h2>
          <button>START</button>
        </div>
      </div>
      <div className={styles.straw}></div>
    </div>
  );
}

export default Timer;
