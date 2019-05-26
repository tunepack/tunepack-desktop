import React, { useEffect, useRef } from 'react'
import { Input } from 'components/FormFields'

const SearchForm = React.memo(({
  onChange,
  searchQuery,
  isSearching,
  onSubmit,
  onClearClick
}) => {
  const queryInputRef = useRef(null)

  useEffect(() => {
    queryInputRef.current.focus()
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

export default SearchForm
