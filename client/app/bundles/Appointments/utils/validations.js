import moment from 'moment';

export const validations= {
    checkMinLength: function(text, minLength) {
        let msg = `length should be at least ${minLength} characters`;
        if(text.length >= minLength) {
            return '';
        }
        return msg;
    },

    timeShouldBeInTheFuture: function(time) {
        let msg = 'can\'t be in the past';
        if(moment(time).isValid() && moment(time).isAfter()) {
            msg = '';
        }
        return msg;
    }
};
