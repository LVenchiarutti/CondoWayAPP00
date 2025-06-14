import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const [modoEscuro, setModoEscuro] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState('medio');
  const [notificacoes, setNotificacoes] = useState(true);
  const [notificacoesPush, setNotificacoesPush] = useState(true);
  const [notificacoesEmail, setNotificacoesEmail] = useState(false);
  const { toast } = useToast();

  const handleSalvarConfiguracoes = () => {
    // Aqui você salvaria as configurações no localStorage ou enviaria para a API
    localStorage.setItem('configuracoes', JSON.stringify({
      modoEscuro,
      tamanhoFonte,
      notificacoes,
      notificacoesPush,
      notificacoesEmail
    }));

    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ⚙️ Configurações
        </h1>
        <p className="text-gray-600">Personalize sua experiência no CondoWay</p>
      </div>

      {/* Aparência */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎨 Aparência
          </CardTitle>
          <CardDescription>
            Customize a interface do aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Modo Escuro</h4>
              <p className="text-sm text-gray-500">Ative o tema escuro para reduzir o cansaço visual</p>
            </div>
            <Switch
              checked={modoEscuro}
              onCheckedChange={setModoEscuro}
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Tamanho da Fonte</h4>
            <p className="text-sm text-gray-500">Ajuste o tamanho do texto para melhor legibilidade</p>
            <Select value={tamanhoFonte} onValueChange={setTamanhoFonte}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pequeno">Pequeno</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔔 Notificações
          </CardTitle>
          <CardDescription>
            Gerencie como você recebe notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notificações Gerais</h4>
              <p className="text-sm text-gray-500">Receba notificações sobre comunicados e atualizações</p>
            </div>
            <Switch
              checked={notificacoes}
              onCheckedChange={setNotificacoes}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notificações Push</h4>
              <p className="text-sm text-gray-500">Receba notificações no seu dispositivo</p>
            </div>
            <Switch
              checked={notificacoesPush && notificacoes}
              onCheckedChange={setNotificacoesPush}
              disabled={!notificacoes}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notificações por Email</h4>
              <p className="text-sm text-gray-500">Receba uma cópia das notificações por email</p>
            </div>
            <Switch
              checked={notificacoesEmail && notificacoes}
              onCheckedChange={setNotificacoesEmail}
              disabled={!notificacoes}
            />
          </div>
        </CardContent>
      </Card>

      {/* Acessibilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ♿ Acessibilidade
          </CardTitle>
          <CardDescription>
            Recursos para melhorar a acessibilidade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Dicas de Acessibilidade</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use o modo escuro para reduzir o cansaço visual</li>
              <li>• Aumente o tamanho da fonte se necessário</li>
              <li>• Ative as notificações para não perder informações importantes</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-4">
        <Button 
          onClick={handleSalvarConfiguracoes}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          💾 Salvar Configurações
        </Button>
        <Button variant="outline">
          🔄 Restaurar Padrões
        </Button>
      </div>
    </div>
  );
};

export default Configuracoes;