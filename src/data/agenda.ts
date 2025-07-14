
export const weeklyStats = {
    profissionaisLivres: 12,
    faltas: 2,
    cancelamentos: 3,
    fixos: 15,
    clientes: 8,
    totalAgendados: 23,
    possiveis: 35
};

export const professionalAvailability = [
    {
      name: "Ana Silva",
      schedule: {
        seg: "LIVRE",
        ter: "LIVRE 6",
        qua: "MANHÃ",
        qui: "TARDE",
        sex: "LIVRE",
        sab: "LIVRE 6"
      }
    },
    {
      name: "Carlos Souza", 
      schedule: {
        seg: "LIVRE",
        ter: "MANHÃ",
        qua: "LIVRE",
        qui: "LIVRE 6",
        sex: "TARDE",
        sab: "LIVRE"
      }
    },
    {
      name: "Mariana Oliveira",
      schedule: {
        seg: "LIVRE 6",
        ter: "LIVRE",
        qua: "TARDE",
        qui: "LIVRE",
        sex: "MANHÃ",
        sab: "LIVRE 6"
      }
    }
];

export const availableProfessionals = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Limpadora Residencial",
      phone: "(11) 99999-0001",
      rating: 4.9,
      availability: "h/semana",
      lastService: "2024-01-10",
      serviceRatings: {
        residential: 0,
        commercial: 0
      },
      generalAverage: 0,
      confidence: 95,
      stats: {
        appointments: 25,
        complaints: 0,
        delays: 1,
        absences: 0
      }
    },
    {
      id: 2,
      name: "Carlos Souza",
      role: "Limpador Comercial",
      phone: "(11) 99999-0002",
      rating: 4.8,
      availability: "h/semana",
      lastService: "2024-01-12",
      serviceRatings: {
        residential: 0,
        commercial: 0
      },
      generalAverage: 0,
      confidence: 88,
      stats: {
        appointments: 18,
        complaints: 1,
        delays: 0,
        absences: 0
      }
    },
    {
      id: 3,
      name: "Mariana Oliveira",
      role: "Supervisora de Limpeza",
      phone: "(11) 99999-0003",
      rating: 4.9,
      availability: "h/semana",
      lastService: "2024-01-08",
      serviceRatings: {
        residential: 0,
        commercial: 0
      },
      generalAverage: 0,
      confidence: 92,
      stats: {
        appointments: 30,
        complaints: 0,
        delays: 0,
        absences: 1
      }
    }
];

export const unassignedAppointments = [
    {
      id: 1,
      client: "Maria Santos",
      date: "2024-01-15",
      time: "09:00",
      service: "Limpeza Residencial",
      address: "Rua das Flores, 123"
    },
    {
      id: 2,
      client: "João Pereira", 
      date: "2024-01-16",
      time: "14:00",
      service: "Limpeza Comercial",
      address: "Av. Paulista, 1000"
    }
];

export type Professional = typeof availableProfessionals[0];
