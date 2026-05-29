import { Home, Scan, Trophy, User, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface BottomNavProps {
  active: 'home' | 'scanner' | 'challenges' | 'rewards' | 'profile';
}

export function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio', path: '/home' },
    { id: 'challenges', icon: Target, label: 'Retos', path: '/challenges' },
    { id: 'scanner', icon: Scan, label: 'Escanear', path: '/scanner', featured: true },
    { id: 'rewards', icon: Trophy, label: 'Premios', path: '/rewards' },
    { id: 'profile', icon: User, label: 'Perfil', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;

          if (item.featured) {
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className="relative -mt-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/50">
                  <Icon className="w-8 h-8 text-background" strokeWidth={2.5} />
                </div>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-3 relative"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                } transition-colors`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                } transition-colors`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
