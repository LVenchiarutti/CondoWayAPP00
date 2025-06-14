
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PorteiroDashboardProps {
  user: any;
}

const PorteiroDashboard = ({ user }: PorteiroDashboardProps) => {
  const visitantesHoje = [
    { id: 1, nome: 'Carlos Alberto', documento: '123.456.789-00', apartamento: 'A-101', horario: '14:00', status: 'pendente' },
    { id: 2, nome: 'Marina Santos', documento: '987.654.321-00', apartamento: 'B-205', horario: '16:30', status: 'autorizado' },
    { id: 3, nome: 'Roberto Silva', documento: '456.789.123-00', apartamento: 'A-304', horario: '19:00', status: 'pendente' },
    { id: 4, nome: 'Ana Costa', documento: '789.123.456-00', apartamento: 'C-102', horario: '20:00', status: 'pendente' },
  ];

  const entregas = [
    { id: 1, tipo: 'Correios', destinatario: 'João Silva - A-101', horario: '09:30' },
    { id: 2, tipo: 'E-commerce', destinatario: 'Maria Santos - B-203', horario: '11:15' },
    { id: 3, tipo: 'Medicamento', destinatario: 'Pedro Costa - A-205', horario: '14:20' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'autorizado': return 'bg-green-100 text-green-700';
      case 'pendente': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Central de Portaria 🚪
        </h1>
        <p className="text-gray-600">Controle de acesso e comunicação - {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Visitantes Hoje</p>
                <p className="text-2xl font-bold text-blue-900">{visitantesHoje.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Entregas</p>
                <p className="text-2xl font-bold text-green-900">{entregas.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📦</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Autorizados</p>
                <p className="text-2xl font-bold text-purple-900">
                  {visitantesHoje.filter(v => v.status === 'autorizado').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitantes do Dia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📝 Visitantes Esperados Hoje
          </CardTitle>
          <CardDescription>Lista de visitantes cadastrados para hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {visitantesHoje.map((visitante) => (
              <div key={visitante.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{visitante.nome}</h4>
                    <Badge className={getStatusColor(visitante.status)}>
                      {visitante.status === 'autorizado' ? 'Autorizado' : 'Pendente'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Doc: {visitante.documento} • Apt: {visitante.apartamento} • Horário: {visitante.horario}
                  </p>
                </div>
                <div className="flex gap-2">
                  {visitante.status === 'pendente' && (
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Autorizar
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Entregas e Encomendas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📦 Entregas do Dia
          </CardTitle>
          <CardDescription>Controle de encomendas e correspondências</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {entregas.map((entrega) => (
              <div key={entrega.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{entrega.tipo}</h4>
                  <p className="text-sm text-gray-600">{entrega.destinatario} • {entrega.horario}</p>
                </div>
                <Button variant="outline" size="sm">Entregue</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <div className="text-center">
                <div className="text-2xl mb-1">📨</div>
                <div>Enviar Aviso Geral</div>
              </div>
            </Button>
            <Button className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <div className="text-center">
                <div className="text-2xl mb-1">👥</div>
                <div>Registrar Visitante</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PorteiroDashboard;
