import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Metro = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Train" size={36} className="text-primary" />
            Метрополитен ЦК КПСС
          </h1>
          <p className="text-lg text-muted-foreground">
            Транспортная система государства
          </p>
        </div>

        <Card className="soviet-border bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="User" size={24} className="text-secondary" />
              Начальник Метрополитена
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-secondary">
                <AvatarFallback className="bg-primary text-3xl">🚇</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Денис</h3>
                <p className="text-lg text-secondary">Начальник Метрополитена</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Управление всей транспортной системой государства, строительство и эксплуатация линий метро
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="soviet-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="MapPin" size={24} className="text-primary" />
                Станции метро
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="default">Линия 1</Badge>
                    <span className="font-medium">Люберцы</span>
                  </div>
                  <Badge variant="outline" className="text-xs">В разработке</Badge>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Construction" size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Больше станций будет добавлено</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="soviet-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="Route" size={24} className="text-primary" />
                Линии метро
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg border-l-4 border-red-500">
                  <Icon name="Circle" size={12} className="text-red-500" />
                  <span className="font-medium">Линия 1 (Красная)</span>
                  <Badge variant="outline" className="ml-auto text-xs">В разработке</Badge>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="PlusCircle" size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Планируется открытие новых линий</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-secondary">
              <Icon name="AlertCircle" size={24} />
              Правила пользования метрополитеном
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Безопасность превыше всего</h4>
                  <p className="text-sm text-muted-foreground">
                    Соблюдайте дистанцию от края платформы, не бегайте по эскалаторам
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Уважение к пассажирам</h4>
                  <p className="text-sm text-muted-foreground">
                    Уступайте места пожилым гражданам, не создавайте помех при входе и выходе
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Чистота и порядок</h4>
                  <p className="text-sm text-muted-foreground">
                    Не мусорите в вагонах и на станциях, используйте урны
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="X" size={20} className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-red-500">Запрещено</h4>
                  <p className="text-sm text-muted-foreground">
                    Курение, распитие алкоголя, порча имущества метрополитена
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="X" size={20} className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-red-500">Проезд без билета</h4>
                  <p className="text-sm text-muted-foreground">
                    Контролёры имеют право задержать нарушителей до прибытия милиции
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soviet-border bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="Info" size={24} className="text-primary" />
              Информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                🚇 Метрополитен работает для удобства граждан и развития транспортной инфраструктуры государства
              </p>
              <p>
                📍 Строительство новых станций ведётся под контролем Начальника Метрополитена
              </p>
              <p>
                🎫 Информация о билетах и тарифах будет объявлена дополнительно
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Metro;
