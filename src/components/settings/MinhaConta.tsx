
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MinhaContaProps {
  user: any;
}

const MinhaConta = ({ user }: MinhaContaProps) => {
  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'sindico': return 'Síndico';
      case 'porteiro': return 'Porteiro';
      case 'morador': return 'Morador';
      default: return 'Usuário';
    }
  };

  const getUserTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'sindico': return 'bg-purple-100 text-purple-700';
      case 'porteiro': return 'bg-blue-100 text-blue-700';
      case 'morador': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          👤 Minha Conta
        </h1>
        <p className="text-gray-600">Informações do seu perfil</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Dados Pessoais
          </CardTitle>
          <CardDescription>
            Suas informações cadastrais no CondoWay
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar e Tipo de Usuário */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {user.nome.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.nome}</h3>
                <Badge className={getUserTypeBadgeColor(user.user_tipo)}>
                  {getUserTypeLabel(user.user_tipo)}
                </Badge>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Informações do Condomínio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Condomínio</label>
              <p className="text-gray-900 font-medium">{user.condominio}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Bloco</label>
              <p className="text-gray-900 font-medium">{user.bloco}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Apartamento</label>
              <p className="text-gray-900 font-medium">{user.apartamento}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔐 Segurança da Conta
          </CardTitle>
          <CardDescription>
            Informações sobre a segurança do seu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Conta Verificada</h4>
                  <p className="text-sm text-green-700">Sua conta está ativa e verificada</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">ℹ</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Dados Protegidos</h4>
                  <p className="text-sm text-blue-700">
                    Suas informações são protegidas e não podem ser editadas através do aplicativo.
                    Entre em contato com a administração para alterações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações sobre o App */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 Sobre o CondoWay
          </CardTitle>
          <CardDescription>
            Informações sobre o aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Versão do App</label>
              <p className="text-gray-900 font-medium">1.0.0</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Último Acesso</label>
              <p className="text-gray-900 font-medium">{new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MinhaConta;
