import React, { useEffect, useRef } from 'react'
import { Input } from 'components/FormFields'
import setupNavKeybinds from 'utils/setupNavKeybinds'
import { withRouter } from 'react-router-dom'

const SearchForm = React.memo(({
  onChange,
  searchQuery,
  isSearching,
  onSubmit,
  onClearClick,
  history
}) => {
  const queryInputRef = useRef(null)

  useEffect(() => {
    queryInputRef.current.focus()

    setupNavKeybinds(queryInputRef.current, history)
  }, [])

  const handleChange = event => {
    onChange(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isClearable={!isSearching}
        onClearClick={onClearClick}
        innerRef={queryInputRef}
        disabled={isSearching}
        placeholder='Search by track name, album or artist...'
        name='searchQuery'
        field={{
          value: searchQuery,
          onChange: handleChange
        }}
      />
    </form>
  )
})

export default withRouter(SearchForm)
