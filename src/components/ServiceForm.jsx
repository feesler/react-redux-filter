import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  addService,
  updateService,
  changeServiceField,
  invalidateServiceField,
  resetServiceForm,
} from '../actions/actionCreators';


const ServiceForm = () => {
  const { values, validation } = useSelector(state => state.serviceForm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeServiceField(name, value));
  }

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetServiceForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.name.length) {
      dispatch(invalidateServiceField('name'));
      return;
    }

    const price = Number(values.price);
    if (!price || price < 0) {
      dispatch(invalidateServiceField('price'));
      return;
    }

    if (values.id) {
      dispatch(updateService(values.id, values.name, values.price));
    } else {
      dispatch(addService(values.name, values.price));
    }
  }

  return (
    <form
      className="service-form"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="service-form__field">
        <label>Service name</label>
        <input
          className={classNames('form-input', { 'is-invalid': !validation.name })}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <span className="invalid-feedback">Name can not be empty</span>
      </div>
      <div className="service-form__field">
        <label>Price</label>
        <input
          className={classNames('form-input', { 'is-invalid': !validation.price })}
          type="text"
          name="price"
          value={values.price}
          onChange={handleChange}
        />
        <span className="invalid-feedback">Price must be a positive number</span>
      </div>
      <button className="form-btn" type="submit">Submit</button>
      { values.id && <button className="form-btn" type="reset">Cancel</button>}
    </form>
  );
};

export default ServiceForm;
