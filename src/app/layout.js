"use client";
// import { Inter } from "next/font";
// import Inter
import "./globals.css";
import Header from "./header";
import { useState,useEffect } from "react";
import axios from "axios";
import  FeedbackIcon  from './feedback.png';
// const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import { ResultsProvider } from "./resultContext";
import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
// import FeedbackIcon from './feedback-icon.svg'

function RootLayout({ children }) {
  const [ip, setIp] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [feedback_data, setFeedback_data] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const backend_url = "https://api.humanrightsdossier.com";
 
  const [s_name, sets_Name] = useState('');
  const [s_email, sets_Email] = useState('');
  const [s_phone, sets_Phone] = useState('');
  const [s_location, sets_Location] = useState('location');
  const [s_user_id, setUserid] = useState();
  
  const [ results, setResults] = useState(null);
  // const location = useLocation();
  const [user, setUser]=useState(null)
  const [showSearchContent, setShowSearchContent] = useState(true);

  const [location1, setLocation] = useState("");
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      sets_Name(userData.name);
      sets_Email(userData.email);
      sets_Phone(userData.phone);
      // sets_Location(userData.location);
      setUserid(userData.user_id);
    }
  }, []);
  // useEffect(() => {
  //   // const userData = sessionStorage.getItem('user');
  //   if (user) {
  //     // setUser(JSON.parse(userData));
  //     console.log(user)
  //     sets_Name(user.name);
  //     sets_Email(user.email);
  //     sets_Phone(user.phone);
  //     // sets_Location(user.location);
  //     setUserid(user.user_id);
  //   }
  // }, []);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipinfo.io?token=d30335213fcd76');
        setLocation(
          // ip: response.data.ip,
          response.data.city + " " + response.data.region + " " + response.data.country + " " + response.data.loc
        );
        setIp(response.data.ip)
      } catch (error) {
        setLocation(prevState => ({
          ...prevState,
          errorMessage: 'Error fetching IP information: ' + error.message
        }));
      }
    };

    fetchLocation();
    // console.log(location)

  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
    if (window.location.pathname === '/') {
      setShowSearchContent(true);
    } else {
      setShowSearchContent(false);
    }}
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const feedback = async () => {
    const userData = sessionStorage.getItem('user');
    console.log("user",userData)
    console.log("user",userData["user_id"])
    console.log("user",userData["email"])
    if (userData) {
      const parsedUserData = JSON.parse(userData);

    // }
    // if(userData != null){
      console.log("user akdm",{ user_id: parsedUserData.user_id, query: feedback_data, ip: ip, location: location1 })
       await axios.post(`${backend_url}/feedback`, { user_id: parsedUserData.user_id, query: feedback_data, ip: ip, location: location1 }).then(handleFeedback);
    }
    else{
      await axios.post(`${backend_url}/feedback`, { user_id: 99999999, query: feedback_data, ip: ip, location: location1 }).then(handleFeedback);
 
    }
    };

  const handleFeedback = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsCollapsed(true); // Collapse the form after a short delay
      setIsSubmitted(false); // Reset submission status
      setFeedback_data(''); // Clear feedback data
    }, 2000); // Display message for 2 seconds
  };

  return (
    <SessionProvider session={children.session}>
    <ResultsProvider>
    <html lang="en">
    
      <body >
        <Header />
        <div style={{paddingTop:'70px'}}>

        {children}
        </div>
        <div className="feedback-wrapper">
        {isCollapsed ? (
         <div className="chatbot-icon" onClick={toggleCollapse}>
          {/* <FeedbackIcon/> */}
         <Image src={FeedbackIcon} alt="Your Image" width={30} height={30} />
       </div>
        ) : (
          <div style={{ color: '#f8f8f8', backgroundColor: "#323232", width: "100%", borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
            <div className="close-icon" style={{ padding: 5, alignContent: "start", borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }} onClick={toggleCollapse}>
              &#x2715;
            </div>
          </div>
        )}
        <div className={`card-container ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="card-body">
            <div className={`collapsible-body ${isCollapsed ? 'collapsed' : ''}`}>
              <div className="bottom-input form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter feedback..."
                  value={feedback_data}
                  onChange={(e) => setFeedback_data(e.target.value)}
                  rows="10"
                ></textarea>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <button className="btn btn-primary submit-button" onClick={feedback}>
                  Submit
                </button>
                {isSubmitted && <div className="submission-message">Thanks for submission</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      </body>
    </html>
    </ResultsProvider>
    </SessionProvider>
  );
}
export default RootLayout;