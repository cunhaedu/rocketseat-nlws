export function getWeekDays(): Array<{ name: string; value: string; initial: string }> {
 return [
  { name: 'Domingo', initial: 'D', value: '0' },
  { name: 'Segunda', initial: 'S', value: '1' },
  { name: 'Terça', initial: 'T', value: '2' },
  { name: 'Quarta', initial: 'Q', value: '3' },
  { name: 'Quinta', initial: 'Q', value: '4' },
  { name: 'Sexta', initial: 'S', value: '5' },
  { name: 'Sábado', initial: 'S', value: '6' },
 ]
}
