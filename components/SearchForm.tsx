import React, {FC, useMemo, useState} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card, Checkbox, CircularProgress,
  FormControlLabel,
  Paper, Slider,
  TextField,
  Typography
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import styled from 'styled-components'
import {FormSearchValues, Location, SearchData, SearchStrategy} from '../types'
import {MapComponent} from "./MapComponent";
import L from "leaflet";
import {PigeonMap} from "./map/PigeonMap";
import {ScaleSlider} from "./ScaleSlider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ChooseFetchStrategy} from "./ChooseFetchStrategy";

type Props = {
  submit: SubmitHandler<SearchData>,
  center: Location,
  loadTime: string
  loading?: boolean,
  setCenter: (newCenter: Location) => void
}
export const SearchForm: FC<Props> = ({ submit, loadTime, loading , center, setCenter}) => {
  const defaultValues: SearchData = {
    query: '',
    date: new Date(),
    geo: center,
    geoScale: 5,
    titleScale: 1,
    dateScale: 1,
    pagesToFetch: 90,
    nameIncludesBonus: true
  }
  const { control, handleSubmit, setValue, watch, formState } = useForm<SearchData>({ defaultValues })
  const [strategy, setStrategy] = useState<SearchStrategy>('socket')
  const positionValue = useMemo(() => {
    const geo = watch('geo')
    return [geo?.lat ?? 0, geo?.lng ?? 0]
  }, [watch('geo')])

  return (
    <div>
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
          name={'date'}
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <DatePicker
              label={'Date'}
              onChange={(ev) => onChange(ev)}
              renderInput={(params) => <TextField fullWidth {...params} />}
              {...rest}
            />
          )}
        />
        <TextField fullWidth disabled value={positionValue} label={"Geo"}/>
        <PigeonMap position={center} setLocation={setCenter}/>
        <Button variant={'contained'} type={'submit'} disabled={loading}>
          {loading ? <CircularProgress/> : 'Search'}
        </Button>
        <Typography variant={'overline'}>Load time: {loadTime}</Typography>

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

            <Typography>Date scale</Typography>
            <Controller
              name={'dateScale'}
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
    </div>
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
