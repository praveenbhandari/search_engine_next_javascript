import axios from 'axios';
import React, { useState } from 'react';

import { allCountries } from 'country-telephone-data';
const LoginModal = ({ show, handleLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState("New York");
    // const [countryCode, setCountryCode] = useState('+91');
    // const locations = ["New York", "London", "Mumbai", "Tokyo", "Sydney"];
    const locations = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
        "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
        "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras",
        "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
        "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
        "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
        "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
        "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
        "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", "Palau",
        "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
        "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
        "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
        "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
        "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
    const [countryCode, setCountryCode] = useState('0');


    // const backend_url = "http://127.0.0.1:8000"
    const backend_url = "https://api.humanrightsdossier.com"
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(name,email,phone)
        const fullPhone = `${countryCode}${phone}`; // Combine country code and phone number

        const response = await axios.post(backend_url + '/login', { name: name, email: email, phone: fullPhone, location: location });
        console.log("response", response.data.message)
        // if (response.data.message == 0){
        //     console.log("serooo")
        //     handleLogin({ name, email, phone, location });
        // }else{
        console.log("btich", name, email, fullPhone, location, response.data.message)

        handleLogin({ name, email, fullPhone, location, user_id: response.data.message });

        // }
        console.log("Session Storage Set:", sessionStorage.getItem('user'));


        // Perform login validation here or call an API
        // Close modal on successful login
    };

    if (!show) {
        return null;
    }


    return (
        <div className="login_modal" >
            <div className="login_modal-content" onClick={e => e.stopPropagation()}>
                {/* <div className="login_modal-header"> */}
                <center><h2 className="login_modal-title"><strong>Login/Signup</strong></h2></center>
                {/* </div> */}
                <div className="login_modal-body">
                    <form onSubmit={handleSubmit} className="login_form">
                        <div className="form_group">
                            <label htmlFor="name">Name: </label>
                            <input placeholder='Enter your full name' type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="form_group">
                            <label htmlFor="email">Email:</label>
                            <input placeholder='Enter your email address' type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="form_group">
                            <label htmlFor="location">Location:</label>
                            <select
                                className="border border-black rounded-lg text-gray-700 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dropdown-location"
                                id="location"
                                value={location}
                                onChange={e => {
                                    const selectedLocation = e.target.value;
                                    setLocation(selectedLocation);

                                    const selectedCountry = allCountries.find(
                                        country => country.name === selectedLocation
                                    );

                                    if (selectedCountry) {
                                        setCountryCode(`+${selectedCountry.dialCode}`);
                                    } else {
                                        setCountryCode('');
                                    }
                                }}
                                required
                                style={{
                                    maxHeight: '200px', // Set a maximum height for the dropdown
                                    overflowY: 'auto', // Enable vertical scrolling when content exceeds max-height
                                    width: '200px', // Set a fixed width for the dropdown
                                }}
                            >
                                <option value="">-- Select Location --</option>
                                {allCountries.map((country, index) => (
                                    <option key={country.iso2} value={`${country.name}`}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form_group">
                            <label htmlFor="phone">Phone Number:</label>
                            {/* <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required /> */}
                        </div>

                        <div className="form_group" style={{ display: 'flex' }}>
                            {/* <select value={countryCode} onChange={e => setCountryCode(e.target.value)} style={{ width: '30%', marginRight: '10px' }}>
                                    <option value="+1">+1 USA</option>
                                    <option value="+44">+44 UK</option>
                                    <option value="+91">+91 India</option>
                                    <option value="+61">+61 Australia</option>
                                    <option value="+81">+81 Japan</option>
                                </select> */}
                            <select
                                value={countryCode}
                                onChange={e => setCountryCode(e.target.value)}
                                style={{ width: '30%', marginRight: '10px', borderRadius: '10px', borderColor: 'black', borderWidth: '1px' }}
                                required
                            >
                                {/* Default option */}
                                <option value="">  --</option>
                                {/* Map through all countries to generate options with country first, code after */}
                                {allCountries.map((country) => (
                                    <option key={country.iso2} value={`+${country.dialCode}`}>
                                        {`+${country.dialCode}`}
                                    </option>
                                ))}
                            </select>
                            <input type="tel" id="phone" value={phone} onChange={e => {
                                const phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                setPhone(phoneNumber);
                            }} maxLength="10" required placeholder="Enter your phone number" style={{ width: '70%', padding: '5px' }} />
                        </div>




                        <button type="submit" className="login_button">Login</button>
                    </form>
                </div>
                {/* <div className="login_modal-footer">
                    <button  className="close_button">Close</button>
                </div> */}
            </div>
        </div>
    );
};

export default LoginModal;
