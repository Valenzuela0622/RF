let data = [];
let fields = ["evento", "analisis", "texto"];

// Cargar dataset y ordenar por fecha
fetch("data.json")
  .then(r => r.json())
  .then(d => {
    data = d.sort((a,b)=>{
      const da = a.fecha.split('.');
      const db = b.fecha.split('.');
      const dateA = new Date(`${da[2]}-${da[1]}-${da[0]}`);
      const dateB = new Date(`${db[2]}-${db[1]}-${db[0]}`);
      return dateA - dateB;
    });

    initSelectors();
    renderRows();
  });

// Inicializar selectores de columna
function initSelectors() {
  ["sel1","sel2","sel3"].forEach((id) => {
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
      const cell = row.children[i+1]; // 0 = fecha
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