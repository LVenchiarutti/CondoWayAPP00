
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ComunicadosProps {
  user: any;
}

const Comunicados = ({ user }: ComunicadosProps) => {
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');
  const [isEnviando, setIsEnviando] = useState(false);
  const { toast } = useToast();

  const comunicados = [
    {
      id: 1,
      titulo: 'Manutenção da Piscina - Programada',
      conteudo: 'Informamos que a piscina ficará fechada para manutenção preventiva nos dias 25 e 26 de janeiro. Os trabalhos incluem limpeza profunda, verificação do sistema de filtragem e ajuste químico da água. Agradecemos a compreensão.',
      autor: 'Síndico João Silva',
      data: '2024-01-20',
      tipo: 'manutencao',
      prioridade: 'alta'
    },
    {
      id: 2,
      titulo: 'Nova Taxa de Condomínio - Janeiro 2024',
      conteudo: 'Conforme aprovado em assembleia, informamos o reajuste da taxa condominial para R$ 485,00 a partir de fevereiro de 2024. O aumento de 8% está dentro do previsto no orçamento anual.',
      autor: 'Administração',
      data: '2024-01-18',
      tipo: 'financeiro',
      prioridade: 'alta'
    },
    {
      id: 3,
      titulo: 'Horário de Funcionamento da Academia',
      conteudo: 'A academia do condomínio funcionará em horário estendido durante o mês de janeiro: Segunda a Sexta: 06h às 23h, Sábados: 07h às 20h, Domingos: 08h às 18h.',
      autor: 'Porteiro Carlos',
      data: '2024-01-15',
      tipo: 'geral',
      prioridade: 'media'
    },
    {
      id: 4,
      titulo: 'Festa Junina do Condomínio',
      conteudo: 'Está confirmada nossa tradicional Festa Junina para o dia 24 de junho no salão de festas. As inscrições para as barracas começam em março. Mais informações em breve!',
      autor: 'Comissão de Festas',
      data: '2024-01-12',
      tipo: 'evento',
      prioridade: 'baixa'
    }
  ];

  const handleEnviarComunicado = async () => {
    if (!novoTitulo.trim() || !novoConteudo.trim()) {
      toast({
        title: "Erro",
        description: "Preencha o título e conteúdo do comunicado.",
        variant: "destructive",
      });
      return;
    }

    setIsEnviando(true);
    
    // Simular envio
    setTimeout(() => {
      toast({
        title: "Comunicado enviado!",
        description: "O comunicado foi enviado para todos os moradores.",
      });
      setNovoTitulo('');
      setNovoConteudo('');
      setIsEnviando(false);
    }, 1500);
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'manutencao': return 'bg-orange-100 text-orange-700';
      case 'financeiro': return 'bg-red-100 text-red-700';
      case 'evento': return 'bg-purple-100 text-purple-700';
      case 'geral': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          📢 Comunicados
        </h1>
        <p className="text-gray-600">
          {user.user_tipo === 'sindico' || user.user_tipo === 'porteiro' 
            ? 'Gerencie e envie comunicados para os moradores'
            : 'Veja os últimos comunicados do condomínio'
          }
        </p>
      </div>

      {/* Formulário para Enviar Comunicado - Apenas Síndico e Porteiro */}
      {(user.user_tipo === 'sindico' || user.user_tipo === 'porteiro') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✍️ Enviar Novo Comunicado
            </CardTitle>
            <CardDescription>
              Envie um comunicado para todos os moradores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Título do Comunicado
              </label>
              <Input
                placeholder="Ex: Manutenção da Piscina"
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Conteúdo
              </label>
              <Textarea
                placeholder="Digite o conteúdo do comunicado aqui..."
                value={novoConteudo}
                onChange={(e) => setNovoConteudo(e.target.value)}
                className="w-full min-h-[120px] resize-none"
              />
            </div>
            <Button 
              onClick={handleEnviarComunicado}
              disabled={isEnviando}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              {isEnviando ? "Enviando..." : "📤 Enviar Comunicado"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Lista de Comunicados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Comunicados Recentes
          </CardTitle>
          <CardDescription>
            Últimas notificações e avisos do condomínio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {comunicados.map((comunicado) => (
              <div key={comunicado.id} className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {comunicado.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getTipoColor(comunicado.tipo)}>
                        {comunicado.tipo}
                      </Badge>
                      <Badge variant="outline" className={getPrioridadeColor(comunicado.prioridade)}>
                        {comunicado.prioridade}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {comunicado.conteudo}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>📝 {comunicado.autor}</span>
                  <span>📅 {formatDate(comunicado.data)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comunicados;
