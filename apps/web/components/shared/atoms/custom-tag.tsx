"use client";
import React from "react";
import { Chip } from "@nextui-org/react"

const tagName= {
  color: "#F3818B",
  name: "Developer"
}


export default function CustomTag(): JSX.Element {
  return (
    <div className="flex gap-4">
      <Chip style={{backgroundColor:tagName.color}} variant= "flat"> {tagName.name} </Chip>
    </div>
  );
}