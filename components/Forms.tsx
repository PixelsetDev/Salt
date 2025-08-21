import { createElement} from 'react';

export function TextInput({ value, id, onChange, className }: Props) {
  return createElement('input', {
    type: 'text',
    id: id,
    value: value,
    onInput: onChange,
    className: `${className} input`,
  })
}

export function DateInput({ value, id, onChange, className }: Props) {
  return createElement('input', {
    type: 'date',
    id: id,
    value: value,
    onInput: onChange,
    className: `${className} input`,
  })
}

export function SelectInput({ value, id, onChange, className }: Props) {
  return createElement('select', {
    id: id,
    value: value,
    onInput: onChange,
    className: `${className} input`,
  })
}