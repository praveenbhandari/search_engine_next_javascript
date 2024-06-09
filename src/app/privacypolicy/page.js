import React from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import Search_content from './search';
// import imag from './HRD.png'

import "../styles.css";
function PrivacyPolicy(
    // { user, avatarRef, toggleDropdown, toggleCollapse, feedback_data, feedback, isSubmitted, setFeedback_data, isCollapsed, dropdownOpen, searchPerformed, setSelectedYear, setSelectedCourt, setSelectedMonth, setSelectedDocumentType, setSelectedJudge, setSelectedParty, setSelectedKeyword, sortDirection, toggleAccordion, openAccordion, toggleSortDirection, isLoggedIn, results, searchQuery, handleKeyDown, handleSearch, loading, showSuggestions, modalShow, setShowSuggestions, suggestions, setSearchQuery, ClipLoader, selectedParty, uniqueParties, uniqueCourts, uniqueDocumentTypes, uniqueJudges, uniqueKeywords, uniqueMonths, uniqueYears, selectedJudge, selectedDocumentType, selectedKeyword, selectedMonth, selectedCourt, selectedYear, LoginModal, login, sortByDate, toggleSortMode, sortByCaseName, toggleSortByCaseName, groupedResults, ResultCard, keywo }
) {
    
//   const [modalShow, setModalShow] = useState(false);

// const handleModalOpen = () => setModalShow(true);
// const handleModalClose = () => setModalShow(false);

    return (

        <div style={{ paddingTop: '30px', paddingLeft: '100px', paddingRight: '100px', overflowY: 'auto', maxHeight: 'calc(120vh - 80px)' }}>
    <center>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px' }}>Privacy Policy</h2>
        </center>  
          <div style={{ backgroundColor: '#fff',height:'340px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
    
        <div style={{ lineHeight: '1.6', textAlign: 'justify' }}>
          <p style={{ marginBottom: '20px' }}>
            <strong>Information We Collect:</strong> We collect personal information and usage data to provide and improve our services.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>How We Use Your Information:</strong> We use your information to provide, maintain, and improve our services, as well as to communicate with you.
          </p>
          {/* <p style={{ marginBottom: '20px' }}>
            <strong>Information Sharing:</strong> We may share your information with third-party service providers or when required by law.
          </p> */}
          <p style={{ marginBottom: '20px' }}>
            <strong>Data Retention:</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Your Choices:</strong> You may update or delete your account information, and opt out of marketing communications.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Security:</strong> We take reasonable measures to protect your personal information, but cannot guarantee absolute security.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Children's Privacy:</strong> Our services are not intended for children under the age of 13.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>Changes to this Policy:</strong> We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </div>
        </div>
      </div>
      
    );
}

export default PrivacyPolicy;
