import { motion } from 'framer-motion';
import { useSocialReactions } from '@/hooks/useSocialReactions';
import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
  id?: string; // ID for animation rendering
  duration?: number;
};

const FloatingReactions = ({
  duration = 3,
  className,
  id = 'default', // Default ID if not provided
}: TComponentProps) => {
  // Use the social reactions context to get scoped reactions
  const { getFloatingReactionsByScope } = useSocialReactions();
  const floatingReactions = getFloatingReactionsByScope(id);
  return (
    <div
      className={cn(
        'FloatingReactionsScene',
        'absolute inset-0',
        'z-[1000]',
        'overflow-hidden',
        'pointer-events-none',
        className,
      )}
    >
      {floatingReactions.map((thumb) => (
        <motion.div
          key={thumb.id}
          className="absolute"
          style={{
            bottom: '0px',
            left: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, '-1000px'],
            x: [0, 30, -20, 40, -10, 25, 0], // Chaotic left-right movement
            rotate: [0, 15, -10, 20, -15, 10, 0], // Add rotation for more chaos
          }}
          transition={{
            duration: duration,
            ease: 'easeOut',
          }}
        >
          {thumb.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingReactions;
