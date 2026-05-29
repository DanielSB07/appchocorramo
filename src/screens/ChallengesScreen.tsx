import { motion } from 'motion/react';
import { Star, Clock, Users, Flame, Trophy, Target } from 'lucide-react';
import { BottomNav } from "../components/BottomNav";



export function ChallengesScreen() {
  const dailyChallenges = [
    {
      title: 'Escanea 5 empaques diferentes',
      description: 'Encuentra y escanea 5 productos únicos hoy',
      progress: 60,
      current: 3,
      total: 5,
      xp: 100,
      icon: Target,
      color: 'text-primary',
    },
    {
      title: 'Completa un minijuego',
      description: 'Demuestra tus conocimientos de reciclaje',
      progress: 0,
      current: 0,
      total: 1,
      xp: 75,
      icon: Star,
      color: 'text-accent',
    },
    {
      title: 'Racha de 3 días',
      description: 'Mantén tu racha activa escaneando hoy',
      progress: 66,
      current: 2,
      total: 3,
      xp: 150,
      icon: Flame,
      color: 'text-orange-500',
    },
  ];

  const weeklyChallenges = [
    {
      title: 'Maestro del Reciclaje',
      description: 'Escanea 30 empaques esta semana',
      progress: 43,
      current: 13,
      total: 30,
      xp: 500,
      timeLeft: '4 días',
    },
    {
      title: 'Educador Ambiental',
      description: 'Comparte 5 consejos con amigos',
      progress: 20,
      current: 1,
      total: 5,
      xp: 300,
      timeLeft: '5 días',
    },
  ];

  const communityChallenge = {
    title: 'Reto Comunitario Global',
    description: '¡Únete a la comunidad para escanear 1 millón de empaques!',
    globalProgress: 67,
    userContribution: 47,
    totalScans: '670,234',
    goal: '1,000,000',
    timeLeft: '12 días',
    reward: 1000,
  };

  return (
    <div className="size-full bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gradient-to-br from-card to-background p-6 mb-6 rounded-b-3xl shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Retos</h1>
          <p className="text-muted-foreground">
            Completa misiones y gana recompensas
          </p>
        </div>

        <div className="px-6 space-y-6">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-6 border border-primary/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-background" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{communityChallenge.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {communityChallenge.description}
                </p>
              </div>
            </div>

            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progreso Global</span>
                <span className="text-sm font-bold">
                  {communityChallenge.totalScans} / {communityChallenge.goal}
                </span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${communityChallenge.globalProgress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {communityChallenge.timeLeft} restantes
                </span>
              </div>
              <div className="flex items-center gap-2 text-accent font-bold">
                <Trophy className="w-5 h-5" />
                <span>+{communityChallenge.reward} XP</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Tu contribución: {communityChallenge.userContribution} escaneos
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Retos Diarios
            </h2>
            <div className="space-y-3">
              {dailyChallenges.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <challenge.icon className={`w-6 h-6 ${challenge.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-accent flex items-center gap-1 flex-shrink-0">
                      <Star className="w-4 h-4" />
                      +{challenge.xp}
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
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-muted-foreground">
                      {challenge.current} / {challenge.total}
                    </span>
                    <span className={challenge.progress === 100 ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                      {challenge.progress}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Retos Semanales
            </h2>
            <div className="space-y-3">
              {weeklyChallenges.map((challenge, i) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{challenge.timeLeft} restantes</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-accent flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      +{challenge.xp}
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
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-muted-foreground">
                      {challenge.current} / {challenge.total}
                    </span>
                    <span className="text-muted-foreground">{challenge.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="challenges" />
    </div>
  );
}
