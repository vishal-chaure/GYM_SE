'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner';

const membershipTypes = [
  {
    type: 'Premium',
    prices: {
      1: 1800,
      3: 5000,
      6: 9500,
      9: 14500,
      12: 19000
    },
    features: [
      'Unlimited gym access',
      'Personal trainer sessions',
      'Diet consultation',
      '20% off merchandise',
      'Access to all classes'
    ]
  },
  {
    type: 'Standard',
    prices: {
      1: 1400,
      3: 3800,
      6: 7500,
      9: 10500,
      12: 13500
    },
    features: [
      'Unlimited gym access',
      'Group fitness classes',
      '10% off merchandise',
      'Locker rental'
    ]
  },
  {
    type: 'Basic',
    prices: {
      1: 1000,
      3: 3000,
      6: 5000,
      9: 8500,
      12: 10000
    },
    features: [
      'Gym access (off-peak hours)',
      'Limited equipment usage',
      'Online workout resources'
    ]
  }
]

const durations = [
  { value: 1, label: 'Monthly' },
  { value: 3, label: '3 Months' },
  { value: 6, label: '6 Months' },
  { value: 9, label: '9 Months' },
  { value: 12, label: '12 Months' }
]

interface CustomDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

function CustomDropdown({ value, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="w-full bg-neutral-800 text-white rounded-md p-2 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{durations.find(d => d.value === value)?.label || 'Select Duration'}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-neutral-800 rounded-md shadow-lg"
          >
            {durations.map((duration) => (
              <li
                key={duration.value}
                className="px-4 py-2 cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={() => {
                  onChange(duration.value)
                  setIsOpen(false)
                }}
              >
                {duration.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MembershipCardProps {
  type: string;
  prices: Record<number, number>;
  features: string[];
  onPay: (type: string, duration: number, amount: number) => void;
}

function MembershipCard({ type, prices, features, onPay }: MembershipCardProps) {
  const [duration, setDuration] = useState(1)
  const price = prices[duration]

  return (
    <motion.div
      className="bg-neutral-900 rounded-lg p-6 shadow-lg flex flex-col justify-between"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div>
        <h2 className="text-2xl font-bold text-neutral-300 mb-4">{type}</h2>
        <p className="text-3xl font-bold text-neutral-300 mb-6">₹{price}<span className="text-sm font-normal text-gray-400">/{duration === 1 ? 'month' : `${duration} months`}</span></p>
        <ul className="text-gray-300 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CustomDropdown
          value={duration}
          onChange={(value) => setDuration(value)}
        />
        <button 
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
          onClick={() => onPay(type, duration, price)}
        >
          Pay
        </button>
      </div>
    </motion.div>
  )
}

// interface PaymentHistoryItem {
//   date: string;
//   transactionId: string;
//   months: number;
//   type: string;
//   amount: number;
//   status: string;
// }

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: string;
  duration: number;
  amount: number;
}

function ConfirmationModal({ isOpen, onClose, onConfirm, type, duration, amount }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-black p-8 rounded-2xl shadow-xl relative z-10 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Confirm Payment</h2>
        <p className="text-gray-300 mb-4">
          Are you sure you want to purchase the {type} membership for {duration} month{duration > 1 ? 's ' : ' '}?
        </p>
        <p className="text-white text-xl font-semibold mb-8">Total amount: ${amount}</p>
        <div className="flex justify-end space-x-8">
          <button
            className="px-4 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-300 "
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-800 transition duration-300 "
            onClick={onConfirm}
          >
            Confirm Payment
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function MembershipSelection() {
  // const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([
  //   {
  //     date: "2023-04-01",
  //     transactionId: "TRX-1001",
  //     months: 1,
  //     type: "Premium",
  //     amount: 99.99,
  //     status: "Paid"
  //   },
  //   {
  //     date: "2023-05-01",
  //     transactionId: "TRX-1002",
  //     months: 3,
  //     type: "Standard",
  //     amount: 199.99,
  //     status: "Paid"
  //   },
  //   {
  //     date: "2023-06-01",
  //     transactionId: "TRX-1003",
  //     months: 6,
  //     type: "Basic",
  //     amount: 299.99,
  //     status: "Paid"
  //   }
  // ]);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<{type: string; duration: number; amount: number} | null>(null);

  const handlePay = (type: string, duration: number, amount: number) => {
    setPendingPayment({ type, duration, amount });
    setIsConfirmationOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!pendingPayment) return;

    setIsConfirmationOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      // const newPayment: PaymentHistoryItem = {
      //   date: new Date().toISOString().split('T')[0],
      //   transactionId: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
      //   months: pendingPayment.duration,
      //   type: pendingPayment.type,
      //   amount: pendingPayment.amount,
      //   status: "Paid"
      // };
      // setPaymentHistory(prevHistory => [newPayment, ...prevHistory]);
      setIsLoading(false);
      setPendingPayment(null);
      toast.success('Payment Confirmed');
    }, 3000);

    
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-3xl font-serif text-center text-white mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Choose Your Membership Plan
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {membershipTypes.map((membership) => (
          <MembershipCard
            key={membership.type}
            type={membership.type}
            prices={membership.prices}
            features={membership.features}
            onPay={handlePay}
          />
        ))}
      </motion.div>
      
      
      <AnimatePresence>
        {isConfirmationOpen && pendingPayment && (
          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={() => setIsConfirmationOpen(false)}
            onConfirm={handleConfirmPayment}
            type={pendingPayment.type}
            duration={pendingPayment.duration}
            amount={pendingPayment.amount}
          />
        )}
      </AnimatePresence>

      {isLoading && <LoadingSpinner />}
    </div>
  )
}