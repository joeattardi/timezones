import React from 'react';

export default function Input({ value, onChange }) {
  return (
    <input className="border border-gray-500 rounded p-1" value={value} onChange={onChange} />
  );
}
