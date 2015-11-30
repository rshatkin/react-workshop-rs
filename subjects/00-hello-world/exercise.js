import React from 'react'
import { render } from 'react-dom'

// ES5 var App = React.createClass({...})

// ES6
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {myHeading: 'Hello Universe', changeColor: false, myNumber: 0};
		this.changeColor = this.changeColor.bind(this);
		this.addOne = this.addOne.bind(this);
	}

	changeColor() {
		this.setState({changeColor: !this.state.changeColor});
	}

	addOne() {
		this.setState({myNumber: this.state.myNumber + 1});
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
	// "arrow function"
	// addOne = () => {
	//	this.setState({myNumber: this.state.myNumber + 1})
	// }

	// built in react functions
	componentWillMount() {
		console.log('Will mount');
	}

	componentDidMount() {
		console.log('Did mount');
	}

	componentWillUpdate() {
		console.log('Will update');
	}

	componentDidUpdate() {
		console.log('Did update');
	}

  	render() {
	    return (
	    	<div>
	    		<h1>Hello World</h1>
	    		<h2 style={
	    			this.state.changeColor ? 
	    			{backgroundColor: 'red'} : 
	    			{backgroundColor: 'yellow'}}>
	    			{ this.state.myHeading }
	    		</h2>
	    		<p> { this.state.myNumber } </p>
	    		<span style={{fontSize: '30px'}}> {this.props.name} </span>
	    		<button onClick={this.addOne}> Add One </button>
	    		<button onClick={this.changeColor}> Click Me </button>
	    	</div>
	    )
	    // ^^^ jsx syntax. html in js code 
	    // without jsx:
	    // 		return React.createElemt('h1, 'hello world')
	}

}

class Parent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {myState: 'Parent state'};
	}
	render() {
		return (
			<div>
				<h1> My second React component </h1>
				<App name={this.state.myState}/>
				<App name={'App 2'}/>
				<App name={'App 3'}/>
			</div>
		)
	}
}

// beauty of react, no shared state! 
// can reuse!
// every component has its own state, don't need to worry about
// each component (even copies) interfering! 

render(<Parent />, document.getElementById('app'))

// ES6 syntax
