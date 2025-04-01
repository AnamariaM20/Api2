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

  const [bookings, setBookings] = useState([]); // Mutăm starea la nivel global

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookings bookings={bookings} setBookings={setBookings} />} />
        <Route path="/add" element={<AddBook setBookings={setBookings} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
