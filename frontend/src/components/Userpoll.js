import { showpoll,showResult } from "../services/service";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import moment from "moment";
import addNotification from 'react-push-notification';
export default function Userpoll() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    showpoll()
      .then((response) => {
        const pollsData = response.data.map(poll => ({
          ...poll,
          totalVotes: 0
        }));
        setPolls(pollsData);
      })
      .catch((error) => {
        console.error("Error fetching poll data:", error);
      });
  }, []);


  const handleResult = (option, id) => {
    showResult({ poll_id: id, answer: option })
      .then((response) => {
        if (response.code === "1") {
          addNotification({
            title: 'Warning',
            subtitle: 'Total Votes:',
            message: response.data[0].total,
            theme: 'darkblue',
            native: true 
        });
          toast.success("total votes:"+response.data[0].total, {
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

          // Update totalVotes for the specific poll
          setPolls(prevPolls => prevPolls.map(poll => {
            if (poll.id === id) {
              return { ...poll, totalVotes: poll.totalVotes + 1 };
            }
            return poll;
          }));
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
            style: { margin: "10px" },
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting vote:", error);
      });
  };


  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        {polls.length > 0 ? (
          polls.map((poll, index) => {
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
                            onClick={() => handleResult(option.trim(), poll.id)}
                          >
                            See Total Vote
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3">Total Votes: {poll.total_votes}</div>
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




