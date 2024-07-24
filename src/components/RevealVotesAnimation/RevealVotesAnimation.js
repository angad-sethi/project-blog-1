"use client";
import { EstimateVote } from "./EstimateVote";
import React, { useState, useEffect, useId } from "react";
import styles from "./RevealVotesAnimation.module.css";

const sorted = (votes) => {
  return [].slice.call(votes).sort(function (a, b) {
    return a.vote - b.vote;
  });
};

const initialVotes = [
  { vote: 4, userId: "Bohdan" },
  { vote: 2, userId: "Kaitlyn" },
  { vote: 7, userId: "Sam" },
  { vote: 3, userId: "Alfie" },
  { vote: 1, userId: "Angad" },
];

function RevealVotesAnimation() {
  const [votes, setVotes] = useState(initialVotes);
  const [showVotes, setShowVotes] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const id = useId();

  useEffect(() => {
    if (showVotes && !isSorted) {
      setTimeout(() => sortFunc(), 1000);
    }
  });

  const sortFunc = () => {
    const sortedVotes = sorted(votes);
    setIsSorted(true);
    setVotes(sortedVotes);
    return;
  };

  return (
    <div className={styles.background1}>
      <div className={styles.votingArea}>
        <div className={styles.wrapper}>
          {votes.map((vote) => {
            const layoutId = `vote-${id}-${vote.userId}`;
            return (
              <EstimateVote
                estimate={vote.vote}
                userId={vote.userId}
                showVote={showVotes}
                key={layoutId}
              />
            );
          })}
        </div>

        <div className={styles.bottomRowWrapper}>
          {!showVotes && (
            <button
              onClick={() => {
                setShowVotes((prev) => !prev);
              }}
            >
              Reveal votes
            </button>
          )}
          {showVotes && (
            <button
              onClick={() => {
                setShowVotes((prev) => !prev);
                setIsSorted((prev) => !prev);
                setVotes(initialVotes);
              }}
            >
              Hide votes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RevealVotesAnimation;
