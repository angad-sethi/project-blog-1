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
              const layoutId = vote.userId;
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

export const EstimateVote = ({ estimate, userId, showVote }) => {
  if (!showVote && estimate) {
    return (
      <div>
      {userId}
        <div className={"hiddenCard"}></div>
      </div>
    );
  }

  switch (estimate) {
    default:
      return (
        <div>
          {userId}
          <div className={"estimateShown"}>{estimate}</div>
        </div>
      );
  }
};
`;

function SandpackNoAnimation() {
  const files = {
    "/App.js": App,
    "/RevealVotesAnimation.css": styles1,
    "/EstimateVote.js": estimateVoteCodeBlock,
  };

  return (
    <div className={styles.background1}>
      <Sandpack
        files={files}
        theme={nightOwl}
        template="react"
        options={{ editorHeight: 600 }}
      />
    </div>
  );
}

export default SandpackNoAnimation;
