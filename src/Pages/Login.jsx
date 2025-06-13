import { useState } from "react";
import { NavLink } from "react-router-dom";

function Login() {
  const formIntialState = {
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
    console.dir(formData);
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
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
              name="password"
              value={formData.password}
              type="password"
              className="form-control mb-3"
              id="password"
              onChange={handleForm}
              required
            />
            <button className="btn btn-primary btn me-3">Login</button>
            <NavLink className="btn btn-secondary btn" to="/register">
              Register
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
