// AboutUs.js
import mumbai_maps from "../mumbai_11.png";
import Head from 'next/head';
import Image from "next/image";

const AboutUs = () => {
  return (
    <div style={{ marginTop:'70px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', padding: '20px', height: '90vh', width: '98%' }}>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Welcome to Human Rights Dossier! Learn more about us here." />
      </Head>

      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ flex: '0 0 70%', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '10px', marginRight: '20px', height: '100%' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px',fontWeight:'bold' }}>About Us</h1>
          <p>Human Rights Dossier is a cutting-edge legal research platform powered by advanced AI, large language models, and optimized search techniques. Created by a team of engineers and legal experts, our platform revolutionizes the way lawyers access and analyze legal information in the field of human rights.</p>
          <h2 style={{ marginTop:'40px',fontSize: '20px', marginBottom: '20px' }}>Our Technological Innovation</h2>
          <p>At Human Rights Dossier, we leverage the latest advancements in artificial intelligence and natural language processing to deliver a state-of-the-art legal research experience. Our proprietary algorithms enable users to conduct complex searches, analyze legal documents, and extract valuable insights with unparalleled accuracy and efficiency.</p>
        </div>

        <div style={{ flex: '0 0 30%', backgroundColor: '#f8f8f8', padding: '20px', marginRight: '20px', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '24px', marginBottom: '10px',fontWeight:'bold' }}>Contact Us</h1>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <Image src={mumbai_maps} alt="Mumbai Maps" style={{ width: '350px', height: '300px', marginRight: '20px', borderRadius: '5px' }} />
             
            </div> <div>
                <h2 style={{ fontSize: '20px', marginBottom: '5px',fontWeight:'bold',paddingTop:'30px' }}>Address</h2>
                <p>EMPIRILEX PRIVATE LIMITED, 904, C-Wing,</p>
                <p>Trace World, Kamala Mills</p>
                <p>Lower Parel, Mumbai - 400013</p>
              </div>
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '5px' ,fontWeight:'bold' }}>Email</h2>
              <p><a href="mailto:contact-us@humanrightsdossier.com">contact-us@humanrightsdossier.com</a></p>
              <h2 style={{ fontSize: '20px', marginBottom: '5px',fontWeight:'bold'  }}>Phone</h2>
              <p>+91 93203 12014</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
