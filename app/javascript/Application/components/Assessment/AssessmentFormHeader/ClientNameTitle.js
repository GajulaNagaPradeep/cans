import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import { formatClientName } from '../../Client/Client.helper'
import { calculateDateDifferenceInYears, isValidDate } from '../../../util/dateHelper'
import ClientDateOfBirth from './ClientDateOfBirth'

class ClientNameTitle extends React.PureComponent {
  formatClientAge(dob) {
    return isValidDate(dob) ? `${calculateDateDifferenceInYears(dob, this.getCurrentDate())} years old` : ''
  }

  getCurrentDate() {
    return moment()
  }

  render() {
    const { dob, isEstimatedDob, firstName, middleName, lastName, suffix } = this.props
    return (
      <div>
        {firstName && lastName ? (
          <div>
            <div className={'card-title-block'}>
              <span id={'child-name'}>
                {formatClientName({ first_name: firstName, middle_name: middleName, last_name: lastName, suffix })}
              </span>
            </div>
            <div className={'helper-text'}>
              <span id={'child-age'}>{this.formatClientAge(dob)}</span>
            </div>
            <div className={'helper-text'}>
              <span id={'child-dob'}>
                <ClientDateOfBirth dob={dob} isEstimated={isEstimatedDob} />
              </span>
            </div>
          </div>
        ) : (
          <div className={'card-title-block'}>
            <span id={'no-data'}>Client Info</span>
          </div>
        )}
      </div>
    )
  }
}

ClientNameTitle.propTypes = {
  dob: PropTypes.string,
  firstName: PropTypes.string,
  isEstimatedDob: PropTypes.bool,
  lastName: PropTypes.string,
  middleName: PropTypes.string,
  suffix: PropTypes.string,
}

ClientNameTitle.defaultProps = {
  dob: null,
  isEstimatedDob: false,
  firstName: null,
  lastName: null,
  middleName: null,
  suffix: null,
}

export default ClientNameTitle
