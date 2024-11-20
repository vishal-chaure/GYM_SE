import React, { useEffect, useState } from 'react'
import MembershipStatusBar from './MembershipStatusBar'
import { motion } from 'framer-motion'
// import { Payment } from "../app/payments/columns"
import SessionBooking from './dashboard/SessionBooking'

// const fetchData = async (): Promise<Payment[]> => {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728ed52f",
//       amount: 1000,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728ed52f",
//       amount: 1000,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728ed52f",
//       amount: 1000,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

const DashboardContent = () => {
  // const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  // const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false)
  // const [isMembershipPopupOpen, setIsMembershipPopupOpen] = useState(false)
  const [expandedSession, setExpandedSession] = useState<number | null>(null)

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  }

  useEffect(() => {
    const getData = async () => {
      // const result = await fetchData();
      // setData(result);
      setLoading(false); // Set loading to false after data is fetched
    };

    getData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-white">Loading...</div>; // You can customize the loading message or spinner
  }

  return (
    <div>
      <MembershipStatusBar />
      <motion.section
        className="bg-neutral-900 rounded-lg p-6 shadow-sm my-3"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.h2
          className="text-xl text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Membership Details
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm text-neutral-400"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-neutral-800 p-3 rounded-md">
            <h3 className="text-sm font-medium mb-1 text-neutral-100">Current Membership</h3>
            <p className="text-lg font-semibold text-blue-500">Gold</p>
          </div>
          <div className="bg-neutral-800 p-3 rounded-md">
            <h3 className="text-sm font-medium mb-1 text-neutral-100">Status</h3>
            <p className="text-lg font-semibold text-green-500">Active</p>
          </div>
          <div className="bg-neutral-800 p-3 rounded-md">
            <h3 className="text-sm font-medium mb-1 text-neutral-100">Expiration Date</h3>
            <p className="text-lg font-semibold text-neutral-200">December 31, 2023</p>
          </div>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-neutral-200 text-black text-xs px-3 py-1 rounded shadow-sm transition duration-200 ease-in-out hover:bg-neutral-300"
        >
          Renew/Upgrade
        </motion.button>
      </motion.section>
      <SessionBooking/>

      <motion.section
        className="bg-neutral-900 rounded-lg p-6 shadow-sm my-3"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.h2
          className="text-l text-white mb-4"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Payment History
        </motion.h2>
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <table className="w-full text-sm text-neutral-400">
            <thead>
              <tr className="bg-neutral-800 text-left text-neutral-100">
                <th className="p-2 rounded-tl-md">Date</th>
                <th className="p-2">Transaction ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2 rounded-tr-md">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((transaction) => (
                <motion.tr
                  key={transaction}
                  className="border-b border-neutral-700"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <td className="p-2">April {transaction}, 2023</td>
                  <td className="p-2">TRX-{1000 + transaction}</td>
                  <td className="p-2">$99.99</td>
                  <td className="p-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Paid</span>
                  </td>
                  <td className="p-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-neutral-700 text-white text-xs px-2 py-1 rounded shadow-sm transition duration-200 ease-in-out hover:bg-neutral-600"
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.section>
      <div className=''>
        <motion.section
          className="bg-neutral-900 rounded-lg p-6 shadow-sm my-3 "
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.5 }}
        >
          <motion.h2
            className="text-l mb-4"
            initial={{ opacity: 0, x: -20 }}
            exit={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >Session History</motion.h2>
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, x: -20 }}
            exit={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-800 text-left">
                  <th className="p-2 rounded-tl-md">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Trainer</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2 rounded-tr-md">Type</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((session) => (
                  <motion.tr
                    key={session}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="border-b border-gray-500 cursor-pointer hover:bg-neutral-950 transition-colors duration-150"
                    onClick={() => setExpandedSession(expandedSession === session ? null : session)}
                  >
                    <td className="p-2">May {session}, 2023</td>
                    <td className="p-2">10:00 AM</td>
                    <td className="p-2">Jane Smith</td>
                    <td className="p-2">60 min</td>
                    <td className="p-2">Strength</td>
                  </motion.tr>
                ))}
              </tbody>

            </table>
          </motion.div>
        </motion.section>
      </div>
      
    </div>
  )
}

export default DashboardContent