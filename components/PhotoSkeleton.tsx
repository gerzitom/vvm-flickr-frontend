import React, {FC} from "react"
import {Card, Skeleton} from "@mui/material";
import {Box} from "@mui/system";

type Props = {}
export const PhotoSkeleton: FC<Props> = () => {
  const emptyArray = Array(4).fill('')
  return (
    <>
      {emptyArray.map((value, index) => (
        <Card key={index} sx={{mb: 2}}>
          <Skeleton variant={'rectangular'} height={250}/>
          <Box sx={{p: 2}}>
            <Skeleton variant={'text'}  height={16}/>
            <Skeleton variant={'text'} width={350} height={16}/>
            <Box sx={{display: 'flex', mt: 2}}>
              <Skeleton variant={'circular'} width={30} height={30} sx={{mr: 2}}/>
              <Skeleton variant={'text'} width={300} height={20}/>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  )
}
