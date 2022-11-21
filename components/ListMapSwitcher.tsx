import React, {Dispatch, FC, SetStateAction} from "react"
import {Card, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {SwitcherState} from "../types";

type Props = {
  state: SwitcherState
  setState: Dispatch<SetStateAction<SwitcherState>>
}
export const ListMapSwitcher: FC<Props> = ({state, setState}) => {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: SwitcherState,
  ) => {
    setState(newAlignment);
  };
  return (
    <Card sx={{display: 'inline-block', p: 1}}>
      <ToggleButtonGroup exclusive value={state} onChange={handleAlignment} color={'primary'} >
        <ToggleButton value={'list'}>List</ToggleButton>
        <ToggleButton value={'map'}>Map</ToggleButton>
      </ToggleButtonGroup>
    </Card>
  )
}
