import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Army = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Shield" size={36} className="text-primary" />
            Народный Комиссариат Армии
          </h1>
          <p className="text-lg text-muted-foreground">
            Защита и безопасность государства ЦК КПСС
          </p>
        </div>

        <Card className="soviet-border bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="User" size={24} className="text-secondary" />
              Народный Комиссар Армии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-secondary">
                <AvatarFallback className="bg-primary text-3xl">⚔️</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Даня</h3>
                <p className="text-lg text-secondary">Народный Комиссар Армии (НарКом Армии)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Руководит вооружёнными силами государства, обеспечивает оборону и безопасность граждан
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="Users" size={20} className="text-primary" />
                Численность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-secondary">В формировании</p>
              <p className="text-sm text-muted-foreground mt-2">
                Идёт набор личного состава
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="Target" size={20} className="text-primary" />
                Задачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Охрана границ, патрулирование территории, защита стратегических объектов
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="Award" size={20} className="text-primary" />
                Звания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Система воинских званий будет объявлена дополнительно
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="Newspaper" size={24} className="text-primary" />
              Новости армии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icon name="FileText" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                Новости от НарКома Армии будут публиковаться здесь
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Следите за объявлениями о наборе, учениях и военных операциях
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="soviet-border bg-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-secondary">
              <Icon name="Info" size={24} />
              Призыв в армию
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              Все граждане ЦК КПСС призывного возраста обязаны встать на воинский учёт. 
              Служба в армии - почётная обязанность каждого гражданина государства.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} className="text-green-500" />
                <span className="text-sm">Служба по призыву - долг перед Родиной</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} className="text-green-500" />
                <span className="text-sm">Обучение военному делу и дисциплине</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} className="text-green-500" />
                <span className="text-sm">Возможность карьерного роста в армии</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Army;
