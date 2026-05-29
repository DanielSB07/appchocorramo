import { motion } from 'motion/react';
import {
  User,
  Leaf,
  Settings,
  Award,
  TrendingUp,
  Calendar,
  Share2,
  Bell,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { BottomNav } from "../components/BottomNav";
import logo from '../assets/logo.png';

export function ProfileScreen() {
  const stats = [
    { label: 'Escaneos Totales', value: '47', icon: Leaf, color: 'text-primary' },
    { label: 'Días Activo', value: '23', icon: Calendar, color: 'text-accent' },
    { label: 'Impacto CO₂', value: '12kg', icon: TrendingUp, color: 'text-emerald-400' },
  ];

  const achievements = [
    {
      name: 'Racha de 7 días',
      date: '15 May 2026',
      icon: '🔥',
      color: 'from-orange-500 to-red-600',
    },
    {
      name: 'Eco Guerrero',
      date: '10 May 2026',
      icon: '🌿',
      color: 'from-primary to-emerald-600',
    },
    {
      name: 'Primer Escaneo',
      date: '1 May 2026',
      icon: '⭐',
      color: 'from-accent to-yellow-600',
    },
  ];

  const menuItems = [
    { label: 'Editar Perfil', icon: User, action: () => {} },
    { label: 'Notificaciones', icon: Bell, action: () => {} },
    { label: 'Compartir Logros', icon: Share2, action: () => {} },
    { label: 'Configuración', icon: Settings, action: () => {} },
  ];

  return (
    <div className="size-full bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gradient-to-br from-card to-background p-6 mb-6 rounded-b-3xl shadow-xl">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-4"
            >
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl p-2">
                <img
                  src={logo}
                  alt="EcoRamo AR"
                  className="w-full h-full object-contain"
                 />
              </div>
            </motion.div>

            <h1 className="text-2xl font-bold mb-1">EcoHero</h1>
            <p className="text-muted-foreground mb-1">@ecohero_2026</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Nivel 12 • Guardián del Bosque
              </span>
            </div>

            <p className="text-center text-sm text-muted-foreground max-w-xs">
              Salvando el planeta un escaneo a la vez 🌍 | Amante del reciclaje 💚
            </p>
          </div>
        </div>

        <div className="px-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-3">Estadísticas</h2>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-4 text-center"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">Logros Recientes</h2>
            <div className="space-y-2">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center text-2xl`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">Configuración</h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                    i !== menuItems.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl p-4 font-semibold flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </motion.button>

          <div className="text-center text-xs text-muted-foreground py-4">
            EcoRamo AR v1.0.0
            <br />
            Una iniciativa de Chocorramo para el medio ambiente
          </div>
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}
