let data = [];
let fields = ["evento", "analisis", "texto"];

// Cargar dataset
fetch("data.json")
  .then(r => r.json())
  .then(d => {
    data = d;

    initSelectors();
    renderRows();
  });

// Inicializar selectores de columna
function initSelectors() {
  ["sel1","sel2","sel3"].forEach((id, i) => {
    const sel = document.getElementById(id);
    fields.forEach(f => {
      const opt = document.createElement("option");
      opt.value = f;
      opt.text = f;
      sel.appendChild(opt);
    });

    sel.onchange = () => renderRows();
  });
}

// Cambiar layout 1/2/3 columnas
function setLayout(n) {
  const rows = document.querySelectorAll(".row");
  rows.forEach(row => {
    for (let i = 0; i < 3; i++) {
      const cell = row.children[i+1]; // +1 porque 0 = fecha
      if(cell) cell.style.display = (i < n) ? "block" : "none";
    }
  });
}

// Renderizar todas las filas
function renderRows() {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  data.forEach(rowData => {
    const row = document.createElement("div");
    row.className = "row";

    // Fecha
    const dateCell = document.createElement("div");
    dateCell.className = "cell date";
    dateCell.innerText = rowData.fecha;
    row.appendChild(dateCell);

    // Columnas seleccionables
    const selCols = [
      document.getElementById("sel1").value || "evento",
      document.getElementById("sel2").value || "analisis",
      document.getElementById("sel3").value || "texto"
    ];

    const colors = ["blue","white","red"];
    selCols.forEach((field, i) => {
      const cell = document.createElement("div");
      cell.className = "cell " + colors[i];
      cell.innerText = rowData[field];
      row.appendChild(cell);
    });

    container.appendChild(row);
  });
}