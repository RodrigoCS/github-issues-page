import { HashRouter, Routes, Route } from 'react-router-dom';

import ListView from './views/ListView';
import DetailView from './views/DetailView';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route exact path='/' element={<ListView />} />
          <Route
            path='/issue/:owner/:repo/:issue_number'
            element={<DetailView />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
