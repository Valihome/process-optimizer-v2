import React, { useState } from 'react';
const API_BASE = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [domeniu, setDomeniu] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domeniu, description }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-10'>
      <h1 className='text-3xl font-semibold mb-6'>Process Optimizer v2</h1>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-2xl shadow-md w-full max-w-lg'>
        <select value={domeniu} onChange={(e) => setDomeniu(e.target.value)} className='w-full border rounded p-2 mb-4'>
          <option value=''>-- Alege Domeniul Procesului --</option>
          <option>IT & Dezvoltare</option>
          <option>HR</option>
          <option>Financiar</option>
          <option>Logistică</option>
          <option>Servicii Clienți</option>
        </select>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder='Descrie procesul...' className='w-full border rounded p-3 mb-4'></textarea>
        <button type='submit' disabled={loading} className='w-full bg-black text-white py-2 rounded'>{loading ? 'Analizez...' : 'Analizează'}</button>
      </form>
      {result && (
        <div className='mt-6 w-full max-w-2xl bg-white p-6 rounded-2xl shadow'>
          <h2 className='text-xl font-medium mb-3'>Rezultate</h2>
          <p className='text-gray-700 mb-4'>{result.analiza_generala}</p>
          {result.oportunitati_optimizare && result.oportunitati_optimizare.map((o, i) => (
            <div key={i} className='border-t pt-2 mt-2 text-sm text-gray-600'>
              <strong>{o.pas_proces_original}</strong><br />
              {o.solutie_recomandata}<br />
              <em>{o.instrument_sugerat}</em>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
