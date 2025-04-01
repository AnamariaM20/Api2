import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Bookings from "./Bookings";
import AddBook from "./AddBook";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
{/* <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<EditProduct />} />
            <Route path="/read/:id" element={<Read />} />
          </>
        )}
      </Routes> */}
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Bookings />} />
      <Route path="/add" element={<AddBook />} />
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
