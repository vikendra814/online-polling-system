import { useForm } from "react-hook-form";
import { addPoll } from "../services/service";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPoll() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    addPoll({ description: values.poll, options: values.option ,expire_time:values.exptime}).then((r) => {
      console.log(r);
      if (r.code === "1") {
        toast.success(r.message, {
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
        toast.error(r.message, {
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
    });
  };

  return (
    <>
      <div className="container-fluid m-0 p-0 mt-5 pt-lg-5">
        <div className="row p-0 m-0" id="login-form">
          <div className="col-lg-4 col-12 text-center">
            <h1 className="my-4" id="login-text">
              Add Poll
            </h1>
          </div>
        </div>

        <ToastContainer />

        <div className="row m-0 p-0 pt-lg-3">
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-lg-4 col-12 mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="add Your Poll"
                {...register("poll", {
                  required: "Please enter Question or fever",
                  pattern: {
                    value: /[a-zA-Z0-9_.-]*$/,
                    message: "Please enter text or Number Only",
                  },
                })}
                style={
                  errors.poll
                  ? { backgroundColor: "rgba(255, 0, 0, 0.437)" }
                    : { backgroundColor: "white" }
                }
              />
              {errors.poll && (
                <p className="text-start text-danger m-0 p-0 my-1">
                  <b>{errors.poll.message}</b>
                </p>
              )}
            </div>
            <div className="col-lg-4 col-12 mb-4">
              <div className="position-relative">
                <input
                  type="text"
                  name="option"
                  autoComplete="current-password"
                  className="form-control password"
                  id="exampleInputPassword1"
                  placeholder="option"
                  {...register("option", {
                    required: "Please enter coma seprated options",
                    pattern: {
                      value: /^(([a-zA-Z0-9](,)?)*)+$/i,
                      message: "only number,coma and Text allowed.",
                    },
                  })}
                  style={
                    errors.option
                    ? { backgroundColor: "rgba(255, 0, 0, 0.437)" }
                      : { backgroundColor: "white" }
                  }
                />
              </div>
              {errors.option && (
                <p className="text-start text-danger m-0 p-0 my-1">
                  <b>{errors.option.message}</b>
                </p>
              )}
            </div>


            <div className="col-lg-4 col-12 mb-4">
              <div className="position-relative">
                <input
                  type="text"
                  name="option"
                  autoComplete="current-password"
                  className="form-control password"
                  id="exampleInputPassword1"
                  placeholder="expiretion time in hours"
                  {...register("exptime", {
                    required: "Please enter digit only",
                    pattern: {
                      value: /[0-9]+$/,
                      message: "only number allowed.",
                    },
                  })}
                  style={
                    errors.option
                    ? { backgroundColor: "rgba(255, 0, 0, 0.437)" }
                      : { backgroundColor: "white" }
                  }
                />
              </div>
              {errors.exptime && (
                <p className="text-start text-danger m-0 p-0 my-1">
                  <b>{errors.exptime.message}</b>
                </p>
              )}
            </div>

            <div className="col-12 mt-4 mb-4">
              <button
                type="submit"
                className="col-lg-4 col-12 btn"
                id="login-btn"
              >
                Add Poll
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPoll;