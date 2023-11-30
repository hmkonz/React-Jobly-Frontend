import React from "react";
import JobCard from "./JobCard";

// piece of state 'jobs' and boolean property 'apply' are passed in as props
function JobCardList({ jobs, apply }) {
  return (
    <div className="JobCardList">
      {/* map over piece of state 'jobs', and for every job render the JobCard component with props passed in */}
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}
export default JobCardList;
