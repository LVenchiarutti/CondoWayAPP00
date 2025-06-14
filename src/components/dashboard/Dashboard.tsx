
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

interface DashboardProps {
  user: any;
  setUser: (user: any) => void;
}

const Dashboard = ({ user, setUser }: DashboardProps) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user.user_tipo === 'sindico') return <SindicoDashboard user={user} />;
        if (user.user_tipo === 'porteiro') return <PorteiroDashboard user={user} />;
        return <MoradorDashboard user={user} />;
      case 'ambientes':
        return <Ambientes user={user} />;
      case 'reservas':
        return <MinhasReservas user={user} />;
      case 'comunicados':
        return <Comunicados user={user} />;
      case 'visitantes':
        return <CadastroVisitantes user={user} />;
      case 'configuracoes':
        return <Configuracoes />;
      case 'conta':
        return <MinhaConta user={user} />;
      default:
        return <MoradorDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} setUser={setUser} />
      <div className="flex">
        <Navigation 
          user={user} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
        <main className="flex-1 p-6 ml-0 lg:ml-64 transition-all duration-300">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
