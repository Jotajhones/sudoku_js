class Timer {

    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.seconds = 0;
        this.interval = null;
    }

    start() {
        this.stop();
        this.interval = setInterval(() => {
            this.seconds++;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.seconds = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        this.container.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

export default Timer;