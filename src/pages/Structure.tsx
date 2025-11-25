import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Structure = () => {
  const government = [
    { name: 'Сталин', role: 'ГенСек ЦК КПСС', description: 'Генеральный Секретарь Центрального Комитета Коммунистической Партии Советского Союза', icon: '⭐' },
    { name: 'Алексей', role: '1й Зам ГенСека ЦК КПСС', description: 'Первый заместитель Генерального Секретаря', icon: '🎖️' },
  ];

  const leadership = [
    { name: 'Вагнер', role: 'Главный Бригадир городского округа Люберцы', description: 'Руководит строительством и развитием города', icon: '🏗️' },
    { name: 'Денис', role: 'Начальник Метрополитена', description: 'Управление транспортной системой государства', icon: '🚇' },
    { name: 'Даня', role: 'НарКом Армии', description: 'Народный Комиссар Армии', icon: '⚔️' },
    { name: 'Блохин', role: 'НарКом ТяжПрома', description: 'Народный Комиссар Тяжёлой Промышленности', icon: '⚙️' },
    { name: 'Илья', role: 'Глава Городского Образования "Энгельс"', description: 'Руководство городом Энгельс', icon: '🏛️' },
  ];

  const citizens = [
    { name: 'Егор', role: 'Гражданин', icon: '👤' },
    { name: 'Седой', role: 'Гражданин', icon: '👤' },
    { name: 'Матвей', role: 'Гражданин', icon: '👤' },
    { name: 'Беляев', role: 'Гражданин', icon: '👤' },
    { name: 'ТВ', role: 'Гражданин', icon: '👤' },
  ];

  const PersonCard = ({ name, role, description, icon }: any) => (
    <Card className="soviet-border hover-lift">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-secondary">
            <AvatarFallback className="bg-primary text-2xl">{icon}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            <Badge variant="secondary" className="mt-1 mb-2">{role}</Badge>
            {description && (
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Users" size={36} className="text-primary" />
            Структура власти
          </h1>
          <p className="text-lg text-muted-foreground">
            Иерархия государственных должностей ЦК КПСС
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <Icon name="Crown" size={24} />
            Высшее руководство
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {government.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <Icon name="Briefcase" size={24} />
            Народные комиссары и главы городов
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadership.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
            <Icon name="Users" size={24} />
            Граждане государства
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {citizens.map((person) => (
              <PersonCard key={person.name} {...person} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Structure;
