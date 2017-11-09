function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}
	}

	reset = () => {
		this.setState({
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		})
	}

	format = () => {
		let minutes = this.state.minutes;
        let seconds = this.state.seconds;
        let miliseconds = this.state.miliseconds;
		`${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`
	}

	start = () => {
		if (!this.state.running) {
			this.state.running = true;
			this.watch = setInterval(() => this.step(), 10)
		}
	}

	step = () => {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate = () => {
		this.setState({ miliseconds: this.state.miliseconds + 1})
		if (this.state.miliseconds >= 100) {
			this.setState({
				seconds: this.state.seconds + 1,
				miliseconds: 0
			})
		}
		if (this.state.seconds >= 60) {
			this.setState({
				minutes: this.state.minutes + 1,
				seconds: 0
			})
		}
	}

	stop = () => {
		this.state.running = false;
		clearInterval(this.watch);
	}

	resetStopwatch = () => {
		this.stop();
		this.reset();
	}

	render() {
		return(
			<nav class="controls">
				<a href="#" class="button" onClick={this.start()}>Start</a>
				<a href="#" class="button" onClick={this.stop()}>Stop</a>
				<a href="#" class="button" onClick={this.reset()}>Reset</a>
			</nav>
		)
	}
}

var stopwatch = React.createElement(Stopwatch);

ReactDOM.render(stopwatch, document.getElementById('stopwatch'));