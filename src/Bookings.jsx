import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { bookingid } = useParams();

  useEffect(() => {
    const fetchInitialBookings = async () => {
      try {
        const response = await fetch("/api/booking/");
        const ids = await response.json();
        const firstTen = ids.slice(0, 10);

        const bookingDetails = await Promise.all(
          firstTen.map(async (entry) => {
            const resDetail = await fetch(`/api/booking/${entry.bookingid}`);
            const data = await resDetail.json();
            return { bookingid: entry.bookingid, ...data };
          })
        );

        setBookings(bookingDetails);
      } catch (error) {
        console.error("it is not working", error);
      }
    };

    const fetchSingleBooking = async () => {
      try {
        const response = await fetch(`/api/booking/${bookingid}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const newBooking = { bookingid: Number(bookingid), ...data };

        setBookings((prevList) => {
          const updated = [newBooking, ...prevList];
          const unique = updated.filter(
            (item, index, self) =>
              index === self.findIndex((b) => b.bookingid === item.bookingid)
          );
          return unique.slice(0, 10);
        });
      } catch (error) {
        console.error("it is not working", error);
      }
    };

    if (bookingid) {
      fetchSingleBooking();
    } else {
      fetchInitialBookings();
    }
  }, [bookingid]);

  return (
    <div className="container mt-4">
      <Link to="/add" className="btn btn-success mb-3">
        Adaugă o rezervare
      </Link>
      <h2>{bookingid ? `Details booking #${bookingid}` : "First ten bookings"}</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Price</th>
            <th>Deposit</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Additional Needs</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingid}>
              <td>{booking.bookingid}</td>
              <td>{booking.firstname}</td>
              <td>{booking.lastname}</td>
              <td>{booking.totalprice}</td>
              <td>{booking.depositpaid ? "Yes" : "No"}</td>
              <td>{booking.bookingdates?.checkin || "–"}</td>
              <td>{booking.bookingdates?.checkout || "–"}</td>
              <td>{booking.additionalneeds || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
