import Search from "./Components/Search";
import Favorites from "./Components/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route index element={<Search/>}/>
          <Route path="favorites" element={<Favorites />}/>
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
