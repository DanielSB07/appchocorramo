import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Zap, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export function ScannerScreen() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanComplete(true);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#10B981', '#F59E0B', '#34D399'],
            });
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleClose = () => {
    setScanComplete(false);
    setIsScanning(false);
    setScanProgress(0);
  };

  return (
    <div className="size-full bg-background flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="w-12 h-12 bg-card rounded-xl flex items-center justify-center border border-border"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="text-xl font-bold">Escáner AR</h1>
          <div className="w-12" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="relative w-full max-w-sm aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-card to-background rounded-3xl border-2 border-dashed border-primary/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-24 h-24 text-muted-foreground/30" />
              </div>

              {isScanning && (
                <motion.div
                  initial={{ y: '-100%' }}
                  animate={{ y: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"
                  style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)' }}
                />
              )}
            </div>

            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-4 mx-auto"
                  />
                  <div className="text-2xl font-bold text-primary">{scanProgress}%</div>
                  <div className="text-sm text-muted-foreground mt-2">Escaneando...</div>
                </div>
              </motion.div>
            )}
          </div>

          {!isScanning && !scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <h2 className="text-2xl font-bold mb-3">
                Apunta al empaque de Chocorramo
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                Coloca el código QR o el logo dentro del marco para iniciar la experiencia AR
              </p>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                className="bg-gradient-to-r from-primary to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 mx-auto shadow-lg shadow-primary/30"
              >
                <Camera className="w-6 h-6" />
                Iniciar Escaneo
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {scanComplete && (
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
              className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="absolute top-8 right-8 w-10 h-10 bg-muted rounded-xl flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-background" strokeWidth={2.5} />
              </motion.div>

              <h2 className="text-3xl font-bold text-center mb-3">
                ¡Escaneo Exitoso!
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Has desbloqueado nueva información sobre reciclaje
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Recompensa</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Zap className="w-6 h-6 text-accent" />
                      +150 XP
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  • Aprende a reciclar este empaque correctamente
                  <br />
                  • Descubre el impacto ambiental
                  <br />
                  • Completa tu primera misión diaria
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/home')}
                className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold"
              >
                Continuar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
