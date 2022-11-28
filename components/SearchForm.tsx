import React, {FC, useMemo} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card, Checkbox,
  FormControlLabel,
  Paper, Slider,
  TextField,
  Typography
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import styled from 'styled-components'
import {FormSearchValues, SearchData} from '../types'
import {MapComponent} from "./MapComponent";
import L from "leaflet";
import {PigeonMap} from "./map/PigeonMap";
import {ScaleSlider} from "./ScaleSlider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  submit: SubmitHandler<SearchData>
}
export const SearchForm: FC<Props> = ({ submit }) => {
  const defaultValues: SearchData = {
    query: '',
    dateFrom: null,
    dateTo: null,
    geo: undefined,
    geoScale: 5,
    titleScale: 1,
    pagesToFetch: 60,
    nameIncludesBonus: true
  }
  const { control, handleSubmit, setValue, watch, formState } = useForm<SearchData>({ defaultValues })
  const positionValue = useMemo(() => {
    const geo = watch('geo')
    return [geo?.lat ?? 0, geo?.lng ?? 0]
  }, [watch('geo')])

  return (
    <Card sx={{ p: 4 }}>
      <Typography sx={{ mb: 3 }} variant={'h4'}>
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

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Search settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Title scale</Typography>
            <Controller
              name={'titleScale'}
              control={control}
              render={({ field }) => (
                <ScaleSlider sx={{mb: 4}} {...field}  />
              )}
            />

            <Typography>Geo scale</Typography>
            <Controller
              name={'geoScale'}
              control={control}
              render={({ field }) => (
                <ScaleSlider sx={{mb: 4}} {...field} />
              )}
            />

            <Typography>Pages to load</Typography>
            <Controller
              name={'pagesToFetch'}
              control={control}
              render={({ field }) => (
                <Slider
                  valueLabelDisplay="auto"
                  step={10}
                  min={10}
                  max={200}
                  {...field}
                />
              )}
            />

            <Controller
              name={'nameIncludesBonus'}
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox defaultChecked {...field} />} label="Allow bonus when query string is included in photo name." />
              )}
            />
          </AccordionDetails>
        </Accordion>
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
