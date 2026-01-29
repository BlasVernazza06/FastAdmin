"use client"

import { motion } from "motion/react"

export default function Logo() {
    return (
        <motion.div className="flex justify-center gap-2 md:justify-start" initial={{ x: -250 }} animate={{ x: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
          <a href="#" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex size-10 items-center justify-center rounded-md">
              <img src="/logo-32.png" className="" alt="" />
            </div>
            FastAdmin
          </a>
        </motion.div>
    );
}