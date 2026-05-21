import { motion } from "framer-motion";

/** 极淡、缓慢移动的弥散光晕（Mesh Gradient），强调蓝 #0066FF，不抢正文 */
export default function HeroMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden rounded-none">
      <motion.div
        className="absolute -left-[18%] top-[8%] h-[min(420px,55vw)] w-[min(420px,55vw)] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.14)_0%,transparent_68%)] blur-[88px]"
        animate={{ x: [0, 36, -12, 0], y: [0, 22, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[28%] h-[min(360px,48vw)] w-[min(360px,48vw)] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.09)_0%,transparent_70%)] blur-[76px]"
        animate={{ x: [0, -28, 14, 0], y: [0, -18, 8, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[6%] left-[22%] h-[min(280px,40vw)] w-[min(280px,40vw)] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.06)_0%,transparent_72%)] blur-[72px]"
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
