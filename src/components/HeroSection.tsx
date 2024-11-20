import React from "react";
// import {
//   IconBrandGithub,
//   IconBrandX,
//   IconExchange,
//   IconHome,
//   IconNewSection,
//   IconTerminal2,
// } from "@tabler/icons-react";
// import Image from "next/image";
import Navbar from "./navbar/Navbar";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { FlipWords } from "../components/ui/flip-words";
import { HeroScrollDemo } from "./HeroScrollDemo";

const HeroSection = () => {

      
      const words = ["strong", "fit", "focused", "healthy"];

  return (
    <BackgroundGradientAnimation>
      <div
        className="relativ h-full w-full rounded-2xl"
      >
        <Navbar />
        <div className="mt-32  items-center flex flex-col h-screen">
          <h1 className=" my-5 py-6  text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Crush your health and fitness goals in no time
          </h1>
          <div className="h-[8rem] flex justify-center items-center px-4">
            <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
              Achieve your
              <FlipWords words={words} /> <br />
              fitness goals with us!
            </div>
          </div>
          <button>
            Join Now !
          </button>
        </div>
        
      </div>
      <HeroScrollDemo/>
    </BackgroundGradientAnimation>
    
  )
}

export default HeroSection


// background image 
// https://img.freepik.com/premium-photo/discipline-wallpaper-motivation-gym-business-wall_1279815-10915.jpg

