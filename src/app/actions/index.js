
'use server'

import { signIn, signOut } from "@/auth";
// import { useResults } from "../resultContext";
// import { useResults } from "../resultContext";

export async function doSocialLogin() {
  // const {user,setUser}=useResults()
    // const action = formData.get('action');
    // const [location, setLocation] = useState("New York");
   
    // useEffect(() => {
    //   const fetchLocation = async () => {
    //     try {
    //       const response = await axios.get('https://ipinfo.io?token=d30335213fcd76');
    //       setLocation(
    //         // ip: response.data.ip,
    //         response.data.city + " " + response.data.region + " " + response.data.country + " " + response.data.loc
    //       );
    //       setIp(response.data.ip)
    //     } catch (error) {
    //       setLocation(prevState => ({
    //         ...prevState,
    //         errorMessage: 'Error fetching IP information: ' + error.message
    //       }));
    //     }
    //   };
  
    //   fetchLocation();
    //   // console.log(location)
  
    // }, []);
   const s= await signIn("google");
  //  setUser(s)
  const backend_url = "https://api.humanrightsdossier.com"
  console.log("innn ",s)
  

   }

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}