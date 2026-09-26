import React from "react";
export function Avatar({src,name,size=40}){
const initials=(name||"").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
const style={width:size,height:size,borderRadius:"50%",border:"2px solid var(--white)",
display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",
background:"var(--teal-100)",color:"var(--teal-700)",fontFamily:"var(--font-body)",
fontWeight:"var(--weight-semibold)",fontSize:size*0.36};
return src
? React.createElement("img",{src,alt:name||"",style:{...style,objectFit:"cover"}})
: React.createElement("div",{style},initials||"?");
}
export function AvatarGroup({avatars=[],max=4}){
const shown=avatars.slice(0,max);
return React.createElement("div",{style:{display:"flex"}},
shown.map((a,i)=>React.createElement("div",{key:i,style:{marginLeft:i===0?0:-10,zIndex:shown.length-i}},
React.createElement(Avatar,{...a,size:36}))));
}
