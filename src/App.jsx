import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Location from './Pages/Location/Location';
import Template from './Partials/Template/Template';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route path="/" element={<Home />} />
          <Route path="/logement/:id" element={<Location />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
