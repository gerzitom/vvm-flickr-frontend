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
    dateFrom: null,
    dateTo: null,
    geo: undefined
  }
  const { control, handleSubmit, getValues, setValue, watch, setError, register, formState, clearErrors } = useForm<SearchData>({ defaultValues })
  const positionValue = useMemo(() => {
    const geo = watch('geo')
    return [geo?.lat ?? 0, geo?.lng ?? 0]
  }, [watch('geo')])

  const submitValidation: SubmitHandler<SearchData> = (data) => {
    clearErrors()
    if(!data.query) setError('geo', {message: 'Query must not be empty', type: 'required'})
    else {
      submit(data)
    }
  }
  return (
    <Card sx={{ p: 4 }}>
      <Typography sx={{ mb: 3 }} variant={'h3'}>
        Flickr map search
      </Typography>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <Controller
          name={'query'}
          control={control}
          rules={{required: true}}
          render={({ field }) => (
            <TextField fullWidth label={'Query string'} {...field} error={!!formState.errors.query} helperText={formState.errors.query ? 'Query must not be empty' : ''} />
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
