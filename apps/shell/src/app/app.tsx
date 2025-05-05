import React, { Suspense } from 'react';

const Auroria = React.lazy(() => import('auroria/Component'));
const Borealis = React.lazy(() => import('borealis/Component'));
const Cygnus = React.lazy(() => import('cygnus/Component'));

export function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start">
        <Auroria />
        <Borealis />
        <Cygnus />
      </div>
    </Suspense>
  );
}

export default App;