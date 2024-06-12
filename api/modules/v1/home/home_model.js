const conn = require("../../../config/database");
const { error } = require("../../../languages/en");


var home = {
  pollListing: function (request, callback) {
    const q = `SELECT *,expire_time,(select username from tbl_user u  where p.user_id=u.id) as username from tbl_poll p where is_active=1 AND is_delete=0`;
    conn.query(q, function (error, result) {
      // console.log(result);
      if (!error) {
        callback("1", { keyword: "list_success", content: "" }, result);
      } else {
        callback(
          "0",
          { keyword: "error", content: { error: "fetching the user" } },
          []
        );
      }
    });
  },

  addVoting: function (request, callback) {
    let insObj = {
      poll_id: request.body.poll_id,
      user_id: request.user_id,
      answer: request.body.answer,
    };
    conn.query(
      `SELECT * from tbl_poll_answer where user_id=? AND poll_id=?`,
      [request.user_id, request.body.poll_id],
      function (error, result) {
        if (!error && result.length > 0) {
          const updateQ =
            "UPDATE tbl_poll_answer SET answer =? WHERE user_id =? AND poll_id =?";
          conn.query(
            updateQ,
            [request.body.answer, request.user_id, request.body.poll_id],
            function (err, res) {
              if (!err) {
                callback("1", { keyword: "update_success", content: "" });
              } else {
                callback("0", {
                  keyword: "Voting_update_unsuccessful",
                  content: "",
                });
              }
            }
          );
        } else {
          conn.query("INSERT INTO tbl_poll_answer SET?", [insObj], (er, re) => {
            if (!er) {
              callback("1", { keyword: "insert_success", content: "" });
            } else {
              callback("0", { keyword: "insert_unsuccessful", content: "" });
            }
          });
        }
      }
    );
  },

  addPoll: function (request, callback) {
    let insObj = {
      options: request.body.options,
      user_id: request.user_id,
      description: request.body.description,
      expire_time: "24",
    };
    conn.query(
      "INSERT INTO tbl_poll SET ?",
      [insObj],
      function (error, result) {
        // console.log(error);
        if (!error) {
          callback("1", { keyword: "Poll_created_successfully", content: "" });
        } else {
          callback("0", { keyword: "Poll Not Created", content: "" });
        }
      }
    );
  },

  showSpecificUserPoll: function (request, callback) {
    conn.query(
      "SELECT *, expire_time, (select username from tbl_user u where p.user_id=u.id) as username from tbl_poll p where is_active=1 AND is_delete=0 AND user_id=?",
      [request.user_id],
      function (error, result) {
        if (!error) {
          callback("1", { keyword: "list_success", content: "" }, result);
        } else {
          callback(
            "0",
            { keyword: "error", content: { error: "fetching the user" } },
            []
          );
        }
      }
    );
  },
  showResult: function (request, callback) {
    conn.query(
      "SELECT count(*) as total from tbl_poll_answer where   poll_id=? and answer=?",
      [request.body.poll_id,request.body.answer],
      function (error, result) {
        // console.log(result);
        if (!error) {
          callback("1", { keyword: "list_success", content: "" }, result);
        } else {
          callback(
            "0",
            { keyword: "error", content: { error: "fetching the user" } },
            []
          );
        }
      } 
    );
  },
};

module.exports = home;
