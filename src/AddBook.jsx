import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log("Submitting:", dates);

        if (!dates.firstname || !dates.lastname || !dates.totalprice || !dates.bookingdates.checkin || !dates.bookingdates.checkout) {
            alert("Please fill in all required fields.");
            return;
        }

        let result = await fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dates),
        });

        result = await result.json();
        console.log("Response:", result);

        if (result) {
            setBookings(prev => [...prev, result]); 
            navigate("/"); 
        }
    };

    return (
        <>
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
                        onChange={(e) => setDates({ ...dates, totalprice: Number(e.target.value) })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="depositpaid">Deposit Paid:</label>
                    <input
                        type="checkbox"
                        name="depositpaid"
                        className="form-control"
                        checked={dates.depositpaid}
                        onChange={(e) => setDates({ ...dates, depositpaid: e.target.checked })}
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
                            setDates(prev => ({
                                ...prev,
                                bookingdates: { ...prev.bookingdates, checkin: e.target.value },
                            }))
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
                            setDates(prev => ({
                                ...prev,
                                bookingdates: { ...prev.bookingdates, checkout: e.target.value },
                            }))
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
                <button className="btn btn-success" type="submit">
                    Add Booking
                </button>
            </form>
        </>
    );
};

export default AddBook;
