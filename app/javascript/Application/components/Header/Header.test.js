import React from 'react'
import { mount } from 'enzyme'
import Header from './Header'
import { Icon } from '@cwds/components'

jest.mock('../common/UserAccountService')
const UserAccountService = require('../common/UserAccountService').default

describe('Header', () => {
  describe('when logged in', () => {
    it('shows user name', async () => {
      UserAccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          first_name: 'John',
          last_name: 'Doe',
        })
      )
      const wrapper = await mount(<Header onUserFetchedCallback={jest.fn()} />)
      const displayedUserName = wrapper
        .find('.profile')
        .text()
        .trim()
      expect(displayedUserName).toBe('John Doe')
    })

    it('shows avatar icon', async () => {
      UserAccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          first_name: 'Joanna',
          last_name: 'Doe',
          any_field: 'Any value',
          staff_id: 'ABC',
        })
      )
      const wrapper = await mount(<Header onUserFetchedCallback={jest.fn()} />)
      expect(wrapper.find(Icon).props().name).toBe('user')
    })

    it('invokes callback', async () => {
      const mockCallback = jest.fn()
      UserAccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          staff_id: 'id',
        })
      )
      await mount(<Header onUserFetchedCallback={mockCallback} />)
      expect(mockCallback.mock.calls.length).toBe(1)
      expect(mockCallback.mock.calls[0][0]).toBe('id')
    })

    it('should invoke #logout() on logout button click', async () => {
      // given
      const spy = jest.spyOn(Header.prototype, 'logout').mockImplementation(() => {})
      UserAccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          staff_id: 'id',
        })
      )
      const wrapper = await mount(<Header />)

      // when
      wrapper.find('.profile-avatar button').simulate('click')
      wrapper.find('.profile-avatar a').simulate('click')

      // then
      expect(spy.mock.calls.length).toBe(1)
    })
  })

  describe('when failed to fetch user', () => {
    it('shows empty user name', async () => {
      UserAccountService.fetchCurrent.mockReturnValue(Promise.reject(new Error('e')))
      const wrapper = await mount(<Header onUserFetchedCallback={jest.fn()} />)
      const displayedUserName = wrapper
        .find('.profile')
        .text()
        .trim()
      expect(displayedUserName).toBe('')
    })

    it('does not invoke callback', async () => {
      UserAccountService.fetchCurrent.mockReturnValue(Promise.reject(new Error('e')))
      const mockCallback = jest.fn()
      await mount(<Header onUserFetchedCallback={mockCallback} />)
      expect(mockCallback.mock.calls.length).toBe(0)
    })
  })
})
