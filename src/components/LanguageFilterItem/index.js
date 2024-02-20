import './index.css'

const LanguageFilterItem = props => {
  const {eachFilter, isActive, getActiveButton} = props
  const {id, language} = eachFilter

  const changeActiveButton = () => {
    getActiveButton(id)
  }

  const activeFilterClassName = isActive ? 'active-button' : ''

  return (
    <li className="filter-item">
      <button
        type="button"
        className={`button ${activeFilterClassName}`}
        onClick={changeActiveButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
