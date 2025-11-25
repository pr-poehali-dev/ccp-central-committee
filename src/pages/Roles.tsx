import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Roles = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    reason: ''
  });

  const roles = [
    { value: 'builder', label: '🏗️ Строитель', category: 'Строительство' },
    { value: 'metro_builder', label: '🚇 Строитель метрополитена', category: 'Транспорт' },
    { value: 'machinist', label: '🚂 Машинист поезда', category: 'Транспорт' },
    { value: 'conductor', label: '🎫 Проводник', category: 'Транспорт' },
    { value: 'station_master', label: '🚉 Начальник станции', category: 'Транспорт' },
    { value: 'dispatcher', label: '📡 Диспетчер', category: 'Транспорт' },
    { value: 'farmer', label: '🌾 Фермер', category: 'Сельское хозяйство' },
    { value: 'engineer', label: '⚙️ Инженер', category: 'Промышленность' },
    { value: 'factory_worker', label: '🏭 Рабочий завода', category: 'Промышленность' },
    { value: 'doctor', label: '⚕️ Врач', category: 'Здравоохранение' },
    { value: 'teacher', label: '📚 Учитель', category: 'Образование' },
    { value: 'militsia', label: '👮 Милиционер', category: 'Правопорядок' },
    { value: 'soldier', label: '⚔️ Солдат', category: 'Армия' },
    { value: 'cook', label: '👨‍🍳 Повар', category: 'Общественное питание' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Администраторы рассмотрят вашу заявку в ближайшее время.',
    });
    setFormData({ name: '', role: '', reason: '' });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="FileText" size={36} className="text-primary" />
            Запрос роли
          </h1>
          <p className="text-lg text-muted-foreground">
            Подайте заявку на получение профессии в государстве ЦК КПСС
          </p>
        </div>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="ClipboardList" size={24} className="text-primary" />
              Форма подачи заявки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя (игровой ник)</Label>
                <Input
                  id="name"
                  placeholder="Введите ваш игровой ник"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Желаемая роль</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Строительство', 'Транспорт', 'Промышленность', 'Сельское хозяйство', 'Здравоохранение', 'Образование', 'Правопорядок', 'Армия', 'Общественное питание'].map(category => (
                      <div key={category}>
                        <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground">{category}</div>
                        {roles.filter(r => r.category === category).map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Почему вы хотите получить эту роль?</Label>
                <Textarea
                  id="reason"
                  placeholder="Расскажите о своём опыте и мотивации..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Icon name="Send" size={20} />
                Отправить заявку
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="soviet-border bg-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-secondary">
              <Icon name="Info" size={24} />
              Информация о ролях
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              ✅ Администраторы рассмотрят вашу заявку и примут решение в течение 24 часов
            </p>
            <p>
              📋 Некоторые роли могут требовать дополнительных условий или проверки навыков
            </p>
            <p>
              🎖️ За добросовестную работу возможно повышение в должности
            </p>
            <p>
              ⚠️ Подача ложной информации или нарушение правил может привести к отказу
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Roles;
