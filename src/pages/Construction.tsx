import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Construction = () => {
  const projects = [
    {
      name: 'Городской округ Люберцы',
      progress: 35,
      status: 'Активно',
      description: 'Строительство жилого района, центральной площади и инфраструктуры',
      lead: 'Вагнер'
    },
    {
      name: 'Метрополитен - Линия 1',
      progress: 20,
      status: 'В процессе',
      description: 'Прокладка тоннелей и строительство станции "Люберцы"',
      lead: 'Денис'
    },
    {
      name: 'Город Энгельс',
      progress: 15,
      status: 'Начато',
      description: 'Планирование и начало строительства второго городского образования',
      lead: 'Илья'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="HardHat" size={36} className="text-primary" />
            Строительство
          </h1>
          <p className="text-lg text-muted-foreground">
            Развитие инфраструктуры государства ЦК КПСС
          </p>
        </div>

        <Card className="soviet-border bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="TrendingUp" size={24} className="text-secondary" />
              Общий прогресс строительства
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium">Развитие государства</span>
                  <span className="text-2xl font-bold text-secondary">23%</span>
                </div>
                <Progress value={23} className="h-4" />
              </div>
              <p className="text-sm text-muted-foreground">
                Ведётся активное строительство городов, транспортной системы и промышленных объектов
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={index} className="soviet-border hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge variant={project.status === 'Активно' ? 'default' : 'outline'}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Прогресс строительства</span>
                    <span className="text-sm font-bold text-secondary">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="User" size={16} />
                  <span>Руководитель проекта: <span className="font-bold text-foreground">{project.lead}</span></span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="Camera" size={24} className="text-primary" />
              Галерея строительных проектов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center border border-border hover-lift">
                  <div className="text-center">
                    <Icon name="Image" size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Фото {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="soviet-border bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Фотографии строительства и дополнительная информация будут добавлены администраторами
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Construction;
