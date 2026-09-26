import React from "react";
export interface AvatarProps{
src?:string;
name?:string;
size?:number;
}
export interface AvatarGroupProps{
/** @startingPoint section="Components" subtitle="Overlapping doctor photos with initials fallback" viewport="700x160" */
avatars:AvatarProps[];
max?:number;
}
export function Avatar(props:AvatarProps):JSX.Element;
export function AvatarGroup(props:AvatarGroupProps):JSX.Element;
