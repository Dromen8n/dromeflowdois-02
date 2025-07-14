
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarioTab } from "./agenda/CalendarioTab";
import { GestaoTab } from "./agenda/GestaoTab";

const AgendaModule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentWeek, setCurrentWeek] = useState("14/06/2025");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendario" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-cream-modern border-2 border-cream-modern">
          <TabsTrigger 
            value="calendario"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Calendário
          </TabsTrigger>
          <TabsTrigger 
            value="gestao"
            className="data-[state=active]:bg-blue-modern data-[state=active]:text-white"
          >
            Gestão
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendario" className="space-y-6">
          <CalendarioTab 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </TabsContent>

        <TabsContent value="gestao" className="space-y-6">
          <GestaoTab currentWeek={currentWeek} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgendaModule;
