import {Box, Card, LinearProgress, Typography} from "@mui/material";
import React, {FC} from "react"

type Props = {
  totalPhotos: number,
  progress: number,
  loadTime: string
}
export const SocketProgress: FC<Props> = ({totalPhotos, progress, loadTime}) => {
  return (
    <Card variant={'outlined'} sx={{p: 2, mb: 4}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant={'overline'}>Items searched: {totalPhotos}</Typography>
        <Typography variant={'overline'}>Load time: {loadTime}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </Card>
  )
}
