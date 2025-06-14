import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Configuracoes = () => {
  const { setTheme, fontSize, setFontSize } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Personalize a aparência do aplicativo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Tema</h3>
              <p className="text-sm text-muted-foreground">
                Selecione o tema claro ou escuro para a interface.
              </p>
            </div>
            <div>
              <Button variant="outline" size="icon" onClick={() => setTheme('light')}><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>
              <Button variant="outline" size="icon" className="ml-2" onClick={() => setTheme('dark')}><Moon className="h-[1.2rem] w-[1.2rem]" /></Button>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Tamanho da Fonte</h3>
              <p className="text-sm text-muted-foreground">
                Ajuste o tamanho da fonte em toda a aplicação.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={fontSize === 'sm' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontSize("sm")}
              >
                Pequeno
              </Button>
              <Button
                variant={fontSize === 'base' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontSize("base")}
              >
                Normal
              </Button>
              <Button
                variant={fontSize === 'lg' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFontSize("lg")}
              >
                Grande
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuracoes;