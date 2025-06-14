
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  setUser: (user: any) => void;
}

const LoginPage = ({ setUser }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulando login para demonstração
      if (email && password) {
        const mockUser = {
          id: 1,
          nome: email.includes('sindico') ? 'João Silva' : email.includes('porteiro') ? 'Maria Santos' : 'Carlos Oliveira',
          email: email,
          user_tipo: email.includes('sindico') ? 'sindico' : email.includes('porteiro') ? 'porteiro' : 'morador',
          condominio: 'Residencial Vista Verde',
          bloco: 'A',
          apartamento: '101'
        };

        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        setUser(mockUser);
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${mockUser.nome}`,
        });
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">CW</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            CondoWay
          </CardTitle>
          <CardDescription className="text-gray-600">
            Seu condomínio conectado e organizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
              Esqueci minha senha
            </a>
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center mb-2">Para demonstração, use:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Síndico:</strong> sindico@teste.com</p>
              <p><strong>Porteiro:</strong> porteiro@teste.com</p>
              <p><strong>Morador:</strong> morador@teste.com</p>
              <p className="text-center mt-2"><strong>Senha:</strong> qualquer</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
