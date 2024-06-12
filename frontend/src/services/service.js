import { fetchWrapper } from "../utils/fetch_wrapper";




export function login(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_AUTH}login`,
    body
  );
}

export function signup(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_AUTH}signup`,
    body
  );
}

export  function pollListing(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_HOME}poll-listing`,
    body
  );
}

export  function addVoting(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_HOME}add-voting`,
    body
  );
}


export  function addPoll(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_HOME}add-poll`,
    body
  );
}
export  function showpoll(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_HOME}show-poll`,
    body
  );
}
export  function showResult(body) {
  return fetchWrapper.post(
    `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_HOME}show-result`,
    body
  );
}

