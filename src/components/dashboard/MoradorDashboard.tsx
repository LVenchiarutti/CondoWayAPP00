import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MoradorDashboardProps {
  user: any;
  setCurrentPage: (page: string) => void;
}

const MoradorDashboard = ({ user, setCurrentPage }: MoradorDashboardProps) => {
  const mockReservas = [
    { id: 1, ambiente: 'Salão de Festas', data: '2024-01-20', horario: '19:00 - 23:00' },
    { id: 2, ambiente: 'Churrasqueira 1', data: '2024-01-25', horario: '12:00 - 16:00' },
  ];

  const mockComunicados = [
    { id: 1, titulo: 'Manutenção da Piscina', data: '2024-01-15', resumo: 'A piscina ficará fechada para manutenção...' },
    { id: 2, titulo: 'Nova Taxa de Condomínio', data: '2024-01-10', resumo: 'Informamos sobre o reajuste...' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Olá, {user.nome.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">Bem-vindo ao seu painel do CondoWay</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
          onClick={() => setCurrentPage('ambientes')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏊‍♂️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Reservar Ambiente</h3>
                <p className="text-sm text-gray-600">Acesse as áreas de lazer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-green-200"
          onClick={() => setCurrentPage('visitantes')}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cadastrar Visitante</h3>
                <p className="text-sm text-gray-600">Registre seus convidados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Reservas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📅 Próximas Reservas
          </CardTitle>
          <CardDescription>Suas reservas agendadas</CardDescription>
        </CardHeader>
        <CardContent>
          {mockReservas.length > 0 ? (
            <div className="space-y-3">
              {mockReservas.map((reserva) => (
                <div key={reserva.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{reserva.ambiente}</h4>
                    <p className="text-sm text-gray-600">{reserva.data} • {reserva.horario}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage('reservas')}>Ver</Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhuma reserva agendada</p>
          )}
        </CardContent>
      </Card>

      {/* Últimos Comunicados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📢 Últimos Comunicados
          </CardTitle>
          <CardDescription>Novidades do condomínio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockComunicados.map((comunicado) => (
              <div key={comunicado.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-medium text-gray-900">{comunicado.titulo}</h4>
                <p className="text-sm text-gray-600 mb-1">{comunicado.resumo}</p>
                <p className="text-xs text-gray-400">{comunicado.data}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoradorDashboard;