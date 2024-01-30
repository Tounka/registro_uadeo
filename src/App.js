
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from '../src/paginas/Index.jsx'
import AdminCarreras from '../src/paginas/AdminCarreras.jsx'
import Registrar from '../src/paginas/Registrar.jsx'
function App() {
  return (
    <div className="App">
         <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Index />} />
          <Route path="AgregarCarrera" element={<AdminCarreras />} />
          <Route path="Registrar" element={<Registrar />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
