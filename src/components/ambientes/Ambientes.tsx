
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AmbientesProps {
  user: any;
}

const Ambientes = ({ user }: AmbientesProps) => {
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);

  const ambientes = [
    {
      id: 1,
      nome: 'Salão de Festas',
      descricao: 'Espaço para eventos e comemorações',
      capacidade: '50 pessoas',
      disponivel: true,
      imagem: '🎉',
      horarios: ['09:00-13:00', '14:00-18:00', '19:00-23:00']
    },
    {
      id: 2,
      nome: 'Churrasqueira 1',
      descricao: 'Área de churrasqueira com mesas',
      capacidade: '20 pessoas',
      disponivel: true,
      imagem: '🔥',
      horarios: ['10:00-14:00', '15:00-19:00', '20:00-00:00']
    },
    {
      id: 3,
      nome: 'Piscina',
      descricao: 'Área aquática com deck',
      capacidade: '30 pessoas',
      disponivel: false,
      imagem: '🏊‍♂️',
      horarios: ['08:00-12:00', '13:00-17:00', '18:00-22:00']
    },
    {
      id: 4,
      nome: 'Quadra Esportiva',
      descricao: 'Quadra poliesportiva coberta',
      capacidade: '16 pessoas',
      disponivel: true,
      imagem: '🏐',
      horarios: ['07:00-11:00', '14:00-18:00', '19:00-23:00']
    },
    {
      id: 5,
      nome: 'Sauna',
      descricao: 'Sauna seca com relaxamento',
      capacidade: '8 pessoas',
      disponivel: true,
      imagem: '🧖‍♀️',
      horarios: ['18:00-20:00', '20:00-22:00']
    },
    {
      id: 6,
      nome: 'Salão de Jogos',
      descricao: 'Mesa de sinuca, ping-pong e jogos',
      capacidade: '15 pessoas',
      disponivel: true,
      imagem: '🎱',
      horarios: ['09:00-13:00', '14:00-18:00', '19:00-23:00']
    }
  ];

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
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Horários Disponíveis</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAmbiente.horarios.map((horario, index) => (
                      <Badge key={index} variant="outline">{horario}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📅 Fazer Reserva</CardTitle>
              <CardDescription>Selecione data e horário desejado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Data</label>
                  <input 
                    type="date" 
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Horário</label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                    <option value="">Selecione um horário</option>
                    {selectedAmbiente.horarios.map((horario, index) => (
                      <option key={index} value={horario}>{horario}</option>
                    ))}
                  </select>
                </div>
                <Button 
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
                  {ambiente.disponivel ? "Ver Agenda" : "Indisponível"}
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
