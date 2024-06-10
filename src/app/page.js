"use client";
// import Image from "next/image";
import Search_content from "./search";
import { useState, useEffect } from "react";

// import AppContextProvider from "./?";
const Home=() =>{
  const [showSearchContent, setShowSearchContent] = useState(true);
  useEffect(() => {
    if (window.location.pathname === '/') {
      setShowSearchContent(true);
    } else {
      setShowSearchContent(false);
    }
  }, []);

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    // <AppContextProvider>
      <div style={{ paddingTop: '70px', marginLeft: '85px' }}>
        {showSearchContent && <Search_content />}
      </div>
      // </AppContextProvider>
    // </main>
  );
}
export default Home;