import React from "react";
import { testimonialsData, assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 py-12"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 ">User Reviews</h1>
      <p className="text-gray-600 mb-12">What are Customers Says About Us</p>
      <div className="flex flex-wrap gap-6 ">
        {testimonialsData.map((testimonials, index) => (
          <div
            key={index}
            className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonials.image}
                alt=""
                className="w-14 rounded-full"
              />
              <h2 className="text-xl font-semibold mt-3 ">
                {testimonials.name}
              </h2>
              <p className="text-gray-600 mb-5">{testimonials.role}</p>
              <div className="flex mb-4">
                {Array(testimonials.stars)
                  .fill()
                  .map((items, index) => (
                    <img key={index} src={assets.rating_star} alt=""></img>
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {testimonials.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
