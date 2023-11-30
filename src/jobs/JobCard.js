import React, { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

function JobCard({ id, title, salary, equity, companyName }) {
  // deconstruct 'hasAppliedToJob' and 'applyToJob' from context value of UserContext declared in App component
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  // initialize piece of state 'applied'
  const [applied, setApplied] = useState();

  // useEffect will make an API call everytime 'id' or boolean result of 'hasAppliedToJob' function changes value
  useEffect(
    function updateAppliedStatus() {
      // update piece of state 'applied' to the boolean result of the hasAppliedToJob function (defined in the App component) with a specific job id passed in as a prop. Returns true if a job has been applied to or false if not.
      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  /** Apply for a job */
  // executes when 'APPLY" button is clicked
  async function handleApply(event) {
    // if the result of 'hasAppliedToJob' function with a specific job id passed in as a prop is true then do nothing; otherwise, execute 'applyToJob' function (defined in App component) with a job id passed in as a prop. It makes an API call with currentUser.username and job 'id' passed in as props and updates piece of state 'applicationIds' to a new Set that includes everything that was already in the Set 'applicationsIds' as well as the job 'id' passed in to this function
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    // update piece of state 'applied' to true
    setApplied(true);
  }

  return (
    <div className="card">
      <div className="container">
        <h4 className="card-title">{title}</h4>
        <p className="company-name"> {companyName}</p>
        {/* if job.salary is not undefined, show salary */}
        {salary && (
          <div>
            <small>Salary: {addCommasToSalary(salary)}</small>
          </div>
        )}
        {/* if job.equity is not undefined, show equity */}
        {equity !== undefined && (
          <div>
            <small>Equity: {equity}</small>
          </div>
        )}
        {/* execute 'handleApply' function when click on button. If 'applied' is true, disable button so it can't be clicked again */}
        <button className="apply-btn" onClick={handleApply} disabled={applied}>
          {/* if piece of state 'applied' is true, show APPLIED button; otherwise, APPLY button */}
          {applied ? "APPLIED" : "APPLY"}
        </button>
      </div>
    </div>
  );
}

// 'addCommas' function accepts a 'salary' and converts it into a string formatted with commas added for readability
function addCommasToSalary(salary) {
  // convert a salary to a string and create an array of that salary string (i.e. for salary = 140000, salaryToString = [ '140000' ])
  const salaryToString = salary.toString();
  // initialize 'str' as an empty string
  let str = "";

  // Start looping backwards so number in one's positon will be the first in new string 'str' and number in highest position will be last in new string 'str' (i.e. for salaryToString = 140000, after completing this loop, str = 000041
  // add each character in 'salaryToString' to new empty string 'str' starting with character at highest index (charAt(i=salaryToString.length-1)) and working backwards down to charAt(i=0).
  for (let i = salaryToString.length - 1; i >= 0; i--) {
    str += salaryToString.charAt(i);
  }

  let n = 3; // insert a comma after every 3 characters
  let insertChar = ","; // insert character is a comma
  let outputString = ""; // initialize outputString to an empty string
  let reverseArray = []; // initialize reverseArray to an empty array

  // iterate over 'str' (i.e. 140000).
  // On first iteration, i=0. str.substring(i, n+i) extracts the numbers in str between indices i (0) and n+i (3) resulting in a 3 digit slice. The next iteration sets i += n (0 + 3 = 3). str.substring(i, n+i) extracts the numbers in str between indices i (3) and n+i (6) resulting in a second 3 digit slice.  The next iteration sets i += n (3 + 3 = 6). str.substring(i, n+i) extracts the numbers in str between indices i (6) and n+i (9). Because length of str (i.e. 140000) is 6, iterations stop because i (6) is not less than str.length (6)
  for (let i = 0; i < str.length; i += n) {
    let slice = str.substring(i, n + i);
    // add a comma after each 3 digit slice
    if (slice.length === n) {
      outputString = outputString.concat(slice, insertChar);
    }
    //for numbers that have a slice less than 3: (i.e. 85,000), just add the slice to outputString, without a comma.
    else if ((slice.length === n && str.length <= n) || slice.length !== n) {
      outputString = outputString.concat(slice);
    }
  }
  // use the split() method to return a new array of strings from outputString
  // i.e. if outputString = "000,041", outputString.split("") = ["0", "0", "0", "," , "0", "4", "1", ","]
  let splitString = outputString.split("");

  // use the reverse() method to reverse the order of the newly created 'splitString' array and the shift() method removes any commas at index[0] of the array
  // if reverseArray = ["0", "0", "0", "," , "0", "4", "1", ","].reverse() equals: ["," ,  "1", "4", "0", "," , "0", "0", "0"]
  reverseArray = splitString.reverse();

  if (reverseArray[0] === ",") {
    reverseArray.shift();
    //use the join() method to join all elements of the array into a string
    let joinArray = reverseArray.join("");
    return joinArray;
  } else {
    let joinArray = reverseArray.join("");
    return joinArray;
  }
}

export default JobCard;
