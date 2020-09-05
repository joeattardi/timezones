import React, { useState } from 'react';

import { rawTimeZones } from '@vvo/tzdb';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

import Select from 'react-select';

import Header from './Header';
import Input from './Input';

const timeZones = rawTimeZones.sort((a, b) => a.name.localeCompare(b.name));
const tzOptions = timeZones.map(zone => ({ value: zone.name, label: zone.name }));

const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currentTimeZoneValue = { value: currentTimeZone, label: currentTimeZone };

export default function App() {
  const [sourceTimeZone, setSourceTimeZone] = useState(currentTimeZoneValue);
  const [sourceTime, setSourceTime] = useState('5:00 PM');

  const [destinationTimeZone, setDestinationTimeZone] = useState();

  function updateSourceTime(event) {
    setSourceTime(event.target.value);
  }

  function updateSourceTimeZone(value) {
    setSourceTimeZone(value);
  }

  function updateDestinationTimeZone(value) {
    setDestinationTimeZone(value);
  }

  return (
    <div>
      <Header />
      <main className="p-2">
        <section>
          <h2 className="text-xl font-bold">Source Time</h2>
          <div className="flex flex-col">
            <label>Time zone</label>
            <Select options={tzOptions} value={sourceTimeZone} onChange={updateSourceTimeZone} />
          </div>

          <div className="flex flex-col">
            <label>Time</label>
            <Input value={sourceTime} onChange={updateSourceTime} />
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold">Destination Time</h2>
          <div className="flex flex-col">
            <label>Time zone</label>
            <Select options={tzOptions} value={destinationTimeZone} onChange={updateDestinationTimeZone} />
          </div>

          <div className="flex flex-col">
            <label>Time</label>
            <div className="font-bold text-2xl">5:30 PM</div>
          </div>
        </section>
      </main>
    </div>
  );
}
