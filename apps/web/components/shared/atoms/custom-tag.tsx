"use client";
import React from "react";
import { Chip } from "@nextui-org/react"

const tagName= {
  color: "#F3818B",
  name: "Developer"
}
//insert into function parameters 
// color: string, name: string

export default function CustomTag(): JSX.Element {
  //uncomment when you need to connect tag name and color to the users page
  //const tagName = {
  //  color: color,
  //  name: name
  //}

  return (
    <div className="flex gap-4">
      <Chip style={{backgroundColor:tagName.color}} variant= "flat"> {tagName.name} </Chip>
    </div>
  );
}