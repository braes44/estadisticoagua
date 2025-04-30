document.getElementById("muestreo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const tipoAgua = document.getElementById("tipoAgua").value;
  const codigo = document.getElementById("codigo").value;
  const descripcion = document.getElementById("descripcion").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const frecuencia = document.getElementById("frecuencia").value;
  const observaciones = document.getElementById("observaciones").value;

  const fecha = new Date();
  const fechaStr = fecha.toLocaleDateString();
  const horaStr = fecha.toLocaleTimeString();

  const tabla = document.getElementById("tablaPuntos").querySelector("tbody");
  const row = tabla.insertRow();
  [usuario, fechaStr, horaStr, tipoAgua, codigo, descripcion, ubicacion, frecuencia, observaciones].forEach(text => {
    const cell = row.insertCell();
    cell.textContent = text;
  });

  this.reset();
});

function exportCSV() {
  const rows = document.querySelectorAll("table tr");
  const csv = Array.from(rows).map(row =>
    Array.from(row.cells).map(cell => cell.textContent).join(",")
  ).join("\n");

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'puntos_muestreo.csv';
  link.click();
}

function importCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split("\n");
    const tbody = document.querySelector("#tablaPuntos tbody");

    lines.forEach((line, index) => {
      if (index === 0 || !line.trim()) return;
      const cells = line.split(",");
      const row = tbody.insertRow();
      cells.forEach(cell => {
        const td = row.insertCell();
        td.textContent = cell;
      });
    });
  };
  reader.readAsText(file);
}
