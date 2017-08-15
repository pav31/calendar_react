import React from 'react';

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