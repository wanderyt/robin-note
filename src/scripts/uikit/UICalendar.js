import React from 'react';

class UICalendar extends React.Component {
    constructor() {
        super();

        this.state = {
            currentDate: new Date()
        }
    }

    formatMonthYear(date) {
        let options = {year: 'numeric', month: 'numeric'};
        return new Intl.DateTimeFormat('zh-CN', options).format(date);
    }

    handlePrevClick() {
        let currentDate = this.state.currentDate,
            newDate = new Date(),
            currentMonth = currentDate.getMonth();

        // Handle month
        if (currentMonth) {
            newDate.setMonth(currentMonth - 1);
        } else {
            newDate.setMonth(11);
            // Handle year
            newDate.setFullYear(currentDate.getFullYear() - 1)
        }
        this.setState({
            currentDate: newDate
        });
    }

    handleNextClick() {
        let currentDate = this.state.currentDate,
            newDate = new Date(),
            currentMonth = currentDate.getMonth();

        // Handle month
        if (currentMonth === 11) {
            newDate.setMonth(0);
            // Handle year
            newDate.setFullYear(currentDate.getFullYear() + 1)
        } else {
            newDate.setMonth(currentMonth + 1);
        }
        this.setState({
            currentDate: newDate
        });
    }

    render() {
        let monthFormat = this.formatMonthYear(this.state.currentDate),
            weekdayHeader = ['周一','周二','周三','周四','周五','周六','周日'];
        return (
            <div className='UICalendar'>
                <div className='Calendar__Toolbar Calendar__FlexRow'>
                    <div className='Calendar__Title'>{monthFormat}</div>
                    <div className='Calendar__ToolBtns'>
                        <div className='Calendar__ToolBtn PrevBtn'
                            onClick={this.handlePrevClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"><path fill="inherit" fill-rule="evenodd" d="M2.8284 7.071l5.6569 5.657L7.071 14.142 1.4142 8.4853 0 7.071 7.071 0l1.4143 1.4142-5.6569 5.6569z"></path></svg>
                        </div>
                        <div className='Calendar__ToolBtn NextBtn'
                            onClick={this.handleNextClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"><path fill="inherit" fill-rule="evenodd" d="M6.3137 7.071L.657 1.4143 2.071 0l5.6568 5.6569L9.1421 7.071l-7.071 7.071L.6569 12.728l5.6568-5.6568z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className='Calendar__WeekdayHeader Calendar__FlexRow'>
                    {
                        weekdayHeader.map((item) => (
                            <div>{item}</div>
                        ))
                    }
                </div>
            </div>
        )
    }
}