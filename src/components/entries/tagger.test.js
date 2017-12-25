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
    expect(wrapper.state('tags')[0].name).toBe('new-tag')
  })
  it('show added tags', () => {
    const wrapper = shallow(<Tagger />)
    addTagEmulate(wrapper, 'tag1')
    addTagEmulate(wrapper, 'tag2')
    const lis = wrapper.find('li')
    expect(lis.first().props().children[0]).toBe('tag1')
    expect(lis.last().props().children[0]).toBe('tag2')
  })
  it('remove tag', () => {
    const tags = [{id: 1, name:'one'}, {id: 2, name:'two'}, {id: 3, name:'three'}]
    const wrapper = shallow(<Tagger tags={tags}/>)
    wrapper.find('li a').first().simulate('click')
    expect(wrapper.find('li').length).toBe(2)
    expect(wrapper.state('tags').map(tag => tag.id)).toMatchObject([2, 3])
  })
  it('add tag calling onChange', () => {
    expect.assertions(2)
    const change = (tags) => {
      expect(tags.length).toBe(1)
      expect(tags[0].name).toBe('added')
    }
    const wrapper = shallow(<Tagger onChange={change} />)
    addTagEmulate(wrapper, 'added')
  })
  it('remove tag calling onChange', () => {
    expect.assertions(2)
    const change = (tags) => {
      expect(tags.length).toBe(1)
      expect(tags[0].name).toBe('second')
    }
    const tags = [{id: 1, name: 'first'}, {id: 2, name: 'second'}]
    const wrapper = shallow(<Tagger tags={tags} onChange={change} />)
    wrapper.find('li a').first().simulate('click')
  })
  it('do not add empty tag', () => {
    const wrapper = shallow(<Tagger />)
    addTagEmulate(wrapper, '')
    expect(wrapper.find('li').length).toBe(0)
  })
  it('call fake tag service', async () => {
    jest.useFakeTimers()
    expect.assertions(2)
    const fakeTags = [
      {id: 223, name: 'alphabet'},
      {id: 554, name: 'alphamale'}
    ]
    const fakeTagService = {
      post: async (value) => Promise.resolve(fakeTags)
    }
    const wrapper = shallow(<Tagger service={fakeTagService} />)
    wrapper.find('input').simulate('change', { target: { value: 'alp' } })
    jest.runOnlyPendingTimers()
    await wrapper.state('suggestPromise')
    wrapper.update()
    const suggestions = wrapper.children().find('.suggest')
    suggestions.first().simulate('click')
    expect(wrapper.state('tags').length).toBe(1)
    expect(wrapper.state('tags')[0]).toBe(fakeTags[0])
  })
})
