
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface NewClientModalProps {
  children: React.ReactNode;
}

export const NewClientModal = ({ children }: NewClientModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "",
    observations: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para adicionar o cliente
    console.log("Novo cliente:", formData);
    setIsOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "",
      observations: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Nome/Razão Social</Label>
            <Input
              id="clientName"
              placeholder="Digite o nome ou razão social"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientType">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PF">Pessoa Física</SelectItem>
                <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Telefone</Label>
            <Input
              id="clientPhone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Endereço Completo</Label>
            <Input
              id="clientAddress"
              placeholder="Rua, número, bairro, cidade"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientObservations">Observações</Label>
            <Textarea
              id="clientObservations"
              placeholder="Observações sobre o cliente (opcional)"
              value={formData.observations}
              onChange={(e) => handleInputChange("observations", e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Adicionar Cliente
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
