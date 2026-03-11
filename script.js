let data=[]
let fields=["evento","analisis","texto"]

fetch("data.json")
.then(r=>r.json())
.then(d=>{

data=d

initSelectors()

renderDates()
renderColumn("col1","evento")
renderColumn("col2","analisis")
renderColumn("col3","texto")

syncScroll()

})

function initSelectors(){

["sel1","sel2","sel3"].forEach((id,i)=>{

let sel=document.getElementById(id)

fields.forEach(f=>{

let opt=document.createElement("option")
opt.value=f
opt.text=f

sel.appendChild(opt)

})

sel.onchange=()=>{

renderColumn("col"+(i+1),sel.value)

}

})

}

function renderDates(){

let div=document.getElementById("datecol")
div.innerHTML=""

data.forEach(row=>{

let e=document.createElement("div")
e.className="entry"
e.innerText=row.fecha

div.appendChild(e)

})

}

function renderColumn(col,field){

let div=document.getElementById(col)
div.innerHTML=""

data.forEach(row=>{

let e=document.createElement("div")
e.className="entry"
e.innerText=row[field]

div.appendChild(e)

})

}

function setLayout(n){

for(let i=1;i<=3;i++){

let c=document.getElementById("col"+i)

c.style.display = (i<=n) ? "block" : "none"

}

}

function syncScroll(){

const cols = document.querySelectorAll(".column")
    
let isSyncing = false
    
cols.forEach(col => {
    
col.addEventListener("scroll", () => {
    
if(isSyncing) return
    
isSyncing = true
    
const ratio = col.scrollTop / (col.scrollHeight - col.clientHeight)
    
cols.forEach(other => {
    
if(other !== col){
    
other.scrollTop = ratio * (other.scrollHeight - other.clientHeight)
    
}
    
})
    
isSyncing = false
    
})
    
})
    
}