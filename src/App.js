import React, { useState, useEffect } from 'react';

import { getTimeZones } from '@vvo/tzdb';
import { format, parse } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

import Select from 'react-select';
import TimePicker from 'react-time-picker';

import Header from './Header';

const timeZones = getTimeZones().sort((a, b) => a.name.localeCompare(b.name));
const tzOptions = timeZones.map(zone => ({ value: zone, label: zone.name }));

const currentTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentTimeZone = timeZones.find(zone => zone.name === currentTimeZoneName);
const currentTimeZoneValue = { value: currentTimeZone, label: currentTimeZone.name };

export default function App() {
  const [sourceTimeZone, setSourceTimeZone] = useState(currentTimeZoneValue);
  const [sourceTime, setSourceTime] = useState(format(new Date(), 'H:mm'));

  const [destinationTimeZone, setDestinationTimeZone] = useState();
  const [destinationTime, setDestinationTime] = useState('');

  useEffect(doTimeConversion, [sourceTimeZone, sourceTime, destinationTimeZone]);

  function updateSourceTime(time) {
    setSourceTime(time);
  }

  function updateSourceTimeZone(value) {
    setSourceTimeZone(value);
  }

  function updateDestinationTimeZone(value) {
    setDestinationTimeZone(value);
  }

  function doTimeConversion() {
    if (sourceTimeZone && sourceTime && destinationTimeZone) {
      const sourceTimeObj = parse(`${sourceTime}`, 'H:mm', new Date());
      
      if (isNaN(sourceTimeObj.getTime())) {
        setDestinationTime('');
      } else {
        const utcTime = zonedTimeToUtc(sourceTimeObj, sourceTimeZone.value.name);
        setDestinationTime(format(utcToZonedTime(utcTime, destinationTimeZone.label), 'h:mm a'), { timeZone: destinationTimeZone.label });
      }
    }
  }

  return (
    <div>
      <Header />
      <main>
        <div className="p-2 flex flex-col sm:flex-row">
          <section className="flex-grow">
            <h2 className="text-xl font-bold">Source Time</h2>
            <div className="flex flex-col">
              <label>Time zone</label>
              <Select options={tzOptions} value={sourceTimeZone} onChange={updateSourceTimeZone} />
            </div>

            <div className="flex flex-col">
              <label>Time</label>
              <TimePicker value={sourceTime} onChange={updateSourceTime} disableClock={true} clearIcon={null} />
            </div>
          </section>
          
          <section className="mt-4 sm:mt-0 sm:ml-4 flex-grow">
            <h2 className="text-xl font-bold">Destination Time</h2>
            <div className="flex flex-col">
              <label>Time zone</label>
              <Select options={tzOptions} value={destinationTimeZone} onChange={updateDestinationTimeZone} />
            </div>
          </section>
        </div>
          <div className="flex flex-col p-2">
            <label>Time</label>
            <div className="font-bold text-4xl">{destinationTime}</div>
          </div>
      </main>
    </div>
  );
}
