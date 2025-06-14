import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface Visitante {
  id: number;
  nome: string;
}

const CadastroVisitantes = ({ user }: { user: any }) => {
  const { toast } = useToast();
  
  const [dataVisita, setDataVisita] = useState(new Date().toISOString().split('T')[0]);
  const [nomesVisitantes, setNomesVisitantes] = useState<Visitante[]>([{ id: Date.now(), nome: '' }]);

  const handleNumVisitantesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(e.target.value, 10);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 10) count = 10;

    const currentCount = nomesVisitantes.length;
    if (count > currentCount) {
      const newItems = Array.from({ length: count - currentCount }, () => ({ id: Date.now() + Math.random(), nome: '' }));
      setNomesVisitantes(prev => [...prev, ...newItems]);
    } else if (count < currentCount) {
      setNomesVisitantes(prev => prev.slice(0, count));
    }
  };
  
  const handleNomeChange = (id: number, newName: string) => {
    setNomesVisitantes(prev => 
      prev.map(v => (v.id === id ? { ...v, nome: newName } : v))
    );
  };

  const handleCadastrar = () => {
    const nomesPreenchidos = nomesVisitantes.map(v => v.nome.trim()).filter(Boolean);

    if (!dataVisita || nomesPreenchidos.length !== nomesVisitantes.length) {
      toast({
        title: 'Campos Incompletos',
        description: 'Por favor, preencha a data e o nome de todos os visitantes.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Visitantes Cadastrados!',
      description: `${nomesVisitantes.length} visitante(s) cadastrado(s) para ${new Date(dataVisita).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}.`,
    });
    
    setDataVisita(new Date().toISOString().split('T')[0]);
    setNomesVisitantes([{ id: Date.now(), nome: '' }]);
  };

  return (
    <div className="space-y-6">
       <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>👥 Cadastro de Visitantes</CardTitle>
          <CardDescription>
            Autorize a entrada de seus visitantes no condomínio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="data">Data da Visita</Label>
                <Input 
                  id="data" 
                  type="date" 
                  value={dataVisita}
                  onChange={(e) => setDataVisita(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="numVisitantes">Quantidade de Visitantes (Máx: 10)</Label>
                <Input 
                  id="numVisitantes" 
                  type="number" 
                  value={nomesVisitantes.length}
                  onChange={handleNumVisitantesChange}
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {nomesVisitantes.length > 0 && <Label>Nome dos Visitantes</Label>}
              {nomesVisitantes.map((visitante, index) => (
                <div key={visitante.id} className="flex items-center gap-2">
                  <Input 
                    type="text" 
                    placeholder={`Nome do visitante ${index + 1}`}
                    value={visitante.nome}
                    onChange={(e) => handleNomeChange(visitante.id, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button onClick={handleCadastrar} className="w-full">
              Cadastrar Visitantes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroVisitantes;