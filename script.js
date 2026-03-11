let data=[]
let columns=["fecha","evento","analisis","texto"]

fetch("data.json")
.then(r=>r.json())
.then(d=>{

data=d

initSelectors()

renderColumn("col1","texto")
renderColumn("col2","evento")
renderColumn("col3","analisis")

syncScroll()

})

function initSelectors(){

["sel1","sel2","sel3"].forEach((id,i)=>{

let sel=document.getElementById(id)

columns.forEach(c=>{

let opt=document.createElement("option")
opt.value=c
opt.text=c

sel.appendChild(opt)

})

sel.onchange=()=>{

renderColumn("col"+(i+1),sel.value)

}

})

}

function renderColumn(col,field){

let div=document.getElementById(col)

div.innerHTML=""

data.forEach(row=>{

let block=document.createElement("div")
block.className="entry"

let date=document.createElement("div")
date.className="date"
date.innerText=row.fecha

let text=document.createElement("div")
text.innerText=row[field]

block.appendChild(date)
block.appendChild(text)

div.appendChild(block)

})

}

function setLayout(n){

for(let i=1;i<=3;i++){

let c=document.getElementById("col"+i)

c.style.display = (i<=n) ? "block" : "none"

}

}

function syncScroll(){

let cols=document.querySelectorAll(".column")

cols.forEach(c=>{

c.addEventListener("scroll",()=>{

let ratio=c.scrollTop/(c.scrollHeight-c.clientHeight)

cols.forEach(o=>{

if(o!==c){

o.scrollTop=ratio*(o.scrollHeight-o.clientHeight)

}

})

})

})

}