import { createElement} from 'react';

export function TextInput({ value, id, onChange, className }: { value: string; id: string, onChange: any, className?: string }) {
  return createElement('input', {
    type: 'text',
    id: id,
    value: value,
    onInput: onChange,
    className: `${className} input`,
  });
}

export function DateInput({ value, id, onChange, className }: { value: string; id: string, onChange: any, className?: string }) {
  return createElement('input', {
    type: 'date',
    id: id,
    value: value,
    onInput: onChange,
    className: `${className} input`,
  });
}

export function SelectInput({ value, id, onChange, className }: { value: string; id: string, onChange: any, className?: string }) {
  return createElement('select', {
    id: id,
    value: value,
    onInput: onChange,
    className: `${className} input`,
  });
}