import React from 'react'
import '../../config/enzyme'
import { shallow } from 'enzyme'
import Tagger from './tagger'

const addTagEmulate = (wrapper, tagName) => {
  wrapper.find('input').simulate('change', { target: { value: tagName } })
  wrapper.find('button').simulate('click', { preventDefault: () => { } })
}

describe('Tagger', () => {
  it('initial render', () => {shallow(<Tagger />)})
  it('contain input and button', () => {
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
    addTagEmulate(wrapper, 'new-tag')
    expect(wrapper.state('tags')).toMatchObject(['new-tag'])
  })
  it('show added tags', () => {
    const wrapper = shallow(<Tagger />)
    addTagEmulate(wrapper, 'tag1')
    addTagEmulate(wrapper, 'tag2')
    expect(wrapper.containsAllMatchingElements([
      <div>tag1</div>,
      <div>tag2</div>
    ])).toBe(true)
  })
  it('delete tag')
})
