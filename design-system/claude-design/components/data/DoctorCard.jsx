import React from "react";
import {Badge} from "../core/Badge.jsx";
export function DoctorCard({photo,name,specialty,office,available=true,avatarAlign="top"}){
return React.createElement("div",{style:{
background:"var(--white)",borderRadius:"var(--radius-md)",boxShadow:"var(--shadow-sm)",
border:"1px solid var(--color-border)",padding:"var(--space-5)",display:"flex",gap:"var(--space-4)",
alignItems:avatarAlign==="top"?"flex-start":"center",fontFamily:"var(--font-body)",maxWidth:360}},
React.createElement("div",{style:{width:56,height:56,borderRadius:"50%",overflow:"hidden",
flexShrink:0,background:"var(--teal-100)",display:"flex",alignItems:"center",justifyContent:"center",
color:"var(--teal-700)",fontWeight:"var(--weight-semibold)",fontSize:18}},
photo?React.createElement("img",{src:photo,style:{width:"100%",height:"100%",objectFit:"cover"}}):
(name||"").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase()),
React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:4,minWidth:0}},
React.createElement("div",{style:{fontWeight:"var(--weight-semibold)",fontSize:"var(--text-body-md)",
color:"var(--color-text-primary)"}},name),
React.createElement("div",{style:{fontSize:"var(--text-body-sm)",color:"var(--color-text-secondary)"}},specialty),
React.createElement("div",{style:{fontSize:"var(--text-caption)",color:"var(--color-text-secondary)"}},office),
React.createElement(Badge,{tone:available?"accent":"neutral"},available?"Disponible hoy":"Sin disponibilidad")));
}
