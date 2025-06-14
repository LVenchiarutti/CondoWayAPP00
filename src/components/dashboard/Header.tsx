
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  user: any;
  setUser: (user: any) => void;
}

const Header = ({ user, setUser }: HeaderProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'sindico': return 'Síndico';
      case 'porteiro': return 'Porteiro';
      case 'morador': return 'Morador';
      default: return 'Usuário';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CW</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CondoWay</h1>
            <p className="text-sm text-gray-500">{user.condominio}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user.nome}</p>
            <p className="text-xs text-gray-500">
              {getUserTypeLabel(user.user_tipo)} • {user.bloco}-{user.apartamento}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {user.nome.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="hidden sm:flex"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
