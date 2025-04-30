import { useState, useEffect } from 'react';
import SamplingPointForm from './components/SamplingPointForm';
import TestResultForm from './components/TestResultForm';
import GraphSection from './components/GraphSection';

function App() {
  const [samplingPoints, setSamplingPoints] = useState([]);
  const [results, setResults] = useState([]);
  const [newPoint, setNewPoint] = useState({ name: '', waterType: 'potable', sampler: '' });
  const [newResult, setNewResult] = useState({
    pointId: '',
    date: new Date().toISOString().split('T')[0],
    microbial: '',
    toc: '',
    ph: '',
    conductivity: '',
    nitrates: '',
    heavyMetals: '',
  });

  // Cargar datos de localStorage
  useEffect(() => {
    const points = JSON.parse(localStorage.getItem('samplingPoints') || '[]');
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    setSamplingPoints(points);
    setResults(results);
  }, []);

  // Guardar datos en localStorage
  useEffect(() => {
    localStorage.setItem('samplingPoints', JSON.stringify(samplingPoints));
    localStorage.setItem('results', JSON.stringify(results));
  }, [samplingPoints, results]);

  // Agregar punto de muestreo
  const addSamplingPoint = (e) => {
    e.preventDefault();
    if (newPoint.name && newPoint.sampler) {
      setSamplingPoints([...samplingPoints, { id: Date.now(), ...newPoint }]);
      setNewPoint({ name: '', waterType: 'potable', sampler: '' });
    }
  };

  // Agregar resultado
  const addResult = (e) => {
    e.preventDefault();
    if (newResult.pointId && newResult.microbial && newResult.toc) {
      setResults([...results, { id: Date.now(), ...newResult }]);
      setNewResult({
        pointId: '',
        date: new Date().toISOString().split('T')[0],
        microbial: '',
        toc: '',
        ph: '',
        conductivity: '',
        nitrates: '',
        heavyMetals: '',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Control de Calidad del Agua</h1>
      <SamplingPointForm
        newPoint={newPoint}
        setNewPoint={setNewPoint}
        addSamplingPoint={addSamplingPoint}
      />
      <TestResultForm
        samplingPoints={samplingPoints}
        newResult={newResult}
        setNewResult={setNewResult}
        addResult={addResult}
      />
      <GraphSection
        samplingPoints={samplingPoints}
        results={results}
        newResult={newResult}
        setNewResult={setNewResult}
      />
    </div>
  );
}

export default App;
