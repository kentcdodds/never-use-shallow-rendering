import React from 'react'
import {searchRepos} from './utils'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class SearchInput extends React.Component {
  static idCounter = 1
  id = `search-input-${SearchInput.idCounter++}`
  input = React.createRef()
  state = {error: null}
  handleChange = event => {
    clearTimeout(this.timeout)
    const {value} = event.target
    this.setState({error: null})
    // delay showing the error in case the user's still typing
    this.timeout = setTimeout(() => {
      this.setState({error: this.getError(value)})
    }, 400)
  }
  getError(value) {
    return value && value.length < 3 ? 'Must be 3 characters or longer' : null
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  render() {
    const {error} = this.state
    const {
      label,
      inputProps: {onChange, id = this.id, ...inputProps}
    } = this.props
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input {...inputProps} ref={this.input} id={id} onChange={callAll(onChange, this.handleChange)} />
        <div>{error}</div>
      </div>
    )
  }
}

class List extends React.Component {
  render() {
    const {list} = this.props
    return (
      <div>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <a href={item.homepageUrl || item.url}>{item.nameWithOwner}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

class Title extends React.Component {
  render() {
    return <h1>List of GitHub repos</h1>
  }
}

class SearchForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault()
    const query = event.target.elements.query.value
    const repos = await searchRepos(query)
    this.props.onSearchResult(repos)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SearchInput label="Query" inputProps={{type: 'search', name: 'query'}} />
        <button type="submit">Search</button>
      </form>
    )
  }
}

class ListGitHubRepos extends React.Component {
  state = {list: []}
  handleSearchResult = repos => this.setState({list: repos})
  render() {
    const {list} = this.state
    return (
      <div>
        <Title />
        <SearchForm onSearchResult={this.handleSearchResult} />
        <List list={list} />
      </div>
    )
  }
}

export {ListGitHubRepos}
