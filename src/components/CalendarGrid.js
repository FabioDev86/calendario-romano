import React from 'react';
import { weekDaysLat } from '../lib/roman-utils';
import DayCell from './DayCell';

const CalendarGrid = ({ currentDate, today, setSelectedDay }) => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const emptyDays = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <main className="p-2 md:p-8 flex-grow">
            <div className="grid grid-cols-7 mb-2 border-b-2 md:border-b-4 border-stone-800">
                {weekDaysLat.map((day, idx) => (
                    <div key={idx} className="p-1 md:p-2 text-center font-bold text-stone-700 uppercase tracking-tighter text-[0.6rem] md:text-sm lg:text-base">
                        <span className="hidden md:inline">{day}</span>
                        <span className="md:hidden">{day.split(' ')[1].substring(0, 2)}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-px md:gap-2 auto-rows-fr bg-stone-200 md:bg-transparent border md:border-none border-stone-300">
                {emptyDays.map((_, idx) => (
                    <div key={`empty-${idx}`} className="bg-[#fdfbf7] md:bg-transparent"></div>
                ))}

                {days.map((day) => (
                    <DayCell
                        key={day}
                        day={day}
                        currentDate={currentDate}
                        today={today}
                        setSelectedDay={setSelectedDay}
                    />
                ))}
            </div>
        </main>
    );
};

export default CalendarGrid;
