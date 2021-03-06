import React from 'react'
import { DataGrid, Icon } from '@cwds/components'
import ComparisonInnerTable from './ComparisonInnerTable'
import { mount } from 'enzyme'
import { fakeData } from '../AssessmentComparison.test.js'
import * as helper from './comparisonTableHelper'
const fakeProps = {
  key: 'somekey',
  domainCode: 'TRM',
  items: fakeData.aboveSix.domains[0].items,
  assessmentDates: fakeData.aboveSix.event_dates,
  i18n: { key: 'value' },
}

describe('<ComparisonInnerTable />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ComparisonInnerTable {...fakeProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a DataGrid', () => {
    const target = wrapper.find(DataGrid)
    expect(target.length).toBe(1)
  })

  it('will render a column for names, each assessment, and an expansion placeholder,total 7 columns', () => {
    const target = wrapper.find(DataGrid)
    expect(target.props().columns.length).toBe(7)
  })

  it('DataGrid will be rendered with other correct props', () => {
    const target = wrapper.find(DataGrid)
    expect(target.props().sortable).toBe(false)
    expect(target.props().defaultPageSize).toBe(50)
    expect(target.props().showPaginationBottom).toBe(false)
  })

  it('itemRatingSwitcher will be invoked by itemRatingCols accessor', () => {
    const itemRatingSwitcherSpy = jest.spyOn(helper, 'itemRatingSwitcher')
    const target = wrapper.instance().itemRatingColsGenerator()[0].accessor
    target(fakeProps.items[0])
    expect(itemRatingSwitcherSpy).toHaveBeenCalledTimes(1)
    itemRatingSwitcherSpy.mockReset()
  })

  it('Icon will be rendered with correct props', () => {
    const target = wrapper.find(Icon)
    expect(
      target
        .find(Icon)
        .at(1)
        .props().icon
    ).toBe('arrow-up')
    expect(
      target
        .find(Icon)
        .at(1)
        .props().rotation
    ).toBe(180)
  })

  it('getTitle will be invoked by itemNameCol accessor', () => {
    const getTitleSpy = jest.spyOn(helper, 'getTitle')
    const target = wrapper.find(DataGrid).props().columns[1].accessor
    target(fakeProps.items[0])
    expect(getTitleSpy).toHaveBeenCalledTimes(1)
    getTitleSpy.mockReset()
  })
})
