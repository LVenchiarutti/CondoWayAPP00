import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';

interface AmbientesProps {
  user: any;
}

const Ambientes = ({ user }: AmbientesProps) => {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);
  const [dataReserva, setDataReserva] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const { toast } = useToast();

  const ambientes = [
    {
      id: 1,
      nome: 'Salão de Festas',
      descricao: 'Espaço para eventos e comemorações',
      capacidade: '50 pessoas',
      disponivel: true,
      imagem: '🎉',
      regras: 'Horário de silêncio após as 22h. Limpeza obrigatória após o uso.'
    },
    {
      id: 2,
      nome: 'Churrasqueira Coberta',
      descricao: 'Área de churrasqueira com mesas',
      capacidade: '20 pessoas',
      disponivel: true,
      imagem: '🔥',
      regras: 'Entregar o ambiente limpo após o uso.'
    },
    {
      id: 3,
      nome: 'Piscina',
      descricao: 'Área aquática com deck',
      capacidade: '30 pessoas',
      disponivel: false,
      imagem: '🏊‍♂️',
      regras: 'Obrigatório exame médico. Proibido uso de bronzeadores à base de óleo.'
    },
    {
      id: 4,
      nome: 'Quadra Esportiva',
      descricao: 'Quadra poliesportiva coberta',
      capacidade: '16 pessoas',
      disponivel: true,
      imagem: '🏐',
      regras: 'Uso exclusivo com calçados apropriados.'
    },
    {
      id: 5,
      nome: 'Sauna',
      descricao: 'Sauna seca com relaxamento',
      capacidade: '8 pessoas',
      disponivel: true,
      imagem: '🧖‍♀️',
      regras: 'Permanência máxima de 15 minutos.'
    },
    {
      id: 6,
      nome: 'Salão de Jogos',
      descricao: 'Mesa de sinuca, ping-pong e jogos',
      capacidade: '15 pessoas',
      disponivel: true,
      imagem: '🎱',
      regras: 'Manter os equipamentos organizados.'
    },
    {
      id: 7,
      nome: 'Churrasqueira Piscina',
      descricao: 'Área de churrasqueira com mesas próxima à piscina',
      capacidade: '40 pessoas',
      disponivel: true,
      imagem: '🔥🏊‍♂️',
      regras: 'Entregar o ambiente limpo após o uso.'
    },
    
  ];

  const handleConfirmarReserva = () => {
    if (!dataReserva || !horaInicio || !horaFim) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione a data, hora de início e hora de fim.",
        variant: "destructive",
      });
      return;
    }

    if (horaFim <= horaInicio) {
      toast({
        title: "Horário inválido",
        description: "A hora de fim deve ser posterior à hora de início.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reserva solicitada!",
      description: `Sua reserva para ${selectedAmbiente.nome} em ${new Date(dataReserva).toLocaleDateString('pt-BR')} das ${horaInicio} às ${horaFim} foi enviada.`,
    });

    // Resetar campos e voltar para a lista
    setDataReserva('');
    setHoraInicio('');
    setHoraFim('');
    setSelectedAmbiente(null);
  };

  if (selectedAmbiente) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedAmbiente(null)}>
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedAmbiente.nome}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-4xl">{selectedAmbiente.imagem}</span>
                {selectedAmbiente.nome}
              </CardTitle>
              <CardDescription>{selectedAmbiente.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informações</h4>
                  <p className="text-sm text-gray-600">Capacidade: {selectedAmbiente.capacidade}</p>
                  <div className="mt-2">
                    <Badge variant={selectedAmbiente.disponivel ? "secondary" : "destructive"}>
                      {selectedAmbiente.disponivel ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                </div>
                 {selectedAmbiente.regras && (
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2 mt-4">Regras de Utilização</h4>
                        <p className="text-sm text-gray-600">{selectedAmbiente.regras}</p>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📅 Fazer Reserva</CardTitle>
              <CardDescription>Selecione a data e o período desejado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Data</label>
                  <Input 
                    type="date" 
                    value={dataReserva}
                    onChange={(e) => setDataReserva(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Hora de Início</label>
                    <Input
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Hora de Fim</label>
                    <Input
                        type="time"
                        value={horaFim}
                        onChange={(e) => setHoraFim(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleConfirmarReserva}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  disabled={!selectedAmbiente.disponivel}
                >
                  {selectedAmbiente.disponivel ? "Confirmar Reserva" : "Ambiente Indisponível"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          🏊‍♂️ Ambientes para Reserva
        </h1>
        <p className="text-gray-600">Selecione uma área de lazer para reservar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambientes.map((ambiente) => (
          <Card 
            key={ambiente.id} 
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedAmbiente(ambiente)}
          >
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-200">
                  {ambiente.imagem}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{ambiente.nome}</h3>
                  <p className="text-sm text-gray-600 mt-1">{ambiente.descricao}</p>
                  <p className="text-xs text-gray-500 mt-2">Capacidade: {ambiente.capacidade}</p>
                </div>
                <div className="flex justify-center">
                  <Badge variant={ambiente.disponivel ? "secondary" : "destructive"}>
                    {ambiente.disponivel ? "Disponível" : "Manutenção"}
                  </Badge>
                </div>
                <Button 
                  className="w-full"
                  variant={ambiente.disponivel ? "default" : "secondary"}
                  disabled={!ambiente.disponivel}
                >
                  {ambiente.disponivel ? "Fazer Reserva" : "Indisponível"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Ambientes;