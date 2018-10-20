import React from 'react'
import '../../config/enzyme'
import { mount } from 'enzyme'
import Signin from './signin'

describe('Signin', () => {
  it('successful sign in', () => {
    expect.assertions(2)
    const fakeUser = {
      signin: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ success: true })),
    }
    const fakeHistory = {
      push: (path) => expect(path).toBe('/'),
    }
    const wrapper = mount(<Signin user={fakeUser} history={fakeHistory} />)
    wrapper
      .find('[type="email"]')
      .simulate('change', { target: { name: 'email', value: 'some@mail' } })
    wrapper
      .find('[type="password"]')
      .simulate('change', { target: { name: 'password', value: 'secret' } })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(fakeUser.signin).toBeCalledWith({
      email: 'some@mail',
      password: 'secret',
    })
  })
  it('unsuccessful sign in', () => {
    expect.assertions(3)
    const fakeUser = {
      signin: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ success: false, message: 'some error' })
        ),
    }
    const fakeHistory = {
      push: (path, state) => {
        expect(path).toBe('/signin')
        expect(state).toMatchObject({ error: 'some error' })
      },
    }
    const wrapper = mount(<Signin user={fakeUser} history={fakeHistory} />)
    wrapper
      .find('[type="email"]')
      .simulate('change', { target: { name: 'email', value: 'some@mail' } })
    wrapper
      .find('[type="password"]')
      .simulate('change', { target: { name: 'password', value: 'secret' } })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(fakeUser.signin).toBeCalledWith({
      email: 'some@mail',
      password: 'secret',
    })
  })
  it('show error message', () => {
    const fakeLocation = {
      state: {
        error: 'error message',
      },
    }
    const wrapper = mount(<Signin location={fakeLocation} />)
    expect(wrapper.find('[name="error"]')).toHaveLength(1)
  })
})
