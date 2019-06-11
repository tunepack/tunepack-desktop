import mousetrap from 'mousetrap'
import * as Routes from 'constants/Routes'

export default function setupNavKeybindings (element, history) {
  const goToPage = route => () => {
    history.push(route)
  }

  mousetrap(element).bind([
    'command+1',
    'ctrl+1'
  ], goToPage(Routes.SEARCH))

  mousetrap(element).bind([
    'command+2',
    'ctrl+2'
  ], goToPage(Routes.DOWNLOADS))

  mousetrap(element).bind([
    'command+3',
    'ctrl+3',
    'command+,'
  ], goToPage(Routes.SETTINGS))
}
