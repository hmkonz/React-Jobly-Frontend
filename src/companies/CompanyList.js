import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * CompanyList renders -> { CompanyCard, SearchForm }
 */

function CompanyList() {
  // initialize piece of state 'companies' to an empty array
  const [companies, setCompanies] = useState([]);

  // useEffect will make an API call only once when component is rendered. 'search' function is executed and retrieves all companies from the database
  useEffect(function getAllCompaniesOnRender() {
    search();
  }, []);

  /** the search function is executed once when component is rendered as well as when user clicks the  submit button in the search form; reloads either all companies if 'name' is not used as a prop when function is called or it reloads companies with 'name' = company.name. */
  async function search(name) {
    // retrieve companies with name=company.name from API
    let companies = await JoblyApi.getCompanies(name);
    // update piece of state 'companies' with the results of the API call
    setCompanies(companies);
  }

  // while companies are being retrieved from the API, show the laoding spinner
  if (!companies) {
    return <LoadingSpinner />;
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      {/* render SearchForm with 'search' passed in as a prop */}
      <SearchForm search={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {/* map over piece of state 'companies' and for every company, render the CompanyCard component with key, handle, name, description and logoUrl passed in as props  */}
          {companies.map((company) => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}
export default CompanyList;
