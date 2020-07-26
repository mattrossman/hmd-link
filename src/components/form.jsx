import { h } from 'preact'
import styled from 'styled-components'


export const Form = () => {
	return(
		<form>
			<h2 className="row">Enter a URL</h2>
			<input className="row" type="text" id="url" placeholder="e.g. www.example.com"/>
		</form>
	)
}