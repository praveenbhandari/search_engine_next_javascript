"use client";
import "./styles.css";
import React, { useState, useEffect, useContext, useCallback, useRef, Link } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import Highlighter from "react-highlight-words";
import LoginModal from "./login";
import imag from './HRD.png'
import { ClipLoader } from 'react-spinners';
import ReactGA from 'react-ga4';
ReactGA.initialize('G-CBKKVT259T');
import { FocusOn } from 'react-focus-on';
// import { ReactComponent as FeedbackIcon } from './feedback-icon.svg'; import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
// import AboutUs from "./aboutus";
// // import ContactUs from "./contact_us";
// import TermsnCondition from "./terms";
// import PrivacyPolicy from "./privacy";
// import Pricing from "./Pricing";
// import Lottie from "lottie-react";
import { ResultsContext } from "./resultContext";
import Image from 'next/image'
import nopage from "./lottie/nopg.json";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import DesktopViewPrompt from './Desktopprompt';
function Search_content(//{
  // //   searchPerformed,
  //   setSelectedYear,
  //   setSelectedCourt,
  //   setSelectedMonth,
  //   setSelectedDocumentType,
  //   setSelectedJudge,
  //   setSelectedParty,
  //   setSelectedKeyword, 
  //   sortDirection,
  //   toggleAccordion,
  //   openAccordion,
  //   toggleSortDirection,
  //   isLoggedIn,
  //   results,
  //   searchQuery,
  //   handleKeyDown,
  //   handleSearch,
  //   loading,
  //   showSuggestions,
  //   modalShow,
  //   setShowSuggestions,
  //   suggestions,
  //   setSearchQuery,
  //   // ClipLoader,
  //   selectedParty,
  //   uniqueParties,
  //   uniqueCourts,
  //   uniqueDocumentTypes,
  //   uniqueJudges,
  //   uniqueKeywords,
  //   uniqueMonths,
  //   uniqueYears,
  //   selectedJudge,
  //   selectedDocumentType,
  //   selectedKeyword,
  //   selectedMonth,
  //   selectedCourt,
  //   selectedYear,
  //   // LoginModal,
  //   login,
  //   sortByDate,
  //   toggleSortMode,
  //   sortByCaseName,
  //   toggleSortByCaseName,
  //   groupedResults,
  //   ResultCard,
  //   keywo 
  // }
) {
  //   const [results, setResults] = useState(null);

  //   const [isLoggedIn, setIsLoggedIn] = useState(true);
  // // v
  // const [searchQuery, setSearchQuery] = useState(null);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    // Retrieve searchCount from localStorage on component mount
    const storedSearchCount = localStorage.getItem('searchCount');
    if (storedSearchCount !== null) {
      setSearchCount(parseInt(storedSearchCount, 10));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever searchCount changes
    localStorage.setItem('searchCount', searchCount);
  }, [searchCount]);

  function formatDate(dateString) {
    if (!dateString || isNaN(Date.parse(dateString))) {
      return dateString;
    }

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }


  // const [keywo, setkeywo] = useState(null);
  function ResultCard({ item, searchWords, scores, sortByCaseName }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [is1ModalOpen, set1ModalOpen] = useState(false);
    const [data, setData] = useState("");
    // const [words, setData] = useState("");
    // console.log(item)

    const { metadata } = item[1];
    // console.log(metadata)
    const { page_content } = item[1];
    // console.log(metadata)
    const score = item[0];
    // console.log("Score:", score);
    const [selectedReference, setSelectedReference] = useState('');
    // console.log("**********");
    // console.log(metadata);
    const partiesInvolved = Array.isArray(metadata["Parties Involved"])
      ? metadata["Parties Involved"].join(" vs. ")
      : metadata["Parties Involved"];
    // console.log(searchWords)

    const handleChange = (event) => {

      const url = event.target.value;
      const get = backend_url + `/get_index/${url}`
      // const get = `https://search-engine.lawyantra.com/get_index/${url}`


      // console.log(url)
      // console.log(get)
      // useEffect(() => {
      // Replace 'your-api-url' with the actual API URL you want to call
      axios.get(get)
        .then((response) => {
          setData(response.data);
          set1ModalOpen(true)
          // console.log(response.data)
        })
      // .catch((error) => {
      // setError(error); // Handle error
      // })
      // .finally(() => {
      // setLoading(false); // Always executed
      // });
      // }, []); 

      // setSelectedReference(url);
      // if (url) {
      // // Open the selected reference in a new tab
      // window.open(url, '_blank', 'noopener,noreferrer');
      // }
    };


    // function highlightText(text, wordsToHighlight) {
    // const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
    // const parts = text.split(regex);

    // return parts.map((part, i) => 
    // wordsToHighlight.includes(part.toLowerCase()) ? 
    // <span key={i} style={{ backgroundColor: 'yellow' }}>{part}</span> : 
    // part
    // );
    // }
    // console.log(score)
    // console.log(searchWords)
    // const searchRegex = new RegExp("\\b(" + searchWords.join("|") + ")\\b", "gi");
    const searchRegexes = searchWords.map(word => new RegExp(`\\b${word}\\b`, "gi"));
    // console.log(searchRegexes)
    const [firstword, ...others] = searchRegexes;
    // Check if both case summary and document summary are "Not found"
    if (metadata["Case Summary"] === "Not found" && metadata["Document Summary"] === "Not found") {
      return null; // Don't render the card
    }


    return (
      <div className="result-card">
        {sortByCaseName ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <strong><h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3></strong>
              {
                metadata["Date"] && metadata["Date"].trim() !== "" && ( // Check if Date is not empty or null
                  <p>
                    <strong>Date:</strong> {formatDate(metadata["Date"])}
                  </p>
                )
              }
            </div>

            {/* {
 (!metadata["Date"] || metadata["Date"].trim() === "") ? ( // Check if Date is null or empty
 <p>
 <strong>Date:</strong> {formatDate(metadata["Document Date"])}
 </p>
 ) : (
 <p>
 <strong>Date:</strong> {formatDate(metadata["Date"])}
 </p>
 )
 } */}
            {metadata["Parties Involved"] &&
              metadata["Parties Involved"].map((keyword) => (
                keyword === "" ? (
                  <p key={keyword.id}>
                    <div className="result-content"><strong>Parties Involved:</strong> {keyword.name}</div>
                  </p>
                ) : null
              ))}

            {
              metadata["CourtName"] === "" ? <></> :
                <p>
                  <strong>Court:</strong> {metadata["Court Name"]}
                </p>
            }

            {/* {metadata["Document Type"] &&
 metadata["Document Type"].map((keyword, index) => (
 keyword === "" ? <p>
 <strong>Document Type:</strong> {keyword}
 </p> : <></>
 ))} */}
            {/* {
 metadata["Case Summary"] === "Not found" ? (
 <div>
 <Highlighter
 highlightClassName="highlighted-text"
 searchWords={searchRegexes}
 textToHighlight={String(metadata["Document Summary"])}
 />
 </div>
 ) : (
 <Highlighter
 highlightClassName="highlighted-text"
 searchWords={searchRegexes}
 textToHighlight={String(metadata["Case Summary"])}
 />
 )
 } */}
            {
              ["Not found", "Not mentioned", "Not provided"].includes(metadata["Case Summary"]) ? (
                <div>
                  <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    textToHighlight={String(metadata["Document Summary"])}
                  />
                </div>
              ) : (
                <Highlighter
                  highlightClassName="highlighted-text"
                  searchWords={searchRegexes}
                  textToHighlight={String(metadata["Case Summary"])}
                />
              )
            }
            <br />
            {metadata["case_url"] && (
              <div style={{ display: 'flex' }}>
                <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                  <button style={{ width: '100%', textAlign: 'left' }}>
                    <strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong>
                  </button>
                </a>
              </div>
            )}
            {metadata["pdf_url"] && (
              <div style={{ display: "inline-flex" }}>
                <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                  <button style={{ width: '100%', textAlign: 'left' }}>
                    <strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong>
                  </button>
                </a>
              </div>
            )}
            {metadata["url"] && (
              <div style={{ display: "inline-flex" }}>
                <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                  <button style={{ width: '100%', textAlign: 'left' }}>
                    <strong>URL: {metadata["url"].substring(0, 100)}</strong>
                  </button>
                </a>
              </div>
            )}

            {/* 
          {metadata.Keywords && Array.isArray(metadata.Keywords) && metadata.Keywords.length > 0 && (
            <div className="keywords-container">
              {metadata.Keywords.map((keyword, index) => (
                keyword === "" ? null : (
                  <button
                    key={index}
                    className="keyword-button"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword}
                  </button>
                )
              ))}
            </div>
          )}

          <button onClick={() => setModalOpen(true)} className="view-document">
            View Summary
          </button> */}
            {isModalOpen && (
              <DocumentModal
                content={
                  <>
                    {{ 'page': page_content, 'meta': metadata }}
                    {/* <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    // autoEscape={true}
                    textToHighlight={page_content + "\n\nDocument Type: " + metadata["Document Type"] + "\n\nJudges Involved: " + metadata["Judges"] + "\n\nKeywords: " + metadata["keywords"] + "\n\nPDF URL: " + metadata["pdf_url"] + "\n\nCase URL: " + metadata["case_url"]}
                  // textToHighlight={Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
                  /> */}
                    {/* <div>
                    {metadata.reference && metadata.reference.length > 0 && (
                      <select onChange={handleChange} value={selectedReference}>
                        <option value="">Select a reference</option>
                        {metadata.reference.map((referenceItem, index) => (
                          <option key={index} value={referenceItem}>
                            {referenceItem}
                          </option>
                        ))}
                      </select>
                    )}
                  </div> */}
                  </>
                }
                onClose={() => setModalOpen(false)}
              />
            )}
            {is1ModalOpen && (

              <DocumentModal
                content={
                  <>
                    {data.context}
                    {/* <br /><br />
                  <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>URL: {metadata["url"].substring(0, 100)}</strong></button></a>
                  <br /> */}

                  </>
                }
                onClose={() => set1ModalOpen(false)}
              />
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3>
              {/* <h4 style={{ margin: 0 }}>{score.includes("Relevant") ? "Relevant" : score + "%"}</h4> */}
              {
                metadata["Date"] && metadata["Date"].trim() !== "" && ( // Check if Date is not empty or null
                  <h4 style={{ margin: 0, marginTop: 0, paddingBottom: '15px' }}>
                    <center> <strong>Date:</strong> {formatDate(metadata["Date"])}</center>
                  </h4>
                )
              }
            </div>

            {

              Array.isArray(metadata["Parties Involved"]) && metadata["Parties Involved"].length > 0 && (
                <div className="result-content">
                  <strong>Parties Involved:</strong> {metadata["Parties Involved"].filter(keyword => keyword.trim() !== "").join(", ")}
                </div>

              )

            }


            {

              metadata["CourtName"] === "" ? <></> :
                <p>
                  <div className="result-content">   <strong>Court:</strong> {metadata["Court Name"]}</div>
                </p>}


            {/* {metadata["Document Type"] &&
            metadata["Document Type"].map((keyword, index) => (
            keyword === "" ? <p>
            <strong>Document Type:</strong> {keyword}
            </p> : <></>
            ))} */
            }
            {
              <div className="result-content">
                <strong> Short Summary:</strong>
                {["Not found", "Not mentioned", "Not provided"].includes(metadata["Case Summary"]) ? (
                  <div>
                    <Highlighter
                      highlightClassName="highlighted-text"
                      searchWords={searchRegexes}
                      textToHighlight={String(metadata["Document Summary"])}
                    />
                  </div>
                ) : (
                  <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    textToHighlight={String(metadata["Case Summary"])}
                  />
                )}</div>
            }
            {/* <br /> */}
            {metadata["case_url"] && (
              <div style={{ display: 'flex' }}>
                <a href={metadata["case_url"]} target="_blank" style={{ background: "#ffff", color: "blue", textDecoration: "underline" }}>
                  <button
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      userSelect: 'none', /* Prevent text selection */
                      MozUserSelect: 'none',
                      WebkitUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      setModalOpen(true)// Call your custom function
                    }}
                  >
                    <strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong>
                  </button>
                </a>
              </div>

            )}
            {metadata["pdf_url"] && (
              <div style={{ display: "inline-flex" }}>
                <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                  <button
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      userSelect: 'none', /* Prevent text selection */
                      MozUserSelect: 'none',
                      WebkitUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  >
                    <strong>PDF URL: {metadata["pdf_url"].substring(0, 100)}</strong>
                  </button>
                </a>
              </div>

            )}
            {metadata["url"] && (
              <div style={{ display: "inline-flex" }}>
                <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                  <button style={{ width: '100%', textAlign: 'left' }}>
                    <strong>URL: {metadata["url"].substring(0, 100)}</strong>
                  </button>
                </a>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <div className="keywords-container" style={{ flexWrap: 'wrap', maxWidth: '80%' }}>
                {metadata.Keywords && Array.isArray(metadata.Keywords) && metadata.Keywords.length > 0 && (
                  metadata.Keywords.map((keyword, index) => (
                    keyword === "" ? null : (
                      <button
                        key={index}
                        className="keyword-button"
                        onClick={() => handleKeywordClick(keyword)}
                      >
                        {/* {keyword} */}
                        <Highlighter
                          highlightClassName="highlighted-text"
                          searchWords={[firstword]}
                          textToHighlight={keyword}
                        />
                      </button>
                    )
                  ))

                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', height: '40px' }}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="view-document"
                  style={{
                    height: '100%',
                    fontSize: '16px', // Adjust the font size as needed
                    lineHeight: '40px', // Match the height of the container
                    padding: '0 16px', // Add horizontal padding as needed
                  }}
                >
                  Continue Reading
                </button>
              </div>
            </div>
            {isModalOpen && (
              <DocumentModal
                content={
                  <>
                    {{ 'page': page_content, 'meta': metadata }}
                    {/* <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    // autoEscape={true}
                    textToHighlight= {{ 'page': page_content, 'meta': metadata }}
                    // textToHighlight={page_content + "\n\nDocument Type: " + metadata["Document Type"] + "\n\nJudges Involved: " + metadata["Judges"] + "\n\nKeywords: " + metadata["keywords"]}
                  // textToHighlight={Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
                  /> */}
                    {/* <div>
                    {metadata.reference && metadata.reference.length > 0 && (
                      <select onChange={handleChange} value={selectedReference}>
                        <option value="">Select a reference</option>
                        {metadata.reference.map((referenceItem, index) => (
                          <option key={index} value={referenceItem}>
                            {referenceItem}
                          </option>
                        ))}
                      </select>
                    )}
                  </div> */}
                  </>
                }
                onClose={() => setModalOpen(false)}
              />
            )}
            {is1ModalOpen && (

              <DocumentModal
                content={
                  <>
                    {data.context}
                    {/* <br /><br />
                  <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>URL: {metadata["url"].substring(0, 100)}</strong></button></a>
                  <br /> */}

                  </>
                }
                onClose={() => set1ModalOpen(false)}
              />
            )}
          </>
        )}




      </div>


    );

  }


  function handleKeywordClick(keyword) {
    // console.log("Keyword clicked:", keyword);
    const newReference = event.target.value;
    setSelectedReference(newReference); // Update the selected reference state
    handleKeywordClick(newReference); // Trigger the desired action with the new reference

    // Add your logic here for what happens when a keyword is clicked
  }

  function DocumentModal({ content, onClose }) {
    let parsedData, parsedMeta;
    // const content1='{\"Court/Tribunal\": \"International Court of Justice (ICJ)\", \"Judges Involved\": \"President Manfred LACHS, Registrar S. AQUARONE\", \"Legal Principles\": \"Article 48 of the Statute of the Court, Article 40 of the Rules of Court\", \"Full Case Overview\": \"- In May 1973, Pakistan instituted proceedings against India concerning 195 Pakistani prisoners of war whom, according to Pakistan, India proposed to hand over to Bangladesh, which was said to intend trying them for acts of genocide and crimes against humanity. India stated that there was no legal basis for the Court\'s jurisdiction in the matter and that Pakistan\'s Application was without legal effect. Pakistan having also filed a Request for the indication of provisional measures, the Court held public sittings to hear observations on this subject; India was not represented at the hearings. In July 1973, Pakistan asked the Court to postpone further consideration of its Request in order to facilitate the negotiations which were due to begin. Before any written pleadings had been filed, Pakistan informed the Court that negotiations had taken place, and requested the Court to record discontinuance of the proceedings. Accordingly, the case was removed from the List by an Order of 15 December 1973.\", \"Case Summary\": \"- Introduction: The ICJ issued an order regarding the trial of Pakistani prisoners of war in a case between Pakistan and India.\\n- Laws: The order extended the time limits for filing memorials by both governments.\\n-\", \"Conclusion\": \"The subsequent procedure was reserved for further decision.\", \"Document Summary\": \"The ICJ issued an order on 29 September 1973 in the case concerning the trial of Pakistani prisoners of war between Pakistan and India, extending filing deadlines for memorials.\", \"Decision\": \"The Court extended the time limits for filing memorials by the governments of Pakistan and India.\\nConclusion: The ICJ granted an extension for filing memorials in the case between Pakistan and India regarding the trial of Pakistani prisoners of war.\", \"Document Type\": \"Press Release (Unofficial)\", \"Date\": \"29 September 1973\", \"Case No.\": \"Not Found\", \"History of Proceedings\": \"The ICJ extended the filing deadlines for memorials by the governments of Pakistan and India in the case concerning the trial of Pakistani prisoners of war.\", \"Coram Composition\": \"President Manfred LACHS, Registrar S. AQUARONE\", \"Citation\": \"Trial of Pakistani Prisoners of War, Order of 29 September 1973, Z.C.J. Reports 1973, p. 344.\", \"Document type\": \"Summary of Judgement- Unofficial\", \"Document No.\": \"Summary 1973/1\", \"Keywords\": \"International Court of Justice, Pakistani prisoners of war, filing deadlines, memorials\", \"Case Details\": \"- Introduction\\n    A. Factual background: The ICJ issued an order regarding the trial of Pakistani prisoners of war in a case between Pakistan and India.\\n    B. The court\'s appellate function and the scope of the right of appeal to the court: Not Found\\n- Grounds of Appeal\\n    A. The second ground of appeal: rejection by the ICAO Council of the first preliminary objection.\\n        1. Whether the dispute between the Parties relates to the interpretation or application of the IASTA: Not Found\", \"Separate Opinion of Judge\": \"Not Found\", \"Articles Involved\": \"Article 48 of the Statute of the Court, Article 40 of the Rules of Court\"}'

    console.log(content)
    try {
      parsedData = JSON.parse(content.props.children.page);

      console.log("parsee....", parsedData)
      parsedMeta = content.props.children.meta;

      // console.log(parsedMeta)
      // console.log("resss ... : ", parsedData)
    } catch (error) {
      console.error('Error parsing JSON:', error);
      parsedData = { error: 'Invalid JSON' };
    }

    const formatValue = (value) => {
      if (typeof value === 'string') {
        return value.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      }
      return JSON.stringify(value, null, 4);
    };
    const [expanded, setExpanded] = useState(false);

    // const handleScroll = (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    // };

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      if (document && document.addEventListener) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (document && document.removeEventListener) {
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, [onClose]);

    return (
      <div className="modal-backdrop">
        <FocusOn enabled={true}>
          <div className="modal-content">
            <button onClick={onClose} className="close-modal">
              Close
            </button>
            <div className="summary-header">
              <strong>Summary</strong>
            </div>
            <div className="modal-body">
              {Object.keys(parsedData).map((key) => (
                <div key={key} className="key-value-pair">
                  <div className="key" style={{ fontWeight: 'bold' }}>{key}:</div>
                  <div className="value">
                    {/* {key === 'Full Case Overview' && !expanded ? (
                    <button onClick={() => setExpanded(true)}>Expand</button>
                  ) : ( */}
                    <span>{formatValue(parsedData[key])}</span>
                    {/* )} */}
                  </div>
                </div>
              ))}
              {expanded && (
                <button onClick={() => setExpanded(false)}>Collapse</button>
              )}
              <div className="meta-section">
                {parsedMeta.case_url && (
                  <div className="key-value-pair">
                    <div className="key" style={{ fontWeight: 'bold' }}>Case URL:</div>
                    <div className="value"><a href={parsedMeta.case_url} target="_blank" rel="noopener noreferrer">{parsedMeta.case_url}</a></div>
                  </div>
                )}
                {parsedMeta.pdf_url && (
                  <div className="key-value-pair">
                    <div className="key" style={{ fontWeight: 'bold' }}>PDF URL:</div>
                    <div className="value"><a href={parsedMeta.pdf_url} target="_blank" rel="noopener noreferrer">{parsedMeta.pdf_url}</a></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FocusOn>
      </div>

    );
  }

  // DocumentModal.propTypes = {
  //   content: PropTypes.string.isRequired,
  //   onClose: PropTypes.func.isRequired,
  // };

  ResultCard.propTypes = {
    item: PropTypes.shape({
      page_content: PropTypes.string.isRequired,
      metadata: PropTypes.shape({
        Date: PropTypes.string,
        "Parties Involved": PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string),
        ]),
        "Case Name": PropTypes.string,
        "Court Name": PropTypes.string,
        "Document Type": PropTypes.string,
        "Case Summary": PropTypes.string,
        // "scores": PropTypes.string,
        Keywords: PropTypes.arrayOf(PropTypes.string), // Add this line
      }).isRequired,
    }).isRequired,

    // searchWords: PropTypes.shape({
    // Keywords: PropTypes.arrayOf(PropTypes.string), 
    // })
  };
  const [searchQuery, setSearchQuery] = useState('');
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState({
  // icj: false,
  // un: false,
  // hudoc: false,
  // });
  // const [yearFilter, setYearFilter] = useState("all");
  const [uniqueKeywords, setUniqueKeywords] = useState([]);

  const [keywo, setkeywo] = useState("null");
  // console.log(uniqueKeywords);

  // const [selectedKeywords, setSelectedKeywords] = useState(new Set());
  // const [results, setResults] = useState(null);
  const [originalResults, setOriginalResults] = useState(null); // Store the original results
  const [loading, setLoading] = useState();
  // const [score1, setScores] = useState(0);

  // const [inputValue, setInputValue] = useState('');
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [ipp, setIP] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [uniqueParties, setUniqueParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);

  const [uniqueCourts, setUniqueCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  const [uniqueJudges, setUniqueJudges] = useState([]);
  const [selectedJudge, setSelectedJudge] = useState(null);

  const [uniqueDocumentTypes, setUniqueDocumentTypes] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);


  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [sortByDate, setSortByDate] = useState(false); // State to track sorting mode
  const [groupedResults, setGroupedResults] = useState(null); // State to store grouped results

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [group, setGroup] = useState(null);
  const [gbyScore, setgbyscore] = useState(null);
  const [sortByCaseName, setSortByCaseName] = useState(false);

  const [sortDirection, setSortDirection] = useState("newer"); // Default to newer

  // const [searchCount, setSearchCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [location, setLocation] = useState("");
  const [ip, setIp] = useState("");

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [user, setUser] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [s_name, sets_Name] = useState('');
  const [s_email, sets_Email] = useState('');
  const [s_phone, sets_Phone] = useState('');
  const [s_location, sets_Location] = useState('location');
  const [s_user_id, setUserid] = useState();
  const [feedback_data, setFeedback_data] = useState(null);
  // const { results, setResults,user, setUser } = useContext(ResultsContext);

  const [results, setResults] = useState(null);
  // const { user, setUser } = useState(null);

  const handleModalOpen = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  // const backend_url = "http://127.0.0.1:8000"
  const backend_url = "https://api.humanrightsdossier.com"


  //   const handleModalOpen = () => {
  //     setModalShow(true);
  //     document.body.classList.add('modal-open'); // Add the class to body
  // };

  // // Function to close the modal and re-enable background interaction
  // const handleModalClose = () => {
  //     // setModalShow(false);
  //     document.body.classList.remove('modal-open'); // Remove the class from body
  // };
  // function check(val){
  // if (val !== selectedDocumentType) {
  // const filteredVal = val.filter(item => item !== " ");

  // setSelectedDocumentType(filteredVal);
  // }

  // }

  // setShowLoginModal(true);
  // useEffect hook for sorting and filtering

  // const getData = async () => {
  //   const res = await axios.get("https://api.ipify.org/?format=json");
  //   console.log(res.data);
  //   setIP(res.data.ip);
  // };


  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setModalShow(false)
      setUser(JSON.parse(userData));
      // if (userData) {
      sets_Name(userData.name)
      sets_Email(userData.email)
      sets_Phone(userData.phone)
      sets_Location(userData.location)
      setUserid(userData.user_id)
      // console.log(s_user_id, s_name, s_email, s_phone, s_location);
    }
    // setUser()
    // }
  }, []);

  const login = (userData) => {
    // sessionStorage.setItem('user', JSON.stringify(userData));
    // const login = (userData) => {
    console.log("dfghjkjhgfgdx : ", userData)
    sessionStorage.setItem('user', JSON.stringify(userData));
    ReactGA.event({
      category: 'User',
      action: 'User login'
    });
    // setUser(userData);

    setUser(userData);
    // 
    if (userData) {
      sets_Name(userData.name)
      sets_Email(userData.email)
      sets_Phone(userData.phone)
      sets_Location(userData.location)
      setUserid(userData.user_id)
      // setUserid(user.user_id)
      console.log(s_user_id, s_name, s_email, s_phone, s_location);
    }
    handleModalClose();
  };

  // const logoutUser = () => {
  //   sessionStorage.clear();
  //   setUser(null);
  //   setResults(null)
  //   // extractUniqueMonths(null);
  //   // extractUniqueYears(null);
  //   // extractUniqueCourts(null);
  //   // extractUniqueParties(null);
  //   // extractUniqueJudges(null);
  //   // extractUniqueDocumentTypes(null);
  //   // extractUniqueKeywords(null);
  //   ReactGA.event({
  //     category: 'User',
  //     action: 'User Logged out'
  //   });
  //   // setModalShow(true)
  //   // setUser(true)
  // };
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

    const user = JSON.parse(sessionStorage.getItem('user'));
    // console.log("usseerrrr: ", user);
    if (user) {
      sets_Name(user.name)
      sets_Email(user.email)
      sets_Phone(user.phone)
      sets_Location(user.location)
      setUserid(user.user_id)
      // console.log(s_user_id, s_name, s_email, s_phone, s_location);
    }
  }, []);


  useEffect(() => {

    // setShowLoginModal(true);
    if (originalResults) {
      const filteredResults = originalResults.filter(
        (item) =>
          (!selectedMonth || new Date(item[1].metadata.Date).toLocaleString('default', { month: 'long' }) === selectedMonth) &&
          (!selectedYear || item[1].metadata.Date.includes(selectedYear)) &&
          (!selectedParty || (item[1].metadata["Parties Involved"] && item[1].metadata["Parties Involved"].includes(selectedParty))) &&
          (!selectedCourt || (item[1].metadata["Court Name"] && item[1].metadata["Court Name"] === selectedCourt)) &&
          (!selectedJudge || item[1].metadata["Judges"] && item[1].metadata["Judges"].includes(selectedJudge)) &&
          (!selectedDocumentType || (item[1].metadata["Document Type"]) && item[1].metadata["Document Type"].includes(selectedDocumentType)) &&
          (!selectedKeyword || (item[1].metadata.Keywords && item[1].metadata.Keywords.includes(selectedKeyword)))
      );

      filteredResults.sort((a, b) => {
        const caseNameA = a[1].metadata["Case Name"] || '';
        const caseNameB = b[1].metadata["Case Name"] || '';

        if (sortByCaseName) {
          // Sort primarily by case name
          const countA = filteredResults.filter(item => item[1].metadata["Case Name"] === caseNameA).length;
          const countB = filteredResults.filter(item => item[1].metadata["Case Name"] === caseNameB).length;

          // If the counts are different, sort by count
          if (countA !== countB) {
            return countB - countA; // Descending order based on count
          }

          // If counts are the same, sort by case name
          return caseNameA.localeCompare(caseNameB);
        } else if (sortByDate) {
          // Sort by date based on sortDirection
          const dateA = new Date(a[1].metadata.Date);
          const dateB = new Date(b[1].metadata.Date);
          const sortFactor = sortDirection === "newer" ? -1 : 1; // Adjusts the sorting order based on the selected direction
          return sortFactor * (dateB - dateA);
        } else {
          // Sort by score if sortByDate and sortByCaseName are both false
          return Math.floor(b[0]) - Math.floor(a[0]);
        }
      });

      setResults(filteredResults);

      if (group) {
        const grouped = {};
        filteredResults.forEach((result) => {
          const score = Math.floor(result[0]);
          if (!grouped[score]) {
            grouped[score] = [];
          }
          grouped[score].push(result);
        });
        setGroupedResults(grouped);
      } else {
        setGroupedResults(null);
      }
    }
  }, [originalResults, selectedMonth, selectedYear, selectedParty, selectedCourt, selectedJudge, selectedDocumentType, selectedKeyword, sortByDate, sortByCaseName, group, sortDirection]);


  // useEffect(() => {

  // }, []);
  // Function to toggle sorting mode

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsVisible(true);  // Show prompt on mobile devices
      } else {
        setIsVisible(false);  // Hide prompt on desktops
      }
    };

    // Call the function on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (results && results.length > 0) {
      const allCaseNames = results.map(item => item[1].metadata["Case Name"] || "Not Available");
      setOpenAccordion(allCaseNames);
    }
  }, [results]);
  const toggleSortMode = () => {
    // If Group toggle is active, deactivate it
    if (group) {
      setGroup(false);
    }
    setSortByDate((prev) => !prev);
    // Reset the sort direction when toggling the sort mode
    setSortDirection("newer"); // Set the default sort direction
  };
  const TextFormatter = ({ text }) => {
    const formatText = (text) => {
      return text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
        if (index % 2 === 0) {
          return part.split('\n').map((line, index) => <span key={index}>{line}<br /></span>);
        } else {
          return <strong key={index}>{part}</strong>;
        }
      });
    };

    return <div>{formatText(text)}</div>;
  };
  const togglegroupedMode = () => {
    setgroup((prev) => !prev);
    // If sortByDate toggle is active, deactivate it
    if (sortByDate) {
      setSortByDate(false);
    }
    // If sortByCaseName toggle is active, deactivate it
    else if (sortByCaseName) {
      setSortByCaseName(false);
    }
    setGroup((prev) => !prev);
  };
  const togglegroupedscoreMode = () => {
    setg((prev) => !prev);
  }
  const toggleSortByCaseName = () => {
    // If Group toggle is active, deactivate it
    if (group) {
      setGroup(false);
    }
    setSortByCaseName((prev) => !prev);
    setGroupedResults(null);
    // console.log("asasasasa",results)
    // results.forEach((item)=>{console.log("qwqw",item[1].metadata["Case Name"])})
  };

  const [openAccordion, setOpenAccordion] = useState([]);

  const toggleAccordion = (caseName) => {
    if (openAccordion.includes(caseName)) {
      setOpenAccordion(openAccordion.filter((item) => item !== caseName));
    } else {
      setOpenAccordion([...openAccordion, caseName]);
    }
  };

  // Modify the sorting logic based on the selected sort direction
  const sortDirectionFactor = sortDirection === "newer" ? 1 : -1; // Adjusts the sorting order based on the selected direction

  // Add a function to toggle the sort direction
  const toggleSortDirection = () => {
    setSortByDate(true)
    setSortDirection(sortDirection === "newer" ? "older" : "newer");
  };

  // initialize maximum free searches
  // const MAX_FREE_SEARCHES = 5;

  const handleClick = () => {

    setSearchCount(searchCount + 1);
    console.log("click", searchCount)
  };
  const handleSearch = async () => {

    if (searchCount > 2) {
      if(!user){
      toast.warn(`Please Signup for more searches`, { // Display a notification with the updated search count
        position: "top-center",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
    }
      if (user == null) {
        setModalShow(true)

      }
      // else if (user != null) {
        else{
      setLoading(true);
      try {
        // const response = await axios.post('http://3.108.219.46/search', {
        console.log({ user_id: s_user_id, query: searchQuery, ip: ip, location: location })
        const response = await axios.post(backend_url + '/search', { user_id: s_user_id, query: searchQuery, ip: ip, location: location });
        // const quer = await axios.post(backend_url+'/add_query', {query: searchQuery, ip:ipp});
        setLoading(true);
        setSearchPerformed(true)
        // s
        ReactGA.event({
          category: 'User',
          action: 'searched for ' + searchQuery
        });
        // console.log("session :", s_name, s_email, s_phone, s_location);
        // console.log(response.data);
        // console.log("---------------------------");
        setResults(response.data[0]);
        setOriginalResults(response.data[0]); // Store the original results
        setkeywo(response.data[1]);
        if (results) {
          extractUniqueMonths(results);
          extractUniqueYears(results);
          extractUniqueCourts(results);
          extractUniqueParties(results);
          extractUniqueJudges(results);
          extractUniqueDocumentTypes(results);
          extractUniqueKeywords(results);

        }

      } catch (error) {
        setResults(null);
        setOriginalResults(null); // Reset original results
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Stop loading
      }
      }
    }
    if (searchCount < 2) {
      
      setLoading(true);
      try {
        // const response = await axios.post('http://3.108.219.46/search', {
        console.log({ user_id: "9999999", query: searchQuery, ip: ip, location: location })
        const response = await axios.post(backend_url + '/search', { user_id: "9999999", query: searchQuery, ip: ip, location: location });
        // const quer = await axios.post(backend_url+'/add_query', {query: searchQuery, ip:ipp});
        setLoading(true);
        setSearchPerformed(true)
        // s
        ReactGA.event({
          category: 'User',
          action: 'searched for ' + searchQuery
        });
        // console.log("session :", s_name, s_email, s_phone, s_location);
        // console.log(response.data);
        // console.log("---------------------------");
        setResults(response.data[0]);
        setOriginalResults(response.data[0]); // Store the original results
        setkeywo(response.data[1]);
        if (results) {
          extractUniqueMonths(results);
          extractUniqueYears(results);
          extractUniqueCourts(results);
          extractUniqueParties(results);
          extractUniqueJudges(results);
          extractUniqueDocumentTypes(results);
          extractUniqueKeywords(results);

        }
        // toast.warn(`Free Searches: ${2-searchCount + 1}`, { // Display a notification with the updated search count
        //   position: "bottom-left",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
      } catch (error) {
        setResults(null);
        setOriginalResults(null); // Reset original results
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
    handleClick()
  };

  // const handleLoginSuccess = () => {
  //   // Reset the search count after successful login
  //   setSearchCount(0);

  //   // Close the login modal
  //   setShowLoginModal(false);
  // };
  // useEffect(()=>{
  // if (results){
  // extractUniqueMonths(results);
  // extractUniqueYears(results);
  // extractUniqueCourts(results);
  // extractUniqueParties(results);
  // extractUniqueJudges(results);
  // extractUniqueDocumentTypes(results);
  // extractUniqueKeywords(results);
  // }
  // }, []);

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  // const extractFilterValues = (results) => {
  // const dates = new Set(results.map((item) => item.Date));
  // setUniqueDates([...dates]);
  // const years = new Set(results.map((item) => item.Date.split('-')[0]));
  // // console.log(years)
  // setUniqueYears([...years]);

  // const parties = new Set(
  // results.flatMap((item) => item["Parties Involved"] || [])
  // );
  // setUniqueParties([...parties]);
  // const keywords = new Set(
  // results.flatMap((item) => item.Keywords || [])
  // );
  // setUniqueKeywords([...keywords]);
  // // ...Similarly extract values for other filters...
  // };

  // Fetch suggestions from the server

  function debounce(func, timeout = 10) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const fetchSuggestions = useCallback((query) => {
    // Perform the fetch operation
    fetch(backend_url + '/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then(response => response.json())
      .then(data => {
        // Assume the server response has a structure similar to the provided JSON and contains an array of suggestions
        // console.log(data);
        setSuggestions(data.next_words); // Update the state with the fetched suggestions
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // Debounced version of fetchSuggestions
  // const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 10), []);

  // useEffect(() => {
  //   if (searchQuery.length > 2) {
  //     debouncedFetchSuggestions(searchQuery);
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [searchQuery, debouncedFetchSuggestions]);

  const extractUniqueMonths = (results) => {
    const months = new Set();
    results.forEach((item) => {
      let dateString = item[1].metadata["Date"]; // Initialize dateString with metadata["Date"]
      if (!dateString || dateString.trim() === "") { // If metadata["Date"] is null or empty
        dateString = item[1].metadata["Document Date"]; // Use metadata["Document Date"] instead
      }
      if (dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        months.add(month);
      }
    });
    // console.log(months)
    setUniqueMonths([...months]);
  };

  const extractUniqueYears = (results) => {
    const years = new Set(results.map((item) => {
      const date = new Date(item[1].metadata.Date);
      return date.getFullYear();
    })
      .filter(year => !isNaN(year))
    );

    // console.log(years)
    setUniqueYears([...years]);
  };

  const extractUniqueCourts = () => {
    const courts = new Set(results.map((item) => item[1].metadata["Court Name"])
      .filter(court => court !== "")
    );

    // console.log(courts)
    setUniqueCourts([...courts]);
  };

  const extractUniqueParties = () => {
    const parties = new Set(results.flatMap((item) => item[1].metadata["Parties Involved"] || [])
      .filter(party => party !== "")
    );

    // console.log(parties)
    setUniqueParties(Array.from(parties));
  };


  const extractUniqueJudges = () => {
    const judges = new Set(results.map((item) => item[1].metadata["Judges"]).flat());

    // console.log(judges)
    setUniqueJudges(Array.from(judges));
  };

  // Fetch unique document types
  // const extractUniqueDocumentTypes = () => {
  //   const documentTypes = new Set(results
  //     .filter(item => Array.isArray(item[1].metadata["Document Type"]) && item[1].metadata["Document Type"].length > 0)
  //     .flatMap(item => item[1].metadata["Document Type"])
  //     .filter(type => typeof type === 'string' && type.trim() !== "")
  //   );
  const extractUniqueDocumentTypes = () => {
    const documentTypes = new Set(results.flatMap(item => item[1].metadata["Document Type"] || [])
      .filter(type => type !== "")
    );

    console.log(documentTypes)
    setUniqueDocumentTypes(Array.from(documentTypes)); // Convert Set to Array
  };

  // Fetch unique keywords
  const extractUniqueKeywords = () => {
    const keywords = new Set(results.flatMap((item) => item[1].metadata.Keywords || [])
      .filter(keyword => keyword !== "")
    );

    console.log(keywords)
    setUniqueKeywords(Array.from(keywords)); // Convert Set to Array
  };

  useEffect(() => {
    // console.log(results);
    if (results) {
      extractUniqueMonths(results);
      extractUniqueYears(results);
      extractUniqueCourts(results);
      extractUniqueParties(results);
      extractUniqueJudges(results);
      extractUniqueDocumentTypes(results);
      extractUniqueKeywords(results);
    }
  }, [
    // results,extractUniqueCourts,extractUniqueDocumentTypes,extractUniqueJudges,extractUniqueKeywords,extractUniqueMonths,extractUniqueParties,extractUniqueYears

  ]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default behavior of form submission
      event.preventDefault();
      // Call the onSearch function with the current query
      handleSearch()
    }
  }; const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  // const [isCollapsed, setIsCollapsed] = useState(true);
  // const [feedback_data, setFeedback_data] = useState('');

  // const toggleCollapse = () => {
  //   setIsCollapsed(!isCollapsed);
  // };
  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      const rect = avatarRef.current.getBoundingClientRect();
      const dropdownWidth = 160; // approximate width of the dropdown
      const dropdownHeight = 100; // approximate height of the dropdown

      let newPosition = {};

      if (rect.left + dropdownWidth > window.innerWidth) {
        newPosition.left = window.innerWidth - dropdownWidth - 10; // 10px for padding
      } else {
        newPosition.left = rect.left;
      }

      if (rect.top + dropdownHeight + 40 > window.innerHeight) { // 40px for the avatar height and padding
        newPosition.top = rect.top - dropdownHeight - 10;
      } else {
        newPosition.top = rect.top + 40;
      }

      setDropdownPosition(newPosition);

      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  // const [isCollapsed, setIsCollapsed] = useState(true);
  // const [feedbackData, setFeedbackData] = useState('');
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [page, setPage] = useState("home");

  // Function to handle changing the page
  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

  // const feedback = async () => {
  //   await axios.post(backend_url + '/feedback', { user_id: s_user_id, query: feedback_data, ip: ip, location: location }).then(handleFeedback);

  // }
  // const handleFeedback = () => {
  //   // Handle the feedback submission logic here
  //   setIsSubmitted(true);
  //   setTimeout(() => {
  //     setIsCollapsed(true); // Collapse the form after a short delay
  //     setIsSubmitted(false); // Reset submission status
  //     setFeedback_data(''); // Clear feedback data
  //   }, 2000); // Display message for 2 seconds
  // };
  return (
    <div className="main-container">
      <ToastContainer />
      {isLoggedIn ? (
        <>
          {!results && (<div className="full-page-container">
            <div className="centered-content">
              <center>
                <div style={{ paddingTop: "50px", paddingBottom: "30px" }}>
                  <Image src={imag} alt="My Image" style={{ width: '221px', height: '102p' }} />
                </div></center>
              <input
                id="querr"
                type="text"
                value={searchQuery}
                onKeyDown={handleKeyDown}
                style={{ borderRadius: '10px', }}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
                placeholder="Enter search query..."
                className="search-query"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
              <div className="flex flex-col items-center space-y-4 bg-#f8f8f8">
                <div style={{ paddingTop: '40px' }}>
                  <p className="text-center text-lg font-medium bg-#f8f8f8" style={{ color: '#918f8f' }}>List of Available Courts</p>
                </div>
                <div className="w-full text-center bg-#EBEBEB" style={{ color: '#918f8f' }}>
                  <p>International Court of Justice(ICJ) <strong>|</strong> European Court of Human Rights(HUDOC/ECHR) <strong>|</strong> International Criminal Court(ICC) <strong>|</strong> </p>
                  <p>United Nations Committee Against Torture(UN CAT) <strong>|</strong> United Nations Committee on Economic, Social and Cultural Rights(UN CESCR) <strong>|</strong> </p>
                  <p>United Nations Committee on the Elimination of Racial Discrimination(UN CERD) <strong>|</strong> United Nations Committee on the Rights of the Child(UN CRC) <strong>|</strong></p>
                  <p> United Nations Committee on the Rights of Persons with Disabilities(UN CRPD) <strong>|</strong> United Nations Committee on Enforced Disappearances(UN CED)  <strong>|</strong> </p>
                  <p>United Nations Committee on the Elimination of Discrimination against Women(UN CEDAW)</p>
                  <p></p>
                </div>
              </div>
              {/* <button  className="search-button">
              pay
            </button> */}
              {/* <PayPalScriptProvider options={initialOptions} createOrder={createOrder} onApprove={onApprove}><PayPalButtons/></PayPalScriptProvider> */}
              {/* <PayPalButton>pay</PayPalButton> */}
              {/* <PayPalBtn
              amount="5"
              currency="USD"
              createSubscription={paypalSubscribe}
              onApprove={paypalOnApprove}
              catchError={paypalOnError}
              onError={paypalOnError}
              onCancel={paypalOnError}
            /> */}
              {loading && (
                <div className="spinner-overlay">
                  <div className='spinner'>

                    {/* <Lottie animationData={nopage} loop={true} renderer={'svg'} /> */}
                    <ClipLoader size={150} color={"#123abc"} loading={loading} />
                  </div>
                </div>
                // <div className="loading-bar">
                //   Loading...
                // </div>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSearchQuery(searchQuery + " " + suggestion.token);
                      }}
                      onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing on click
                    >
                      {suggestion.token}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          )}

          {results && (
            <div className="left-filters">
              {/* style={  {marginTop:'70px',width:'200px', position: 'fixed', top: '10px', left:'10px'}} */}
              <div >
                {/* <div>
            <img src={imag} alt="My Image" style={{ width: '150px', height: 'auto' }} />
          </div> */}
                {results && (
                  <div >
                    {/* <div className="filter-title">Parties Involved</div> */}
                    <select
                      style={{ border: "1px solid", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedParty || ""}
                      onChange={(e) => setSelectedParty(e.target.value)}
                    >
                      <option value="">Parties Involved</option>
                      {uniqueParties.map((party) => (
                        <option key={party} value={party}>
                          {party}
                        </option>
                      ))}
                    </select>

                    <select
                      style={{ border: "1px solid ", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedJudge || ""}
                      onChange={(e) => setSelectedJudge(e.target.value)}
                    >
                      <option value="">Judge Involved</option>
                      {uniqueJudges.map((judge) => (
                        <option key={judge} value={judge}>
                          {judge}
                        </option>
                      ))}
                    </select>

                    {/* <div className="filter-title">Document Type</div> */}
                    <select
                      style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedDocumentType || ""}
                      onChange={(e) => setSelectedDocumentType(e.target.value)}
                    >
                      <option value="">Document Type</option>
                      {uniqueDocumentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    {/* <div className="filter-title">Keyword</div> */}
                    <select
                      style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedKeyword || ""}
                      onChange={(e) => setSelectedKeyword(e.target.value)}
                    >
                      <option value="">Select Keyword</option>
                      {uniqueKeywords.map((keyword) => (
                        <option key={keyword} value={keyword}>
                          {keyword}
                        </option>
                      ))}
                    </select>
                    {/* <div className="filter-title">Month</div> */}
                    {/* Date Filters */}
                    <select
                      style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedMonth || ""}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {uniqueMonths.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    {/* ...other left-side filters if any... */}
                    {/* <div className="filter-title">Year</div> */}
                    {/* Date Filters */}
                    <select
                      style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedYear || ""}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {uniqueYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {/* <div className="filter-title">Court Name</div> */}
                    <select
                      style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                      value={selectedCourt || ""}
                      onChange={(e) => setSelectedCourt(e.target.value)}
                    >
                      <option value="">Select Court Name</option>
                      {uniqueCourts.map((court) => (
                        <option key={court} value={court}>
                          {court}
                        </option>
                      ))}
                    </select>



                    {/* ...other right-side filters if any... */}
                    {/* </div> */}
                  </div>)
                }


              </div>
            </div>)}

          {results && (
            <div  >
              <div style={{ justifyContent: 'space-around' }}>
                <div className="search-bar">
                  {/* <h1>Human Rights Dossier</h1> */}
                  {/* <p>ICC, ICJ, HUDOC/ECHR, UN</p> */}
                  {/* Filter UI for Keywords */}

                  <input id="querr"
                    type="text"
                    value={searchQuery}
                    style={{ borderRadius: '10px', }}

                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}

                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
                    // onChange={fetchSuggestions((e) => setSearchQuery(e.target.value))}. (Score: {suggestion.score})
                    placeholder="Enter search query..."
                    className="search-query1"
                  />
                  <div style={{ justifyItems: 'center', paddingBottom: '8px' }}>
                    <center><button onClick={handleSearch} className="search-button">
                      Search
                    </button></center> </div>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSearchQuery(searchQuery + " " + suggestion.token);
                          // setShowSuggestions(true);
                        }}
                        onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing on click
                      >
                        {suggestion.token}
                      </li>
                    ))}
                  </ul>
                )}


              </div>

              <div className="central-content">
              
                {!results && <center>
                  <div style={{ paddingTop: "140px" }}>
                    <Image src={imag} alt="My Image" style={{ width: '221px', height: '102p' }} />
                  </div></center>}

                {/* <div>Related Items: {keywo}</div> */}
                <div>
                  {results && (<div className="toggle">
                    <div>
                      {/* <label className="switch-label">Sort by Date</label>
                          <label className="switch">
                            <input type="checkbox" checked={sortByDate} onChange={toggleSortMode} />
                            <span className="slider round"></span>
                          </label> */}
                      {/* {sortByDate && ( */}
                      {/* <div>
                            <button onClick={toggleSortDirection} onChange={toggleSortMode}>
                              {sortDirection === "newer" ? "Oldest to Newest ⬇️" : "Newest to Oldest ⬆️"}
                            </button>
                          </div> */}
                      <div className="toggle">
                        {sortByDate && (
                          <div>
                            <button onClick={toggleSortDirection}>
                              {sortDirection === "newer" ? "Newest to Oldest ⬇️" : "Oldest to Newest ⬆️"}
                            </button>
                          </div>
                        )}
                        <div>
                          <label className="switch-label">Sort by Date</label>
                          <label className="switch">
                            <input type="checkbox" checked={sortByDate} onChange={toggleSortMode} />
                            <span className="slider round"></span>
                          </label>

                        </div>
                        {/* <div>
                <label className="switch-label">Sort by Case Name</label>
                <label className="switch">
                  <input type="checkbox" checked={sortByCaseName} onChange={toggleSortByCaseName} />
                  <span className="slider round"></span>
                </label>
              </div> */}
                        {/* <div>
              <label className="switch-label">Group by Score</label>
              <label className="switch">
                <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                <span className="slider round"></span>
              </label>
            </div> */}
                      </div>
                      {/* )} */}
                    </div>

                    <div>
                      <label className="switch-label">Sort by Case Name</label>
                      <label className="switch">
                        <input type="checkbox" checked={sortByCaseName} onChange={toggleSortByCaseName} />
                        <span className="slider round"></span>
                      </label>
                    </div>


                    {/* <div>
                  <label className="switch-label">Group by Score</label>
                  <label className="switch">
                    <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                    <span className="slider round"></span>
                  </label>
                </div>*/}
                  </div>)}
                </div>
                <div className="search-results-container">

                  <div className="search-results">
                    {loading ? (
                      <div className="spinner-overlay">
                        <div className='spinner'>

                          {/* <Lottie animationData={nopage} loop={true} renderer={'svg'} /> */}
                          <ClipLoader size={150} color={"#123abc"} loading={loading} />
                        </div>
                      </div>
                      // <div className="loading-bar">
                      //   Loading...
                      // </div>
                    ) : (
                      <div>
                        {/* <button onClick={toggleSortMode} className="toggle-button">
                        {sortByDate ? 'Sort by Score' : 'Sort by Date'}
                        </button>
                        <button onClick={togglegroupedMode} className="toggle-button">
                        {group ? "Normal" : 'Sort by group'}
                        </button> */}


                        {/* <Switch {...label} disabled defaultChecked >{sortByDate ? 'Sort by Score' : 'Sort by Date'}</Switch> */}

                        {sortByCaseName ? (
                          Object.values(
                            results.reduce((acc, item) => {
                              // const caseName = item[1].metadata["Case Name"] || "Not Available";
                              const caseName = (item[1].metadata["Case Name"] || "Not Available").replace(/\d+/g, '');
                              if (!acc[caseName]) {
                                acc[caseName] = {
                                  caseName,
                                  items: [],
                                  isOpen: true,
                                };
                              }
                              acc[caseName].items.push(item);
                              return acc;
                            }, {})
                          ).map((group, index) => (
                            <div key={group.caseName} style={{ borderRadius: '5px', borderWidth: '0.5px', borderColor: 'black', backgroundColor: index % 2 === 0 ? '#e7e3e3' : '#c3c3c6', marginBottom: index !== group.length - 1 ? '20px' : '0' }}>
                              <div className="accordion-header" onClick={() => toggleAccordion(group.caseName)} style={{ display: 'flex', justifyContent: 'space-between', padding: '5', textAlign: "center" }}>
                                <div style={{ fontSize: '1.2em', padding: '10px' }}><strong>{group.caseName}</strong></div>
                                <span className="accordion-toggle" style={{ fontSize: '2em', paddingRight: '10px', textAlign: "center" }}>
                                  {openAccordion.includes(group.caseName) ? "-" : "+"}
                                </span>
                              </div>
                              {openAccordion.includes(group.caseName) && (
                                <div>
                                  {group.items
                                    .sort((a, b) => {
                                      if (sortByDate) {
                                        const dateA = new Date(a[1].metadata.Date);
                                        const dateB = new Date(b[1].metadata.Date);
                                        return sortDirectionFactor * (dateB - dateA); // Apply the sort direction factor
                                      } else {
                                        return 0; // No sorting if only sorting by case name
                                      }
                                    })
                                    .map((iitem, iindex) => (
                                      <div key={`${group.caseName}_${iindex}`} style={{ padding: '10px' }}>
                                        <ResultCard
                                          key={`${group.caseName}_${iindex}`}
                                          item={iitem}
                                          searchWords={keywo}
                                          sortByCaseName={sortByCaseName}
                                        />
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : groupedResults ? (
                          Object.keys(groupedResults)
                            .sort((a, b) => parseInt(b) - parseInt(a))
                            .map((scoreGroup) => (
                              <div key={scoreGroup}>
                                <p>Score: {scoreGroup}%</p>
                                {groupedResults[scoreGroup]
                                  .sort((a, b) => {
                                    const dateA = new Date(a[1].metadata.Date);
                                    const dateB = new Date(b[1].metadata.Date);
                                    return dateB - dateA;
                                  })
                                  .map((item, index) => (
                                    // <ResultCard key={index} item={item} searchWords={keywo} />
                                    <ResultCard key={`${scoreGroup}_${index}`} item={item} searchWords={keywo} sortByCaseName={sortByCaseName} />
                                  ))}
                              </div>
                            ))
                        ) : (
                          results &&
                          (results.length > 0 ? (
                            // setSearchPerformed(true),
                            results
                              .sort((a, b) => {
                                // Custom sorting function to place cards with case name "Not Available" at the bottom
                                const caseNameA = a[1].metadata["Case Name"] || '';
                                const caseNameB = b[1].metadata["Case Name"] || '';

                                // Compare case names
                                if (
                                  (caseNameA === "Not Available" && caseNameB !== "Not Available") ||
                                  (caseNameA === "" && caseNameB !== "") ||
                                  (caseNameA === "Not found" && caseNameB !== "Not found") ||
                                  (caseNameA === "Not mentioned" && caseNameB !== "Not mentioned")
                                ) {
                                  return 1; // Place case name "Not Available" at the bottom
                                } else if (
                                  (caseNameA !== "Not Available" && caseNameB === "Not Available") ||
                                  (caseNameA !== "" && caseNameB === "") ||
                                  (caseNameA !== "Not found" && caseNameB === "Not found") ||
                                  (caseNameA !== "Not mentioned" && caseNameB === "Not mentioned")
                                ) {
                                  return -1; // Place case name "Not Available" at the bottom
                                }

                                // Compare empty fields count
                                const getEmptyFieldsCount = (item) => {
                                  let count = 0;
                                  if (!item[1].metadata["Case Name"] || item[1].metadata["Case Name"] === "Not Available") count++;
                                  if (!item[1].metadata["Case Summary"] || item[1].metadata["Case Summary"] === "Not Available") count++;
                                  if (!item[1].metadata["Document Summary"] || item[1].metadata["Document Summary"] === "Not Available") count++;
                                  if (!item[1].metadata["Case URL"]) count++;
                                  if (!item[1].metadata["PDF URL"]) count++;
                                  if (!item[1].metadata["URL"]) count++;
                                  return count;
                                };

                                const emptyFieldsCountA = getEmptyFieldsCount(a);
                                const emptyFieldsCountB = getEmptyFieldsCount(b);

                                if (emptyFieldsCountA > emptyFieldsCountB) {
                                  return 1; // Place item with more empty fields at the bottom
                                } else if (emptyFieldsCountA < emptyFieldsCountB) {
                                  return -1; // Place item with fewer empty fields at the top
                                }

                                return 0; // Maintain original order if everything else is equal
                              })
                              .map((item, index) => (
                                <ResultCard
                                  key={index}
                                  item={item}
                                  searchWords={keywo}
                                  sortByCaseName={sortByCaseName}
                                />
                              ))
                          ) : (
                            searchPerformed && <p>No cases found.</p>
                          ))
                        )}
                        {!groupedResults && !results && (
                          searchPerformed && <p>No cases found.</p>
                        )}
                      </div>
                    )}
                  </div></div>
              </div>
            </div>
          )}


          {/* {results && (<div className="right-filters">
              <div>
            {user ? (
              <div style={{ position: 'relative' }}>
                { <div style={{ position: 'relative', left: '70px', bottom: '10px' }}>
                  <button onClick={logoutUser} style={{ top: 0, right: 0, backgroundColor: '#24272a', color: 'red', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>
            { <div style={{ marginTop: '30px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Welcome,</p>
                  <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{user.name}!</p>
                </div> }
              </div>
            ) : (
              // <button onClick={handleModalOpen}>Open Login</button>
              <div onClick={handleModalOpen} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', padding: '20px' }}>
                LoginLogin <FontAwesomeIcon icon={faRightToBracket} size="2x" />
              </div>
            )} }

            {modalShow && <LoginModal show={modalShow} handleLogin={login} />}
          </div>
          </div>)} */}
          {modalShow && <LoginModal show={modalShow} handleLogin={login} />}
        </>
      ) : (
        <div className="parent-div">
          {/* <div className="central-content">
        
        <div className="search-container">
          <h1>Human Rights Dossier</h1>
          <input id="querr"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
            placeholder="Enter search query..."
            className="search-query"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchQuery(searchQuery + " " + suggestion.token);
                    
                  }}
                  onMouseDown={(e) => e.preventDefault()} 
                >
                  {suggestion.token}
                </li>
              ))}
            </ul>
          )}

          
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          {loading && (
            <div className="spinner-overlay">
              <div className='spinner'>

                <Lottie animationData={nopage} loop={true} renderer={'svg'} />
                
              </div>
            </div>
            
          )}
        </div>
        </div> */}
          <div className="search-results">
            {loading ? (
              <div className='spinner'>

                {/* <Lottie animationData={nopage} loop={true} renderer={'svg'} /> */}
                <ClipLoader size={150} color={"#123abc"} loading={loading} />
              </div>
              // <div className="loading-bar">
              //   Loading...
              // </div>
            ) : (
              <div>
                {/* <button onClick={toggleSortMode} className="toggle-button">
            {sortByDate ? 'Sort by Score' : 'Sort by Date'}
            </button>
            <button onClick={togglegroupedMode} className="toggle-button">
            {group ? "Normal" : 'Sort by group'}
            </button> */}
                <div>
                  <div className="toggle">
                    <div>
                      <label className="switch-label">Sort by Date</label>
                      <label className="switch">
                        <input type="checkbox" checked={sortByDate} onChange={toggleSortMode} />
                        <span className="slider round"></span>
                      </label>
                      {sortByDate && (
                        <div>
                          <button onClick={toggleSortDirection}>
                            {sortDirection === "newer" ? "Newer to Older" : "Older to Newer"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="switch-label">Sort by Case Name</label>
                      <label className="switch">
                        <input type="checkbox" checked={sortByCaseName} onChange={toggleSortByCaseName} />
                        <span className="slider round"></span>
                      </label>
                      {sortByCaseName && (
                        <div>
                          <button onClick={setOpenAccordion(true)}>
                            {openAccordion ? "Expand All" : "Collapse All"}
                          </button>
                        </div>
                      )}
                    </div>
                    {/* <div>
                  <label className="switch-label">Group by Score</label>
                  <label className="switch">
                    <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                    <span className="slider round"></span>
                  </label>
                </div>*/}
                  </div></div>

                {/* <Switch {...label} disabled defaultChecked >{sortByDate ? 'Sort by Score' : 'Sort by Date'}</Switch> */}

                {sortByCaseName ? (
                  Object.values(
                    results.reduce((acc, item) => {
                      // const caseName = item[1].metadata["Case Name"] || "Not Available";
                      const caseName = (item[1].metadata["Case Name"] || "Not Available").replace(/\d+/g, '');
                      if (!acc[caseName]) {
                        acc[caseName] = {
                          caseName,
                          items: [],
                          isOpen: true,
                        };
                      }
                      acc[caseName].items.push(item);
                      return acc;
                    }, {})
                  ).map((group, index) => (
                    <div key={group.caseName} style={{ backgroundColor: index % 2 === 0 ? '#db9797' : '#bbcb7f', marginBottom: index !== group.length - 1 ? '10px' : '0' }}>
                      <div className="accordion-header" onClick={() => toggleAccordion(group.caseName)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                        <h4>{group.caseName}</h4>
                        <span className="accordion-toggle" style={{ fontSize: '3.5em', padding: '5' }}>
                          {openAccordion.includes(group.caseName) ? "-" : "+"}
                        </span>
                      </div>
                      {openAccordion.includes(group.caseName) && (
                        <div>
                          {group.items
                            .sort((a, b) => {
                              if (sortByDate) {
                                const dateA = new Date(a[1].metadata.Date);
                                const dateB = new Date(b[1].metadata.Date);
                                return sortDirectionFactor * (dateB - dateA); // Apply the sort direction factor
                              } else {
                                return 0; // No sorting if only sorting by case name
                              }
                            })
                            .map((iitem, iindex) => (
                              <div key={`${group.caseName}_${iindex}`} style={{ padding: '10px' }}>
                                <ResultCard
                                  key={`${group.caseName}_${iindex}`}
                                  item={iitem}
                                  searchWords={keywo}
                                  sortByCaseName={sortByCaseName}
                                />
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : groupedResults ? (
                  Object.keys(groupedResults)
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map((scoreGroup) => (
                      <div key={scoreGroup}>
                        <p>Score: {scoreGroup}%</p>
                        {groupedResults[scoreGroup]
                          .sort((a, b) => {
                            const dateA = new Date(a[1].metadata.Date);
                            const dateB = new Date(b[1].metadata.Date);
                            return dateB - dateA;
                          })
                          .map((item, index) => (
                            // <ResultCard key={index} item={item} searchWords={keywo} />
                            <ResultCard key={`${scoreGroup}_${index}`} item={item} searchWords={keywo} sortByCaseName={sortByCaseName} />
                          ))}
                      </div>
                    ))
                ) : (
                  results &&
                  (results.length > 0 ? (
                    // setSearchPerformed(true),
                    results
                      .sort((a, b) => {
                        // Custom sorting function to place cards with case name "Not Available" at the bottom
                        const caseNameA = a[1].metadata["Case Name"] || '';
                        const caseNameB = b[1].metadata["Case Name"] || '';

                        // Compare case names
                        if (
                          (caseNameA === "Not Available" && caseNameB !== "Not Available") ||
                          (caseNameA === "" && caseNameB !== "") ||
                          (caseNameA === "Not found" && caseNameB !== "Not found") ||
                          (caseNameA === "Not mentioned" && caseNameB !== "Not mentioned")
                        ) {
                          return 1; // Place case name "Not Available" at the bottom
                        } else if (
                          (caseNameA !== "Not Available" && caseNameB === "Not Available") ||
                          (caseNameA !== "" && caseNameB === "") ||
                          (caseNameA !== "Not found" && caseNameB === "Not found") ||
                          (caseNameA !== "Not mentioned" && caseNameB === "Not mentioned")
                        ) {
                          return -1; // Place case name "Not Available" at the bottom
                        }

                        // Compare empty fields count
                        const getEmptyFieldsCount = (item) => {
                          let count = 0;
                          if (!item[1].metadata["Case Name"] || item[1].metadata["Case Name"] === "Not Available") count++;
                          if (!item[1].metadata["Case Summary"] || item[1].metadata["Case Summary"] === "Not Available") count++;
                          if (!item[1].metadata["Document Summary"] || item[1].metadata["Document Summary"] === "Not Available") count++;
                          if (!item[1].metadata["Case URL"]) count++;
                          if (!item[1].metadata["PDF URL"]) count++;
                          if (!item[1].metadata["URL"]) count++;
                          return count;
                        };

                        const emptyFieldsCountA = getEmptyFieldsCount(a);
                        const emptyFieldsCountB = getEmptyFieldsCount(b);

                        if (emptyFieldsCountA > emptyFieldsCountB) {
                          return 1; // Place item with more empty fields at the bottom
                        } else if (emptyFieldsCountA < emptyFieldsCountB) {
                          return -1; // Place item with fewer empty fields at the top
                        }

                        return 0; // Maintain original order if everything else is equal
                      })
                      .map((item, index) => (
                        <ResultCard
                          key={index}
                          item={item}
                          searchWords={keywo}
                          sortByCaseName={sortByCaseName}
                        />
                      ))
                  ) : (
                    <p>
                      No cases found.
                    </p>
                  ))
                )}
                {!groupedResults && !results && (
                  <p>
                    No cases found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

      )}

    </div>
  )
};
export default Search_content;