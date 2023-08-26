import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../SharedUI/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import "./AppointmentsList.css";

function AppointmentList() {
  const [Appointmentdata, Appointmentdatachange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const Removefunction = (id) => {
    Swal.fire({
      title: "Are you sure you want to Cancel this appointment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancell it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8000/appointments/" + id)
          .then((res) => {
            Swal.fire(
              "Cancelled!",
              "The appointment has been Cancelled.",
              "success"
            );
            window.location.reload();
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/appointments")
      .then((res) => {
        Appointmentdatachange(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAppointments =
    Appointmentdata?.slice(startIndex, endIndex) || [];

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="card mt-5">
          <div className="card-title text-center">
            <h2 className="mt-3">Your Appointments</h2>
          </div>
          <div className="card-body">
            <table className="table">
              <thead className="bg-dark text-white">
                <tr>
                  <td>Doctor Name</td>
                  <td>Date</td>
                  <td>Time</td>
                  <td>Specialization</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {displayedAppointments.map((Appointment) => (
                  <tr
                    key={Appointment.id}
                    className={Appointment.isChecked ? "checked-row" : ""}
                  >
                    <td>{Appointment.doctorName}</td>
                    <td>{Appointment.date}</td>
                    <td>{Appointment.time}</td>
                    <td>{Appointment.specialization}</td>
                    <td>
                      <button
                        onClick={() => {
                          Removefunction(Appointment.id);
                        }}
                        className="btn mb-2"
                        style={{
                          backgroundColor: "#F2A9BA",
                          border: "none",
                        }}
                      >
                        <FontAwesomeIcon icon={faCancel} />
                      </button>
                      <span className="mx-1" />
                      <Link to={`/appointments/edit/${Appointment.id}`}>
                        <button
                          className="btn mb-2"
                          style={{
                            backgroundColor: "#60D0D1",
                            border: "none",
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </Link>
                      <span className="mx-1" />
                      <input
                        className="custom-checkbox"
                        type="checkbox"
                        checked={Appointment.isChecked}
                        disabled={
                          new Date(Appointment.date + " " + Appointment.time) >
                          new Date()
                        }
                        onChange={() => {
                          Appointment.isChecked = !Appointment.isChecked;
                          Appointmentdatachange([...Appointmentdata]);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="btn btn-light"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-light"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= (Appointmentdata?.length || 0)}
              >
                Next
              </button>
            </div>
            <Link to="/appointment/create">
              <button className="btn btn-dark mt-2">New Appointment (+)</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentList;
