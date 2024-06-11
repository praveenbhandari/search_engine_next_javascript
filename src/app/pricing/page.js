import React from 'react';
import "../styles.css";


function Pricing() {
  return (
    <div style={{ paddingTop: '30px', paddingLeft: '20px', paddingRight: '20px', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#f8f8f8', borderRadius: '10px', padding: '20px', width: '600px' }}>
          <center>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Pricing Details</h2>
          </center>
          <p style={{ marginBottom: '20px' }}>Join our beta testing program today and get early access to the actual product launch for just $4.99 per month!</p>

          <div style={{ lineHeight: '1.6', textAlign: 'justify' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Beta Testing Subscription</h3>
            <p style={{ marginBottom: '10px' }}><strong>Price:</strong> $4.99 per month</p>
            <p style={{ marginBottom: '10px' }}><strong>Benefits:</strong></p>
            <ul style={{ marginBottom: '20px' }}>
              <li> <strong>*</strong> Early access to the actual product launch</li>
              <li> <strong>*</strong> Exclusive access to beta features and updates</li>
              <li> <strong>*</strong> Opportunity to provide feedback and shape the future of our platform</li>
            </ul>
            <p style={{ marginBottom: '20px' }}><strong>Limited Time Offer:</strong> Hurry, this special beta testing offer won&apos;t last forever! Sign up now to secure your spot and be among the first to experience our innovative platform at the official launch.</p>
            <center>
              <button style={{
                    backgroundColor:  '#0027B3' ,
                    padding: '10px',
                    color: '#f8f8f8',
                    borderRadius: '10px',
                    cursor: 'not-allowed',
                  }}>Free For Now</button>
            </center>
           </div>
        </div>
      </div>
    </div>


  );
}

export default Pricing;
