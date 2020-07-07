import { format } from 'date-fns'

export function createDateFormat (timestamp: number) {
  try {
    return timestamp ? 
      format(new Date(timestamp), "HH:MM aa") : null;
  } catch (err) {
    console.log(err);
    return null
  }
}