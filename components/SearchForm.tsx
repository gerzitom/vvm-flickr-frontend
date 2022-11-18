import React, { FC } from "react";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  submit: () => void
}
export const SearchForm: FC<Props> = ({submit}) => {
  type FormValues = {
    query: string
    dateFrom: Date
    dateTo: Date
  }
  const defaultValues:FormValues = {
    query: "",
    dateFrom: new Date(),
    dateTo: new Date()

  }
  const {control} = useForm<FormValues>({defaultValues})
  return (
    <>
      <form>
        <Controller
          name={"query"}
          control={control}
          render={({field}) => <TextField {...field}/>}
        />
        <Controller
          name={"dateFrom"}
          control={control}
          render={({field: {onChange, ...rest}}) => <DatePicker
            label={"Date from"}
            onChange={ev => onChange(ev)}
            renderInput={(params) => <TextField {...params}/>}
            {...rest}
          />}
          />
      </form>
    </>
  );
};
