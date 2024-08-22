export default function formatDate(date: string) {
  return new Intl.DateTimeFormat('RU', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}
