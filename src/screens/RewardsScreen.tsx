import { motion } from 'motion/react';
import { Trophy, Star, Award, Crown, Zap, Lock, CheckCircle2 } from 'lucide-react';
import { BottomNav } from "../components/BottomNav";

export function RewardsScreen() {
  const userXP = 2340;
  const userLevel = 12;
  const nextLevelXP = 3000;
  const xpProgress = (userXP / nextLevelXP) * 100;

  const badges = [
    {
      name: 'Primer Escaneo',
      description: 'Completaste tu primer escaneo AR',
      icon: Star,
      unlocked: true,
      rarity: 'común',
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Eco Guerrero',
      description: 'Escaneaste 50 empaques',
      icon: Trophy,
      unlocked: true,
      rarity: 'raro',
      color: 'from-primary to-emerald-600',
    },
    {
      name: 'Guardián del Bosque',
      description: 'Alcanzaste nivel 10',
      icon: Crown,
      unlocked: true,
      rarity: 'épico',
      color: 'from-accent to-orange-600',
    },
    {
      name: 'Maestro Reciclador',
      description: 'Completa 100 retos diarios',
      icon: Award,
      unlocked: false,
      progress: 67,
      rarity: 'legendario',
      color: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Líder Comunitario',
      description: 'Participa en 10 retos globales',
      icon: Trophy,
      unlocked: false,
      progress: 30,
      rarity: 'épico',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'Impacto Total',
      description: 'Recicla 1000 empaques',
      icon: Zap,
      unlocked: false,
      progress: 8,
      rarity: 'legendario',
      color: 'from-red-500 to-orange-600',
    },
  ];

  const perks = [
    {
      name: 'Bono de XP Doble',
      description: 'Gana XP x2 durante 24h',
      cost: 500,
      icon: Zap,
    },
    {
      name: 'Descuento Chocorramo',
      description: '20% de descuento en tu próxima compra',
      cost: 1000,
      icon: Trophy,
    },
    {
      name: 'Avatar Exclusivo',
      description: 'Desbloquea un avatar premium',
      cost: 750,
      icon: Crown,
    },
  ];

  const rarityColors: { [key: string]: string } = {
    común: 'text-gray-400',
    raro: 'text-primary',
    épico: 'text-accent',
    legendario: 'text-purple-400',
  };

  return (
    <div className="size-full bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="bg-gradient-to-br from-card to-background p-6 mb-6 rounded-b-3xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Recompensas</h1>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Tu Nivel</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <Crown className="w-8 h-8 text-accent" />
                  Nivel {userLevel}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Total XP</div>
                <div className="text-2xl font-bold text-accent">
                  {userXP.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{userXP} XP</span>
              <span>{nextLevelXP - userXP} XP para nivel {userLevel + 1}</span>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Insignias Desbloqueadas</h2>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card border ${
                    badge.unlocked ? 'border-border' : 'border-dashed border-border/50'
                  } rounded-2xl p-4 relative overflow-hidden`}
                >
                  {!badge.unlocked && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}

                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-3 ${
                      badge.unlocked ? 'shadow-lg' : 'opacity-50'
                    }`}
                  >
                    <badge.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>

                  <h3 className="font-semibold text-sm text-center mb-1">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    {badge.description}
                  </p>

                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-xs font-semibold ${rarityColors[badge.rarity]}`}>
                      {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                    </span>
                  </div>

                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="mt-2">
                      <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-primary rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-center text-muted-foreground mt-1">
                        {badge.progress}%
                      </div>
                    </div>
                  )}

                  {badge.unlocked && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Canjea tus Puntos</h2>
            <div className="space-y-3">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <perk.icon className="w-7 h-7 text-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">{perk.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {perk.description}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                          userXP >= perk.cost
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                        disabled={userXP < perk.cost}
                      >
                        {userXP >= perk.cost ? 'Canjear' : 'Bloqueado'} • {perk.cost} XP
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="rewards" />
    </div>
  );
}
