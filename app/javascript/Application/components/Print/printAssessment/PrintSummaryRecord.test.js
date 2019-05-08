import React from 'react'
import { shallow } from 'enzyme'
import PrintSummaryRecord from './PrintSummaryRecord'

describe('<PrintSummaryRecord />', () => {
  const render = ({ title = 'Strengths', items = ['Family Strengths', 'Interpersonal'] } = {}) =>
    shallow(<PrintSummaryRecord title={title} items={items} />)

  it('renders assessment summary record header', () => {
    const wrapper = render()
    expect(wrapper.find('#summary-header').text()).toBe('Strengths')
  })

  it('renders assessment summary record with correct amount and content', () => {
    const wrapper = render()
    const target = wrapper.find('#item')
    expect(target.length).toBe(2)
    expect(target.at(0).text()).toContain('Family Strengths')
    expect(target.at(1).text()).toContain('Interpersonal')
  })

  it('does not render assessment summary record when items value is null', () => {
    const wrapper = render({ title: 'Strengths', items: [null] })
    const target = wrapper.find('#val')
    expect(target.at(0).props().children).toEqual([null])
  })
})
