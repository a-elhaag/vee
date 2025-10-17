"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "motion/react";
import { ComponentRef, forwardRef } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();

  return (
    <motion.div
      layoutScroll
      className={"grow overflow-auto p-4 pt-20 scrollbar-vee"}
      ref={ref}
    >
      <motion.div
        className={"max-w-3xl mx-auto w-full flex flex-col gap-4 pb-32"}
      >
        <AnimatePresence mode={"popLayout"}>
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              const isVee = msg.type === "assistant_message";

              return (
                <motion.div
                  key={msg.type + index}
                  className={cn("w-[85%]", isVee ? "mr-auto" : "ml-auto")}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div
                    className={cn(
                      "rounded-2xl border shadow-soft overflow-hidden",
                      isVee
                        ? "glass-effect border-vee-red/20 shadow-vee-red/10"
                        : "glass-effect border-white/10"
                    )}
                  >
                    <div
                      className={"flex items-center justify-between pt-4 px-4"}
                    >
                      <div
                        className={cn(
                          "text-xs uppercase font-bold tracking-wider",
                          isVee ? "text-vee-red" : "text-white/70"
                        )}
                      >
                        {isVee ? "VEE" : "YOU"}
                      </div>
                      <div
                        className={cn(
                          "text-xs font-medium opacity-40 tracking-tight tabular-nums"
                        )}
                      >
                        {msg.receivedAt.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "2-digit",
                          second: undefined,
                        })}
                      </div>
                    </div>
                    <div
                      className={
                        "pb-4 px-4 pt-2 text-white/90 leading-relaxed font-medium"
                      }
                    >
                      {msg.message.content}
                    </div>
                    {isVee && (
                      <Expressions values={{ ...msg.models.prosody?.scores }} />
                    )}
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;
