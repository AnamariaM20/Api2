import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Bookings = ({ bookings, setBookings }) => {

    useEffect(() => {
        fetch("/api/booking")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setBookings(data)) 
            .catch((error) => console.error("Error fetching bookings:", error));
    }, []);

    return (
        <div>
            <Link to="/add" className="btn btn-sm btn-info me-2">Add</Link>   
            <h2>Bookings</h2>

            <table className="table table-striped">
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
                            <td>{booking.bookingdates ? booking.bookingdates.checkin : "N/A"}</td>
                            <td>{booking.bookingdates ? booking.bookingdates.checkout : "N/A"}</td>
                            <td>{booking.additionalneeds || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;
