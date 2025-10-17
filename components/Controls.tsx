"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full p-6 pb-8 flex items-center justify-center",
        "bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/98 to-[#0A0A0A]/0",
        "border-t-2 border-vee-red"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "px-6 py-4 glass-effect rounded-3xl flex items-center gap-6 shadow-soft border border-white/10"
            }
          >
            {/* Mic Toggle */}
            <Toggle
              className={"rounded-xl"}
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-5"} />
              ) : (
                <Mic className={"size-5"} />
              )}
            </Toggle>

            {/* FFT Visualizer */}
            <div className={"relative grid h-10 w-56 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-vee-red"} />
            </div>

            {/* End Call Button */}
            <Button
              className={"flex items-center gap-2 rounded-xl uppercase"}
              onClick={() => {
                disconnect();
              }}
              variant={"destructive"}
            >
              <PhoneOff className={"size-4"} />
              <span>END CALL</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
