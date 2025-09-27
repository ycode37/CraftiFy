import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32 px-4"
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        How it Works
      </motion.h1>

      <motion.p
        className="text-lg text-slate-600 mb-12 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Transform Words Into Stunning Images
      </motion.p>

      <div className="space-y-6 w-full max-w-4xl">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-6 p-6 px-8 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 shadow-sm hover:shadow-lg border border-blue-100 rounded-xl transition-all duration-300 group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="bg-white p-4 rounded-full shadow-sm group-hover:shadow-md border border-blue-200 group-hover:border-blue-300 transition-all duration-300">
              <img src={item.icon} alt="" className="w-7 h-7" />
            </div>

            <div className="flex-1">
              <motion.h2 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                {item.title}
              </motion.h2>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                {item.description}
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm group-hover:bg-blue-700 transition-colors duration-300">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
