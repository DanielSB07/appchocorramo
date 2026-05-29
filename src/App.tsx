import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ScannerScreen } from './screens/ScannerScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ChallengesScreen } from './screens/ChallengesScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { GameScreen } from './screens/GameScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <HashRouter>
      <div className="size-full bg-background text-foreground overflow-hidden">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn
                ? <Navigate to="/home" />
                : <LoginScreen onLogin={() => setIsLoggedIn(true)} />
            }
          />

          <Route
            path="/home"
            element={
              isLoggedIn
                ? <HomeScreen />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/scanner"
            element={
              isLoggedIn
                ? <ScannerScreen />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/challenges"
            element={
              isLoggedIn
                ? <ChallengesScreen />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/rewards"
            element={
              isLoggedIn
                ? <RewardsScreen />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/profile"
            element={
              isLoggedIn
                ? <ProfileScreen />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/game"
            element={
              isLoggedIn
                ? <GameScreen />
                : <Navigate to="/login" />
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
