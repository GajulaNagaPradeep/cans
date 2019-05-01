import React from 'react'
import { shallow } from 'enzyme'
import AssessmentFormHeaderTitle from './AssessmentFormHeaderTitle'
import ClientNameTitle from './ClientNameTitle'
import CountyAndCase from './CountyAndCase'

describe('AssessmentFormHeaderTitle', () => {
  const render = ({
    countyName,
    dob,
    firstName,
    isAssessmentReady = true,
    isEstimatedDob,
    lastName,
    middleName,
    serviceSource,
    serviceSourceUIId,
    suffix,
  } = {}) =>
    shallow(
      <AssessmentFormHeaderTitle
        countyName={countyName}
        dob={dob}
        firstName={firstName}
        isAssessmentReady={isAssessmentReady}
        isEstimatedDob={isEstimatedDob}
        lastName={lastName}
        middleName={middleName}
        serviceSource={serviceSource}
        serviceSourceUIId={serviceSourceUIId}
        suffix={suffix}
      />
    )

  it('renders the ClientNameTitle', () => {
    const wrapper = render({
      firstName: 'Bobby',
      dob: '2001-05-23',
      isEstimatedDob: true,
      lastName: 'Breadman',
      middleName: 'Bobster',
      suffix: 'BFG',
    })
    const clientNameTitle = wrapper.find(ClientNameTitle)

    expect(clientNameTitle.props().firstName).toBe('Bobby')
    expect(clientNameTitle.props().dob).toBe('2001-05-23')
    expect(clientNameTitle.props().isEstimatedDob).toBe(true)
    expect(clientNameTitle.props().lastName).toBe('Breadman')
    expect(clientNameTitle.props().middleName).toBe('Bobster')
    expect(clientNameTitle.props().suffix).toBe('BFG')
  })

  it('renders the CountyAndCase info', () => {
    const wrapper = render({
      countyName: 'Los Angeles County',
      isAssessmentReady: false,
      serviceSource: 'REFERRAL',
      serviceSourceUIId: '2341',
    })
    const clientNameTitle = wrapper.find(CountyAndCase)

    expect(clientNameTitle.props().countyName).toBe('Los Angeles County')
    expect(clientNameTitle.props().isAssessmentReady).toBe(false)
    expect(clientNameTitle.props().serviceSource).toBe('REFERRAL')
    expect(clientNameTitle.props().serviceSourceUIId).toBe('2341')
  })
})
