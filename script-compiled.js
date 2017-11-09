"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.reset = function () {
			_this.setState({
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			});
		};

		_this.format = function () {
			var minutes = _this.state.minutes;
			var seconds = _this.state.seconds;
			var miliseconds = _this.state.miliseconds;
			pad0(minutes) + ":" + pad0(seconds) + ":" + pad0(Math.floor(miliseconds));
		};

		_this.start = function () {
			if (!_this.state.running) {
				_this.state.running = true;
				_this.watch = setInterval(function () {
					return _this.step();
				}, 10);
			}
		};

		_this.step = function () {
			if (!_this.state.running) return;
			_this.calculate();
		};

		_this.calculate = function () {
			_this.setState({ miliseconds: _this.state.miliseconds + 1 });
			if (_this.state.miliseconds >= 100) {
				_this.setState({
					seconds: _this.state.seconds + 1,
					miliseconds: 0
				});
			}
			if (_this.state.seconds >= 60) {
				_this.setState({
					minutes: _this.state.minutes + 1,
					seconds: 0
				});
			}
		};

		_this.stop = function () {
			_this.state.running = false;
			clearInterval(_this.watch);
		};

		_this.resetStopwatch = function () {
			_this.stop();
			_this.reset();
		};

		_this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
		return _this;
	}

	_createClass(Stopwatch, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"nav",
				{ "class": "controls" },
				React.createElement(
					"a",
					{ href: "#", "class": "button", onClick: this.start() },
					"Start"
				),
				React.createElement(
					"a",
					{ href: "#", "class": "button", onClick: this.stop() },
					"Stop"
				),
				React.createElement(
					"a",
					{ href: "#", "class": "button", onClick: this.reset() },
					"Reset"
				)
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

var stopwatch = React.createElement(Stopwatch);

ReactDOM.render(stopwatch, document.getElementById('stopwatch'));
