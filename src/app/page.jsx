// pages/index.js
"use client";
import Search_content from "./search";
import { useState, useEffect } from "react";
import { useResults } from "./resultContext"; // Adjust import if needed
// import { auth } from "@/auth";  // Ensure correct path to your auth file

const Home = () => {
  const { user, setUser } = useResults();
  const [showSearchContent, setShowSearchContent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        setShowSearchContent(true);
      } else {
        setShowSearchContent(false);
      }
    }
  }, []);

  // useEffect(() => {
  //   async function checkSession() {
  //     try {
  //       const session = await auth();  // Call the auth function directly
  //       if (session?.user) {
  //         setUser(session.user);  // Assuming setUser is used to set the user in context
  //       } else {
  //         console.error("Unauthorized");
  //         // Optionally, handle unauthorized access, e.g., redirect to login
  //       }
  //     } catch (error) {
  //       console.error("Failed to check session:", error);
  //       // Optionally, handle fetch error, e.g., show error message
  //     }
  //   }

  //   checkSession();
  // }, [setUser]);

  return (
    <div style={{ paddingTop: '70px', marginLeft: '85px' }}>
      {showSearchContent && <Search_content />}
    </div>
  );
}

export default Home;
