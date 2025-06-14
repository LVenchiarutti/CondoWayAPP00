import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Ban, CheckCircle, Calendar } from 'lucide-react';

const initialAmbientes = [
  { id: 1, nome: 'Salão de Festas', capacidade: '50 pessoas', disponivel: true, imagem: '🎉' },
  { id: 2, nome: 'Churrasqueira Coberta', capacidade: '20 pessoas', disponivel: true, imagem: '🔥' },
  { id: 3, nome: 'Piscina', capacidade: '30 pessoas', disponivel: false, imagem: '🏊‍♂️' },
  { id: 4, nome: 'Quadra Esportiva', capacidade: '16 pessoas', disponivel: true, imagem: '🏐' },
  { id: 5, nome: 'Sauna', capacidade: '8 pessoas', disponivel: true, imagem: '🧖‍♀️' },
  { id: 6, nome: 'Salão de Jogos', capacidade: '15 pessoas', disponivel: true, imagem: '🎱' },
];

const GestaoAmbientes = ({ setCurrentPage }) => {
  const [ambientes, setAmbientes] = useState(initialAmbientes);
  const { toast } = useToast();

  const toggleDisponibilidade = (id) => {
    let ambienteNome = '';
    let novoStatus = false;
    
    const novosAmbientes = ambientes.map((ambiente) => {
      if (ambiente.id === id) {
        ambienteNome = ambiente.nome;
        novoStatus = !ambiente.disponivel;
        return { ...ambiente, disponivel: novoStatus };
      }
      return ambiente;
    });

    setAmbientes(novosAmbientes);
    
    toast({
      title: 'Status Alterado!',
      description: `O ambiente ${ambienteNome} está agora ${novoStatus ? 'Disponível' : 'Em Manutenção'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🏢 Gestão de Ambientes</h1>
      <p className="text-muted-foreground">Altere a disponibilidade e gerencie as áreas comuns.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambientes.map((ambiente) => (
          <Card key={ambiente.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-4xl">{ambiente.imagem}</span> {ambiente.nome}
              </CardTitle>
              <CardDescription>Capacidade: {ambiente.capacidade}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <div className="space-y-4">
                <Badge variant={ambiente.disponivel ? 'default' : 'destructive'} className="bg-green-600 data-[variant=destructive]:bg-red-600 text-white">
                  {ambiente.disponivel ? 'Disponível' : 'Em Manutenção'}
                </Badge>
                <div className="flex flex-col space-y-2">
                    <Button variant="outline" onClick={() => toggleDisponibilidade(ambiente.id)}>
                      {ambiente.disponivel ? <Ban className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                      Alterar Status
                    </Button>
                    <Button onClick={() => setCurrentPage('reservas')}>
                        <Calendar className="mr-2 h-4 w-4" /> Ver Agenda
                    </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GestaoAmbientes;