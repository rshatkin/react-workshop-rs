import React from 'react'
import { render } from 'react-dom'
import { createTheremin } from './lib/Theremin'

let styles = {}

styles.theremin = {
  height: 200,
  width: 200,
  fontSize: 10,
  border: '1px solid',
  cursor: 'crosshair',
  margin: 10,
  display: 'inline-block'
}

class Tone extends React.Component {
  constructor(props) {
    super(props)
    this.doImperativeWork = this.doImperativeWork.bind(this);
  }
  componentWillMount() {
    this.theremin = createTheremin();
  }

  componentDidUpdate() {
    this.doImperativeWork()
  }

  doImperativeWork() {
    if (this.props.isPlaying) {
      this.theremin.play()
    } else {
      this.theremin.stop()
    }

    this.theremin.setPitchBend(this.props.pitch);
    this.theremin.setVolume(this.props.volume);
  }

  render() {
    return null;
  }

}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      pitch: 0,
      volume: 0
    }
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.changeTone = this.changeTone.bind(this);
  }

  componentWillMount() {
    this.theremin = createTheremin();
  }

  play() {
    this.setState({isPlaying: true});
  }

  stop() {
    this.setState({isPlaying: false});
  }

  changeTone(event) {
    let { clientX, clientY } = event;
    let { top, bottom, left, right } = event.target.getBoundingClientRect();
    let pitch = (clientX - left) / right;
    let volume = 1 - (clientY - top) / bottom;

    this.setState({pitch: pitch, volume: volume});
  }

  render() {
    return (
      <div>
        <h1> What does it mean to be declarative? </h1>
        <div 
          style={styles.theremin} 
          onMouseEnter={this.play} 
          onMouseLeave={this.stop} 
          onMouseMove={this.changeTone} />
        <Tone
          isPlaying = {this.state.isPlaying}
          pitch={this.state.pitch}
          volume={this.state.volume} />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'))
