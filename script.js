// script.js

let data = [];
let fields = ["evento", "analisis", "texto"];

// Carga del dataset
fetch("data.json")
  .then(r => r.json())
  .then(d => {
    data = d;

    initSelectors();

    renderDates();
    renderColumn("col1", "evento");
    renderColumn("col2", "analisis");
    renderColumn("col3", "texto");

    addHoverEffect();
    equalizeRowHeights();
  });

// Inicializa los selectores de columnas
function initSelectors() {
  ["sel1", "sel2", "sel3"].forEach((id, i) => {
    let sel = document.getElementById(id);

    fields.forEach(f => {
      let opt = document.createElement("option");
      opt.value = f;
      opt.text = f;
      sel.appendChild(opt);
    });

    sel.onchange = () => {
      renderColumn("col" + (i + 1), sel.value);
      addHoverEffect();
      equalizeRowHeights();
    };
  });
}

// Renderiza la columna de fechas
function renderDates() {
  let div = document.getElementById("datecol");
  div.innerHTML = "";

  data.forEach(row => {
    let e = document.createElement("div");
    e.className = "entry";
    e.innerText = row.fecha;
    div.appendChild(e);
  });
}

// Renderiza columnas de contenido
function renderColumn(col, field) {
  let div = document.getElementById(col);
  div.innerHTML = "";

  data.forEach(row => {
    let e = document.createElement("div");
    e.className = "entry";
    e.innerText = row[field];
    div.appendChild(e);
  });
}

// Cambia layout (1, 2 o 3 columnas)
function setLayout(n) {
  for (let i = 1; i <= 3; i++) {
    let c = document.getElementById("col" + i);
    c.style.display = i <= n ? "block" : "none";
  }
}

// Resalta toda la fila al pasar el ratón
function addHoverEffect() {
  let n = data.length;

  for (let i = 0; i < n; i++) {
    let elems = [
      document.getElementById("datecol").children[i],
      document.getElementById("col1").children[i],
      document.getElementById("col2").children[i],
      document.getElementById("col3").children[i]
    ];

    elems.forEach(e => {
      e.onmouseover = () => elems.forEach(el => el.style.background = "rgba(255,255,0,0.3)");
      e.onmouseout  = () => elems.forEach(el => el.style.background = "");
    });
  }
}

// Igualar alturas de filas según la celda más alta
function equalizeRowHeights() {
  let n = data.length;

  for (let i = 0; i < n; i++) {
    let elems = [
      document.getElementById("datecol").children[i],
      document.getElementById("col1").children[i],
      document.getElementById("col2").children[i],
      document.getElementById("col3").children[i]
    ];

    let maxHeight = Math.max(...elems.map(e => e.scrollHeight));
    elems.forEach(e => e.style.height = maxHeight + "px");
  }
}