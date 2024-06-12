import { pollListing, addVoting } from "../services/service";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import moment from "moment";

export default function Home() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    pollListing()
      .then((response) => {
        setPolls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching poll data:", error);
      });
  }, []);

  const handleVote = (option, id) => {
    addVoting({ poll_id: id, answer: option })
      .then((response) => {
          if (response.code === "1") {
            toast.success("voting sucessful", {
              position: "bottom-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              style: { margin: "10px" },
            });
          } else {
            toast.error(response.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              style: ({ margin: "10px" }),
            });
          }
      })
      .catch((error) => {
        console.error("Error submitting vote:", error);
      });
  };

  const isPollExpired = (createdAt,expire_time) => {
    const expireTime = moment(createdAt).add(expire_time, 'hours');
    return moment().isAfter(expireTime);
  };

  return (
    <div className="container mt-5">
      <ToastContainer/>
      <div className="row">
        <h1>Admin Panel</h1>
        {polls.length > 0 ? (
          polls.map((poll, index) => {
            const expired = isPollExpired(poll.created_at,poll.expire_time);
            return (
              <div className="col-lg-7 col-md-9 col-12 mb-4 mx-auto" key={index}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      {poll.username} - {moment(poll.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                    </h5>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title mb-3">{poll.description}</h3>
                    <ul className="list-group list-group-flush">
                      {poll.options.split(",").map((option, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                          {option.trim()}
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleVote(option.trim(), poll.id)}
                            disabled={expired}
                          >
                            Vote
                          </button>
                        </li>
                      ))}
                    </ul>
                    {expired && (
                      <div className="alert alert-danger mt-3">Post expired</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center">No Polls Found!</div>
          </div>
        )}
      </div>
    </div>
  );
}
