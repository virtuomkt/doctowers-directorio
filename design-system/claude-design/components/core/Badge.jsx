import React from "react";
export function Badge({tone="accent",children}){
const tones={
accent:{background:"var(--teal-100)",color:"var(--teal-700)"},
dark:{background:"var(--color-dark)",color:"var(--white)"},
neutral:{background:"var(--gray-100)",color:"var(--ink-700)"}
};
return React.createElement("span",{style:{
fontFamily:"var(--font-body)",fontSize:"var(--text-caption)",fontWeight:"var(--weight-semibold)",
padding:"4px 12px",borderRadius:"var(--radius-pill)",display:"inline-flex",alignItems:"center",gap:"6px",
...tones[tone]}},children);
}
