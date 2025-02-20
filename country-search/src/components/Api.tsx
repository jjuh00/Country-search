// UseEffect isn't used since fetching is done on demand (when user clicks/presses enter)
export const fetchCountry = async (countryName: string): Promise<Response> => {
  const formattedName = countryName.trim().replace(/\s+/g, "%20");
  const url = `https://restcountries.com/v3.1/name/${formattedName}`;
  return fetch(url);
}