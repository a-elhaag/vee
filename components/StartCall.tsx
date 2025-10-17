import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function StartCall({
  configId,
  accessToken,
}: {
  configId?: string;
  accessToken: string;
}) {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={
            "fixed inset-0 flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden"
          }
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 texture-overlay"></div>

          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-6 text-center relative z-10">
            {/* VEE Logo/Branding */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="font-vee text-[12rem] md:text-[16rem] leading-none text-vee-red mb-6">
                VEE
              </h1>
              <div className="h-1 w-40 bg-vee-red mx-auto rounded-full"></div>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-vee text-3xl md:text-5xl text-white/90 mb-16 uppercase tracking-tight"
            >
              READY TO TALK?
            </motion.h2>

            {/* Main CTA Button */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-12"
            >
              <Button
                size="lg"
                className="text-base px-12 py-8 h-auto animate-pulse-red font-bold tracking-widest rounded-2xl shadow-soft"
                onClick={() => {
                  connect({
                    auth: { type: "accessToken", value: accessToken },
                    configId,
                  })
                    .then(() => {})
                    .catch(() => {
                      toast.error("Unable to start call");
                    })
                    .finally(() => {});
                }}
              >
                TAP TO CONNECT
              </Button>
            </motion.div>

            {/* Subtle accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 h-px w-64 bg-gradient-to-r from-transparent via-vee-red/50 to-transparent rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
