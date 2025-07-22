import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const concerts = [
  // Day 1
  {
    day: "6 Agosto",
    artist: "Overcrooks",
    stage: "Palco 3",
    start: "22:00",
    end: "23:00",
  },
  {
    day: "6 Agosto",
    artist: "Overcrooks",
    stage: "Palco 3",
    start: "22:00",
    end: "23:00",
  },
  {
    day: "6 Agosto",
    artist: "Overcrooks",
    stage: "Palco 3",
    start: "23:00",
    end: "24:00",
  },
  {
    day: "6 Agosto",
    artist: "Overcrooks",
    stage: "Palco 3",
    start: "24:00",
    end: "01:00",
  },
  // Day 2
  {
    day: "Day 2",
    artist: "Indie Glow",
    stage: "Indie Stage",
    start: "15:00",
    end: "16:30",
  },
  {
    day: "Day 2",
    artist: "Electric Pulse",
    stage: "Main Stage",
    start: "16:00",
    end: "17:30",
  },
  // Day 3
  {
    day: "Day 3",
    artist: "Folk Whispers",
    stage: "Acoustic Corner",
    start: "14:00",
    end: "15:30",
  },
  {
    day: "Day 3",
    artist: "Synth Lords",
    stage: "Electro Dome",
    start: "15:30",
    end: "17:00",
  },
  // Day 4
  {
    day: "Day 4",
    artist: "Soul Sonic",
    stage: "Main Stage",
    start: "14:00",
    end: "15:00",
  },
  {
    day: "Day 4",
    artist: "Rock Fuel",
    stage: "Main Stage",
    start: "15:30",
    end: "17:00",
  },
];

const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(":".toString()).map(Number);
  return h * 60 + m;
};

const FestivalSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const startTime = 14 * 60; // 14:00
  const endTime = 18 * 60; // 18:00
  const totalMinutes = endTime - startTime;

  const stages = [...new Set(concerts.filter(c => c.day === selectedDay).map((c) => c.stage))];
  const days = [...new Set(concerts.map((c) => c.day))];

  return (
    <div className="p-4 font-sans min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Festival Timetable</h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              selectedDay === day
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="">
            <h2 className="text-xl font-semibold mb-2 text-center">{stage}</h2>
            <div className="relative h-96 border rounded-lg bg-gray-100 overflow-hidden">
              {concerts
                .filter((c) => c.stage === stage && c.day === selectedDay)
                .map((c, i) => {
                  const top = ((parseTime(c.start) - startTime) / totalMinutes) * 100;
                  const height =
                    ((parseTime(c.end) - parseTime(c.start)) / totalMinutes) * 100;
                  return (
                    <div
                      key={i}
                      className="absolute left-2 right-2 rounded bg-blue-500 text-white p-2 text-sm shadow-md"
                      style={{ top: `${top}%`, height: `${height}%` }}
                    >
                      <strong>{c.artist}</strong>
                      <div>
                        {c.start} - {c.end}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<FestivalSchedule />);
