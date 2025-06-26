import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const { generateImage, credit } = useContext(AppContext);
  const [image, setImage] = useState(assets.sample_img_2); // Default image
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Controls image view state
  const [loading, setLoading] = useState(false); // For loading indicator
  const [input, setInput] = useState(""); // User prompt

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsImageLoaded(false);
    setLoading(true);

    if (input.trim()) {
      const generated = await generateImage(input.trim());

      if (generated) {
        setIsImageLoaded(true);
        setImage(generated);
      } else {
        // If generation failed due to low credits, redirect
        if (credit <= 0) {
          navigate("/buy");
        }
      }
    }

    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center px-4"
    >
      {/* Image Display */}
      <div className="relative">
        <img
          src={image}
          alt="Generated"
          className="max-w-sm rounded object-cover shadow-md"
        />

        {/* Red progress bar while loading */}
        <span
          className={`absolute bottom-0 left-0 h-1 bg-red-500 ${
            loading ? "w-full transition-all duration-[10s]" : "w-0"
          }`}
        />
        <p
          className={`${loading ? "block mt-2 text-sm text-gray-500" : "hidden"}`}
        >
          Generating...
        </p>
      </div>

      {/* Input Box + Button (only show when no image generated yet) */}
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe your idea, and our AI will generate it!"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-700 px-10 sm:px-16 py-3 rounded-full hover:bg-pink-800 transition"
          >
            Generate
          </button>
        </div>
      )}

      {/* After Image is Generated */}
      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center text-white text-sm p-0.5 mt-10">
          <button
            onClick={() => {
              setIsImageLoaded(false);
              setInput("");
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-200"
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className="bg-yellow-900 px-10 py-3 rounded-full cursor-pointer hover:bg-yellow-800"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
