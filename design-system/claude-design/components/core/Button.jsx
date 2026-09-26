import React from "react";
export function Button({variant="primary",size="md",disabled=false,icon=null,children,onClick}){
const sizes={sm:{padding:"8px 16px",fontSize:"var(--text-body-sm)"},md:{padding:"12px 22px",fontSize:"var(--text-body-md)"},lg:{padding:"16px 28px",fontSize:"var(--text-body-lg)"}};
const variants={
primary:{background:"var(--color-accent)",color:"var(--color-accent-contrast)",border:"none"},
dark:{background:"var(--color-dark)",color:"var(--color-text-inverse)",border:"none"},
secondary:{background:"var(--white)",color:"var(--color-dark)",border:"1px solid var(--color-border)"},
ghost:{background:"transparent",color:"var(--color-dark)",border:"none"}
};
const base={
fontFamily:"var(--font-body)",fontWeight:"var(--weight-semibold)",borderRadius:"var(--radius-pill)",
display:"inline-flex",alignItems:"center",gap:"8px",cursor:disabled?"not-allowed":"pointer",
opacity:disabled?0.5:1,transition:"filter var(--duration-fast) var(--ease-standard)",
...sizes[size],...variants[variant]
};
return React.createElement("button",{style:base,disabled,onClick,
onMouseEnter:e=>{if(!disabled)e.currentTarget.style.filter="brightness(0.92)"},
onMouseLeave:e=>{e.currentTarget.style.filter="none"}},
icon,children);
}
