'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CalendarGrid from '../components/CalendarGrid';
import DayDetailModal from '../components/DayDetailModal';

const RomanCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setCurrentDate(now);
  }, []);

  const currentYear = currentDate.getFullYear();
  const aucYear = currentYear + 753;

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevYear = () => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  const nextYear = () => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  const handleMonthSelect = (e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1));

  return (
    <div className="min-h-screen bg-stone-100 py-4 md:py-8 px-2 md:px-4 font-serif text-stone-900 flex justify-center">
      <div className="w-full max-w-5xl bg-[#fdfbf7] shadow-2xl rounded-sm border-4 md:border-8 border-double border-stone-800 relative overflow-hidden flex flex-col">

        <Header
          currentDate={currentDate}
          currentYear={currentYear}
          aucYear={aucYear}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          prevYear={prevYear}
          nextYear={nextYear}
          handleMonthSelect={handleMonthSelect}
        />

        <CalendarGrid
          currentDate={currentDate}
          today={today}
          setSelectedDay={setSelectedDay}
        />

        <footer className="bg-stone-200 text-stone-600 p-2 md:p-4 text-center text-[0.6rem] md:text-xs border-t border-stone-300">
          <p>Dies fasti et nefasti in calendario Iuliano ({aucYear} AUC).</p>
        </footer>
      </div>

      <DayDetailModal
        selectedDay={selectedDay}
        currentDate={currentDate}
        currentYear={currentYear}
        aucYear={aucYear}
        setSelectedDay={setSelectedDay}
      />
    </div>
  );
};

export default RomanCalendar;