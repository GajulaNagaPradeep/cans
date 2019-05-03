import React from 'react'
import { mount } from 'enzyme'
import Print from './Print'
import { print, printViewPreparation } from './printUtil/PrintHelper'

jest.mock('./printUtil/PrintHelper')

describe('<Print />', () => {
  const innerNode = <div id="internal" />
  const mountPrintComponent = onCloseCallback => mount(<Print onClose={onCloseCallback} node={innerNode} />)

  it('should render print iframe', () => {
    const printComponent = mountPrintComponent(jest.fn())
    expect(printComponent.find('iframe').length).toBe(1)
  })

  it('renders print iframe with zero in area and absolute position', () => {
    const printComponent = mountPrintComponent(jest.fn())
    expect(printComponent.find('iframe').props().style.height).toBe(0)
    expect(printComponent.find('iframe').props().style.width).toBe(0)
    expect(printComponent.find('iframe').props().style.position).toBe('absolute')
  })

  it('should print and invoke onClose callback', () => {
    const onCloseMock = jest.fn()
    mountPrintComponent(onCloseMock)
    expect(print).toHaveBeenCalledWith('print-frame', printViewPreparation(innerNode))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
