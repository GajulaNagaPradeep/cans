import React from 'react'
import { mount } from 'enzyme'
import PrintDomainHeader from './PrintDomainHeader'

const fakeProps = {
  text: 'some text',
  total: '10',
}

describe('<PrintDomainHeader />', () => {
  let wrapper
  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a svg', () => {
    wrapper = mount(<PrintDomainHeader {...fakeProps} />)
    const target = wrapper.find('svg')
    expect(target.length).toBe(1)
  })

  it('will render an rect with correct color', () => {
    wrapper = mount(<PrintDomainHeader {...fakeProps} />)
    const target = wrapper.find('rect')
    expect(target.props().style.fill).toBe('#f3f6f7')
  })

  it('will render correct text', () => {
    wrapper = mount(<PrintDomainHeader {...fakeProps} />)
    const target = wrapper.find('text')
    expect(target.at(0).text()).toContain(fakeProps.text)
  })

  describe('with DOMAIN_TOTAL_FEATURE_ENABLED=true env var', () => {
    const tmpValue = process.env.DOMAIN_TOTAL_FEATURE_ENABLED
    beforeAll(() => (process.env.DOMAIN_TOTAL_FEATURE_ENABLED = 'true'))

    afterAll(() => (process.env.DOMAIN_TOTAL_FEATURE_ENABLED = tmpValue))

    it('will render domain total', () => {
      wrapper = mount(<PrintDomainHeader {...fakeProps} />)
      const target = wrapper.find('text')
      expect(target.at(1).text()).toContain(fakeProps.total)
    })
  })

  describe('with DOMAIN_TOTAL_FEATURE_ENABLED=false env var', () => {
    const tmpValue = process.env.DOMAIN_TOTAL_FEATURE_ENABLED
    beforeAll(() => (process.env.DOMAIN_TOTAL_FEATURE_ENABLED = 'false'))

    afterAll(() => (process.env.DOMAIN_TOTAL_FEATURE_ENABLED = tmpValue))

    it('will not render domain total', () => {
      wrapper = mount(<PrintDomainHeader {...fakeProps} />)
      const target = wrapper.find('text')
      expect(target.at(1).exists()).toBeFalsy()
    })
  })
})
