import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PorteiroDashboardProps {
  user: any;
  setCurrentPage: (page: string) => void;
}

const PorteiroDashboard = ({ user, setCurrentPage }: PorteiroDashboardProps) => {
  const { toast } = useToast();

  const handleActionClick = (message: string) => {
    toast({
      title: "Ação Registrada",
      description: message,
    });
  };

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
      case 'autorizado': return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">
          Central de Portaria 🚪
        </h1>
        <p className="text-muted-foreground">Controle de acesso e comunicação - {new Date().toLocaleDateString('pt-BR')}</p>
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
              <div key={visitante.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{visitante.nome}</h4>
                    <Badge className={getStatusColor(visitante.status)}>
                      {visitante.status === 'autorizado' ? 'Autorizado' : 'Pendente'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Doc: {visitante.documento} • Apt: {visitante.apartamento} • Horário: {visitante.horario}
                  </p>
                </div>
                <div className="flex gap-2">
                  {visitante.status === 'pendente' && (
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleActionClick(`Entrada de ${visitante.nome} autorizada.`)}>
                      Autorizar
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage('visitantes')}>
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
              <div key={entrega.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{entrega.tipo}</h4>
                  <p className="text-sm text-muted-foreground">{entrega.destinatario} • {entrega.horario}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleActionClick(`Entrega para ${entrega.destinatario} registrada.`)}>Entregue</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PorteiroDashboard;