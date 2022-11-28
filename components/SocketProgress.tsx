import {Box, Card, LinearProgress, Typography} from "@mui/material";
import React, {FC} from "react"
import {SocketResponseProgress} from "../types";

type Props = {
  progress: SocketResponseProgress
}
export const SocketProgress: FC<Props> = ({progress}) => {
  return (
    <Card variant={'outlined'} sx={{p: 2}}>
      <Typography variant={'overline'}>Items searched: {progress.totalPhotos}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress.progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${progress.progress}%`}</Typography>
        </Box>
      </Box>
    </Card>
  )
}
