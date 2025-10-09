"use client";
import React from "react";
import { Headphones } from "react-feather";
import useBoop from "@/hooks/useBoop";
import { animated } from "react-spring";

function BoopyBoi() {
  const boopConfig = {
    rotation: 20,
  };
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.span onMouseEnter={trigger} style={style}>
      <Headphones size={40} />
    </animated.span>
  );
}

export default BoopyBoi;
