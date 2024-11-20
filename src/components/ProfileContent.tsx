import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ProfileContent = () => {
  const [isEditing, setIsEditing] = useState(false)

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }
  return (
    
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="relative max-w-3xl mx-auto bg-neutral-950 rounded-lg w-[700px] my-36 p-6 text-gray-200"
        >

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Basic Info</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
            >
              {isEditing ? 'Save' : 'Edit'}
            </motion.button>
          </div>

          <div className=" space-y-4">
            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Name</span>
              {isEditing ? (
                <input
                  className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white"
                  defaultValue="John Doe"
                />
              ) : (
                <span className="col-span-2">John Doe</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Gender</span>
              {isEditing ? (
                <select className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <span className="col-span-2">Male</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Age</span>
              {isEditing ? (
                <input
                  type="number"
                  className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white"
                  defaultValue="28"
                />
              ) : (
                <span className="col-span-2">28</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Height</span>
              {isEditing ? (
                <input
                  type="number"
                  className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white"
                  defaultValue="180"
                  placeholder="cm"
                />
              ) : (
                <span className="col-span-2">180 cm</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Weight</span>
              {isEditing ? (
                <input
                  type="number"
                  className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white"
                  defaultValue="75"
                  placeholder="kg"
                />
              ) : (
                <span className="col-span-2">75 kg</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">BMI</span>
              <span className="col-span-2">23.1 (Normal)</span>
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Membership Type</span>
              {isEditing ? (
                <select className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white">
                  <option>Premium</option>
                  <option>Standard</option>
                  <option>Basic</option>
                </select>
              ) : (
                <span className="col-span-2">Premium</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Trainer</span>
              {isEditing ? (
                <select className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white">
                  <option>Mike Johnson</option>
                  <option>Sarah Smith</option>
                  <option>None</option>
                </select>
              ) : (
                <span className="col-span-2">Mike Johnson</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Fitness Goals</span>
              {isEditing ? (
                <select className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white">
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>General Fitness</option>
                  <option>Strength Training</option>
                </select>
              ) : (
                <span className="col-span-2">Weight Loss</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Join Date</span>
              <span className="col-span-2">January 15, 2024</span>
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Emergency Contact</span>
              {isEditing ? (
                <input
                  className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white"
                  defaultValue="+1 (555) 123-4567"
                />
              ) : (
                <span className="col-span-2">+1 (555) 123-4567</span>
              )}
            </div>

            <div className="grid grid-cols-3 items-center py-2 border-b border-neutral-800">
              <span className="text-gray-400">Medical Conditions</span>
              {isEditing ? (
                <input
                  className="col-span-2 bg-neutral-800 rounded px-3 py-1 text-white"
                  defaultValue="None"
                />
              ) : (
                <span className="col-span-2">None</span>
              )}
            </div>
          </div>
        </motion.div>
  )
}

export default ProfileContent