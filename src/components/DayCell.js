import React from 'react';
import { toRoman, getRomanDate, festivals } from '../lib/roman-utils';

const DayCell = ({ day, currentDate, today, setSelectedDay }) => {
    const festivalKey = `${currentDate.getMonth()}-${day}`;
    const festivalName = festivals[festivalKey];

    const isToday =
        today &&
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();

    const romanNum = toRoman(day);

    return (
        <div
            onClick={() => setSelectedDay(day)}
            className={`
        relative flex flex-col p-1 md:p-2 transition-all group cursor-pointer
        bg-[#fdfbf7]
        min-h-[64px] items-center justify-center
        md:min-h-[140px] md:items-stretch md:justify-between md:border md:border-stone-300 md:rounded-sm
        ${isToday ? 'bg-amber-100 ring-inset ring-2 ring-red-800/50 z-10' : ''}
        hover:bg-amber-50 hover:shadow-md hover:z-20
      `}
        >
            {/* Numero Arabo */}
            <span className="absolute top-1 right-1 text-[0.6rem] md:text-xs text-stone-300 font-sans">
                {day}
            </span>

            {/* Numero Romano - UNIFORMATO */}
            <span className={`
          font-bold font-sans text-stone-800 tracking-tighter
          md:self-start md:mt-0 
          text-[0.7rem] 
          md:text-xl
          ${day === 1 ? 'text-red-800 text-base md:text-4xl' : ''}
      `}>
                {romanNum}
            </span>

            {/* Dettagli Desktop (Nascosti su Mobile) */}
            <div className="hidden md:block text-center my-1">
                <span className="text-xs text-stone-600 font-semibold italic uppercase block leading-tight">
                    {getRomanDate(day, currentDate.getMonth(), currentDate.getFullYear())}
                </span>
            </div>

            {/* Indicatore Festività Mobile vs Desktop */}
            {festivalName && (
                <>
                    <div className="md:hidden mt-1 w-1.5 h-1.5 rounded-full bg-red-700 mx-auto"></div>
                    <div className="hidden md:block mt-1 text-center bg-red-50 p-1 rounded border-l-2 border-red-700">
                        <span className="text-xs font-bold text-red-800 uppercase block leading-tight break-words">
                            {festivalName}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default DayCell;
