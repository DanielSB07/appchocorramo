import { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';


interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="size-full bg-gradient-to-b from-background to-card flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10 max-w-md mx-auto w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >

<div className="flex items-center justify-center mb-8">
  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl p-2">
    <img
      src={logo}
      alt="EcoRamo AR"
      className="w-full h-full object-contain"
    />
  </div>
</div>

          <h1 className="text-4xl font-bold text-center mb-2">
            {isSignUp ? 'Únete a EcoRamo' : 'Bienvenido'}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {isSignUp
              ? 'Crea tu cuenta y comienza a salvar el planeta'
              : 'Inicia sesión para continuar tu aventura ecológica'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp ? (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <span className="text-primary font-semibold">Inicia sesión</span>
                </>
              ) : (
                <>
                  ¿No tienes cuenta?{' '}
                  <span className="text-primary font-semibold">Regístrate</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="p-6 text-center text-sm text-muted-foreground z-10">
        Al continuar, aceptas nuestros{' '}
        <button className="text-primary">Términos de servicio</button> y{' '}
        <button className="text-primary">Política de privacidad</button>
      </div>
    </div>
  );
}
