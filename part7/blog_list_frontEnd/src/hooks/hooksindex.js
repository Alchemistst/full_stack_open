import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    if (event) {
      setValue(event.target.value);
    } else {
      setValue('');
    }
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useFieldSemanticForm = (type) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const promptAlert = (message) => {
    setError({ content: message });
  };

  const onChange = (event) => {
    if (event) {
      setValue(event.target.value);
    } else {
      setValue('');
    }
    if (error) setError(false);
  };

  return [{
    type,
    value,
    onChange,
    error,
  }, promptAlert];
};
