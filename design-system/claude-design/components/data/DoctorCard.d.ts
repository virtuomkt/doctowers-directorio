import React from "react";
export interface DoctorCardProps{
/** @startingPoint section="Components" subtitle="Directory listing card with photo, specialty and availability" viewport="700x220" */
photo?:string;
name:string;
specialty:string;
office:string;
available?:boolean;
}
export function DoctorCard(props:DoctorCardProps):JSX.Element;
