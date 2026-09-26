import React from "react";
export interface ButtonProps{
/** @startingPoint section="Components" subtitle="Pill-shaped primary, dark and secondary actions" viewport="700x220" */
variant?:"primary"|"dark"|"secondary"|"ghost";
size?:"sm"|"md"|"lg";
disabled?:boolean;
icon?:React.ReactNode;
children:React.ReactNode;
onClick?:()=>void;
}
export function Button(props:ButtonProps):JSX.Element;
