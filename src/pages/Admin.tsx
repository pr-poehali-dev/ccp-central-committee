import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState<any>({});
  const [news, setNews] = useState<any[]>([]);
  const [officials, setOfficials] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [lubertsyConstruction, setLubertsyConstruction] = useState<any[]>([]);
  const [lubertsyNews, setLubertsyNews] = useState<any[]>([]);
  const [roleRequests, setRoleRequests] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const [settingsData, newsData, officialsData, projectsData, lubertsyConstrData, lubertsyNewsData, requestsData] = await Promise.all([
        api.getSettings(),
        api.getNews(),
        api.getOfficials(),
        api.getConstructionProjects(),
        api.getLubertsyConstruction(),
        api.getLubertsyNews(),
        api.getRoleRequests()
      ]);
      
      setSettings(settingsData);
      setNews(newsData);
      setOfficials(officialsData);
      setProjects(projectsData);
      setLubertsyConstruction(lubertsyConstrData);
      setLubertsyNews(lubertsyNewsData);
      setRoleRequests(requestsData);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await api.login(username, password);
      
      if (result.token) {
        localStorage.setItem('admin_token', result.token);
        setIsAuthenticated(true);
        await loadData();
        toast({ title: 'Успешная авторизация!' });
      } else {
        toast({ title: 'Ошибка', description: result.error || 'Неверный логин или пароль', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось войти', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleUpdateSettings = async (updated: any) => {
    await api.updateSettings(updated);
    await loadData();
    toast({ title: 'Настройки обновлены!' });
  };

  const handleAddNews = async (newsData: any) => {
    await api.addNews(newsData);
    await loadData();
    toast({ title: 'Новость добавлена!' });
  };

  const handleDeleteNews = async (id: number) => {
    await api.deleteNews(id);
    await loadData();
    toast({ title: 'Новость удалена!' });
  };

  const handleAddOfficial = async (official: any) => {
    await api.addOfficial(official);
    await loadData();
    toast({ title: 'Должностное лицо добавлено!' });
  };

  const handleUpdateOfficial = async (official: any) => {
    await api.updateOfficial(official);
    await loadData();
    toast({ title: 'Должность обновлена!' });
  };

  const handleDeleteOfficial = async (id: number) => {
    await api.deleteOfficial(id);
    await loadData();
    toast({ title: 'Удалено!' });
  };

  const handleUpdateProject = async (project: any) => {
    await api.updateConstructionProject(project);
    await loadData();
    toast({ title: 'Проект обновлён!' });
  };

  const handleUpdateLubertsyConstruction = async (item: any) => {
    await api.updateLubertsyConstruction(item);
    await loadData();
    toast({ title: 'Статус обновлён!' });
  };

  const handleAddLubertsyNews = async () => {
    const content = prompt('Введите текст новости:');
    if (content) {
      await api.addLubertsyNews({ content });
      await loadData();
      toast({ title: 'Новость добавлена!' });
    }
  };

  const handleDeleteLubertsyNews = async (id: number) => {
    await api.deleteLubertsyNews(id);
    await loadData();
    toast({ title: 'Новость удалена!' });
  };

  const handleUpdateRoleRequest = async (id: number, status: string) => {
    await api.updateRoleRequestStatus(id, status);
    await loadData();
    toast({ title: `Заявка ${status === 'approved' ? 'одобрена' : 'отклонена'}!` });
  };

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
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Логин</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Введите логин"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Введите пароль"
                  />
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                  <Icon name="ShieldCheck" size={20} />
                  {loading ? 'Вход...' : 'Войти'}
                </Button>
              </form>
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
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <Icon name="LogOut" size={16} />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="structure">Структура</TabsTrigger>
            <TabsTrigger value="lubertsy">Люберцы</TabsTrigger>
            <TabsTrigger value="construction">Строительство</TabsTrigger>
            <TabsTrigger value="requests">Заявки</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <SettingsTab settings={settings} onUpdate={handleUpdateSettings} />
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsTab news={news} onAdd={handleAddNews} onDelete={handleDeleteNews} />
          </TabsContent>

          <TabsContent value="structure" className="space-y-4">
            <StructureTab 
              officials={officials}
              onAdd={handleAddOfficial}
              onUpdate={handleUpdateOfficial}
              onDelete={handleDeleteOfficial}
            />
          </TabsContent>

          <TabsContent value="lubertsy" className="space-y-4">
            <LubertsyTab 
              construction={lubertsyConstruction}
              news={lubertsyNews}
              onUpdateConstruction={handleUpdateLubertsyConstruction}
              onAddNews={handleAddLubertsyNews}
              onDeleteNews={handleDeleteLubertsyNews}
            />
          </TabsContent>

          <TabsContent value="construction" className="space-y-4">
            <ConstructionTab projects={projects} onUpdate={handleUpdateProject} />
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <RequestsTab requests={roleRequests} onUpdate={handleUpdateRoleRequest} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const SettingsTab = ({ settings, onUpdate }: any) => {
  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  return (
    <Card className="soviet-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Settings" size={20} />
          Общие настройки портала
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Важное объявление на главной</Label>
          <Textarea
            value={formData.main_announcement || ''}
            onChange={(e) => setFormData({ ...formData, main_announcement: e.target.value })}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>IP сервера</Label>
          <Input
            value={formData.server_ip || ''}
            onChange={(e) => setFormData({ ...formData, server_ip: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Прогресс строительства Люберцы (%)</Label>
            <Input
              type="number"
              value={formData.lubertsy_progress || ''}
              onChange={(e) => setFormData({ ...formData, lubertsy_progress: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Дата начала строительства Люберцы</Label>
            <Input
              value={formData.lubertsy_start_date || ''}
              onChange={(e) => setFormData({ ...formData, lubertsy_start_date: e.target.value })}
            />
          </div>
        </div>

        <Button onClick={() => onUpdate(formData)} className="w-full">
          Сохранить настройки
        </Button>
      </CardContent>
    </Card>
  );
};

const NewsTab = ({ news, onAdd, onDelete }: any) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'политика' });

  const handleAdd = () => {
    onAdd(formData);
    setFormData({ title: '', content: '', category: 'политика' });
    setShowForm(false);
  };

  return (
    <>
      <Card className="soviet-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Newspaper" size={20} />
              Новости государства
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)} size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить новость
            </Button>
          </div>
        </CardHeader>
        {showForm && (
          <CardContent className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label>Заголовок</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Содержание</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Категория</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['политика', 'транспорт', 'кадры', 'строительство', 'культура', 'технологии'].map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} className="w-full">Добавить</Button>
          </CardContent>
        )}
      </Card>

      <div className="space-y-3">
        {news.map((item: any) => (
          <Card key={item.id} className="soviet-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <Badge variant="outline" className="mb-2">{item.category}</Badge>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

const StructureTab = ({ officials, onAdd, onUpdate, onDelete }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [formData, setFormData] = useState({ name: '', role: '', description: '', category: 'citizens' });

  const handleAdd = () => {
    onAdd(formData);
    setFormData({ name: '', role: '', description: '', category: 'citizens' });
    setShowAddForm(false);
  };

  const startEdit = (official: any) => {
    setEditingId(official.id);
    setEditData(official);
  };

  const handleUpdate = () => {
    onUpdate(editData);
    setEditingId(null);
  };

  return (
    <>
      <Card className="soviet-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Управление структурой власти
            </CardTitle>
            <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить человека
            </Button>
          </div>
        </CardHeader>
        {showAddForm && (
          <CardContent className="space-y-4 border-t pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Имя</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Должность</Label>
                <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Описание</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Категория</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Высшее руководство</SelectItem>
                  <SelectItem value="leadership">Народные комиссары</SelectItem>
                  <SelectItem value="citizens">Граждане</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} className="w-full">Добавить</Button>
          </CardContent>
        )}
      </Card>

      <div className="space-y-3">
        {officials.map((official: any) => (
          <Card key={official.id} className="soviet-border">
            <CardContent className="pt-6">
              {editingId === official.id ? (
                <div className="space-y-4">
                  <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Имя" />
                  <Input value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} placeholder="Должность" />
                  <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Описание" rows={2} />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdate} size="sm">Сохранить</Button>
                    <Button onClick={() => setEditingId(null)} variant="outline" size="sm">Отмена</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">{official.name}</h3>
                    <p className="text-sm text-muted-foreground">{official.role}</p>
                    {official.description && <p className="text-xs text-muted-foreground mt-1">{official.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(official)}>
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(official.id)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

const LubertsyTab = ({ construction, news, onUpdateConstruction, onAddNews, onDeleteNews }: any) => {
  return (
    <>
      <Card className="soviet-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Building2" size={20} />
            Управление городом Люберцы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-bold">Статус строительства объектов:</h4>
            {construction.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                <Input 
                  value={item.name} 
                  onChange={(e) => onUpdateConstruction({ ...item, name: e.target.value })}
                  className="flex-1"
                />
                <Input 
                  value={item.status} 
                  onChange={(e) => onUpdateConstruction({ ...item, status: e.target.value })}
                  className="w-40"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onUpdateConstruction({ ...item, is_completed: !item.is_completed })}
                >
                  {item.is_completed ? '✓ Готово' : '○ В работе'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="soviet-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Newspaper" size={20} />
              Новости города
            </CardTitle>
            <Button onClick={onAddNews} size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить новость
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {news.map((item: any) => (
            <div key={item.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
              <p className="text-sm flex-1">{item.content}</p>
              <Button variant="destructive" size="sm" onClick={() => onDeleteNews(item.id)}>
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

const ConstructionTab = ({ projects, onUpdate }: any) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});

  const startEdit = (project: any) => {
    setEditingId(project.id);
    setEditData(project);
  };

  const handleUpdate = () => {
    onUpdate(editData);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {projects.map((project: any) => (
        <Card key={project.id} className="soviet-border">
          <CardContent className="pt-6 space-y-4">
            {editingId === project.id ? (
              <>
                <div className="space-y-2">
                  <Label>Название проекта</Label>
                  <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Прогресс (%)</Label>
                    <Input type="number" value={editData.progress} onChange={(e) => setEditData({ ...editData, progress: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Статус</Label>
                    <Input value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Руководитель</Label>
                    <Input value={editData.lead} onChange={(e) => setEditData({ ...editData, lead: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Описание</Label>
                  <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} rows={2} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdate} size="sm">Сохранить</Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" size="sm">Отмена</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex items-center gap-4">
                      <Badge>{project.status}</Badge>
                      <span className="text-sm text-muted-foreground">Прогресс: {project.progress}%</span>
                      <span className="text-sm text-muted-foreground">Руководитель: {project.lead}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => startEdit(project)}>
                    <Icon name="Edit" size={16} />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const RequestsTab = ({ requests, onUpdate }: any) => {
  const pending = requests.filter((r: any) => r.status === 'pending');
  const approved = requests.filter((r: any) => r.status === 'approved');
  const rejected = requests.filter((r: any) => r.status === 'rejected');

  return (
    <>
      <Card className="soviet-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={20} />
            Новые заявки ({pending.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.map((req: any) => (
            <div key={req.id} className="p-4 bg-muted/30 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">{req.name}</h4>
                <Badge>{req.role}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{req.reason}</p>
              <div className="flex gap-2">
                <Button onClick={() => onUpdate(req.id, 'approved')} size="sm" className="gap-2">
                  <Icon name="Check" size={16} />
                  Принять
                </Button>
                <Button onClick={() => onUpdate(req.id, 'rejected')} variant="destructive" size="sm" className="gap-2">
                  <Icon name="X" size={16} />
                  Отклонить
                </Button>
              </div>
            </div>
          ))}
          {pending.length === 0 && <p className="text-center text-muted-foreground py-8">Нет новых заявок</p>}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Icon name="CheckCircle2" size={20} />
              Одобренные ({approved.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {approved.map((req: any) => (
              <div key={req.id} className="text-sm p-2 bg-green-500/10 rounded">
                <span className="font-bold">{req.name}</span> - {req.role}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="soviet-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <Icon name="XCircle" size={20} />
              Отклонённые ({rejected.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {rejected.map((req: any) => (
              <div key={req.id} className="text-sm p-2 bg-red-500/10 rounded">
                <span className="font-bold">{req.name}</span> - {req.role}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Admin;
