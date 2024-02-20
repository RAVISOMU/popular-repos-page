import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    languagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguages()
  }

  getLanguages = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeFilterId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        languagesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getActiveButton = id => {
    this.setState({activeFilterId: id}, this.getLanguages)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Something Wrong</h1>
    </>
  )

  renderRepos = () => {
    const {languagesList} = this.state
    return (
      <ul className="languages-container">
        {languagesList.map(eachLanguage => (
          <RepositoryItem eachLanguage={eachLanguage} key={eachLanguage.id} />
        ))}
      </ul>
    )
  }

  renderLanguages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRepos()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {activeFilterId} = this.state
    return (
      <div className="repos-container">
        <div className="repos-responsive-container">
          <h1 className="heading">Popular</h1>
          <ul className="filters-container">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                eachFilter={eachFilter}
                key={eachFilter.id}
                isActive={eachFilter.id === activeFilterId}
                getActiveButton={this.getActiveButton}
              />
            ))}
          </ul>
          {this.renderLanguages()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
