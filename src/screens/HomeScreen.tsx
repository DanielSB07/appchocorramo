import { motion } from 'motion/react';
import { Scan, Leaf, Trophy, Zap, ChevronRight, Star, Target, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from "../components/BottomNav";
import logo from '../assets/logo.png';

export function HomeScreen() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Escaneos', value: '47', icon: Scan, color: 'text-primary' },
    { label: 'Puntos XP', value: '2,340', icon: Zap, color: 'text-accent' },
    { label: 'Reciclados', value: '89', icon: Recycle, color: 'text-primary' },
  ];

  const quickActions = [
    {
      title: 'Escanear Empaque',
      description: 'Usa tu cámara para desbloquear contenido AR',
      icon: Scan,
      gradient: 'from-primary to-emerald-600',
      action: () => navigate('/scanner'),
    },
    {
      title: 'Minijuego',
      description: 'Aprende a reciclar jugando',
      icon: Target,
      gradient: 'from-accent to-orange-600',
      action: () => navigate('/game'),
    },
  ];

  const challenges = [
    { title: 'Escanea 5 empaques hoy', progress: 60, xp: 100 },
    { title: 'Completa el tutorial de reciclaje', progress: 100, xp: 50 },
    { title: 'Participa en un reto semanal', progress: 30, xp: 200 },
  ];

  return (
    <div className="size-full bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gradient-to-br from-card to-background rounded-b-3xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Hola, EcoHero</h1>
              <p className="text-muted-foreground">Nivel 12 • Guardián del Bosque</p>
            </div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center cursor-pointer shadow-lg p-2"
              onClick={() => navigate('/profile')}
              >
        <img
          src={logo}
          alt="EcoRamo AR"
          className="w-full h-full object-contain"
          />
        </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 border border-border"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="px-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              {quickActions.map((action, i) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="cursor-pointer"
                >
                  <div className={`bg-gradient-to-r ${action.gradient} rounded-2xl p-5 flex items-center gap-4`}>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <action.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{action.title}</h3>
                      <p className="text-white/80 text-sm">{action.description}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/80" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Retos Activos</h2>
              <button
                onClick={() => navigate('/challenges')}
                className="text-primary text-sm font-semibold"
              >
                Ver todos
              </button>
            </div>
            <div className="space-y-3">
              {challenges.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{challenge.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-accent">
                        <Star className="w-4 h-4" />
                        <span>+{challenge.xp} XP</span>
                      </div>
                    </div>
                    <div className="text-2xl">
                      {challenge.progress === 100 ? '✅' : '🎯'}
                    </div>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-right">
                    {challenge.progress}% completado
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
