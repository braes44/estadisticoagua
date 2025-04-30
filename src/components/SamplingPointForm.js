function SamplingPointForm({ newPoint, setNewPoint, addSamplingPoint }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Agregar Punto de Muestreo</h2>
      <form onSubmit={addSamplingPoint} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del Punto"
          value={newPoint.name}
          onChange={(e) => setNewPoint({ ...newPoint, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <select
          value={newPoint.waterType}
          onChange={(e) => setNewPoint({ ...newPoint, waterType: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="potable">Potable</option>
          <option value="purified">Purificada</option>
          <option value="sterile">Estéril</option>
        </select>
        <input
          type="text"
          placeholder="Nombre del Muestreador"
          value={newPoint.sampler}
          onChange={(e) => setNewPoint({ ...newPoint, sampler: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Agregar Punto
        </button>
      </form>
    </div>
  );
}

export default SamplingPointForm;
