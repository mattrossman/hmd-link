import { render } from 'preact';
import { html } from 'htm/preact';

import { Header } from './components/header'
import { Footer } from './components/footer'


const App = () => {
	return html`
	<div class="container">
		<${Header}/>
		<div class="content">
			My amazing site content
		</div>
		<${Footer}/>
	</div>
	`
}

render(html`<${App} />`, document.body);