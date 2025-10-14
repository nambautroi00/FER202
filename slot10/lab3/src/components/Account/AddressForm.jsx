import React from "react";
import { Form, Button } from "react-bootstrap";

class AddressForm extends React.Component {
  render() {
    const { formData, errors, handleChange, onPrevious, onSubmit } = this.props;

    return (
      <>
        <h5 className="mb-3">
          <i className="bi bi-geo-alt-fill text-primary"></i> Address Information
        </h5>

        {/* Street */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-geo-fill me-2"></i> Street *
          </Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Enter your street address"
            isInvalid={!!errors.street}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.street && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.street}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* City */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-buildings-fill me-2"></i> City *
          </Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            isInvalid={!!errors.city}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.city && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.city}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* State */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-geo-alt me-2"></i> State *
          </Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your state/province"
            isInvalid={!!errors.state}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.state && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.state}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Zip Code */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-mailbox me-2"></i> Zip Code *
          </Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Enter your zip/postal code"
            isInvalid={!!errors.zip}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.zip}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Country */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-flag-fill me-2"></i> Country *
          </Form.Label>
          <Form.Select
            name="country"
            value={formData.country}
            onChange={handleChange}
            isInvalid={!!errors.country}
            required
          >
            <option value="">Select a country</option>
            <option value="Vietnam">Vietnam</option>
            <option value="United States">United States</option>
            <option value="Japan">Japan</option>
            <option value="France">France</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.country && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.country}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onPrevious}>
            Previous
          </Button>
          <Button variant="success" type="submit" onClick={onSubmit}>
            Finish
          </Button>
        </div>
      </>
    );
  }
}

export default AddressForm;

