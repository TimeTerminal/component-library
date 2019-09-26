import PropTypes from 'prop-types';
import React from 'react';
import SelectInput from '../selectInput';
import { Row, Col } from 'react-styled-flexboxgrid';
import moment from 'moment';
import _ from 'lodash';

import css from './styles.scss';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.setupState(props);
    this.onBlur = this.onBlur.bind(this);
    this.onDayChanged = this.onDayChanged.bind(this);
    this.onMonthChanged = this.onMonthChanged.bind(this);
    this.onYearChanged = this.onYearChanged.bind(this);
  }

  // TODO: This is generic, should move to a helper
  getMonthName(n) {
    switch (n) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        // TODO: Should produce a warning?
        return null;
    }
  }

  setupState(props) {
    const yearSelectOptions = [];
    const monthSelectOptions = [];
    const dateDetails = this.getDateDetailsFromDate(props.input.value);
    const daySelectOptions = this.getDaySelectOptions(
      dateDetails.month,
      dateDetails.year
    );

    // last 100 years
    const currentYear = moment().year();
    const startingYear = currentYear - 100;
    for (let i = startingYear; i <= currentYear + 20; i++) {
      yearSelectOptions.push({ label: i, value: i });
    }
    _.times(12, n => {
      monthSelectOptions.push({ label: this.getMonthName(n), value: n });
    });

    return {
      yearSelectOptions,
      monthSelectOptions,
      daySelectOptions,
      ...dateDetails,
      dirty: false,
    };
  }

  getDaySelectOptions(month = 0, year = 2000) {
    const daySelectOptions = [];
    // default to 31
    _.times(this.getDaysForMonth(month, year), n => {
      daySelectOptions.push({ label: n + 1, value: n + 1 });
    });

    return daySelectOptions;
  }

  // 1 = January
  getDaysForMonth(month = 0, year = 2000) {
    return moment.utc([year, month]).daysInMonth();
  }

  getValue(state) {
    const { year, month, day } = state;
    if (!year || month == null || !day) {
      return null;
    }
    return moment.utc([year, month, day]);
  }

  onYearChanged(year) {
    const newState = { year, dirty: true };
    if (this.state.month) {
      newState.daySelectOptions = this.getDaySelectOptions(
        this.state.month || 0,
        year
      );
    }
    if (this.state.days && newState.daySelectOptions.length > this.state.days) {
      newState.days = undefined;
    }
    this.setState(newState);
  }

  onMonthChanged(value) {
    const year = this.state.year || undefined;
    const month = value;
    const daySelectOptions = this.getDaySelectOptions(month || 0, year);
    let days = this.state.days;

    if (this.state.days && daySelectOptions.length > this.state.days) {
      days = undefined;
    }
    this.setState({
      month,
      daySelectOptions,
      days,
      dirty: true,
    });
  }

  onDayChanged(value) {
    this.setState({
      day: value,
      dirty: true,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.input.value) {
      this.setState(this.getDateDetailsFromDate(nextProps.input.value));
    }
  }

  getDateDetailsFromDate(date) {
    const details = {
      year: undefined,
      month: undefined,
      day: undefined,
    };

    if (date) {
      const dateObj = moment.utc(date);
      details.year = dateObj.year();
      details.month = dateObj.month();
      details.day = dateObj.date();
    }

    return details;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (!nextState.dirty) {
      return;
    }
    const newValue = this.getValue(nextState);
    this.triggerChanged(newValue);
    this.props.input.onBlur(newValue);
  }

  triggerChanged(value) {
    this.props.input.onChange(value);
  }

  onBlur() {
    this.props.input.onBlur(this.getValue(this.state));
  }

  getProps(type, date) {
    const { year, month, day } = this.state;
    const props = {
      ...this.props,
      input: {
        ...this.props.input,
      },
    };

    switch (type) {
      case 'year':
        props.input.value = date ? date.year() : year;
        break;
      case 'month':
        props.input.value = date ? date.month() : month;
        break;
      case 'day':
        props.input.value = date ? date.date() : day;
        break;
    }

    return props;
  }

  render() {
    const {
      yearSelectOptions,
      monthSelectOptions,
      daySelectOptions,
      month,
    } = this.state;
    const { input } = this.props;
    const date = input.value ? moment.utc(input.value) : null;
    const yearProps = this.getProps('year', date);
    const monthProps = this.getProps('month', date);
    const dayProps = this.getProps('day', date);

    // Selecting "January" for month produces blank selection. Refer to this: https://github.com/JedWatson/react-select/issues/1151
    // Javascript is also 0 index base when it comes to dates. So changing January to have a value of 1 in the select element won't do.
    // Manually change text of placeholder if January is selected for month and add extra class name to element.
    // When "January" is selected, select element is blank but React state is not so form submission will still work.
    const monthPlaceHolderText = month === 0 ? 'January' : 'Month';
    const monthSelectorSpecialClass = month === 0 ? 'monthSelectorFix' : '';

    return (
      <Row className={css.dateSelector}>
        <Col xs={4}>
          <SelectInput
            className={css.dateSelectorSelect}
            options={yearSelectOptions}
            {...yearProps}
            placeholder="Year"
            onChange={this.onYearChanged}
            onBlur={this.onBlur}
          />
        </Col>
        <Col xs={5}>
          <SelectInput
            className={css.dateSelectorSelect}
            options={monthSelectOptions}
            {...monthProps}
            placeholder={monthPlaceHolderText}
            onChange={this.onMonthChanged}
            onBlur={this.onBlur}
            specialClass={monthSelectorSpecialClass}
          />
        </Col>
        <Col xs={3}>
          <SelectInput
            className={css.dateSelectorSelect}
            options={daySelectOptions}
            {...dayProps}
            placeholder="Day"
            onChange={this.onDayChanged}
            onBlur={this.onBlur}
          />
        </Col>
      </Row>
    );
  }
}

DateSelector.propTypes = {
  input: PropTypes.object.isRequired,
};

export default DateSelector;
