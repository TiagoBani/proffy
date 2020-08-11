export default function convertHourToMinutes (time: string) {
  const regex = new RegExp('^([0-9]{2}):?([0-9]{2})$', 'g')
  const matchs = regex.exec(time)
  if (!matchs) return null

  const matchsConverted = matchs.map(Number)
  const [, hours, minutes] = matchsConverted

  if (hours < 0 || hours > 24 || minutes < 0 || minutes > 60) return null
  return hours * 60 + minutes
}
