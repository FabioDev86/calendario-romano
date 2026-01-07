'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Scroll, X } from 'lucide-react';

const RomanCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setCurrentDate(now);
  }, []);

  const toRoman = (num) => {
    const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '', i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  const currentYear = currentDate.getFullYear();
  const aucYear = currentYear + 753;

  const monthsLat = [
    "Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius",
    "Iulius", "Augustus", "September", "October", "November", "December"
  ];

  const weekDaysLat = [
    "Dies Solis", "Dies Lunae", "Dies Martis", "Dies Mercurii", "Dies Iovis", "Dies Veneris", "Dies Saturni"
  ];

  const festivals = {
    "0-1": "Kalendae Ianuariae",
    "0-9": "Agonalia",
    "0-11": "Carmentalia",
    "1-13": "Parentalia",
    "1-15": "Lupercalia",
    "1-23": "Terminalia",
    "1-27": "Equirria",
    "2-1": "Matronalia",
    "2-14": "Equirria",
    "2-15": "Idus Martiae",
    "2-17": "Liberalia",
    "2-19": "Quinquatrus",
    "3-1": "Veneralia",
    "3-12": "Cerialia",
    "3-21": "Parilia (Roma Condita)",
    "3-28": "Floralia",
    "4-1": "Bona Dea",
    "4-9": "Lemuria",
    "4-15": "Mercuralia",
    "5-9": "Vestalia",
    "5-20": "Summanalia",
    "6-5": "Poplifugia",
    "6-7": "Nonae Caprotinae",
    "6-23": "Neptunalia",
    "7-10": "Opalia",
    "7-13": "Vertumnalia",
    "7-23": "Volcanalia",
    "8-4": "Ludi Romani",
    "8-13": "Epulum Iovis",
    "9-11": "Meditrinalia",
    "9-15": "Equus October",
    "9-19": "Armilustrium",
    "10-13": "Epulum Iovis",
    "10-24": "Brumalia",
    "11-5": "Faunalia",
    "11-17": "Saturnalia",
    "11-25": "Dies Natalis Solis Invicti"
  };

  const getRomanDate = (day, month, year) => {
    const isLateMonth = [2, 4, 6, 9].includes(month);
    const nonesDate = isLateMonth ? 7 : 5;
    const idesDate = isLateMonth ? 15 : 13;
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const nextMonthIndex = (month + 1) % 12;
    const nextMonthName = monthsLat[nextMonthIndex].substring(0, 3) + ".";
    const currMonthName = monthsLat[month].substring(0, 3) + ".";
    if (day === 1) return `Kal. ${currMonthName}`;
    if (day < nonesDate) {
      const diff = nonesDate - day + 1;
      return diff === 2 ? `Prid. Non. ${currMonthName}` : `a.d. ${toRoman(diff)} Non. ${currMonthName}`;
    }
    if (day === nonesDate) return `Non. ${currMonthName}`;
    if (day < idesDate) {
      const diff = idesDate - day + 1;
      return diff === 2 ? `Prid. Id. ${currMonthName}` : `a.d. ${toRoman(diff)} Id. ${currMonthName}`;
    }
    if (day === idesDate) return `Id. ${currMonthName}`;
    const diff = daysInCurrentMonth - day + 2; 
    return diff === 2 ? `Prid. Kal. ${nextMonthName}` : `a.d. ${toRoman(diff)} Kal. ${nextMonthName}`;
  };

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleMonthSelect = (e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value), 1));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-stone-100 py-4 md:py-8 px-2 md:px-4 font-serif text-stone-900 flex justify-center">
      <div className="w-full max-w-5xl bg-[#fdfbf7] shadow-2xl rounded-sm border-4 md:border-8 border-double border-stone-800 relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="bg-red-900 text-amber-50 p-4 md:p-6 text-center relative shadow-md">
           <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-4">
            <div className="flex items-center space-x-2 order-2 md:order-1">
               <div className="flex flex-col items-start text-left">
                  <span className="text-lg md:text-2xl font-bold tracking-widest">{toRoman(currentYear)}</span>
                  <span className="text-[0.6rem] md:text-xs text-amber-200">{currentYear} AD</span>
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

        {/* Griglia Calendario */}
        <main className="p-2 md:p-8 flex-grow">
          <div className="grid grid-cols-7 mb-2 border-b-2 md:border-b-4 border-stone-800">
            {weekDaysLat.map((day, idx) => (
              <div key={idx} className="p-1 md:p-2 text-center font-bold text-stone-700 uppercase tracking-tighter text-[0.6rem] md:text-sm lg:text-base">
                <span className="hidden md:inline">{day}</span>
                <span className="md:hidden">{day.split(' ')[1].substring(0,2)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px md:gap-2 auto-rows-fr bg-stone-200 md:bg-transparent border md:border-none border-stone-300">
            {emptyDays.map((_, idx) => (
              <div key={`empty-${idx}`} className="bg-[#fdfbf7] md:bg-transparent"></div>
            ))}

            {days.map((day) => {
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
                  key={day} 
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
                     
                     /* Dimensione Fissa Mobile: piccola per far entrare tutto */
                     text-[0.7rem] 
                     
                     /* Dimensione Desktop: normale */
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
            })}
          </div>
        </main>

        <footer className="bg-stone-200 text-stone-600 p-2 md:p-4 text-center text-[0.6rem] md:text-xs border-t border-stone-300">
           <p>Dies fasti et nefasti in calendario Iuliano ({aucYear} AUC).</p>
        </footer>
      </div>

      {/* Modale Popup */}
      {selectedDay && (
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
               {festivals[`${currentDate.getMonth()}-${selectedDay}`] ? (
                  <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-800 w-full">
                     <span className="text-red-900 font-bold uppercase text-lg tracking-wider block">
                        {festivals[`${currentDate.getMonth()}-${selectedDay}`]}
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
      )}
    </div>
  );
};

export default RomanCalendar;