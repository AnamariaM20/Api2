import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddBook = ({ setBookings }) => {
    
  const [dates, setDates] = useState({
    firstname: "",
    lastname: "",
    totalprice: "",
    depositpaid: true,
    bookingdates: {
      checkin: "",
      checkout: "",
    },
    additionalneeds: "",
  });

  const navigate = useNavigate();

  const handleAdd = async (event) => {
    event.preventDefault();
  
    try {
      const postResponse = await fetch("/api/booking/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: dates.firstname,
          lastname: dates.lastname,
          totalprice: Number(dates.totalprice),
          depositpaid: Boolean(dates.depositpaid),
          bookingdates: {
            checkin: dates.bookingdates.checkin,
            checkout: dates.bookingdates.checkout,
          },
          additionalneeds: dates.additionalneeds,
        }),
      });
  
      const postData = await postResponse.json();
      const newId = postData.bookingid;
  
      const res = await fetch(`/api/booking/${newId}`);
      const data = await res.json();
      const newBooking = { bookingid: newId, ...data };
  
      setBookings((prev) => [newBooking, ...prev.slice(0, 9)]);
  
      navigate("/");
    } catch (error) {
      console.error("Eroare:", error);
      alert("it is not working");
    }
  };

  return (
    <div>
      <h2>Add a Booking</h2>
      <form onSubmit={handleAdd}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="Enter First Name"
            value={dates.firstname}
            onChange={(e) => setDates({ ...dates, firstname: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Enter Last Name"
            value={dates.lastname}
            onChange={(e) => setDates({ ...dates, lastname: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="totalprice">Total Price:</label>
          <input
            type="number"
            name="totalprice"
            className="form-control"
            placeholder="Enter Total Price"
            value={dates.totalprice}
            onChange={(e) => setDates({ ...dates, totalprice: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="checkin">Check-In:</label>
          <input
            type="date"
            name="checkin"
            className="form-control"
            value={dates.bookingdates.checkin}
            onChange={(e) =>
              setDates({ ...dates, bookingdates: { ...dates.bookingdates, checkin: e.target.value } })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="checkout">Check-Out:</label>
          <input
            type="date"
            name="checkout"
            className="form-control"
            value={dates.bookingdates.checkout}
            onChange={(e) =>
              setDates({ ...dates, bookingdates: { ...dates.bookingdates, checkout: e.target.value } })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="additionalneeds">Additional Needs:</label>
          <input
            type="text"
            name="additionalneeds"
            className="form-control"
            placeholder="Enter Additional Needs"
            value={dates.additionalneeds}
            onChange={(e) => setDates({ ...dates, additionalneeds: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Booking
        </button>
      </form>
    </div>
  );
};

export default AddBook;
