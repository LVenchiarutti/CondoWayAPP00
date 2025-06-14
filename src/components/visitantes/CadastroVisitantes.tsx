
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CadastroVisitantesProps {
  user: any;
}

const CadastroVisitantes = ({ user }: CadastroVisitantesProps) => {
  const [nomeVisitante, setNomeVisitante] = useState('');
  const [documentoVisitante, setDocumentoVisitante] = useState('');
  const [dataVisita, setDataVisita] = useState('');
  const [isCadastrandoVisitante, setIsCadastrandoVisitante] = useState(false);
  const { toast } = useToast();

  // Mock data - visitantes do dia para porteiro
  const visitantesHoje = [
    {
      id: 1,
      nome: 'Carlos Alberto Silva',
      documento: '123.456.789-00',
      apartamento: 'A-101',
      morador: 'João Silva',
      horario: '14:00',
      status: 'pendente'
    },
    {
      id: 2,
      nome: 'Marina Santos Costa',
      documento: '987.654.321-00',
      apartamento: 'B-205',
      morador: 'Maria Santos',
      horario: '16:30',
      status: 'autorizado'
    },
    {
      id: 3,
      nome: 'Roberto Oliveira',
      documento: '456.789.123-00',
      apartamento: 'A-304',
      morador: 'Pedro Costa',
      horario: '19:00',
      status: 'pendente'
    }
  ];

  // Mock data - visitantes cadastrados pelo morador
  const meusVisitantes = [
    {
      id: 1,
      nome: 'Ana Clara Santos',
      documento: '111.222.333-44',
      dataVisita: '2024-01-25',
      status: 'agendado'
    },
    {
      id: 2,
      nome: 'Fernando Costa',
      documento: '555.666.777-88',
      dataVisita: '2024-01-20',
      status: 'visitou'
    }
  ];

  const handleCadastrarVisitante = async () => {
    if (!nomeVisitante.trim() || !documentoVisitante.trim() || !dataVisita) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsCadastrandoVisitante(true);
    
    // Simular cadastro
    setTimeout(() => {
      toast({
        title: "Visitante cadastrado!",
        description: `${nomeVisitante} foi cadastrado para ${new Date(dataVisita).toLocaleDateString('pt-BR')}.`,
      });
      setNomeVisitante('');
      setDocumentoVisitante('');
      setDataVisita('');
      setIsCadastrandoVisitante(false);
    }, 1500);
  };

  const handleAutorizarVisitante = (visitanteId: number) => {
    toast({
      title: "Visitante autorizado!",
      description: "O visitante foi autorizado a entrar.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'autorizado': return 'bg-green-100 text-green-700';
      case 'pendente': return 'bg-yellow-100 text-yellow-700';
      case 'agendado': return 'bg-blue-100 text-blue-700';
      case 'visitou': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'autorizado': return 'Autorizado';
      case 'pendente': return 'Pendente';
      case 'agendado': return 'Agendado';
      case 'visitou': return 'Visitou';
      default: return status;
    }
  };

  // Renderização para Porteiro
  if (user.user_tipo === 'porteiro') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            🚪 Controle de Visitantes
          </h1>
          <p className="text-gray-600">
            Visitantes esperados para hoje - {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Visitantes do Dia
            </CardTitle>
            <CardDescription>
              Lista de visitantes cadastrados para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            {visitantesHoje.length > 0 ? (
              <div className="space-y-4">
                {visitantesHoje.map((visitante) => (
                  <div key={visitante.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{visitante.nome}</h4>
                        <Badge className={getStatusColor(visitante.status)}>
                          {getStatusLabel(visitante.status)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>📄 Documento: {visitante.documento}</p>
                        <p>🏠 Apartamento: {visitante.apartamento} ({visitante.morador})</p>
                        <p>🕐 Horário previsto: {visitante.horario}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {visitante.status === 'pendente' && (
                        <Button 
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleAutorizarVisitante(visitante.id)}
                        >
                          Autorizar Entrada
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">👥</div>
                <p className="text-gray-500">Nenhum visitante esperado para hoje</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Renderização para Morador
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          👥 Cadastro de Visitantes
        </h1>
        <p className="text-gray-600">Cadastre seus visitantes com antecedência</p>
      </div>

      {/* Formulário de Cadastro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ➕ Cadastrar Novo Visitante
          </CardTitle>
          <CardDescription>
            Informe os dados do visitante e a data da visita
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Nome Completo do Visitante *
            </label>
            <Input
              placeholder="Ex: João da Silva Santos"
              value={nomeVisitante}
              onChange={(e) => setNomeVisitante(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              CPF ou RG *
            </label>
            <Input
              placeholder="Ex: 123.456.789-00"
              value={documentoVisitante}
              onChange={(e) => setDocumentoVisitante(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Data da Visita *
            </label>
            <Input
              type="date"
              value={dataVisita}
              onChange={(e) => setDataVisita(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={handleCadastrarVisitante}
            disabled={isCadastrandoVisitante}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            {isCadastrandoVisitante ? "Cadastrando..." : "📝 Cadastrar Visitante"}
          </Button>
        </CardContent>
      </Card>

      {/* Lista de Visitantes Cadastrados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Meus Visitantes Cadastrados
          </CardTitle>
          <CardDescription>
            Visitantes que você cadastrou
          </CardDescription>
        </CardHeader>
        <CardContent>
          {meusVisitantes.length > 0 ? (
            <div className="space-y-4">
              {meusVisitantes.map((visitante) => (
                <div key={visitante.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{visitante.nome}</h4>
                      <Badge className={getStatusColor(visitante.status)}>
                        {getStatusLabel(visitante.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>📄 Documento: {visitante.documento}</p>
                      <p>📅 Data: {new Date(visitante.dataVisita).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {visitante.status === 'agendado' && (
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">👥</div>
              <p className="text-gray-500">Nenhum visitante cadastrado</p>
              <p className="text-sm text-gray-400 mt-2">
                Cadastre visitantes com antecedência para facilitar o acesso
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroVisitantes;
