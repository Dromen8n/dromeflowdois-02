
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorfulCalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}

export function ColorfulCalendar({ selected, onSelect, className }: ColorfulCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Dias vazios no início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };
  
  const isSelected = (date: Date) => {
    return selected && date.toDateString() === selected.toDateString();
  };
  
  const hasEvent = (date: Date) => {
    // Simulando alguns eventos para demonstração
    const day = date.getDate();
    return [16, 18, 24].includes(day);
  };
  
  const handleDayClick = (date: Date) => {
    onSelect?.(date);
  };
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <div className={cn("bg-[#FFF1A8] rounded-xl overflow-hidden shadow-md", className)}>
      <div className="bg-[#FFD100] text-gray-800 p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className="flex gap-2">
          <button className="bg-transparent border-none p-2 rounded-md cursor-pointer transition-colors flex items-center justify-center hover:bg-white/20" onClick={() => navigateMonth('prev')}>
            <ChevronLeft size={18} />
          </button>
          <button className="bg-transparent border-none p-2 rounded-md cursor-pointer transition-colors flex items-center justify-center hover:bg-white/20" onClick={() => navigateMonth('next')}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-0.5 p-4">
        {dayNames.map((day) => (
          <div key={day} className="text-[#0077B6] font-semibold text-center p-2 text-sm">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => (
          <div
            key={index}
            className={cn(
              "bg-white rounded-lg m-0.5 min-h-[40px] flex items-center justify-center cursor-pointer transition-all relative font-medium hover:bg-sky-50 hover:scale-105",
              !date && "bg-transparent cursor-default hover:scale-100 hover:bg-transparent",
              date && isToday(date) && "border-2 border-[#00A896] font-bold",
              date && isSelected(date) && "bg-[#0077B6] text-white"
            )}
            onClick={() => date && handleDayClick(date)}
          >
            {date && (
              <>
                {date.getDate()}
                {hasEvent(date) && <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#00A896] rounded-full"></span>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
