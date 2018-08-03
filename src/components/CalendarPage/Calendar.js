import React, { Component } from 'react';


class Calendar extends Component {
    render() {
        let months = 4;
        let currentTime = new Date();
        let today = currentTime.getDate();

        return <div>Calendar</div>;
    }
}

export default Calendar;
