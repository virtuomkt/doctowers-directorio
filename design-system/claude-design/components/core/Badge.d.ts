import React from "react";
export interface BadgeProps{
tone?:"accent"|"dark"|"neutral";
children:React.ReactNode;
}
export function Badge(props:BadgeProps):JSX.Element;
