function TestResultForm({ samplingPoints, newResult, setNewResult, addResult }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newResult.pointId && newResult.microbial && newResult.toc) {
      const point = samplingPoints.find((p) => p.id === newResult.pointId);
      if (point.waterType === 'purified') {
        if (parseFloat(newResult.toc) > 500) {
          alert('Error: TOC debe ser <500 ppb para agua purificada');
          return;
        }
        if (parseFloat(newResult.microbial) > 100) {
          alert('Error: Recuento microbiano debe ser <100 CFU/mL para agua purificada');
          return;
        }
        if (parseFloat(newResult.conductivity) > 1.3) {
          alert('Error: Conductividad debe ser <1.3 µS/cm para agua purificada');
          return;
        }
      }
      if (point.waterType === 'sterile') {
        if (parseFloat(newResult.microbial) > 0) {
          alert('Error: Recuento microbiano debe ser 0 CFU/mL para agua estéril');
          return;
        }
      }
      addResult(e);
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Agregar Resultado de Prueba</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={newResult.pointId}
          onChange={(e) => setNewResult({ ...newResult, pointId: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar Punto de Muestreo</option>
          {samplingPoints.map((point) => (
            <option key={point.id} value={point.id}>
              {point.name} ({point.waterType})
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newResult.date}
          onChange={(e) => setNewResult({ ...newResult, date: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Recuento Microbiano (CFU/mL)"
          value={newResult.microbial}
          onChange={(e) => setNewResult({ ...newResult, microbial: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="TOC (ppb)"
          value={newResult.toc}
          onChange={(e) => setNewResult({ ...newResult, toc: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="pH"
          step="0.1"
          value={newResult.ph}
          onChange={(e) => setNewResult({ ...newResult, ph: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Conductividad (µS/cm)"
          value={newResult.conductivity}
          onChange={(e) => setNewResult({ ...newResult, conductivity: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Nitratos (mg/L)"
          value={newResult.nitrates}
          onChange={(e) => setNewResult({ ...newResult, nitrates: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Metales Pesados (ppb)"
          value={newResult.heavyMetals}
          onChange={(e) => setNewResult({ ...newResult, heavyMetals: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Agregar Resultado
        </button>
      </form>
    </div>
  );
}

export default TestResultForm;
