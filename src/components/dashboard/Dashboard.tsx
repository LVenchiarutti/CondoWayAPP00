import { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import MoradorDashboard from './MoradorDashboard';
import SindicoDashboard from './SindicoDashboard';
import PorteiroDashboard from './PorteiroDashboard';
import Ambientes from '../ambientes/Ambientes';
import MinhasReservas from '../reservas/MinhasReservas';
import Comunicados from '../comunicados/Comunicados';
import CadastroVisitantes from '../visitantes/CadastroVisitantes';
import Configuracoes from '../settings/Configuracoes';
import MinhaConta from '../settings/MinhaConta';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import GestaoMoradores from '../sindico/GestaoMoradores';
import TodasReservas from '../sindico/TodasReservas';
import GestaoAmbientes from '../sindico/GestaoAmbientes'; // 1. Importe o novo componente

interface DashboardProps {
  user: any;
  setUser: (user: any) => void;
}

const Dashboard = ({ user, setUser }: DashboardProps) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsSheetOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user.user_tipo === 'sindico') return <SindicoDashboard user={user} setCurrentPage={handlePageChange} />;
        if (user.user_tipo === 'porteiro') return <PorteiroDashboard user={user} setCurrentPage={handlePageChange} />;
        return <MoradorDashboard user={user} setCurrentPage={handlePageChange} />;
      case 'ambientes':
        // 2. Mostra a tela de GESTÃO para o síndico e de RESERVA para os outros
        if (user.user_tipo === 'sindico') {
          return <GestaoAmbientes setCurrentPage={handlePageChange} />;
        }
        return <Ambientes user={user} />;
      case 'reservas':
        if (user.user_tipo === 'sindico') {
          return <TodasReservas />;
        }
        return <MinhasReservas user={user} />;
      case 'comunicados':
        return <Comunicados user={user} />;
      case 'visitantes':
        return <CadastroVisitantes user={user} />;
      case 'moradores':
        return <GestaoMoradores />;
      case 'configuracoes':
        return <Configuracoes />;
      case 'conta':
        return <MinhaConta user={user} />;
      default:
        return <MoradorDashboard user={user} setCurrentPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} setUser={setUser} onMenuClick={() => setIsSheetOpen(true)} />
      <div className="flex">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="left" className="p-0 w-[280px] bg-white">
            <Navigation
              user={user}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </SheetContent>
        </Sheet>
        <main className="flex-1 p-6 transition-all duration-300">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;