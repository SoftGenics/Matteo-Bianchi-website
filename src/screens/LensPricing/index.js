import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './index.css'; // Import the CSS file

const lensData = {
    plano: [
        { SPH: "PlanoTO 6.00", CYL: "2.00", ARC: 200.00, BB: 400.00, PHOTO: 800.00, DRIVEX: 1800.00 },
        { SPH: "6.25 TO 10.00", CYL: "2.00", ARC: 700.00, BB: 900.00, PHOTO: 1050.00, DRIVEX: 2300.00 },
        { SPH: "PlanoTO 10.00", CYL: "-4.00", ARC: 800.00, BB: 900.00, PHOTO: 1050.00, DRIVEX: 2500.00 }
    ],
    singleVision: [
        { SPH: "PlanoTO 6.00", CYL: "2.00", ARC: 200.00, BB: 400.00, PHOTO: 800.00, DRIVEX: 1800.00 },
        { SPH: "6.25 TO 10.00", CYL: "2.00", ARC: 700.00, BB: 900.00, PHOTO: 1050.00, DRIVEX: 2300.00 },
        { SPH: "PlanoTO 10.00", CYL: "-4.00", ARC: 800.00, BB: 900.00, PHOTO: 1050.00, DRIVEX: 2500.00 }
    ],
    bifocal: [
        { SPH: "3.00", CYL: "3.00", ADD: "3.00", ARC: 800.00, BB: 800.00, PHOTO: 1200.00, DRIVEX: 2500.00 }
    ],
    progressiv: [
        { SPH: "3.00", CYL: "3.00", ADD: "3.00", ARC: 1550.00, BB: 1800.00, PHOTO: 2000.00, DRIVEX: 2800.00 }
    ]
};

const LensPricing = () => {
    const { product_id } = useParams();
    const [mobile_num, setMobile_num] = useState("");
    const [selectedType, setSelectedType] = useState('singleVision');
    const [selectedSPH, setSelectedSPH] = useState('');
    const [selectedCYL, setSelectedCYL] = useState('');
    const [selectedOption, setSelectedOption] = useState('ARC');
    const [selectedDetails, setSelectedDetails] = useState(null);

    const [viewMode, setViewMode] = useState('selected'); // Added for tab control
    const [leftLens, setLeftLens] = useState({ SPH: "-0.00", CYL: "-0.25", AXIS: "0.0", ADD: "1" });
    const [rightLens, setRightLens] = useState({ SPH: "-0.00", CYL: "-0.25", AXIS: "0.0", ADD: "1" });
    const [add, setAdd] = useState(0)

    const handleTabClick = (mode) => {
        setViewMode(mode);
    };

    const handleLensChange = (lens, field, value) => {
        if (lens === 'left') {
            setLeftLens({ ...leftLens, [field]: value });
        } else {
            setRightLens({ ...rightLens, [field]: value });
        }
    };
    const handleChangeAdd = (field, value) => {
        setAdd(parseFloat(value));
    };

    useEffect(() => {
        // Retrieve cart items from local storage
        // const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        // Access token from local storage
        const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with your actual token key
        if (token) {
            // Decode the token to get user information
            const decodedToken = jwtDecode(token);
            const mobile_num = decodedToken.mobile_num;
            setMobile_num(mobile_num)
            // console.log("Decoded Mobile Number:", mobile_num);
        }
    }, []);

    useEffect(() => {
        const details = lensData[selectedType]?.find(item => item.SPH === selectedSPH && item.CYL === selectedCYL);
        setSelectedDetails(details || null);
    }, [selectedType, selectedSPH, selectedCYL]);

    const handleSubmit = () => {
        if (selectedDetails) {
            const lenshes = {
                Type: selectedType,
                SPH: selectedSPH,
                CYL: selectedCYL,
                [selectedOption]: selectedDetails[selectedOption]
            };
            const power = {
                leftLens,
                rightLens,
                add
            };
            const product = {
                mobile_number: mobile_num,
                product_id: product_id
            }
            console.log("product", product)
            console.log("lenshes", lenshes)
            console.log("power", power)
        } else {
            alert("Please select valid options.");
        }
    };

    return (
        <div className="lens-bg-container">
            <div className="lens-pricing">
                <h1>Lens Pricing Data</h1>

                <label>
                    Lens Type:
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="plano">Plano</option>
                        <option value="singleVision">Single Vision</option>
                        <option value="bifocal">Bifocal</option>
                        <option value="progressiv">Progressive</option>
                    </select>
                </label>

                <label>
                    SPH:
                    <select value={selectedSPH} onChange={(e) => setSelectedSPH(e.target.value)}>
                        <option value="">-- Select SPH --</option>
                        {lensData[selectedType]?.map((item, index) => (
                            <option key={index} value={item.SPH}>{item.SPH}</option>
                        ))}
                    </select>
                </label>

                <label>
                    CYL:
                    <select value={selectedCYL} onChange={(e) => setSelectedCYL(e.target.value)}>
                        <option value="">-- Select CYL --</option>
                        {lensData[selectedType]?.map((item, index) => (
                            <option key={index} value={item.CYL}>{item.CYL}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Option:
                    {["ARC", "BB", "PHOTO", "DRIVEX"].map(option => (
                        <label key={option}>
                            <input
                                type="radio"
                                name="option"
                                value={option}
                                checked={selectedOption === option}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            {option}
                        </label>
                    ))}
                </label>

                {selectedDetails && (
                    <div>
                        <h2>Selected Details</h2>
                        <p>{selectedOption}: <input type="text" value={selectedDetails[selectedOption]} readOnly /></p>
                    </div>
                )}

                {selectedDetails && (
                    <div className="Power-bg-container">
                        <div className="lens-pricing">
                            <h1>What About Eye Power?</h1>
                            <p>You can select your eye power in the following table. Charges may be different from lens to lens based on the lens number.</p>

                            <div className="tab-buttons">
                                <button
                                    className={`tab-button ${viewMode === 'selected' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('selected')}
                                >
                                    Selected
                                </button>
                                <button
                                    className={`tab-button ${viewMode === 'manual' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('manual')}
                                >
                                    Manual
                                </button>
                            </div>

                            <div className="lens-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Left Lens</th>
                                            <th>Right Lens</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>SPH</td>
                                            <td>
                                                <select
                                                    value={leftLens.SPH}
                                                    onChange={(e) => handleLensChange('left', 'SPH', e.target.value)}
                                                >
                                                    {/* Add options dynamically or manually */}
                                                    {Array.from({ length: 81 }, (_, index) => {
                                                        // Create options dynamically from -10.0 to 10.0 in steps of 0.25
                                                        const value = (-10 + index * 0.25).toFixed(2); // Format with two decimal points
                                                        return (
                                                            <option key={value} value={value}>
                                                                {value}
                                                            </option>
                                                        );
                                                    })}
                                                    {/* ... add other SPH values */}
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={rightLens.SPH}
                                                    onChange={(e) => handleLensChange('right', 'SPH', e.target.value)}
                                                >
                                                    {/* Add options dynamically or manually */}
                                                    {Array.from({ length: 81 }, (_, index) => {
                                                        // Create options dynamically from -10.0 to 10.0 in steps of 0.25
                                                        const value = (-10 + index * 0.25).toFixed(2); // Format with two decimal points
                                                        return (
                                                            <option key={value} value={value}>
                                                                {value}
                                                            </option>
                                                        );
                                                    })}
                                                    {/* ... add other SPH values */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>CYL</td>
                                            <td>
                                                <select
                                                    value={leftLens.CYL}
                                                    onChange={(e) => handleLensChange('left', 'CYL', e.target.value)}
                                                >
                                                    {/* Add options dynamically or manually */}
                                                    {Array.from({ length: 81 }, (_, index) => {
                                                        // Create options dynamically from -10.0 to 10.0 in steps of 0.25
                                                        const value = (-6 + index * 0.25).toFixed(2); // Format with two decimal points
                                                        return (
                                                            <option key={value} value={value}>
                                                                {value}
                                                            </option>
                                                        );
                                                    })}
                                                    {/* ... add other SPH values */}
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    value={rightLens.CYL}
                                                    onChange={(e) => handleLensChange('right', 'CYL', e.target.value)}
                                                >
                                                    {/* Add options dynamically or manually */}
                                                    {Array.from({ length: 81 }, (_, index) => {
                                                        // Create options dynamically from -10.0 to 10.0 in steps of 0.25
                                                        const value = (-6 + index * 0.25).toFixed(2); // Format with two decimal points
                                                        return (
                                                            <option key={value} value={value}>
                                                                {value}
                                                            </option>
                                                        );
                                                    })}
                                                    {/* ... add other SPH values */}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>AXIS</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={leftLens.AXIS}
                                                    onChange={(e) => handleLensChange('left', 'AXIS', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={rightLens.AXIS}
                                                    onChange={(e) => handleLensChange('right', 'AXIS', e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ADD</td>
                                            <td colSpan="2">
                                                <input
                                                    type="number"
                                                    value={add}
                                                    onChange={(e) => handleChangeAdd('ADD', e.target.value)}
                                                    className="add-input"
                                                />
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                )}

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>

    );
};

export default LensPricing;

