import React from "react";
import { CountryData } from '../types/Country';

interface CountryCardProps {
    country: CountryData;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    const languageKey = Object.keys(country.languages)[0];
    const currencyKey = Object.keys(country.currencies)[0];
    const nativeNameKeu = Object.keys(country.name.nativeName)[0];

    return (
        <div className="country-card">
            <div className="card-header">
                <h2>{country.name.common}</h2>
                <p className="official-name">{country.name.official}</p>
            </div>

            <div className="card-content">
                <div className="info-group">
                    <div className="info-item">
                        <i className="fi fi-rr-earth-americas"></i>
                        <div>
                            <h3>Region</h3>
                            <p>{country.subregion} ({country.continents[0]})</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}