// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
    isTimerRunning: false,
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const min = minutes > 9 ? minutes : `0${minutes}`
    const sec = seconds > 9 ? seconds : `0${seconds}`

    return `${min}:${sec}`
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.setState
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  resetTimer = () => {
    const {state} = this.state
    this.clearTimerInterval()
    this.setState(state)
  }

  onDecrementTimerLimit = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimerLimit = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  render() {
    const {isTimerRunning, timerLimitInMinutes} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAlt = isTimerRunning ? 'Pause icon' : 'Play icon'

    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="flex">
          <div className="backgroundImage">
            <div className="circle">
              <h1 className="heading">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p>{labelText}</p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="button"
              onClick={this.onStartOrPauseTimer}
            >
              <img
                src={startOrPauseImgUrl}
                className="image"
                alt={startOrPauseAlt}
              />
              <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
            </button>
            <button type="button" className="button" onClick={this.resetTimer}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
                className="image"
              />
              Reset
            </button>
          </div>
        </div>
        <div>
          <p>Set Timer limit</p>
          <div className="flex">
            <button
              type="button"
              className="button"
              onClick={this.onDecrementTimerLimit}
            >
              -
            </button>
            <p>{timerLimitInMinutes}</p>
            <button
              type="button"
              className="button"
              onClick={this.onIncrementTimerLimit}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
