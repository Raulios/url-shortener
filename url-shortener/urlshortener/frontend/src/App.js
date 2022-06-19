import './App.css';
import { Main } from './feature/Main/component'
import { Stats } from './feature/Stats/component'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            
          </Route>
          <Route path="stats/:shortenedUrlId" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;
