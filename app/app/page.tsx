"use client";

import { RoomModel } from "@/component/MeshComponent";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function App() {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <RoomModel />

      {
        !isVisible&& (
          <div className="px-20 flex flex-row justify-center">
        <motion.div
          className=" w-[240px] h-[240px] bg-[#edeae4] rounded-2xl p-4 mr-4"
          style={{
            boxShadow:
              "3.308px 3.308px 4.686px 0px #A1998D, -3.308px -3.308px 4.686px 0px #FFF",
          }}
          onTap={() => setVisible(!isVisible)}
        >
          <Image
            src={"/imgs/air_purifier.png"}
            alt={""}
            width={48}
            height={48}
          />
          <p>Air Purifier</p>
          <p>Outdoor AQI: 200, gas detected</p>
          <div className="mt-8">
            <Image
              src={"/imgs/switchdevice.png"}
              alt={""}
              width={100}
              height={44}
            />
          </div>
        </motion.div>
        <div
          className=" w-[240px] h-[240px] bg-[#edeae4] rounded-2xl p-4 mr-4"
          style={{
            boxShadow:
              "3.308px 3.308px 4.686px 0px #A1998D, -3.308px -3.308px 4.686px 0px #FFF",
          }}
        >
          <Image
            src={"/imgs/air_purifier.png"}
            alt={""}
            width={48}
            height={48}
          />
          <p>Air Purifier</p>
          <p>Outdoor AQI: 200, gas detected</p>
          <div className="mt-8">
            <Image
              src={"/imgs/switchdevice.png"}
              alt={""}
              width={100}
              height={44}
            />
          </div>
        </div>
        <div
          className=" w-[240px] h-[240px] bg-[#edeae4] rounded-2xl p-4 mr-4"
          style={{
            boxShadow:
              "3.308px 3.308px 4.686px 0px #A1998D, -3.308px -3.308px 4.686px 0px #FFF",
          }}
        >
          <Image
            src={"/imgs/air_purifier.png"}
            alt={""}
            width={48}
            height={48}
          />
          <p>Air Purifier</p>
          <p>Outdoor AQI: 200, gas detected</p>
          <div className="mt-8">
            <Image
              src={"/imgs/switchdevice.png"}
              alt={""}
              width={100}
              height={44}
            />
          </div>
        </div>
      </div>
        )
      }
      
      <div className=" px-20 flex flex-row justify-center">
        <AnimatePresence>
          {isVisible && (
            <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            onTap={() => setVisible(!isVisible)}
              className="rounded-2xl bg-[#61605F] p-2"
              style={{
                filter:
                  "drop-shadow(3px 3px 4px #A1998D) drop-shadow(-3px -3px 4px #FFF)",
              }}
            >
              <motion.div
                
                className="w-[680px] h-[390px] rounded-2xl"
                style={{
                  boxShadow:
                    "3px 3px 4px 0px #494846 inset, -3px -3px 4px 0px rgba(161, 153, 141, 0.40) inset",
                }}
              >
                <div>
                  
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
