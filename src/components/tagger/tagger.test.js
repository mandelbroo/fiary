import React from 'react'
import '../../config/enzyme'
import { shallow } from 'enzyme'
import Tagger from './tagger'

const addTagSimulate = (wrapper, tagName) => {
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
    addTagSimulate(wrapper, 'new-tag')
    expect(wrapper.state('tags')[0].name).toBe('new-tag')
  })
  it('show added tags', () => {
    const wrapper = shallow(<Tagger />)
    addTagSimulate(wrapper, 'tag1')
    addTagSimulate(wrapper, 'tag2')
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
    addTagSimulate(wrapper, 'added')
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
    addTagSimulate(wrapper, '')
    expect(wrapper.find('li').length).toBe(0)
  })
  it('call fake tag service', async () => {
    jest.useFakeTimers()
    const fakeTags = [
      {id: 223, name: 'alphabet'},
      {id: 554, name: 'alphamale'}
    ]
    const fakeTagService = {
      find: jest.fn().mockImplementation(() => Promise.resolve({data: fakeTags}))
    }
    const fakeChange = jest.fn()
    const wrapper = shallow(<Tagger service={fakeTagService} onChange={fakeChange} />)
    wrapper.find('input').simulate('change', { target: { value: 'alp' } })
    jest.runOnlyPendingTimers()
    expect(fakeTagService.find).toBeCalledWith('alp')
    await wrapper.state('suggestPromise')
    wrapper.update()
    const suggestions = wrapper.children().find('.suggest')
    suggestions.first().simulate('click')
    expect(fakeChange).toBeCalledWith([fakeTags[0]])
    expect(wrapper.state('tags')).toMatchObject([fakeTags[0]])
    expect(wrapper.find('input').props().value).toBe('')
  })
  it('do not call service if value is empty', () => {
    jest.useFakeTimers()
    const fakeTagService = {
      find: jest.fn().mockReturnThis({data: []})
    }
    const wrapper = shallow(<Tagger service={fakeTagService} />)
    wrapper.find('input').simulate('change', { target: { value: '' } })
    jest.runOnlyPendingTimers()
    expect(fakeTagService.find).not.toBeCalled()
    wrapper.find('input').simulate('change', { target: { value: false } })
    jest.runOnlyPendingTimers()
    expect(fakeTagService.find).not.toBeCalled()
  })
})