import React from 'react';
import styles from './Fire.module.css';

function Fire() {
  return (
<div className={styles.fire}>
  <div className={styles.fireLeft}>
    <div className={styles.mainFire}></div>
    <div className={styles.particleFire}></div>
  </div>
  <div className={styles.fireCenter}>
    <div className={styles.mainFire}></div>
    <div className={styles.particleFire}></div>
  </div>
  <div className={styles.fireRight}>
    <div className={styles.mainFire}></div>
    <div className={styles.particleFire}></div>
  </div>
  <div className={styles.fireBottom}>
    <div className={styles.mainFire}></div>
  </div>
</div>
  );
}

export default Fire;
