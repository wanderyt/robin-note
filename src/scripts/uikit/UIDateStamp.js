import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/uikit/UIDateStamp.scss';

class UIDatestampYear extends React.Component {
    constructor(props = {}) {
        super(props);
    }

    render() {
        let date = new Date(this.props.value),
            currentYear = new Date().getYear();

        if (date.getYear() > currentYear) {
            return (
                <span>
                    {date.getYear() + 1900}
                </span>
            );
        } else {
            return null;
        }
    }
};

UIDatestampYear.displayName = "UIDatestampYear";
UIDatestampYear.propTypes = {
    style: PropTypes.string,
    value: PropTypes.string
};

class UII18NDateFormatter extends React.Component {

    constructor(props = {}) {
        super(props);

        this.WEEKDAY_MAP = {
            0: 'SUN',
            1: 'MON',
            2: 'TUE',
            3: 'WEN',
            4: 'THU',
            5: 'FRI',
            6: 'SAT'
        };

        this.MONTH_MAP = {
            0: 'JAN',
            1: 'FEB',
            2: 'MAR',
            3: 'APR',
            4: 'MAY',
            5: 'JUN',
            6: 'JUL',
            7: 'AUG',
            8: 'SEP',
            9: 'OCT',
            10: 'NOV',
            11: 'DEC'
        };
    }

    padZero(date) {
        return date > 9 ? date + '' : '0' + date;
    }

    render() {
        let date = new Date(this.props.value),
            value;

        if (this.props.style === 'weekday_short') {
            value = this.WEEKDAY_MAP[date.getDay()];
        } else if (this.props.style === 'datestamp_month_day') {
            value = this.MONTH_MAP[date.getMonth()] + ' ' + this.padZero(date.getDate());
        }
        return (
            <span>
                {value}
            </span>
        );
    }
};

UII18NDateFormatter.displayName = "UII18NDateFormatter";
UII18NDateFormatter.propTypes = {
    style: PropTypes.string,
    value: PropTypes.string
};

class UIDateStamp extends React.Component {
    compareDates(fromDate, toDate) {
        let fromYear = new Date(fromDate).getYear(),
            toYear = new Date(toDate).getYear(),
            fromMonth = new Date(fromDate).getMonth(),
            toMonth = new Date(toDate).getMonth(),
            currentYear = new Date().getYear();

        return {
            isMultiMonths: toDate && (fromMonth !== toMonth || (fromMonth === toMonth && fromYear !== toYear))
        }
    }

    render() {
        let {
            isTBD = this.props.isTBD,
            isMultiDays = Boolean(this.props.toDateLocal),
            isMultiMonths = false,
            isFutureYear = false
        } = this.compareDates(this.props.dateLocal, this.props.toDateLocal),
            toDay = new Date(this.props.toDateLocal).getDate();

        return (
            <section
                className={`UIDatestamp`} >
                <section
                    className={`date-stamp-${this.props.dateType || 'standard'} date-container`}>
                    <section
                        className={`date-stamp-day ${isTBD ? 'date-stamp-day-isTBD' : ' '}`}>
                        {
                            !isTBD && <UII18NDateFormatter style='weekday_short' value={this.props.dateLocal} />
                        }
                        {
                            !isTBD && isMultiDays && '+'
                        }
                    </section>
                    {
                        (!isTBD) &&
                        <section
                            className={`date-stamp-month-dd`}>
                            <UII18NDateFormatter style='datestamp_month_day' value={this.props.dateLocal} />
                            {
                                isMultiDays ? '-' : ''
                            }
                            {
                                !isMultiMonths && isMultiDays ? toDay : ''
                            }
                        </section>
                    }
                    {
                        (!isTBD && isMultiMonths) &&
                        <section
                            className={`date-stamp-month-dd`}>
                            <UII18NDateFormatter style='datestamp_month_day' value={this.props.toDateLocal} />
                        </section>
                    }
                    <section
                        className={`date-stamp-month-dd`}>
                        <UIDatestampYear
                            display='future'
                            style='datestamp_month_day'
                            value={this.props.toDateLocal || this.props.dateLocal} />
                    </section>
                </section>
            </section>
        )
    }
};

UIDateStamp.propTypes = {
    date: PropTypes.string,
    isTBD: PropTypes.bool
};
UIDateStamp.displayName = "UIDateStamp";

export default UIDateStamp;