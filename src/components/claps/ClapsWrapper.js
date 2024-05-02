"use client"
import React from 'react';
import "@upstash/claps/style.css";
import Claps from "@upstash/claps";

 function Clapswrapper() {

  return (
    <Claps fixed="right" apiPath='api/claps'/>
  );
}

export default Clapswrapper;
