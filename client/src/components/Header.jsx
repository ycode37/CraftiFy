import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20 px-4"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-slate-700 inline-flex text-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-3 rounded-full border border-blue-200 shadow-sm backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="font-medium text-sm">Best Text to Image Generator</p>
        <img src={assets.star_icon} alt="" className="w-4 h-4" />
      </motion.div>

      <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-12 text-center font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
        Turn text to{" "}
        <span
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
        >
          image
        </span>
        , in seconds
      </motion.h1>

      <motion.p
        className="text-center max-w-xl mx-auto mt-6 text-slate-600 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 w-auto mt-10 px-14 py-4 flex items-center gap-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate Images
        <img className="h-5" src={assets.star_group} alt="" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ dealy: 1, duration: 1 }}
        className="flex flex-wrap justify-center mt-20 gap-4"
      >
        {Array(6)
          .fill("")
          .map((items, index) => (
            <motion.img
              whileHover={{ scale: 1.05, duration: 0.1 }}
              className="rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-12 shadow-md hover:shadow-xl border-2 border-blue-100"
              src={index % 2 == 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={80}
            />
          ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ dealy: 1.2, duration: 0.8 }}
        className="mt-4 text-slate-500 font-medium text-sm tracking-wide"
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
