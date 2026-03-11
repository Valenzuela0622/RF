// script.js

let data = [];
// Columnas seleccionables por el usuario
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

    // Renderiza la columna al cambiar la selección
    sel.onchange = () => {
      renderColumn("col" + (i + 1), sel.value);
    };
  });
}

// Renderiza la columna de fechas (izquierda fija)
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

// Renderiza una columna de contenido según el campo seleccionado
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

// Cambia la cantidad de columnas visibles (1, 2 o 3)
function setLayout(n) {
  for (let i = 1; i <= 3; i++) {
    let c = document.getElementById("col" + i);
    c.style.display = i <= n ? "block" : "none";
  }
}