
import { parseFromTimeZone, formatToTimeZone,convertToTimeZone  } from 'date-fns-timezone'
import { parseISO, format } from 'date-fns'

export function createDateFormat (timestamp: string) {
  if (!timestamp) return null
  const parsedDate = parseISO(timestamp)
  const timeZone = 'America/Sao_Paulo'
  // const znDate = parseFromTimeZone(parsedDate.toUTCString(), { timezone });
  const date = parseFromTimeZone(parsedDate.toISOString(), { timeZone })

  try {
    return format(date, "HH:mm")
  } catch (err) {
    console.log(err);
    return null
  }
}