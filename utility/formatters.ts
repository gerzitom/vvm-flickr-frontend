import {format} from "date-fns";

export const formatDate = (date: string | Date | number) => {
  const internalDate = new Date(date)
  return format(internalDate, 'd. MMM y')

}
