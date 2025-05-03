import React, { Suspense } from 'react';

const Auroria = React.lazy(() => import('auroria/Component'));
const Borealis = React.lazy(() => import('borealis/Component'));
const Cygnus = React.lazy(() => import('cygnus/Component'));

export function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Auroria />
      <Borealis />
      <Cygnus />
    </Suspense>
  );
}

export default App;