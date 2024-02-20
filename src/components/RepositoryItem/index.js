import './index.css'

const RepositoryItem = props => {
  const {eachLanguage} = props
  const {starsCount, forksCount, name, avatarUrl, issuesCount} = eachLanguage

  return (
    <li className="repo-list-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="details-container">
        <div className="counts-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="image"
          />
          <p className="count">{starsCount} stars</p>
        </div>
        <div className="counts-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="image"
          />
          <p className="count">{forksCount} forks</p>
        </div>
        <div className="counts-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="image"
          />
          <p className="count">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
