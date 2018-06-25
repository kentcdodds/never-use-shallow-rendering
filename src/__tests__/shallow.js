import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ListGitHubRepos} from '../list-github-repos'

Enzyme.configure({adapter: new Adapter()})

test('shallow', () => {
  const wrapper = shallow(<ListGitHubRepos />)
  console.log(wrapper.debug())
})
