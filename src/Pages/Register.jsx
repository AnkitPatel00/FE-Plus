import { useState } from "react";
import { NavLink } from "react-router-dom";

function Register() {
  const formIntialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formIntialState);

  function handleForm(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <label className="form-label" htmlFor="fisrtName">
              First Name
            </label>
            <input
              value={formData.firstname}
              name="firstname"
              type="text"
              className="form-control mb-3"
              placeholder="Fisrt Name"
              id="fisrtName"
              onChange={handleForm}
              required
            />
            <label className="form-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              value={formData.lastname}
              name="lastname"
              type="text"
              className="form-control mb-3"
              placeholder="Last Name"
              id="lastName"
              onChange={handleForm}
              required
            />

            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              value={formData.email}
              name="email"
              type="email"
              className="form-control mb-3"
              placeholder="email@domain.com"
              id="email"
              onChange={handleForm}
              required
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              value={formData.password}
              name="password"
              type="password"
              className="form-control mb-3"
              id="password"
              onChange={handleForm}
              required
            />
            <button className="btn btn-primary btn me-3">Register</button>
            <NavLink className="btn btn-secondary btn" to="/login">
              Login
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
