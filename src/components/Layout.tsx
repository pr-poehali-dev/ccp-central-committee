import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/structure', label: 'Структура власти', icon: 'Users' },
    { path: '/news', label: 'Новости', icon: 'Newspaper' },
    { path: '/lubertsy', label: 'Люберцы', icon: 'Building2' },
    { path: '/metro', label: 'Метрополитен', icon: 'Train' },
    { path: '/army', label: 'Армия', icon: 'Shield' },
    { path: '/construction', label: 'Строительство', icon: 'HardHat' },
    { path: '/roles', label: 'Запрос ролей', icon: 'FileText' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b-2 border-primary soviet-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center soviet-star">
                <span className="text-2xl">⚒️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ЦК КПСС</h1>
                <p className="text-xs text-secondary">Официальный портал</p>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon name={item.icon as any} size={16} />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <Link to="/admin">
              <Button variant="secondary" size="sm" className="gap-2">
                <Icon name="Settings" size={16} />
                Админ
              </Button>
            </Link>
          </div>

          <nav className="lg:hidden pb-3 flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                >
                  <Icon name={item.icon as any} size={14} />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-card border-t-2 border-primary soviet-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ЦК КПСС • Minecraft РП Сервер
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Все права защищены государством
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-secondary">IP Сервера:</p>
                <p className="text-sm text-foreground font-mono">3PM3511.aternos.me:51574</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
