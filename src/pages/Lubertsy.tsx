import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Lubertsy = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Building2" size={36} className="text-primary" />
            Городской округ Люберцы
          </h1>
          <Badge variant="secondary" className="text-base px-4 py-2">
            В стадии строительства
          </Badge>
        </div>

        <Card className="soviet-border bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="User" size={24} className="text-secondary" />
              Глава городского округа
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-secondary">
                <AvatarFallback className="bg-primary text-3xl">🏗️</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Карл Вагнер</h3>
                <p className="text-lg text-secondary">Главный Бригадир городского округа Люберцы</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Руководит строительством и развитием города, координирует работу всех бригад
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="BarChart3" size={24} className="text-primary" />
              Статус строительства
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Общий прогресс строительства</span>
                <span className="text-sm font-bold text-secondary">35%</span>
              </div>
              <Progress value={35} className="h-3" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Начало строительства:</span>
                </div>
                <p className="text-lg font-bold">15 ноября 2025</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Activity" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Статус:</span>
                </div>
                <Badge variant="default" className="text-sm">Активно</Badge>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-bold mb-3">Завершённые объекты:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-500" />
                  <span className="text-sm">Центральная площадь</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-500" />
                  <span className="text-sm">Административное здание</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-bold mb-3">В процессе строительства:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-yellow-500" />
                  <span className="text-sm">Жилой квартал №1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-yellow-500" />
                  <span className="text-sm">Станция метро "Люберцы"</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-yellow-500" />
                  <span className="text-sm">Промышленная зона</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="Camera" size={24} className="text-primary" />
              Галерея строительства
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
                  <div className="text-center">
                    <Icon name="Image" size={48} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Фото будет добавлено</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="Newspaper" size={24} className="text-primary" />
              Новости города
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">20 ноября 2025</Badge>
                </div>
                <p className="text-sm">
                  Завершено строительство центральной площади города. Открытие состоится в ближайшие дни.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">18 ноября 2025</Badge>
                </div>
                <p className="text-sm">
                  Начаты работы по прокладке первой линии метрополитена до станции "Люберцы".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Lubertsy;
