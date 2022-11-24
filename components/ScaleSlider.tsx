import React, {FC} from "react"
import {Slider, SliderProps} from "@mui/material";
import {SliderUnstyledOwnProps} from "@mui/base/SliderUnstyled/SliderUnstyled.types";

type Props = SliderProps
export const ScaleSlider: FC<Props> = (props) => {
  const marks = Array(10).fill('').map((v, i) => ({value: i + 1, label: i + 1}))
  return (
    <Slider
      valueLabelDisplay="auto"
      step={1}
      marks={marks}
      min={1}
      max={10}
      {...props}
    />
  )
}
