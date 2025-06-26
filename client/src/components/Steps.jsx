import React from "react";
import { stepsData } from "../assets/assets";
import { delay, motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-32"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h1 className=" text-black inline-flex text-3xl sm:text-0xl font-bold text-center gap-2 bg-white px-28 py-4 rounded-full border hover:scale-105 border-netural-500 transition-all duration-700">
        How AI Magic Works
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Transform Texts Into Stunning Images
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm ">
        {stepsData.map((item, index) => (
          <div
            className="flex items-center gap-4 p-5 px-8  bg-white/20 shadow-md border cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-lg"
            key={index}
          >
            <img src={item.icon} alt="" width={40} />
            <h1 className="text-xl font-medium">{item.title}</h1>
            <p className="text-orange-500">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
