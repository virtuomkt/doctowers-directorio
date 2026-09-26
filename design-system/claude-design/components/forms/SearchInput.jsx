import React from "react";
export function SearchInput({placeholder="Busca por nombre o especialidad",value,onChange,onSubmit,buttonLabel="Buscar"}){
return React.createElement("form",{
onSubmit:e=>{e.preventDefault();onSubmit&&onSubmit(value)},
style:{display:"flex",alignItems:"center",background:"var(--white)",borderRadius:"var(--radius-pill)",
boxShadow:"var(--shadow-lg)",padding:"6px 6px 6px 24px",gap:"12px",maxWidth:560}},
React.createElement("input",{
value,placeholder,onChange:e=>onChange&&onChange(e.target.value),
style:{flex:1,border:"none",outline:"none",fontFamily:"var(--font-body)",
fontSize:"var(--text-body-md)",color:"var(--color-text-primary)",background:"transparent"}}),
React.createElement("button",{type:"submit",style:{
background:"var(--color-accent)",color:"var(--color-accent-contrast)",border:"none",
borderRadius:"var(--radius-pill)",padding:"14px 26px",fontFamily:"var(--font-body)",
fontWeight:"var(--weight-semibold)",fontSize:"var(--text-body-md)",cursor:"pointer",
display:"flex",alignItems:"center",gap:"8px"}},
React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},
React.createElement("circle",{cx:11,cy:11,r:7}),
React.createElement("line",{x1:21,y1:21,x2:16.65,y2:16.65})),buttonLabel));
}
