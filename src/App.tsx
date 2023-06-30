import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import { QSearchBar } from './components/QSearchBar';
import { EmbeddingContext } from 'amazon-quicksight-embedding-sdk/dist/types';
import { createEmbeddingContext } from 'amazon-quicksight-embedding-sdk';
import { QuickSightEmbedContext } from './contexts/QuickSightEmbedContext';

function App() {
  const [embeddingContext, setEmbeddingContext] = useState<EmbeddingContext | null>(null);
  useEffect(() => {
    const fetchEmbeddingContext = async () => {
      const context = await createEmbeddingContext();
      setEmbeddingContext(context);
    };

    fetchEmbeddingContext();
  }, []);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/q">QuickSight Q</Link>
            </li>
          </ul>
        </nav>
        <QuickSightEmbedContext.Provider value={embeddingContext}>
          <Routes>
              <Route path="/" element={
                <Home />
              } />
              <Route path="/q" element={
                  <QSearchBar />
                } />
            
          </Routes>
        </QuickSightEmbedContext.Provider>
      </div>
    </Router>
  );
}

export default App;