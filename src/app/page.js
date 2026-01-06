
'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Scroll } from 'lucide-react';

const RomanCalendar = () => {
  // Imposta la data iniziale (2026 per default come richiesto, ma il mese corrente è dinamico)
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Assicuriamo che l'anno sia bloccato al 2026 se l'utente naviga troppo lontano, 
  // oppure lasciamo libero. La richiesta specifica il 2026 (2779 AUC).
  // Qui inizializziamo al 2026 se siamo in un anno diverso, altrimenti usiamo il mese corrente.
  useEffect(() => {
    const now = new Date();
    if (now.getFullYear() !== 2026) {
        // Se non siamo nel 2026 reale, forziamo l'inizio al 1 Gennaio 2026
        // Tuttavia, il prompt dice "carichi automaticamente la pagina relativa al mese corrente".
        // Assumeremo che l'utente voglia vedere il mese corrente dell'anno 2026.
        const currentMonth = now.getMonth();
        setCurrentDate(new Date(2026, currentMonth, 1));
    }
  }, []);

  const AUC_YEAR = 2779; // 2026 AD + 753
  const GREGORIAN_YEAR = 2026;

  // Dati in Latino
  const monthsLat = [
    "Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius",
    "Iulius", "Augustus", "September", "October", "November", "December"
  ];

  const weekDaysLat = [
    "Dies Solis",    // Domenica
    "Dies Lunae",    // Lunedì
    "Dies Martis",   // Martedì
    "Dies Mercurii", // Mercoledì
    "Dies Iovis",    // Giovedì
    "Dies Veneris",  // Venerdì
    "Dies Saturni"   // Sabato
  ];

  // Principali Festività Romane (Mese 0-indexed, Giorno 1-indexed)
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

  // Logica per le date Romane (Kalends, Nones, Ides)
  const getRomanDate = (day, month, year) => {
    // Mesi con Nones al 7 e Ides al 15: Marzo (2), Maggio (4), Luglio (6), Ottobre (9)
    // Nota: month è 0-indexed
    const isLateMonth = [2, 4, 6, 9].includes(month);
    const nonesDate = isLateMonth ? 7 : 5;
    const idesDate = isLateMonth ? 15 : 13;
    
    // Giorni nel mese corrente (per calcolare le Calende del mese successivo)
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    // Mapping nomi mesi per l'accusativo (usato in "ad Kalendas Ianuarias")
    // Semplifichiamo usando l'abbreviazione o il nome base per leggibilità UI
    const nextMonthIndex = (month + 1) % 12;
    const nextMonthName = monthsLat[nextMonthIndex].substring(0, 3) + ".";
    const currMonthName = monthsLat[month].substring(0, 3) + ".";

    if (day === 1) return `Kal. ${currMonthName}`;
    
    if (day < nonesDate) {
      const diff = nonesDate - day + 1; // +1 per conteggio inclusivo
      return diff === 2 ? `Prid. Non. ${currMonthName}` : `a.d. ${toRoman(diff)} Non. ${currMonthName}`;
    }
    
    if (day === nonesDate) return `Non. ${currMonthName}`;

    if (day < idesDate) {
      const diff = idesDate - day + 1;
      return diff === 2 ? `Prid. Id. ${currMonthName}` : `a.d. ${toRoman(diff)} Id. ${currMonthName}`;
    }

    if (day === idesDate) return `Id. ${currMonthName}`;

    // Dopo le Idi, si conta verso le Calende del mese successivo
    const diff = daysInCurrentMonth - day + 2; // +1 fine mese, +1 inclusivo
    return diff === 2 ? `Prid. Kal. ${nextMonthName}` : `a.d. ${toRoman(diff)} Kal. ${nextMonthName}`;
  };

  // Helper Numeri Romani
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

  // Gestione Navigazione
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleMonthSelect = (e) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(new Date(GREGORIAN_YEAR, newMonth, 1));
  };

  // Generazione Griglia
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sun
  
  // Array per celle vuote prima del primo giorno
  const emptyDays = Array(firstDayOfMonth).fill(null);
  
  // Array dei giorni effettivi
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 font-serif text-stone-900 flex justify-center">
      <div className="w-full max-w-5xl bg-[#fdfbf7] shadow-2xl rounded-sm border-8 border-double border-stone-800 relative overflow-hidden">
        
        {/* Decorazioni CSS per effetto 'antico' */}
        <div className="absolute top-0 left-0 w-full h-2 bg-stone-800/10"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-stone-800/10"></div>

        {/* Header */}
        <header className="bg-red-900 text-amber-50 p-6 text-center relative shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            
            <div className="flex items-center space-x-2 order-2 md:order-1">
               <span className="text-amber-200/60 text-sm font-sans tracking-widest uppercase">Anno</span>
               <div className="flex flex-col items-start">
                  <span className="text-2xl font-bold tracking-widest">MMXXVI</span>
                  <span className="text-xs text-amber-200">2026 AD</span>
               </div>
            </div>

            <div className="order-1 md:order-2 flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.2em] border-b-2 border-amber-500/50 pb-2 mb-1">
                {monthsLat[currentDate.getMonth()]}
              </h1>
              <span className="text-amber-200 uppercase tracking-widest text-sm font-semibold">
                Anno MMDCCLXXIX ab Urbe Condita
              </span>
            </div>

            <div className="flex items-center space-x-2 order-3">
              <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold tracking-widest">MMDCCLXXIX</span>
                  <span className="text-xs text-amber-200">2779 AUC</span>
               </div>
            </div>
          </div>

          {/* Controlli Navigazione */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-red-800 rounded-full transition-colors border border-amber-500/30"
              aria-label="Mensis Ante"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative">
              <select 
                value={currentDate.getMonth()} 
                onChange={handleMonthSelect}
                className="appearance-none bg-red-950 text-amber-50 border border-amber-500/50 py-2 pl-4 pr-10 rounded font-serif uppercase tracking-wider cursor-pointer hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {monthsLat.map((m, idx) => (
                  <option key={idx} value={idx}>{m}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-500">
                <Scroll size={16} />
              </div>
            </div>

            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-red-800 rounded-full transition-colors border border-amber-500/30"
              aria-label="Mensis Post"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </header>

        {/* Griglia Calendario */}
        <main className="p-4 md:p-8">
          {/* Intestazione Giorni */}
          <div className="grid grid-cols-7 mb-4 border-b-4 border-stone-800">
            {weekDaysLat.map((day, idx) => (
              <div key={idx} className="p-2 text-center font-bold text-stone-700 uppercase tracking-tighter text-xs md:text-sm lg:text-base">
                <span className="hidden md:inline">{day}</span>
                <span className="md:hidden">{day.split(' ')[1].substring(0,3)}</span>
              </div>
            ))}
          </div>

          {/* Giorni */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 auto-rows-fr">
            {emptyDays.map((_, idx) => (
              <div key={`empty-${idx}`} className="bg-transparent p-2"></div>
            ))}

            {days.map((day) => {
              const festivalKey = `${currentDate.getMonth()}-${day}`;
              const festivalName = festivals[festivalKey];
              const isToday = 
                new Date().getDate() === day && 
                new Date().getMonth() === currentDate.getMonth() && 
                new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div 
                  key={day} 
                  className={`
                    min-h-[100px] md:min-h-[140px] border border-stone-300 p-2 flex flex-col justify-between relative group transition-all hover:bg-stone-100 hover:shadow-md
                    ${isToday ? 'bg-amber-100 ring-2 ring-red-800/50' : 'bg-white'}
                  `}
                >
                  {/* Numero Moderno */}
                  <div className="flex justify-between items-start">
                    <span className={`text-xl font-bold font-sans ${day === 1 ? 'text-4xl text-red-800' : 'text-stone-400'}`}>
                      {toRoman(day)}
                    </span>
                    <span className="text-xs text-stone-300 font-sans">{day}</span>
                  </div>

                  {/* Data Romana (Calende/None/Idi) */}
                  <div className="text-center my-1">
                    <span className="text-[0.65rem] md:text-xs text-stone-600 font-semibold italic uppercase block leading-tight">
                      {getRomanDate(day, currentDate.getMonth(), currentDate.getFullYear())}
                    </span>
                  </div>

                  {/* Festività */}
                  {festivalName && (
                    <div className="mt-1 text-center bg-red-50 p-1 rounded border-l-2 border-red-700">
                      <span className="text-[0.6rem] md:text-xs font-bold text-red-800 uppercase block leading-tight break-words">
                        {festivalName}
                      </span>
                    </div>
                  )}

                  {/* Marker Nundinae (ipotesi estetica) */}
                  {(day % 8 === 0) && (
                     <div className="absolute bottom-1 right-1 w-1 h-1 bg-stone-300 rounded-full" title="Nundinae (simulato)"></div>
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-stone-200 text-stone-600 p-4 text-center text-xs border-t border-stone-300">
          <p>
            Dies fasti et nefasti in calendario Iuliano anni MMXXVI (2779 AUC).
          </p>
          <p className="opacity-60 mt-1">
            * Nota: Computus dierum Gregorianus est, nomenclatura Romana.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RomanCalendar;