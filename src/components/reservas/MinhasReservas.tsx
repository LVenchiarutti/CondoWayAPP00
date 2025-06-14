
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MinhasReservasProps {
  user: any;
}

const MinhasReservas = ({ user }: MinhasReservasProps) => {
  const [reservas] = useState({
    ativas: [
      {
        id: 1,
        ambiente: 'Salão de Festas',
        data: '2024-04-25',
        horario: '19:00-23:00',
        status: 'confirmada',
        icone: '🎉'
      },
      {
        id: 2,
        ambiente: 'Churrasqueira 1',
        data: '2024-01-30',
        horario: '12:00-16:00',
        status: 'confirmada',
        icone: '🔥'
      }
    ],
    canceladas: [
      {
        id: 3,
        ambiente: 'Quadra Esportiva',
        data: '2024-01-18',
        horario: '14:00-16:00',
        status: 'cancelada',
        icone: '🏐',
        motivoCancelamento: 'Cancelado pelo usuário'
      }
    ],
    historico: [
      {
        id: 4,
        ambiente: 'Sauna',
        data: '2024-01-10',
        horario: '18:00-20:00',
        status: 'concluida',
        icone: '🧖‍♀️'
      },
      {
        id: 5,
        ambiente: 'Salão de Jogos',
        data: '2024-01-05',
        horario: '19:00-22:00',
        status: 'concluida',
        icone: '🎱'
      }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada': return 'bg-green-100 text-green-700';
      case 'cancelada': return 'bg-red-100 text-red-700';
      case 'concluida': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmada': return 'Confirmada';
      case 'cancelada': return 'Cancelada';
      case 'concluida': return 'Concluída';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const ReservaCard = ({ reserva, showActions = false }: { reserva: any, showActions?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">{reserva.icone}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{reserva.ambiente}</h3>
              <p className="text-sm text-gray-600">
                {formatDate(reserva.data)} • {reserva.horario}
              </p>
              {reserva.motivoCancelamento && (
                <p className="text-xs text-red-600 mt-1">{reserva.motivoCancelamento}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(reserva.status)}>
              {getStatusLabel(reserva.status)}
            </Badge>
            {showActions && reserva.status === 'confirmada' && (
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="destructive" size="sm">
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          📅 Minhas Reservas
        </h1>
        <p className="text-gray-600">Gerencie suas reservas de ambientes</p>
      </div>

      <Tabs defaultValue="ativas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ativas">Ativas ({reservas.ativas.length})</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas ({reservas.canceladas.length})</TabsTrigger>
          <TabsTrigger value="historico">Histórico ({reservas.historico.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="ativas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ✅ Reservas Ativas
              </CardTitle>
              <CardDescription>
                Suas próximas reservas confirmadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reservas.ativas.length > 0 ? (
                <div className="space-y-4">
                  {reservas.ativas.map((reserva) => (
                    <ReservaCard key={reserva.id} reserva={reserva} showActions={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📅</div>
                  <p className="text-gray-500">Nenhuma reserva ativa</p>
                  <Button className="mt-4">Fazer Nova Reserva</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canceladas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ❌ Reservas Canceladas
              </CardTitle>
              <CardDescription>
                Reservas que foram canceladas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reservas.canceladas.length > 0 ? (
                <div className="space-y-4">
                  {reservas.canceladas.map((reserva) => (
                    <ReservaCard key={reserva.id} reserva={reserva} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="text-gray-500">Nenhuma reserva cancelada</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📚 Histórico de Reservas
              </CardTitle>
              <CardDescription>
                Todas as suas reservas anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reservas.historico.length > 0 ? (
                <div className="space-y-4">
                  {reservas.historico.map((reserva) => (
                    <ReservaCard key={reserva.id} reserva={reserva} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📚</div>
                  <p className="text-gray-500">Nenhuma reserva no histórico</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MinhasReservas;
