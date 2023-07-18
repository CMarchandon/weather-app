import { useState } from "react"; // Import the useState hook from React
import  {AsyncPaginate}  from "react-select-async-paginate"; // Import the AsyncPaginate component from react-select-async-paginate
import { getGeoapi } from "../api"; // Import the getGeoapi function from the "../api" file

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null); // Declare a state variable 'search' and a function 'setSearch' to update it

  // Function to load options for the search input
  const loadOptions = (inputValue) => {
    return fetch(
      `${getGeoapi.geoApp}/cities?minPopulation=100000&namePrefix=${inputValue}`, // ATENTTION CHANGE
      getGeoapi
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((response) => {
        return {
          options: response.data.map((city) => { // Map the response data to an array of options
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err)); // Log any errors that occur during the API call
  };

  // Function to handle changes in the search input
  const handleOnChange = (searchData) => {
    setSearch(searchData); // Update the 'search' state with the new search data
    onSearchChange(searchData); // Call the 'onSearchChange' callback with the new search data
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={800}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // Set the 'loadOptions' function to fetch and load options asynchronously
    />
  );
};

export default Search; // Export the Search component as the default export

