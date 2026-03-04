import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toRoman, monthsLat } from '../lib/roman-utils';

const Header = ({ currentDate, currentYear, aucYear, prevMonth, nextMonth, prevYear, nextYear, handleMonthSelect }) => {
    return (
        <header className="bg-red-900 text-amber-50 p-4 md:p-6 text-center relative shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-4">
                <div className="flex items-center space-x-2 order-2 md:order-1">
                    <div className="flex items-center space-x-1">
                        <button onClick={prevYear} className="p-1 hover:bg-red-800 rounded-full transition-colors border border-amber-500/30">
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex flex-col items-center min-w-[80px]">
                            <span className="text-lg md:text-2xl font-bold tracking-widest">{currentYear > 0 ? toRoman(currentYear) : 'N'}</span>
                            <span className="text-[0.6rem] md:text-xs text-amber-200">{currentYear > 0 ? `${currentYear} AD` : `${Math.abs(currentYear - 1)} BC`}</span>
                        </div>
                        <button onClick={nextYear} className="p-1 hover:bg-red-800 rounded-full transition-colors border border-amber-500/30">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
                <div className="order-1 md:order-2 flex flex-col items-center">
                    <h1 className="text-2xl md:text-5xl font-bold uppercase tracking-[0.2em] border-b-2 border-amber-500/50 pb-1 md:pb-2 mb-1">
                        {monthsLat[currentDate.getMonth()]}
                    </h1>
                    <span className="text-amber-200 uppercase tracking-widest text-[0.6rem] md:text-sm font-semibold">
                        {toRoman(aucYear)} AUC
                    </span>
                </div>
                <div className="hidden md:flex items-center space-x-2 order-3">
                    <span className="text-2xl font-bold tracking-widest">{toRoman(aucYear)}</span>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-2 md:mt-6">
                <button onClick={prevMonth} className="p-1 md:p-2 hover:bg-red-800 rounded-full transition-colors border border-amber-500/30">
                    <ChevronLeft size={20} />
                </button>
                <div className="relative">
                    <select value={currentDate.getMonth()} onChange={handleMonthSelect} className="appearance-none bg-red-950 text-amber-50 border border-amber-500/50 py-1 md:py-2 pl-3 pr-8 rounded font-serif uppercase tracking-wider text-sm md:text-base cursor-pointer">
                        {monthsLat.map((m, idx) => <option key={idx} value={idx}>{m}</option>)}
                    </select>
                </div>
                <button onClick={nextMonth} className="p-1 md:p-2 hover:bg-red-800 rounded-full transition-colors border border-amber-500/30">
                    <ChevronRight size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;
