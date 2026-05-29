import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Trash2,
  Recycle,
  Leaf,
  Zap,
  X,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface Item {
  id: number;
  name: string;
  emoji: string;
  bin: 'reciclable' | 'organico' | 'general';
}

export function GameScreen() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [itemsProcessed, setItemsProcessed] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const items: Item[] = [
    { id: 1, name: 'Botella de plástico', emoji: '🍼', bin: 'reciclable' },
    { id: 2, name: 'Cáscara de banana', emoji: '🍌', bin: 'organico' },
    { id: 3, name: 'Lata de aluminio', emoji: '🥫', bin: 'reciclable' },
    { id: 4, name: 'Restos de comida', emoji: '🍎', bin: 'organico' },
    { id: 5, name: 'Papel', emoji: '📄', bin: 'reciclable' },
    { id: 6, name: 'Pañuelo usado', emoji: '🧻', bin: 'general' },
    { id: 7, name: 'Empaque Chocorramo', emoji: '🍫', bin: 'reciclable' },
    { id: 8, name: 'Cáscara de huevo', emoji: '🥚', bin: 'organico' },
    { id: 9, name: 'Cartón', emoji: '📦', bin: 'reciclable' },
    { id: 10, name: 'Chicle', emoji: '🍬', bin: 'general' },
  ];

  const bins = [
    {
      type: 'reciclable' as const,
      name: 'Reciclable',
      icon: Recycle,
      color: 'from-primary to-emerald-600',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary',
    },
    {
      type: 'organico' as const,
      name: 'Orgánico',
      icon: Leaf,
      color: 'from-emerald-600 to-green-700',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500',
    },
    {
      type: 'general' as const,
      name: 'General',
      icon: Trash2,
      color: 'from-muted-foreground to-gray-600',
      bgColor: 'bg-muted-foreground/20',
      borderColor: 'border-muted-foreground',
    },
  ];

  const nextItem = () => {
    if (itemsProcessed >= 10) {
      setGameWon(true);
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#34D399'],
      });
      return;
    }

    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
  };

  useEffect(() => {
    nextItem();
  }, []);

  const handleBinClick = (binType: 'reciclable' | 'organico' | 'general') => {
    if (!currentItem || feedback) return;

    const isCorrect = currentItem.bin === binType;

    if (isCorrect) {
      setFeedback('correct');
      setScore((prev) => prev + 100);
      setTimeout(() => {
        setFeedback(null);
        setItemsProcessed((prev) => prev + 1);
        nextItem();
      }, 1000);
    } else {
      setFeedback('wrong');
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives === 0) {
        setTimeout(() => {
          setGameOver(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setFeedback(null);
          setItemsProcessed((prev) => prev + 1);
          nextItem();
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setItemsProcessed(0);
    setGameOver(false);
    setGameWon(false);
    setFeedback(null);
    nextItem();
  };

  return (
    <div className="size-full bg-gradient-to-b from-background to-card flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="w-12 h-12 bg-card rounded-xl flex items-center justify-center border border-border"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-bold">{score}</span>
            </div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    i < lives ? 'bg-destructive' : 'bg-muted'
                  }`}
                >
                  <span className="text-lg">{i < lives ? '❤️' : '🖤'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {currentItem && !gameOver && !gameWon && (
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="mb-8"
              >
                <div className="w-48 h-48 bg-gradient-to-br from-card to-background rounded-3xl flex flex-col items-center justify-center border-2 border-border shadow-2xl relative">
                  {feedback === 'correct' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-primary/20 rounded-3xl flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-24 h-24 text-primary" strokeWidth={3} />
                    </motion.div>
                  )}
                  {feedback === 'wrong' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-destructive/20 rounded-3xl flex items-center justify-center"
                    >
                      <X className="w-24 h-24 text-destructive" strokeWidth={3} />
                    </motion.div>
                  )}
                  <div className="text-8xl mb-4">{currentItem.emoji}</div>
                  <div className="text-lg font-semibold text-center px-4">
                    {currentItem.name}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="text-2xl font-bold mb-2 text-center">
            ¿Dónde va este residuo?
          </h2>
          <p className="text-muted-foreground mb-8 text-center">
            Selecciona el contenedor correcto
          </p>

          <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
            {bins.map((bin) => (
              <motion.button
                key={bin.type}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBinClick(bin.type)}
                disabled={!!feedback}
                className={`bg-gradient-to-r ${bin.color} rounded-2xl p-6 flex items-center gap-4 shadow-lg disabled:opacity-50 transition-opacity`}
              >
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <bin.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold text-lg">{bin.name}</h3>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Progreso: {itemsProcessed} / 10
            </p>
            <div className="relative h-2 w-64 bg-muted rounded-full overflow-hidden mt-2 mx-auto">
              <motion.div
                animate={{ width: `${(itemsProcessed / 10) * 100}%` }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(gameOver || gameWon) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-lg flex items-center justify-center z-20 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`w-24 h-24 bg-gradient-to-br ${
                  gameWon ? 'from-primary to-accent' : 'from-destructive to-red-600'
                } rounded-3xl flex items-center justify-center mx-auto mb-6`}
              >
                {gameWon ? (
                  <Trophy className="w-12 h-12 text-background" strokeWidth={2.5} />
                ) : (
                  <X className="w-12 h-12 text-white" strokeWidth={2.5} />
                )}
              </motion.div>

              <h2 className="text-4xl font-bold mb-3">
                {gameWon ? '¡Felicidades!' : 'Juego Terminado'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {gameWon
                  ? '¡Completaste todos los desafíos!'
                  : 'Sigue practicando para mejorar'}
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 border border-primary/20">
                <div className="text-sm text-muted-foreground mb-2">Puntuación Final</div>
                <div className="text-5xl font-bold text-accent mb-4">{score}</div>
                <div className="text-sm text-muted-foreground">
                  Ítems procesados: {itemsProcessed} / 10
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={resetGame}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold"
                >
                  Jugar de Nuevo
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/home')}
                  className="w-full bg-card border border-border py-4 rounded-2xl font-semibold"
                >
                  Volver al Inicio
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
