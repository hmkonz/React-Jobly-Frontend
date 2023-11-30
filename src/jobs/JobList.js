import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import "./JobList.css";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * This is routed to at /jobs
 *
 * JobList renders -> { JobCardList, SearchForm }
 */

function JobList() {
  // intialize piece of state 'jobs' to null
  const [jobs, setJobs] = useState(null);

  // useEffect will make an API call only once when component is rendered. 'search' function is executed and retrieves all jobs from the database
  useEffect(function getAllJobsOnRender() {
    search();
  }, []);

  /** the search function is executed once when component is rendered as well as when user clicks the  submit button in the search form; reloads either all jobs if 'title' is not used as a prop when function is called or it reloads jobs with 'title' = job.title. */
  async function search(title) {
    // retrieve jobs with title=job.title from API
    let jobs = await JoblyApi.getJobs(title);
    // update piece of state 'jobs' with the results of the API call
    setJobs(jobs);
  }
  // while jobs are being retrieved from the API, show the laoding spinner
  if (!jobs) {
    return <LoadingSpinner />;
  }

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm search={search} />
      {/* if piece of state 'jobs' is not null, render the JobCardList component with 'jobs' passed in as a prop; otherwise, show an error message  */}
      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="error-msg">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default JobList;
