import { useContext } from "react";
import React from "react";
import start from "../assets/star_icon.svg";
import star_group from "../assets/star_group.png";
import { motion } from "framer-motion";
import sample_img_1 from "../assets/sample_img_1.png";
import sample_img_2 from "../assets/sample_img_2.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
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
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex  text-center gap-2 bg-white px-6 py-1 rounded-full border hover:scale-105 border-neutral-500 transition-all duration-700  "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ duration: 0.8, delay: 0.2 }}
      >
        <p>Best Tranform Words Into Arts</p>
        <img src={start} alt="" />
      </motion.div>
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] mx-auto mt-10 text-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        Transform Words Into <span className="text-red-600 font-bold">Art</span>{" "}
        in seconds.
      </motion.h1>
      <motion.p
        className="text-center max-w-xl max-auto mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ duration: 0.8, delay: 0.6 }}
      >
        Unleash boundless creativity with AI – Turn your thoughts into stunning
        visual art instantly. <br />
        Just type, and watch the magic unfold.{" "}
      </motion.p>
      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-pink-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
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
        <img className="h-6" src={star_group} alt="" />
      </motion.button>
      <motion.div className="flex flex-wrap justify-center gap-4 mt-16 ">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              className="rounded hover:scale-1.05 transition-all duration-300 cursor-pointer max-sm:w-10"
              whileHover={{ scale: 1.05, duration: 0.1 }}
              key={index}
              src={index % 2 === 0 ? sample_img_2 : sample_img_1}
              alt=""
              width={70}
            />
          ))}
      </motion.div>
      <motion.p
        className="mt-2 text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Generate Images From Image Generator
      </motion.p>
    </motion.div>
  );
};

export default Header;
