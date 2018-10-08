import React from 'react'
import '../../config/enzyme'
import { mount } from 'enzyme'
import Signup from './signup'

describe('Signup', () => {
  it('successful sign up', async () => {
    let promise = {}
    const fakeUser = {
      signup: jest
        .fn()
        .mockImplementation(
          () => (promise = Promise.resolve({ success: true }))
        ),
    }
    const fakeHistory = { push: jest.fn() }
    const wrapper = mount(<Signup user={fakeUser} history={fakeHistory} />)
    wrapper
      .find('[type="email"]')
      .simulate('change', { target: { name: 'email', value: 'some@mail' } })
    wrapper
      .find('[type="text"]')
      .simulate('change', { target: { name: 'username', value: 'someone' } })
    const pass = wrapper.find('[type="password"]')
    pass
      .first()
      .simulate('change', { target: { name: 'password', value: 'secret' } })
    pass
      .last()
      .simulate('change', { target: { name: 'password', value: 'secret' } })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    await promise
    expect(fakeHistory.push).toBeCalledWith('/')
    const params = {
      email: 'some@mail',
      password: 'secret',
      username: 'someone',
    }
    expect(fakeUser.signup).toBeCalledWith(params)
  })
  it('unsuccessful sign up', async () => {
    let promise = {}
    const fakeUser = {
      signup: jest.fn().mockImplementation(
        () =>
          (promise = Promise.resolve({
            success: false,
            message: 'some error',
          }))
      ),
    }
    const fakeHistory = { push: jest.fn() }
    const wrapper = mount(<Signup user={fakeUser} history={fakeHistory} />)
    wrapper
      .find('[type="email"]')
      .simulate('change', { target: { name: 'email', value: 'some@mail' } })
    wrapper
      .find('[type="text"]')
      .simulate('change', { target: { name: 'username', value: 'someone' } })
    const pass = wrapper.find('[type="password"]')
    pass
      .first()
      .simulate('change', { target: { name: 'password', value: 'secret' } })
    pass
      .last()
      .simulate('change', { target: { name: 'password', value: 'secret' } })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    await promise
    expect(fakeHistory.push).toBeCalledWith('/signup', { error: 'some error' })
    const params = {
      email: 'some@mail',
      password: 'secret',
      username: 'someone',
    }
    expect(fakeUser.signup).toBeCalledWith(params)
  })
})
