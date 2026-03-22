import { motion, AnimatePresence } from 'framer-motion';

export default function ProgressBar({ loading, estimated = 2000 }: { loading: boolean; estimated?: number }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: estimated / 1000, ease: 'linear' }}
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 z-[9999]"
        />
      )}
    </AnimatePresence>
  );
}
