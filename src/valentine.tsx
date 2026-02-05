import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

type Position = {
  x: number;
  y: number;
};

const ValentinePage: React.FC = () => {
  const [noButtonPos, setNoButtonPos] = useState<Position>({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState<boolean>(false);

  // Déplacement aléatoire du bouton "Non"
  const moveButton = () => {
    if (typeof window === 'undefined') return;

    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 80);

    setNoButtonPos({
      x: x - window.innerWidth / 2,
      y: y - window.innerHeight / 2
    });
  };

  // BONUS MOBILE : déplacement au toucher
  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    moveButton();
  };

  const handleYes = () => {
    setAccepted(true);

    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#fe019a', '#ffffff']
    });

    // Remplacez par vos propres IDs EmailJS
    emailjs.send(
      'VOTRE_SERVICE_ID',
      'VOTRE_TEMPLATE_ID',
      {
        message: "J'accepte d'être ta Valentine ! ❤️"
      },
      'VOTRE_PUBLIC_KEY'
    );
  };

  // Cœurs animés (mémorisés)
  const hearts = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return [...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-red-400 opacity-50 select-none"
        initial={{
          y: '100vh',
          x: Math.random() * window.innerWidth
        }}
        animate={{ y: '-10vh' }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: 'linear',
          delay: Math.random() * 5
        }}
        style={{ fontSize: Math.random() * 30 + 10 }}
      >
        ❤️
      </motion.div>
    ));
  }, []);

  return (
    <div className="relative h-screen w-full bg-pink-100 flex flex-col items-center justify-center overflow-hidden font-sans">
      {hearts}

      {/* Prénom */}
      <motion.h1
        className="text-6xl md:text-8xl font-black text-red-600 mb-8 z-10"
        style={{ perspective: 1000 }}
        animate={{
          rotateY: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        France
      </motion.h1>

      <h2 className="text-2xl md:text-4xl text-pink-700 font-medium mb-12 z-10">
        Veux-tu être ma Valentine ?
      </h2>

      {!accepted ? (
        <div className="flex gap-6 z-10">
          {/* Bouton OUI */}
          <button
            onClick={handleYes}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-transform hover:scale-110"
          >
            OUI !
          </button>

          {/* Bouton NON (PC + Mobile) */}
          <motion.button
            onMouseEnter={moveButton}
            onClick={moveButton}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="px-8 py-4 bg-red-500 text-white font-bold rounded-full shadow-lg touch-none"
          >
            Non
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <p className="text-4xl text-red-600 font-bold">
            💖 Magnifique ! À très vite ! 💖
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ValentinePage;
