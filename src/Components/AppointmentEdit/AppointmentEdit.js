import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import NavBar from "../../SharedUI/Navbar/Navbar";
import backgroundImage from "../../Assets/images/background.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function AppointmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointmentData, setAppointmentData] = useState(null);
  const [doctorsBySpecialization, setDoctorsBySpecialization] = useState({
    optical: ["Dr. Johnson", "Dr. Smith"],
    heart: ["Dr. Williams", "Dr. Anderson"],
    dental: ["Dr. Brown", "Dr. Taylor"],
  });

  const formik = useFormik({
    initialValues: {
      specialization: "",
      doctorName: "",
      date: "",
      time: "",
    },
    validationSchema: Yup.object({
      specialization: Yup.string().required("Specialization is required"),
      doctorName: Yup.string().required("Doctor name is required"),
      date: Yup.date()
        .required("Date is required")
        .test("future-date", "Please choose a future date", (value) => {
          return new Date(value) > new Date();
        }),
      time: Yup.string().required("Time is required"),
    }),
    onSubmit: (values) => {
      axios
        .patch(`http://localhost:8000/appointments/${id}`, values)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/appointments");
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/appointments/${id}`)
      .then((res) => {
        const appointment = res.data;
        setAppointmentData(appointment);

        // Set the form initial values once the appointment data is fetched
        formik.setValues({
          specialization: appointment.specialization,
          doctorName: appointment.doctorName,
          date: appointment.date,
          time: appointment.time,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  // Wait until appointmentData is fetched before rendering
  if (!appointmentData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Container>
        <br />
        <br />
        <Row>
          <Col md={6}>
            <h2>Edit Appointment</h2>
            <br />
            <br />
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label for="specialization">Specialization:</Label>
                <Input
                  type="select"
                  name="specialization"
                  value={formik.values.specialization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="form-control form-control-alternative"
                >
                  <option value="">Select Specialization</option>
                  <option value="optical">Optical</option>
                  <option value="heart">Heart</option>
                  <option value="dental">Dental</option>
                </Input>
                {formik.touched.specialization &&
                formik.errors.specialization ? (
                  <div className="text-danger">
                    {formik.errors.specialization}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="doctorName">Doctor Name:</Label>
                <Input
                  type="select"
                  name="doctorName"
                  value={formik.values.doctorName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="form-control form-control-alternative"
                >
                  <option value="">Select Doctor</option>
                  {doctorsBySpecialization[formik.values.specialization]?.map(
                    (doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    )
                  )}
                </Input>
                {formik.touched.doctorName && formik.errors.doctorName ? (
                  <div className="text-danger">{formik.errors.doctorName}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="date">Date:</Label>
                <Input
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="form-control form-control-alternative"
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-danger">{formik.errors.date}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="time">Time:</Label>
                <Input
                  type="time"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="form-control form-control-alternative"
                />
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-danger">{formik.errors.time}</div>
                ) : null}
              </FormGroup>
              <div className="d-flex justify-content-between">
                <Button
                  type="submit"
                  style={{ backgroundColor: "#F2A9BA", border: "none" }}
                >
                  <i className="fas fa-check"></i> Save Changes
                </Button>
                <Link to="/appointments">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#60D0D1",
                      color: "white",
                      border: "none",
                    }}
                  >
                    {" "}
                    Back to Appointments{" "}
                  </button>
                </Link>
              </div>
            </Form>
          </Col>
          <Col
            md={6}
            className="col-md-6 background-image"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></Col>
        </Row>
      </Container>
    </>
  );
}

export default AppointmentEdit;
