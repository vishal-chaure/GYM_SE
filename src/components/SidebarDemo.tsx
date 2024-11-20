"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from "../components/ui/animated-modal";
import {
  IconBarbell,
  IconArrowLeft,
  IconArrowRight,
  IconBrandTabler,
  IconUserBolt,
  IconCreditCard,
  IconBell,
  IconHelp,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";
import DashboardContent from "./DashboardContent";
import ProfileContent from "./ProfileContent";
import PaymentContent from "./PaymentContent";
import FitnessPlansContent from "./FitnessPlansContent";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import SignUpForm from "./SignUpForm";


export function SidebarDemo() {

  

  const [open, setOpen] = useState(false);
  // const {close, setClose} = useClose();
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState('signup');
  // const session = useSession();
  // const { setOpen: setModalOpen , open: Open} = useModal();

  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  // const handleSignUp = () => {
  //   // Trigger the callback when "Sign Up" button is clicked
  //   closeModal();
  // };
  

  useEffect(() => {
    
    if (sessionStatus === "authenticated") {
      console.log("and here we go")
      toast('Logged in Successfull');
      // setClose(true);
    }

  }, [sessionStatus, router]);



  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Cast the event target to an HTMLFormElement
    const form = e.target as HTMLFormElement;
  
    // Cast each input element to HTMLInputElement
    const username = (form[0] as HTMLInputElement).value;
    const fullname = (form[1] as HTMLInputElement).value;
    const email = (form[2] as HTMLInputElement).value;
    const password = (form[3] as HTMLInputElement).value;
  
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }
  
    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }
  
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          fullname,
          email,
          password,
        }),
      });
  
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 500) {
        setError("username is already taken !");
      }
      if (res.status === 200) {
        setError("");
        toast('Registration Done. Login Again');
        setLoginStatus('login')
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };
  
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Cast the event target to an HTMLFormElement
    const form = e.target as HTMLFormElement;
  
    // Cast each input element to HTMLInputElement
    const email = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;
  
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }
  
    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }
  
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'profile':
        return <ProfileContent />;
      case 'payment':
        return <PaymentContent />;
      case 'notification':
        return <FitnessPlansContent />;
      case 'home':
        return <HeroSection />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-00 dark:bg-neutral-900 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen overflow-y-auto scrollbar-hide" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo setCurrentView={() => setCurrentView('home')} /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: "Dashboard",
                  href: "#",
                  icon: (
                    <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                  onClick: () => {
                    if (session) {
                      setCurrentView('dashboard');
                    } else {
                      toast("Login to see Your Dashboard");
                    }
                  },
                }}
              />
              
              <SidebarLink
                link={
                  {
                    label: "Profile",
                    href: "#",
                    icon: (
                      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('profile'),
                  }
                }
              />
              <SidebarLink
                link={
                  {
                    label: "Fitness Plans & Payments",
                    href: "#",
                    icon: (
                      <IconCreditCard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('payment'),
                  }
                }
              />
              <SidebarLink
                link={
                  {
                    label: "Notifications",
                    href: "#",
                    icon: (
                      <IconBell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('notification'),
                  }
                }
              />
              <SidebarLink
                link={
                  {
                    label: "Help & Support",
                    href: "#",
                    icon: (
                      <IconHelp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('help'),
                  }
                }
              />
              
              <Modal >
                {!session ? (
                  <>
                    <ModalTrigger className="text-neutral-700 dark:text-neutral-200 h-50 w-50 pl-0 mt-0 flex-shrink-0">
                      <SidebarLink link={
                        {
                          label: 'Login',
                          href: '#login',
                          icon: (
                            <IconArrowRight className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                          ),
                        }
                      } />
                    </ModalTrigger>
                  </>
                ) : (
                  <div onClick={()=>{
                    toast('Logging Out .....');
                    signOut();
                  }}>
                    <SidebarLink link={
                        {
                          label: 'Logout',
                          href: '#logout',
                          icon: (
                            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                          ),
                        }
                      } />
                  </div>
                )}
                <ModalBody >
                  <ModalContent>
                    <h4 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                      Hey, Welcome to{" "}
                      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                        Muscle Buzz Fitness
                      </span>{" "}
                      - Let&apos;s get started!
                    </h4>
                    <div className="flex justify-center items-center">

                    </div >
                    {/* Form Compo */}

                    {
                      loginStatus === 'signup'
                        ?
                        <SignUpForm 
                          handleSubmit={handleSubmit} 
                          error={error} 
                          setLoginStatus={setLoginStatus} 
                        />
                        :
                        <form className="my-2" onSubmit={handleSubmitLogin}>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" placeholder="example@gmail.com" type="email" />

                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="••••••••" type="password" />
                          </LabelInputContainer>

                          <p className="text-red-500 text-center my-2">{error && error}</p>
                          <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                          >
                            Sign in &rarr;
                            <BottomGradient />
                          </button>

                          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 my-5 h-[1px] w-full" />
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-1">
                            Are You New ?{" "}
                            <a href="#" className="text-sky-400 hover:underline" onClick={() => setLoginStatus("signup")}>
                              Sign Up Here
                            </a>
                          </p>
                        </form>
                    }
                  </ModalContent>
                </ModalBody>
              </Modal >
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Vishal Chaure",
                href: "#",
                icon: (
                  <Image
                    src="/me.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard renderContent={renderContent} />
    </div>
  );
}
interface LogoProps {
  setCurrentView: () => void;
}
export const Logo: React.FC<LogoProps> = ({ setCurrentView }) => {
  return (
    <div
      onClick={setCurrentView}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconBarbell size={25} stroke={1.5} color="white" className=" rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        MUSCLE BUZZ FITNESS
      </motion.span>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconBarbell size={25} stroke={1.5} color="white" />
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
    </Link>
  );
};



// Dummy dashboard component with content
// Define the props type for the Dashboard component
interface DashboardProps {
  renderContent: () => React.ReactNode; // Specify the type of renderContent
}

const Dashboard: React.FC<DashboardProps> = ({ renderContent }) => {
  return (
    <div className="flex flex-1">
      <div className="overflow-y-auto scrollbar-hide p-2 md:p-3  rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 flex flex-col gap-2 flex-1 w-full h-full">
        {renderContent()}
      </div>
    </div>
  );
};


// For Modal 



// For Sign In Page 

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

