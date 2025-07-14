
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Send,
  FileText,
  X
} from "lucide-react";

const RecrutadoraModule = () => {
  const [recruitmentCandidates] = useState([
    {
      id: 1,
      name: "Ana paula Pereira",
      registrationDate: "15/06/2025",
      stage: "qualificadas",
      personalInfo: {
        birthDate: "01/03/1989",
        whatsapp: "+5547999034765",
        rg: "N/A",
        cpf: "N/A",
        civilStatus: "Solteira",
        children: "SIM",
        childrenQty: "3",
        childrenRoutine: "Sim"
      },
      address: {
        street: ", 78 - - -",
        cep: ""
      },
      experience: {
        residential: "SIM",
        commercialRef: "4799865461",
        residentialRef: "Buteco do Juninho",
        commercial: "SIM",
        currentSituation: "ESTOU PARADA",
        registrationReason: "Recebo algum auxílio do governo (aposentadoria bolsa) e gostaria de complementar minha renda"
      },
      availability: {
        transport: "Transporte público/Uber",
        freeDays: "3 dias",
        workDays: "Quinta-Feira, Sexta-Feira",
        smoker: "NÃO",
        petRestriction: "Não"
      }
    },
    {
      id: 2,
      name: "Rozana Aparecida de Souza",
      registrationDate: "13/06/2025",
      stage: "qualificadas",
      personalInfo: {
        birthDate: "15/05/1985",
        whatsapp: "+5547999012345",
        rg: "123456789",
        cpf: "111.222.333-44",
        civilStatus: "Casada",
        children: "SIM",
        childrenQty: "2",
        childrenRoutine: "Sim"
      }
    },
    {
      id: 3,
      name: "Thayna giovana furquim Vicente",
      registrationDate: "11/06/2025",
      stage: "contato",
      personalInfo: {
        birthDate: "22/08/1992",
        whatsapp: "+5547888765432",
        rg: "987654321",
        cpf: "555.666.777-88",
        civilStatus: "Solteira",
        children: "NÃO",
        childrenQty: "0",
        childrenRoutine: "Não"
      }
    },
    {
      id: 4,
      name: "Raquel Andreina Oliveros Brito",
      registrationDate: "12/06/2025",
      stage: "conversa",
      personalInfo: {
        birthDate: "10/12/1988",
        whatsapp: "+5547777654321",
        rg: "456789123",
        cpf: "999.888.777-66",
        civilStatus: "Divorciada",
        children: "SIM",
        childrenQty: "1",
        childrenRoutine: "Sim"
      }
    },
    {
      id: 5,
      name: "Giane Cascaes Serafim",
      registrationDate: "22/05/2025",
      stage: "envio",
      personalInfo: {
        birthDate: "03/07/1990",
        whatsapp: "+5547666543210",
        rg: "321654987",
        cpf: "444.333.222-11",
        civilStatus: "Casada",
        children: "SIM",
        childrenQty: "2",
        childrenRoutine: "Sim"
      }
    }
  ]);

  const recruitmentStages = [
    { 
      id: "qualificadas", 
      title: "QUALIFICADAS JOINVILLE", 
      headerImage: "bg-gradient-to-r from-yellow-500 to-orange-500",
      borderColor: "border-l-yellow-500"
    },
    { 
      id: "qualificadas-jaragua", 
      title: "QUALIFICADAS JARAGUÁ DO SUL", 
      headerImage: "bg-gradient-to-r from-cyan-500 to-blue-500",
      borderColor: "border-l-cyan-500"
    },
    { 
      id: "contato", 
      title: "CONTATO", 
      headerImage: "bg-gradient-to-r from-pink-500 to-purple-500",
      borderColor: "border-l-pink-500"
    },
    { 
      id: "conversa", 
      title: "CONVERSA AGENDADA", 
      headerImage: "bg-gradient-to-r from-blue-400 to-cyan-400",
      borderColor: "border-l-blue-400"
    },
    { 
      id: "envio", 
      title: "ENVIO DOS DOCUMENTOS", 
      headerImage: "bg-gradient-to-r from-green-500 to-teal-500",
      borderColor: "border-l-green-500"
    }
  ];

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <div className="bg-white border-l-4 border-gray-300 rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="font-semibold text-gray-900 mb-2">{candidate.name}</div>
        <div className="text-sm text-gray-600 mb-3">
          Cadastrado em: {candidate.registrationDate}
        </div>
        <Button 
          size="sm" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setSelectedCandidate(candidate)}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );

  const CandidateModal = ({ candidate, onClose }: { candidate: any; onClose: () => void }) => (
    <Dialog open={!!candidate} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold text-pink-600">{candidate?.name}</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-6 top-6"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <Tabs defaultValue="personal" className="overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              Informações Pessoais
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              Experiência e Disponibilidade
            </TabsTrigger>
            <TabsTrigger value="observations" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              Observação
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 overflow-y-auto max-h-[60vh]">
            <TabsContent value="personal" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-pink-600 mb-4">Dados Pessoais</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Nome:</span>
                    <div className="font-medium">{candidate?.name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Data Nasc.:</span>
                    <div className="font-medium">{candidate?.personalInfo?.birthDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">WhatsApp:</span>
                    <div className="font-medium">{candidate?.personalInfo?.whatsapp}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">RG:</span>
                    <div className="font-medium">{candidate?.personalInfo?.rg}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">CPF:</span>
                    <div className="font-medium">{candidate?.personalInfo?.cpf}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Estado Civil:</span>
                    <div className="font-medium">{candidate?.personalInfo?.civilStatus}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Filhos:</span>
                    <div className="font-medium">{candidate?.personalInfo?.children}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Qto Filhos:</span>
                    <div className="font-medium">{candidate?.personalInfo?.childrenQty}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Rotina Filhos:</span>
                    <div className="font-medium">{candidate?.personalInfo?.childrenRoutine}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-pink-600 mb-4">Endereço</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Endereço:</span>
                    <div className="font-medium">{candidate?.address?.street}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">CEP:</span>
                    <div className="font-medium">{candidate?.address?.cep}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Mover
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-pink-600 mb-4">Experiência Profissional</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Exp. Residencial:</span>
                    <div className="font-medium">{candidate?.experience?.residential}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Ref. Residencial:</span>
                    <div className="font-medium">{candidate?.experience?.residentialRef}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Exp. Comercial:</span>
                    <div className="font-medium">{candidate?.experience?.commercial}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Ref. Comercial:</span>
                    <div className="font-medium">{candidate?.experience?.commercialRef}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Situação Atual:</span>
                    <div className="font-medium">{candidate?.experience?.currentSituation}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Motivo Cadastro:</span>
                    <div className="font-medium text-sm">{candidate?.experience?.registrationReason}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-pink-600 mb-4">Disponibilidade e Preferências</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Transporte:</span>
                    <div className="font-medium">{candidate?.availability?.transport}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Dias Livres:</span>
                    <div className="font-medium">{candidate?.availability?.freeDays}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Dias Semana Trab.:</span>
                    <div className="font-medium">{candidate?.availability?.workDays}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Fumante:</span>
                    <div className="font-medium">{candidate?.availability?.smoker}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Restrição Pet:</span>
                    <div className="font-medium">{candidate?.availability?.petRestriction}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="observations" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-pink-600 mb-4">Observações</h3>
                <Textarea 
                  className="min-h-[300px] w-full border border-gray-300 rounded-md p-3"
                  placeholder="Digite suas observações aqui..."
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Recrutadora</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-modern hover:bg-blue-modern/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Candidata
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Candidata</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input className="w-full p-2 border rounded-md" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <input className="w-full p-2 border rounded-md" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Observações</label>
                <Textarea placeholder="Observações sobre a candidata..." />
              </div>
              <Button className="w-full bg-blue-modern hover:bg-blue-modern/90 text-white">Adicionar Candidata</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {recruitmentStages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg shadow-sm border min-h-[600px]">
            <div className={`${stage.headerImage} text-white p-4 rounded-t-lg relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                </div>
                <h3 className="font-bold text-sm leading-tight">
                  {stage.title}
                </h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {recruitmentCandidates
                .filter(candidate => {
                  if (stage.id === "qualificadas") return candidate.stage === "qualificadas";
                  if (stage.id === "qualificadas-jaragua") return false; // No candidates for this stage in sample data
                  return candidate.stage === stage.id;
                })
                .map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <CandidateModal 
          candidate={selectedCandidate} 
          onClose={() => setSelectedCandidate(null)} 
        />
      )}
    </div>
  );
};

export default RecrutadoraModule;
