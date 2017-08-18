import React from 'react';
import update from 'immutability-helper';
import moment from 'moment';
import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';
import { FormErrors } from './FormErrors';

export default class Appointments extends React.Component {
    constructor (props, _railsContext) {
        super(props);
        this.state = {
            appointments: this.props.appointments,
            title: {value: '', valid: false},
            appt_time: {value: '', valid: false},
            formValid: false,
            formErrors: {}
        }
    }

    handleUserInput = (fieldName, fieldValue, validations) => {
        const newFieldState = update(this.state[fieldName],
                                     {value: {$set: fieldValue}});

        this.setState({[fieldName]: newFieldState},
                      () => { this.validateField(fieldName, fieldValue, validations) });
    }

    validateField (fieldName, fieldValue, validations) {
        let fieldValid;
        let fieldErrors = validations.reduce((errors, v) => {
            let e = v(fieldValue);
            if(e != '') {
                errors.push(e);
            }
            return(errors);
        }, []);

        fieldValid = fieldErrors.length === 0;

        const newFieldState = update(this.state[fieldName],
                                     {valid: {$set: fieldValid}});
        const newFormErrors = update(this.state.formErrors,
                                     {$merge: {[fieldName]: fieldErrors}});
        this.setState({[fieldName]: newFieldState,
                       formErrors: newFormErrors}, this.validateForm);
    }

    validateForm () {
        this.setState({formValid: this.state.title.valid &&
                                  this.state.appt_time.valid
        })
    }

    handleFormSubmit = () => {
        const appointment = {title: this.state.title.value,
                             appt_time: this.state.appt_time.value};
        $.post('/appointments',
            {appointment: appointment})
            .done((data) => {
                this.addNewAppointment(data);
                this.resetFormErrors();
            })
            .fail((response) => {
                this.setState({formErrors: response.responseJSON});
                console.log(response);
            });
    }

    resetFormErrors () {
        this.setState({formErrors: {}});
    }

    addNewAppointment (appointment) {
        const appointments = update(this.state.appointments, { $push: [appointment]});
        this.setState({
            appointments: appointments.sort(function(a, b) {
                return new Date(a.appt_time) - new Date(b.appt_time);
            })
        });
    }

    render () {
        return (
            <div>
                <FormErrors formErrors={this.state.formErrors} />
                <AppointmentForm title={this.state.title.value}
                                 appt_time={this.state.appt_time.value}
                                 formValid={this.state.formValid}
                                 onUserInput={this.handleUserInput}
                                 onFormSubmit={this.handleFormSubmit} />

                <AppointmentsList appointments={this.state.appointments} />
            </div>
        )
    }
}