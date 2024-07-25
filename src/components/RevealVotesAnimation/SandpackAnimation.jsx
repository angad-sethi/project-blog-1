"use client";
import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import styles from "./RevealVotesAnimation.module.css";

const App = `import React, { useState, useEffect, useId } from "react";
import "./RevealVotesAnimation.css";
import { EstimateVote } from "./EstimateVote";

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

export default function App() {
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
    <div className={"background"}>
      <div className={"votingArea"}>
        <div className={"wrapper"}>
            {votes.map((vote) => {
              const key = "vote-"+id+vote.userId;
              return (
                <EstimateVote
                  estimate={vote.vote}
                  userId={vote.userId}
                  showVote={showVotes}
                  layoutId={key}
                  key={key}
                />
              );
            })}
        </div>

        <div className={"bottomRowWrapper"}>
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
              hide votes
            </button>
          )}
        </div>
      </div>
    </div>
  );
  };`;

const styles1 = `.wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.bottomRowWrapper {
  display: flex;
  align-items: center;
  flex-direction: row;

  .bottomRowWrapper > span {
    display: flex;
    align-items: center;
    font-weight: 700;
  }
}

.votingArea {
  position: relative;

  flex: 1 1 auto;
  color: #000;

  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 4px;
}
.background {
  flex: 1 1 auto;
}
.estimateShown {
  border: 1px solid #000;
  min-width: 24px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hiddenCard {
  border: 1px solid #000;
  background: purple;
  min-width: 24px;
  height: 32px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

const estimateVoteCodeBlock = `import React from "react";
import "./RevealVotesAnimation.css";
import { motion } from "framer-motion";

export const EstimateVote = ({ estimate, userId, showVote }) => {
  if (!showVote && estimate) {
    return (
      <div>
        {userId}
        <div className={"hiddenCard"}></div>
      </div>
    );
  }

      return (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7,
          // Uncomment these lines below and click reveal for a funny take on the animation!
          // type: "spring",
          // stiffness: 260,
          // damping: 9 
          }}
        >
          {userId}
          <div className={"estimateShown"}>{estimate}</div>
        </motion.div>
      );
};
`;

function SandpackAnimation() {
  const files = {
    "/App.js": App,
    "/RevealVotesAnimation.css": { code: styles1 },
    "/EstimateVote.js": { code: estimateVoteCodeBlock, active: true },
  };

  return (
    <div className={styles.background1}>
      <Sandpack
        files={files}
        theme={nightOwl}
        template="react"
        options={{
          editorHeight: 600,
        }}
        customSetup={{
          dependencies: {
            "framer-motion": "10.14",
          },
        }}
      />
    </div>
  );
}

export default SandpackAnimation;
