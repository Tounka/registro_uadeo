
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from '../src/paginas/Index.jsx'
import AdminCarreras from '../src/paginas/AdminCarreras.jsx'
import Registrar from '../src/paginas/Registrar.jsx'
import Ingresar from '../src/paginas/IngresarRegistro.jsx'
import Actualizar from '../src/paginas/Actualizar.jsx'
import Consultas from  './paginas/Consultas.jsx'
import { Footer } from './componentes/Displays.jsx';
function App() {
  return (
    <div className="App">
         <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Index />} />
          <Route path="AgregarCarrera" element={<AdminCarreras />} />
          <Route path="Registrar" element={<Registrar />} />
          <Route path="Ingresar" element={<Ingresar />} />
          <Route path="Actualizar" element={<Actualizar />} />
          <Route path="Consultas" element={<Consultas />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer textoPrincipalFooter= 'Desarollado por Ramon Castillo' textoSecundarioFooter='Luisarraca@hotmail.com - 6691382961' />
    </div>
  );
}

export default App;
