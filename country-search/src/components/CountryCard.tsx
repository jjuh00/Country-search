import React from "react";
import { CountryData } from '../types/Country';

interface CountryCardProps {
    country: CountryData;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    const languageKey = Object.keys(country.languages)[0];
    const currencyKey = Object.keys(country.currencies)[0];
    const nativeNameKey = Object.keys(country.name.nativeName)[0];

    return (
        <div className="country-card">
            <div className="card-header">
                <h2>{country.name.common}</h2>
                <p className="official-name">{country.name.nativeName[nativeNameKey].official}</p>
            </div>

            <div className="card-content">
                <div className="info-group">
                    <div className="info-item">
                        <i className="fi fi-rr-earth-americas"></i>
                        <div>
                            <h3>Region</h3>
                            <p>{country.subregion}{country.subregion !== country.continents[0] ? `, ${country.continents[0]}` : ""}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fi fi-tr-english"></i>
                        <div>
                            <h3>Language</h3>
                            <p>{country.languages[languageKey]}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fi fi-rr-usd-circle"></i>
                        <div>
                            <h3>Currency</h3>
                            <p>
                                {country.currencies[currencyKey].name} ({country.currencies[currencyKey].symbol})
                            </p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fi fi-tr-land-location"></i>
                        <div>
                            <h3>Area</h3>
                            <p>{country.area.toLocaleString()} km²</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fi fi-ts-region-pin"></i>
                        <div>
                            <h3>Neighbouring Countries</h3>
                            <p>{country.borders ? country.borders.join(", ") : "None"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryCard;