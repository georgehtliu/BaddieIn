import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

export default function App() {
  const [status, setStatus] = useState('Loading server status...');

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Unexpected response ${response.status}`);
        }
        const data = await response.json();
        setStatus(`Server online: ${data.message}`);
      })
      .catch((error) => {
        setStatus(`Unable to reach server: ${error.message}`);
      });
  }, []);

  return (
    <main className="app">
      <h1>LinkedIn Baddie Finder</h1>
      <p>{status}</p>
      <p>
        Start editing <code>client/src/App.jsx</code> to build out your UI.
      </p>
    </main>
  );
}

