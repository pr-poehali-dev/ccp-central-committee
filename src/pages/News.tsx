import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const News = () => {
  const news = [
    {
      id: 1,
      title: 'Запуск официального портала государства',
      category: 'технологии',
      date: '25 ноября 2025',
      content: 'Генеральный Секретарь ЦК КПСС объявил о запуске официального информационного портала государства. Граждане получили доступ к структуре власти, новостям и возможности подачи заявок на роли.',
      icon: 'Rocket'
    },
    {
      id: 2,
      title: 'Утверждён государственный гимн ЦК КПСС',
      category: 'культура',
      date: '25 ноября 2025',
      content: 'Верховным Советом утверждён текст государственного гимна. Все граждане обязаны знать слова гимна наизусть.',
      icon: 'Music'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: any = {
      'политика': 'bg-red-500',
      'транспорт': 'bg-blue-500',
      'кадры': 'bg-yellow-500',
      'строительство': 'bg-orange-500',
      'культура': 'bg-purple-500',
      'технологии': 'bg-green-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    const icons: any = {
      'политика': 'Flag',
      'транспорт': 'Train',
      'кадры': 'Users',
      'строительство': 'HardHat',
      'культура': 'Music',
      'технологии': 'Cpu'
    };
    return icons[category] || 'Newspaper';
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Newspaper" size={36} className="text-primary" />
            Новости государства
          </h1>
          <p className="text-lg text-muted-foreground">
            Официальные постановления и события ЦК КПСС
          </p>
        </div>

        <div className="space-y-6">
          {news.map((item) => (
            <Card key={item.id} className="soviet-border hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${getCategoryColor(item.category)}`}>
                      <Icon name={getCategoryIcon(item.category) as any} size={24} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="soviet-border bg-muted/30">
          <CardContent className="pt-6 text-center">
            <Icon name="FileText" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              Больше новостей будет добавлено администраторами портала
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default News;
