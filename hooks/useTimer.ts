import {useMemo, useState} from "react";
import { differenceInSeconds } from 'date-fns'
import {useStopwatch} from "react-timer-hook";

export const useTimer = () => {
  const {seconds, minutes, start, pause, reset, isRunning} = useStopwatch({autoStart: false})

  const startTimer = () => {
    reset()
    start()
  }

  const stopTimer = () => {
    pause()
  }

  const difference = `${seconds} s`

  return {startTimer, stopTimer, difference, isRunning}
}
