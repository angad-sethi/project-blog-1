"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./RevealVotesAnimation.module.css";

export const EstimateVote = ({ estimate, userId, showVote }) => {
  if (!showVote && estimate) {
    return (
      <div>
        {userId}
        <div className={styles.hiddenCard}></div>
      </div>
    );
  }

  switch (estimate) {
    default:
      return (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {userId}
          <div className={styles.estimateShown}>{estimate}</div>
        </motion.div>
      );
  }
};
