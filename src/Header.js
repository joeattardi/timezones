import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-800 flex flex-row items-center p-2 text-white">
      <i className="gg-time mr-2"></i>
      <h1 className="font-bold text-3xl">Time Zone Converter</h1>
    </header>
  );
}
