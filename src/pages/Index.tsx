import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-6 py-8">
          <div className="flex justify-center">
            <img 
              src="https://cdn.poehali.dev/files/49e8b9fb-cf90-4323-860a-e9e3308210b1.png" 
              alt="Флаг ЦК КПСС" 
              className="w-48 h-48 object-contain soviet-star rounded-lg"
            />
          </div>
          
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">
              ЦК КПСС
            </h1>
            <h2 className="text-2xl text-secondary">
              Центральный Комитет Коммунистической Партии Советского Союза
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Официальный портал государства • Minecraft РП Сервер
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Badge variant="default" className="text-base px-4 py-2">
              <Icon name="MapPin" size={16} className="mr-2" />
              Городской округ Люберцы
            </Badge>
          </div>
        </div>

        <Card className="soviet-border bg-card/50 backdrop-blur hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-secondary">
              <Icon name="Megaphone" size={24} />
              Важное объявление
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              Граждане! Официальный портал государства ЦК КПСС запущен в эксплуатацию. 
              Здесь вы можете ознакомиться со структурой власти, новостями государства, 
              подать заявку на получение роли и следить за строительством городов.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                Структура власти
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Полная иерархия государственных должностей от ГенСека до граждан
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Newspaper" size={20} className="text-primary" />
                Новости государства
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Постановления, события и официальные объявления
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Building2" size={20} className="text-primary" />
                Город Люберцы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Статус строительства, галерея и новости городского округа
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Train" size={20} className="text-primary" />
                Метрополитен
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Информация о станциях, линиях и правила пользования
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-primary" />
                Армия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Новости и информация от Народного Комиссариата Армии
              </p>
            </CardContent>
          </Card>

          <Card className="soviet-border hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileText" size={20} className="text-primary" />
                Запрос ролей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Подайте заявку на получение профессии в государстве
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="soviet-border bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-secondary">
              <Icon name="Music" size={24} />
              Государственный гимн ЦК КПСС
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-lg leading-relaxed">
              <p className="italic">
                Союз нерушимый республик свободных,<br />
                Сплотила навеки Великая Русь!<br />
                Да здравствует созданный волей народов,<br />
                Единый, могучий Советский Союз!
              </p>
              <p className="font-bold text-secondary">
                Славься, Отечество наше свободное,<br />
                Дружбы народов надёжный оплот!<br />
                Партия Ленина — сила народная<br />
                Нас к торжеству коммунизма ведёт!
              </p>
              <p className="italic">
                Сквозь грозы сияло нам солнце свободы,<br />
                И Ленин великий нам путь озарил:<br />
                На правое дело он поднял народы,<br />
                На труд и на подвиги нас вдохновил!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;