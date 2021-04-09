import React from "react";
import {Link} from 'react-router-dom'

const Form = (props) => {
  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(props.dog);

  //FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={formData.img}
          onChange={handleChange}
        />
        <input className="form-submit-button" type="submit" value={props.label} />
        <Link to="/">
          <button className="form-submit-button">Home</button>
        </Link>
      </form>
    </div>
  );
};

export default Form;
