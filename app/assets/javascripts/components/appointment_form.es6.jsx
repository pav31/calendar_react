class AppointmentForm extends React.Component {
    handleChange (e) {
        const name = e.target.name;
        obj = {};
        obj[name] = e.target.value;
        this.props.onUserInput(obj);
    }

    setApptTime (e) {
        const name = 'appt_time';
        obj = {};
        if(obj[name] = e.toDate()) {
            this.props.onUserInput(obj);
        }
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.onFormSubmit();
    }

    render () {
        const inputProps = {
            name: 'appt_time'
        };

        return (
            <div>
                <h2>Make a new appointment</h2>
                <Label label="Enter a title, date and time" />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input name="title" placeholder="Appointment title"
                           value={this.props.title}
                           onChange={(event) => this.handleChange(event)} />
                    <Datetime input={false}
                              open={true}
                              inputProps={inputProps}
                              value={this.props.appt_time}
                              onChange={(event) => this.setApptTime(event)}
                    />
                    <input type="submit" value="Create" className="submit-button" />
                </form>
            </div>
        )
    }
}