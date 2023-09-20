/* import { AutoComplete } from "@react-md/autocomplete";
import { Stations } from "../data/stations";
const fruits = Stations.filter(jsonObject => jsonObject.hasOwnProperty("StationName"))
.map(jsonObject => jsonObject.StationName)

 function MyAutoComplete () {
  return (
    <AutoComplete
      id="search-fruits"
      name="location"
      label="Search"
      placeholder="Enter Search Term"
      data={fruits}
    />
  );
}
 */

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Stations } from "../data/stations";
import { cities } from '../data/cities';
export default function MyAutoComplete (props) {
  // note: the id field is mandatory
  const items = cities


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
    console.log("aldkflkasdjfl")
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected#
    console.log("sadklfjlksajflkfdjlkaskfdlkj")
    console.log(item)
    props.NavbarCallback(item)
    
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <>
      
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            placeholder='Type location to search'
            //resultStringKeyName={"StationName"}
            fuseOptions={{ keys: ["country", "geonameid", "name", "subcountry"]}}
          />
        </div>
    
    </>
  )
}

