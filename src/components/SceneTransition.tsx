import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SceneTransitionProps {
  sceneKey: string;
  children: React.ReactNode;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({ sceneKey, children }) => {
  return (
    <div className="relative w-full min-h-[calc(100dvh-56px)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`scene-wrapper-${sceneKey}`}
          initial={{ opacity: 0, filter: 'blur(2px)', scale: 0.99 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(3px)', scale: 1.01 }}
          transition={{
            duration: 0.42,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="relative w-full"
        >
          {children}

          {/* Cinematic Antique Parchment Flash Overlay during scene transition */}
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-30 bg-[#1f160e] mix-blend-color-dodge opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(196,164,106,0.18) 0%, rgba(10,8,6,0.7) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
