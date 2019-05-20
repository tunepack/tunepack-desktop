import { useContext } from 'react'
import StoreContext from './StoreContext'

export default () => {
  return useContext(StoreContext)
}
