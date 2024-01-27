
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from '../src/paginas/Index.jsx'
function App() {
  return (
    <div className="App">
         <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Index />} />
 
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
