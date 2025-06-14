import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Mock data inicial
const initialMoradores = [
  { id: 1, nome: 'Carlos Oliveira', email: 'morador@teste.com', apt: 'A-101' },
  { id: 2, nome: 'Ana Clara Santos', email: 'ana@email.com', apt: 'A-102' },
  { id: 3, nome: 'Fernando Costa', email: 'fernando@email.com', apt: 'B-205' },
  { id: 4, nome: 'Beatriz Lima', email: 'beatriz@email.com', apt: 'C-301' },
];

const GestaoMoradores = () => {
  const { toast } = useToast();
  const [moradores, setMoradores] = useState(initialMoradores);
  const [moradorEmEdicao, setMoradorEmEdicao] = useState(null);
  const [dialogAberto, setDialogAberto] = useState(false);

  const handleSalvar = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const morador = {
      nome: form.get('nome')?.toString(),
      email: form.get('email')?.toString(),
      apt: form.get('apt')?.toString(),
    };

    if (moradorEmEdicao) {
      // Editar
      setMoradores(moradores.map(m => m.id === moradorEmEdicao.id ? { ...moradorEmEdicao, ...morador } : m));
      toast({ title: "Sucesso!", description: "Morador atualizado." });
    } else {
      // Adicionar
      setMoradores([...moradores, { id: Date.now(), ...morador }]);
      toast({ title: "Sucesso!", description: "Novo morador cadastrado." });
    }
    setDialogAberto(false);
    setMoradorEmEdicao(null);
  };

  const handleRemover = (id) => {
    setMoradores(moradores.filter(m => m.id !== id));
    toast({ title: "Morador removido", variant: "destructive" });
  };

  const abrirDialog = (morador = null) => {
    setMoradorEmEdicao(morador);
    setDialogAberto(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">👨‍👩‍👧‍👦 Gestão de Moradores</h1>
          <p className="text-muted-foreground">Adicione, edite e visualize os moradores do condomínio.</p>
        </div>
        <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
          <DialogTrigger asChild>
            <Button onClick={() => abrirDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Cadastrar Morador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{moradorEmEdicao ? 'Editar Morador' : 'Cadastrar Novo Morador'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSalvar} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" name="nome" defaultValue={moradorEmEdicao?.nome} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={moradorEmEdicao?.email} required />
              </div>
              <div>
                <Label htmlFor="apt">Apartamento (Ex: A-101)</Label>
                <Input id="apt" name="apt" defaultValue={moradorEmEdicao?.apt} required />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Apartamento</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moradores.map((morador) => (
                <TableRow key={morador.id}>
                  <TableCell className="font-medium">{morador.nome}</TableCell>
                  <TableCell>{morador.apt}</TableCell>
                  <TableCell>{morador.email}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" onClick={() => abrirDialog(morador)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso removerá permanentemente o morador do sistema.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemover(morador.id)}>
                            Sim, remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

export default GestaoMoradores;