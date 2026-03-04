import React from 'react';
import { X } from 'lucide-react';
import { toRoman, getRomanDate, festivals, monthsLat } from '../lib/roman-utils';

const DayDetailModal = ({ selectedDay, currentDate, currentYear, aucYear, setSelectedDay }) => {
    if (!selectedDay) return null;

    const festivalKey = `${currentDate.getMonth()}-${selectedDay}`;
    const festivalName = festivals[festivalKey];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedDay(null)}
        >
            <div
                className="bg-[#fdfbf7] w-full max-w-sm rounded-lg shadow-2xl border-4 border-double border-stone-800 overflow-hidden relative animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-red-900 text-amber-50 p-4 flex justify-between items-center">
                    <span className="uppercase tracking-widest font-bold text-sm">Dies Detail</span>
                    <button onClick={() => setSelectedDay(null)} className="hover:text-amber-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                        <span className="text-6xl font-bold text-stone-800 font-serif tracking-tighter">
                            {toRoman(selectedDay)}
                        </span>
                        <span className="absolute -top-2 -right-6 text-xl text-stone-400 font-sans font-normal">
                            {selectedDay}
                        </span>
                    </div>
                    <div className="w-full border-t border-b border-stone-300 py-3">
                        <span className="text-xl font-bold italic text-stone-700 uppercase tracking-wide block">
                            {getRomanDate(selectedDay, currentDate.getMonth(), currentDate.getFullYear())}
                        </span>
                        <span className="text-sm text-stone-500 mt-1 block">
                            {selectedDay} {monthsLat[currentDate.getMonth()]} {currentYear}
                        </span>
                    </div>
                    {festivalName ? (
                        <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-800 w-full">
                            <span className="text-red-900 font-bold uppercase text-lg tracking-wider block">
                                {festivalName}
                            </span>
                            <span className="text-xs text-red-700/60 uppercase tracking-widest mt-1 block">
                                Festivitas Romana
                            </span>
                        </div>
                    ) : (
                        <div className="text-stone-400 italic text-sm py-2">
                            Nulla festivitas maior hoc die.
                        </div>
                    )}
                </div>
                <div className="bg-stone-200 p-2 text-center">
                    <span className="text-[0.6rem] text-stone-500 uppercase tracking-widest">
                        {toRoman(aucYear)} Ab Urbe Condita
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DayDetailModal;
