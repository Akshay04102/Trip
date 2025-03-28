import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../service/firebaseConfig"; // Replace with the correct path to your firebase configuration
import { storeUserEmail } from "../../service/apiService"; // Importing the storeUserEmail function

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle Google Login
const handleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user info in local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Store the user's email in Firebase Realtime Database
    const email = user.email.replace(".", ",");  // Firebase uses ',' as a valid character, replace '.' with ',' if needed
    await storeUserEmail(email); // This stores the email in the backend

    // Update state and close dialog
    setUser(user);
    setOpenDialog(false);
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Clear user info from local storage
      localStorage.removeItem("user");

      // Update state
      setUser(null);
      navigate("/");
      console.log("User signed out.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Automatically check for authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <img src="/mainlogo.png" className="w-28 md:w-40" />
      </Link>
      <div>
        {user ? (
          <div className="flex justify-center items-center gap-1 md:gap-3">
            <Link to={"/create-trip"}>
              <Button variant="outline" className="rounded-full">
                Create Trips
              </Button>
            </Link>
            <Link to={"/my-trips"}>
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.photoURL || user?.picture}
                  className="rounded-full h-[35px] w-[35px]"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="w-48 hover:bg-gray-100 cursor-pointer">
                <h2
                  onClick={handleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Sign In</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/mainlogo.png" className="w-28 md:w-40" />
                  <h2 className="font-bold text-lg mt-7">
                    Sign In with Google
                  </h2>
                  <p> Sign In to the App with Google authentication </p>
                  <Button
                    className="w-full mt-5 flex items-center gap-2"
                    onClick={handleLogin}
                  >
                    <FcGoogle className="h-5 w-5" /> Sign In with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Navbar;
