"use client";
import React from "react";
import {Tooltip, Chip} from "@nextui-org/react";

const groupName= {
    name: "Team SAM",
    credits: 840
}


export default function CustomGroupBadge() {
    
  return (
    <div className="flex gap-4">
        <Tooltip delay={(1000)} placement="bottom" color= "default"
        content= {
            <div className="px-1 py-2">
             <div className="text-small font-bold">{groupName.name}</div>
             <div className="text-tiny"> Credits: {groupName.credits}</div>
            </div>
        }>
         <Chip className="bg-teal-500 hover:bg-teal-600" variant= "flat">{groupName.name}</Chip>
        </Tooltip>
    </div>
    
    
  );
}