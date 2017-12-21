import React from 'react'
import '../../config/enzyme'
import { shallow } from 'enzyme'
import Tagger from './tagger'

describe('Tagger', () => {
  it('initial render', () => {shallow(<Tagger />)})
  it('contains input and button', () => {
    const wrapper = shallow(<Tagger />)
    expect(wrapper.containsAllMatchingElements([
      <input type='text' />,
      <button>Add</button>
    ])).toBe(true)
  })
  it('set tags with prop', () => {
    const tags = ['one', 'two', 'three']
    const wrapper = shallow(<Tagger tags={tags}/>)
    expect(wrapper.state('tags')).toMatchObject(tags)
  })
  it('add a tag', () => {
    const wrapper = shallow(<Tagger />)
    wrapper.find('input').simulate('change', {target: {value: 'new-tag'}})
    wrapper.find('button').simulate('click', {preventDefault:()=>{}})
    expect(wrapper.state('tags')).toMatchObject(['new-tag'])
  })
  it('shows added tags')
  it('delete tag')
})
