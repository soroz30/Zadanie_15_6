function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

class Stopwatch {
    constructor(display) {
    	this.running = false;
    	this.display = display;
    	this.reset();
    	this.print(this.times);
    	this.list = document.querySelector('.results');
    }

    reset() {
    	this.times = {
    		minutes: 0,
    		seconds: 0,
    		miliseconds: 0
    	};
    }

    print() {
    	this.display.innerText = this.format(this.times);
    }

    format(times) {
    	return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
    	if (!this.running) {
    		this.running = true;
    		this.watch = setInterval(() => this.step(), 10);
    	}
    }

    step() {
    	if (!this.running) return;
    	this.calculate();
    	this.print();
    }

    calculate() {
    	this.times.miliseconds += 1;
    	if (this.times.miliseconds >= 100) {
    		this.times.seconds += 1;
    		this.times.miliseconds = 0;
    	}
    	if (this.times.seconds >= 60) {
    		this.times.minutes += 1;
    		this.times.seconds = 0;
    	}
    }

    stop() {
    	this.running = false;
    	clearInterval(this.watch);
    }

    resetStopwatch() {
    	this.stop();
    	this.reset();
    	this.print();
    }

    addTime() {
    	this.list.appendChild(this.getTime());
    }

    getTime() {
    	let time = document.createElement('li');
    	time.innerHTML = `${this.format(this.times)}`;
    	return time;
    }

    resetList() {
    	this.list.innerHTML = '';
    }
}

const stopwatch = new Stopwatch(
	document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetStopwatch());

var addTime = document.getElementById('add-time');
addTime.addEventListener('click', () => stopwatch.addTime());

var resetList = document.getElementById('clear-list');
resetList.addEventListener('click', () => stopwatch.resetList());