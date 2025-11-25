import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-12 animate-fade-in">
          <Card className="soviet-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="Lock" size={24} className="text-primary" />
                Вход для администраторов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Доступ к административной панели защищён.<br />
                Только уполномоченные лица могут управлять порталом.
              </p>
              <Button 
                onClick={() => setIsAuthenticated(true)} 
                className="w-full gap-2"
                size="lg"
              >
                <Icon name="ShieldCheck" size={20} />
                Войти
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Icon name="Settings" size={36} className="text-primary" />
              Административная панель
            </h1>
            <p className="text-lg text-muted-foreground">
              Управление порталом ЦК КПСС
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            className="gap-2"
          >
            <Icon name="LogOut" size={16} />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="structure">Структура</TabsTrigger>
            <TabsTrigger value="lubertsy">Люберцы</TabsTrigger>
            <TabsTrigger value="requests">Заявки</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4">
            <Card className="soviet-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Plus" size={20} />
                  Добавить новость
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Функционал добавления новостей с выбором категории (политика, транспорт, кадры, строительство, культура, технологии)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-4">
            <Card className="soviet-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Управление должностями
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Редактирование ролей граждан, добавление новых людей в структуру власти
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lubertsy" className="space-y-4">
            <Card className="soviet-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Building2" size={20} />
                  Управление городом
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Изменение статуса строительства, загрузка фото, добавление новостей города
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card className="soviet-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Заявки на роли
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Список поданных заявок с возможностью принять или отклонить
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="soviet-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  Общие настройки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Изменение IP сервера, редактирование важного объявления, управление контентом
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
