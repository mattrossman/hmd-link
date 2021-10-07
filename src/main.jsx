import { render } from 'preact'
import { App } from '@/src/App'
import { setup } from 'twind'
import { config } from '@/twind.config'

setup(config)

render(<App />, document.getElementById('app'))
