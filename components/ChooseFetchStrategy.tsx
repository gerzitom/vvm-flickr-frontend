import {ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps} from "@mui/material"
import React, {FC} from "react"

export const ChooseFetchStrategy: FC<ToggleButtonGroupProps> = (props) => {
  return (
    <ToggleButtonGroup
      exclusive
      fullWidth
      {...props}
    >
      <ToggleButton value="socket" aria-label="left aligned">
        Socket
      </ToggleButton>
      <ToggleButton value="pararel" aria-label="centered">
        Paralel
      </ToggleButton>
      <ToggleButton value="normal" aria-label="right aligned">
        Normal
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
