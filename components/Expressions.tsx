"use client";
import { expressionLabels } from "@/utils/expressionLabels";
import { motion } from "motion/react";
import * as R from "remeda";

export default function Expressions({
  values,
}: {
  values: Record<string, number>;
}) {
  const top3 = R.pipe(
    values,
    R.entries(),
    R.sortBy(R.pathOr([1], 0)),
    R.reverse(),
    R.take(3)
  );

  return (
    <div
      className={
        "text-xs p-4 w-full grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-white/10 bg-black/20"
      }
    >
      {top3.map(([key, value]) => (
        <div key={key} className={"w-full overflow-hidden"}>
          <div className={"flex items-center justify-between gap-1 pb-1.5"}>
            <div
              className={
                "font-bold uppercase tracking-wide text-white/60 text-[10px]"
              }
            >
              {expressionLabels[key]}
            </div>
            <div className={"tabular-nums text-vee-red font-bold text-[10px]"}>
              {value.toFixed(2)}
            </div>
          </div>
          <div
            className={
              "relative h-1.5 bg-white/10 rounded-full overflow-hidden"
            }
          >
            <motion.div
              className={"absolute top-0 left-0 h-full bg-vee-red rounded-full"}
              initial={{ width: 0 }}
              animate={{
                width: `${R.pipe(
                  value,
                  R.clamp({ min: 0, max: 1 }),
                  (value) => `${value * 100}%`
                )}`,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
