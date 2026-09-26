import React from "react";
export interface SearchInputProps{
/** @startingPoint section="Components" subtitle="Rounded search field with embedded teal action button" viewport="700x120" */
placeholder?:string;
value?:string;
onChange?:(v:string)=>void;
onSubmit?:(v:string)=>void;
buttonLabel?:string;
}
export function SearchInput(props:SearchInputProps):JSX.Element;
