import React, { ChangeEvent } from 'react';
import cn from 'classnames';

import { Props } from './props';

export const Select: React.FC<Props> = ({
  className,
  label,
  data = [],
  setValue,
  name,
  keyName,
  register,
  setDispatch,
}): JSX.Element => {
  const text = 'Choose';

  const reg = register && name ? register(name) : {};

  const handle = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === text) {
      if (setDispatch) setDispatch('');
      return;
    }

    if (setDispatch) setDispatch(e.target.value);
    if (setValue && name) setValue(name, e.target.value);
  };
  return (
    <div className={cn('mb-2 w-[150px]', className)}>
      <div className="mb-3">
        <label
          htmlFor="size"
          className="uppercase mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <div className="mt-2">
          <select
            {...reg}
            id={name}
            onChange={handle}
            className={cn(
              'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900',
              'focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:text-white',
              'dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
            )}
          >
            <option value={text}>{text}</option>
            {data.map((value, i) => {
              if (typeof value === 'string') {
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              }
              return (
                <option key={i} value={keyName ? value[keyName] : value.id}>
                  {value?.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
