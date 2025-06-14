
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SindicoDashboardProps {
  user: any;
}

const SindicoDashboard = ({ user }: SindicoDashboardProps) => {
  const stats = {
    reservasHoje: 8,
    moradoresTotal: 45,
    ambientesAtivos: 6,
    visitantesHoje: 12
  };

  const ultimasReservas = [
    { id: 1, morador: 'Ana Silva', ambiente: 'Salão de Festas', horario: '19:00-23:00' },
    { id: 2, morador: 'João Santos', ambiente: 'Churrasqueira 2', horario: '14:00-18:00' },
    { id: 3, morador: 'Maria Oliveira', ambiente: 'Quadra', horario: '08:00-10:00' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Painel Administrativo 🏢
        </h1>
        <p className="text-gray-600">Gestão completa do {user.condominio}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Reservas Hoje</p>
                <p className="text-2xl font-bold text-blue-900">{stats.reservasHoje}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Moradores</p>
                <p className="text-2xl font-bold text-green-900">{stats.moradoresTotal}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Ambientes Ativos</p>
                <p className="text-2xl font-bold text-purple-900">{stats.ambientesAtivos}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏊‍♂️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Visitantes Hoje</p>
                <p className="text-2xl font-bold text-orange-900">{stats.visitantesHoje}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚪</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesso direto às principais funcionalidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <div className="text-center">
                <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
                <div>Gerenciar Moradores</div>
              </div>
            </Button>
            <Button className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <div className="text-center">
                <div className="text-2xl mb-1">🏢</div>
                <div>Gestão de Ambientes</div>
              </div>
            </Button>
            <Button className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <div className="text-center">
                <div className="text-2xl mb-1">📢</div>
                <div>Enviar Comunicado</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Reservas Recentes
          </CardTitle>
          <CardDescription>Últimas reservas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ultimasReservas.map((reserva) => (
              <div key={reserva.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{reserva.morador}</h4>
                  <p className="text-sm text-gray-600">{reserva.ambiente} • {reserva.horario}</p>
                </div>
                <Button variant="outline" size="sm">Detalhes</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SindicoDashboard;
