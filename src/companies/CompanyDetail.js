import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyDetail() {
  // retrieve the parameter (id) from the URL
  const { handle } = useParams();
  // initialize piece of state 'company'
  const [company, setCompany] = useState({
    name: "",
    description: "",
    handle: "",
    jobs: [],
  });

  // useEffect will make an API call everytime company handle changes in the params. Reloads the details of the company (with 'handle'=company.handle) including the company's open job positions
  useEffect(
    function getCompanyAndJobs() {
      async function getCompanyDetail() {
        // make API call for company with specific handle
        let company = await JoblyApi.getCompany(handle);
        // update piece of state 'company' with results of API call
        setCompany(company);
      }
      getCompanyDetail();
    },
    [handle]
  );
  // while specific company details are being retrieved from the API, show the laoding spinner
  if (!company) return <LoadingSpinner />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}
export default CompanyDetail;
