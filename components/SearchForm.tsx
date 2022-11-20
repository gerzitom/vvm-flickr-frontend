import React, {FC, useMemo} from 'react'
import { Button, Card, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import styled from 'styled-components'
import {FormSearchValues, SearchData} from '../types'
import {MapComponent} from "./MapComponent";
import L from "leaflet";
import {PigeonMap} from "./map/PigeonMap";

type Props = {
  submit: SubmitHandler<SearchData>
}
export const SearchForm: FC<Props> = ({ submit }) => {
  const defaultValues: SearchData = {
    query: '',
    dateFrom: undefined,
    dateTo: undefined,
    geo: undefined
  }
  const { control, handleSubmit, getValues, setValue, watch } = useForm<SearchData>({ defaultValues })
  const positionValue = useMemo(() => {
    const geo = watch('geo')
    return [geo?.lat ?? 0, geo?.lng ?? 0]
  }, [watch('geo')])
  return (
    <Card sx={{ p: 4 }}>
      <Typography sx={{ mb: 3 }} variant={'h3'}>
        Flickr map search
      </Typography>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <Controller
          name={'query'}
          control={control}
          render={({ field }) => (
            <TextField fullWidth label={'Query string'} {...field} />
          )}
        />
        <Controller
          name={'dateFrom'}
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <DatePicker
              label={'Date from'}
              onChange={(ev) => onChange(ev)}
              renderInput={(params) => <TextField fullWidth {...params} />}
              {...rest}
            />
          )}
        />
        <Controller
          name={'dateTo'}
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <DatePicker
              label={'Date to'}
              onChange={(ev) => onChange(ev)}
              renderInput={(params) => <TextField fullWidth {...params} />}
              {...rest}
            />
          )}
        />
        <TextField fullWidth disabled value={positionValue} label={"Geo"}/>
        <PigeonMap position={watch('geo')} setLocation={(position) => setValue('geo', position)}/>
        <Button variant={'contained'} type={'submit'}>
          Search
        </Button>
      </StyledForm>
    </Card>
  )
}

const StyledForm = styled.form`
  display: flex;
  gap: 1em;
  flex-direction: column;
`

const MapContainer = styled.div`
  height: 400px;
`
