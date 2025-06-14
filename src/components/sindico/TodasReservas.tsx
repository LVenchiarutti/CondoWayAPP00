import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';

// Interface para definir a estrutura de uma Reserva
interface Reserva {
  id: number;
  morador: string;
  apt: string;
  ambiente: string;
  data: string;
  horario: string;
  status: string;
}

const initialReservas: Reserva[] = [
  { id: 1, morador: 'Ana Silva', apt: 'A-102', ambiente: 'Salão de Festas', data: '2025-06-20', horario: '19:00 - 23:00', status: 'Confirmada' },
  { id: 2, morador: 'João Santos', apt: 'B-205', ambiente: 'Churrasqueira 2', data: '2025-06-22', horario: '12:00 - 16:00', status: 'Confirmada' },
  { id: 3, morador: 'Carlos Oliveira', apt: 'A-101', ambiente: 'Quadra Esportiva', data: '2025-06-25', horario: '09:00 - 10:00', status: 'Confirmada' },
  { id: 4, morador: 'Maria Costa', apt: 'C-301', ambiente: 'Salão de Festas', data: '2025-06-15', horario: '18:00 - 22:00', status: 'Concluída' },
  { id: 5, morador: 'Pedro Almeida', apt: 'B-104', ambiente: 'Churrasqueira 1', data: '2025-06-10', horario: '19:00 - 23:00', status: 'Cancelada' },
];

const getStatusVariant = (status: string) => {
  if (status === 'Confirmada') return 'default';
  if (status === 'Concluída') return 'secondary';
  if (status.includes('Cancelada')) return 'destructive';
  return 'outline';
};

const TodasReservas = () => {
  const { toast } = useToast();
  const [reservas, setReservas] = useState<Reserva[]>(initialReservas);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [reservaEmEdicao, setReservaEmEdicao] = useState<Reserva | null>(null);

  const handleAbrirDialog = (reserva: Reserva) => {
    setReservaEmEdicao(reserva);
    setDialogAberto(true);
  };

  const handleSalvarEdicao = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Adicionada verificação para garantir que reservaEmEdicao não é nulo
    if (!reservaEmEdicao) return;

    const form = new FormData(e.target as HTMLFormElement);
    const data = form.get('data') as string;
    const inicio = form.get('inicio') as string;
    const fim = form.get('fim') as string;

    if (data && inicio && fim) {
        const dadosAtualizados = {
            data,
            horario: `${inicio} - ${fim}`
        };
        
        // A linha agora é segura e não dará mais erro
        setReservas(reservas.map(r => 
            r.id === reservaEmEdicao.id ? { ...r, ...dadosAtualizados } : r
        ));
        
        toast({ title: "Reserva Atualizada!", description: "A data e/ou horário da reserva foram alterados." });
        setDialogAberto(false);
        setReservaEmEdicao(null);
    } else {
        toast({ title: "Erro", description: "Todos os campos são obrigatórios.", variant: "destructive" });
    }
  };
  
  const handleCancelar = (id: number) => {
    setReservas(reservas.map(r => r.id === id ? { ...r, status: 'Cancelada pelo Síndico' } : r));
    toast({
      title: 'Reserva Cancelada',
      description: 'A reserva foi cancelada com sucesso.',
      variant: 'destructive',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">📋 Todas as Reservas</h1>
        <p className="text-muted-foreground">Visualize e gerencie todas as reservas do condomínio.</p>
      </div>

      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Reserva</DialogTitle>
            <DialogDescription>
              Alterando reserva de <span className="font-semibold">{reservaEmEdicao?.morador}</span> para o ambiente <span className="font-semibold">{reservaEmEdicao?.ambiente}</span>.
            </DialogDescription>
          </DialogHeader>
          {reservaEmEdicao && (
            <form onSubmit={handleSalvarEdicao} className="space-y-4 pt-4">
              <div>
                <Label htmlFor="data">Data da Reserva</Label>
                <Input id="data" name="data" type="date" defaultValue={reservaEmEdicao.data} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inicio">Início</Label>
                  <Input id="inicio" name="inicio" type="time" defaultValue={reservaEmEdicao.horario.split(' - ')[0]} />
                </div>
                <div>
                  <Label htmlFor="fim">Fim</Label>
                  <Input id="fim" name="fim" type="time" defaultValue={reservaEmEdicao.horario.split(' - ')[1]} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogAberto(false)}>Cancelar</Button>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      <Card>
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Morador</TableHead>
                <TableHead>Apto</TableHead>
                <TableHead>Ambiente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">{reserva.morador}</TableCell>
                  <TableCell>{reserva.apt}</TableCell>
                  <TableCell>{reserva.ambiente}</TableCell>
                  <TableCell>{new Date(reserva.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                  <TableCell>{reserva.horario}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(reserva.status)}>{reserva.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {reserva.status === 'Confirmada' && (
                       <>
                        <Button variant="ghost" size="icon" onClick={() => handleAbrirDialog(reserva)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancelar Reserva?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja cancelar a reserva de {reserva.morador} para o(a) {reserva.ambiente}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Voltar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelar(reserva.id)}>
                                Sim, cancelar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                       </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodasReservas;