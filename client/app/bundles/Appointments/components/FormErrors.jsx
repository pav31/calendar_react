import React, { PropTypes } from 'react';

export const FormErrors =  ({formErrors}) =>
    <div className="form-errors">
        {Object.keys(formErrors).map((errorField) => {
            return (
              formErrors[errorField].map((error) => {
                  return (
                      <p className="error">{errorField} {error}</p>
                  )
              })
          )
        })}
    </div>

FormErrors.propTypes = {
    formErrors: PropTypes.object.isRequired
}