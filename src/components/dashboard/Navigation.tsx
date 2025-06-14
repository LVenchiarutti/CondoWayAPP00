
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  user: any;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation = ({ user, currentPage, setCurrentPage }: NavigationProps) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Início', icon: '🏠' },
      { id: 'comunicados', label: 'Comunicados', icon: '📢' },
      { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
      { id: 'conta', label: 'Minha Conta', icon: '👤' },
    ];

    const moradorItems = [
      { id: 'ambientes', label: 'Reservar Ambiente', icon: '🏊‍♂️' },
      { id: 'reservas', label: 'Minhas Reservas', icon: '📅' },
      { id: 'visitantes', label: 'Cadastrar Visitante', icon: '👥' },
    ];

    const sindicoItems = [
      { id: 'ambientes', label: 'Gestão de Ambientes', icon: '🏢' },
      { id: 'reservas', label: 'Todas as Reservas', icon: '📋' },
      { id: 'moradores', label: 'Gestão de Moradores', icon: '👨‍👩‍👧‍👦' },
      { id: 'visitantes', label: 'Controle de Visitantes', icon: '🚪' },
    ];

    const porteiroItems = [
      { id: 'visitantes', label: 'Visitantes do Dia', icon: '📝' },
      { id: 'comunicados', label: 'Enviar Avisos', icon: '📨' },
    ];

    switch (user.user_tipo) {
      case 'sindico':
        return [baseItems[0], ...sindicoItems, ...baseItems.slice(1)];
      case 'porteiro':
        return [baseItems[0], ...porteiroItems, ...baseItems.slice(1)];
      case 'morador':
        return [baseItems[0], ...moradorItems, ...baseItems.slice(1)];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg border-r border-gray-200 hidden lg:block overflow-y-auto">
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start h-12 text-left font-normal",
              currentPage === item.id 
                ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 border-r-2 border-blue-500" 
                : "hover:bg-gray-50 text-gray-700"
            )}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
