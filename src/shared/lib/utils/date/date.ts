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

export function getCurrentDate(): ICurrentDate {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const monthNumber = currentDate.getMonth()
  const monthName = MONTH_NAMES[monthNumber]
  const year = currentDate.getFullYear()

  return { day, monthName, monthNumber, year }
}

export function formatDate(date: Date): ICurrentDate {
  const day = date.getDate()
  const monthNumber = date.getMonth()
  const monthName = MONTH_NAMES[monthNumber]
  const year = date.getFullYear()
  return { day, monthName, monthNumber, year }
}
