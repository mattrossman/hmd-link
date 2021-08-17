import "@twind/macro"
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion"
import { useEffect, useReducer, useState } from "react"
import { animation, keyframes } from "twind/css"

export default function RoomChip({ className = "" }) {
  const [bool, toggle] = useReducer((x) => !x, false)
  const label = bool ? "some-room-name" : "Connecting..."
  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        initial={{ borderRadius: 9999 }}
        transition={{ duration: 0.1 }}
        tw="bg-secondary shadow-primary inline-block"
        onClick={toggle}
      >
        <motion.div layout="position" tw="flex gap-3 items-center px-6 py-3">
          <motion.span
            layout="position"
            tw={["w-2 h-2 rounded-full transition-colors", bool ? "bg-status-ok" : " bg-status-warn"]}
          />
          <motion.span layout="position">
            <AnimatePresence initial={false} exitBeforeEnter>
              <motion.span
                key={label}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1, delay: 0.1 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimateSharedLayout>
  )
}
