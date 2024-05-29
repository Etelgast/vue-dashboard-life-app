const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

interface ICurrentDate {
  day: number
  monthName: string
  monthNumber: number
  year: number
}

export function formatDate(date: Date): ICurrentDate {
  const day = date.getDate()
  const monthNumber = date.getMonth()
  const monthName = MONTH_NAMES[monthNumber]
  const year = date.getFullYear()
  return { day, monthName, monthNumber, year }
}
