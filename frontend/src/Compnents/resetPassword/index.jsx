  import React, { useEffect, useState, Fragment } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import styles from "./styles.module.css";

  const PasswordReset = (props) => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [urls, seturls] = useState("")
    const param = useParams();

    useEffect(() => {
      if (props.user === "customer") {
        seturls(`/userpassword/reset/${param.token}`);
        console.log(props.user);
      }
      else if(props.user === "seller") {
        seturls(`/sellerpassword/reset/${param.token}`);
        console.log(props.user);
      }
    }, []);

    const url = urls;

    
    useEffect(() => {
      const verifyUrl = async () => {
        try {
          await axios.get(url);
          setValidUrl(true);
        } catch (error) {
          setValidUrl(false);
        }
      };
      verifyUrl();
    }, [param, url]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(url, { password, confirmPassword });
        setMsg(data.message);
        setError("");
        alert("password changed sucessfully")
        window.location = "/login";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setMsg("");
        }
      }
    };
  return (
    <section class="vh-100">
      {validUrl ?
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card" style={{ borderRadius: "1rem", backgroundColor: "#a2a3b8" }}>
                <div class="row g-0">
                  <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div class="d-flex align-items-center mb-3 pb-1">
                          <i
                            class="fas fa-cubes fa-2x me-3"
                            style={{ color: " #ff6219" }}
                          ></i>
                          <span class="h1 fw-bold mb-0">Reset Password</span>
                        </div>


                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            id=""
                            placeholder="Enter New Password"
                            class="form-control form-control-lg"
                            name="newPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            id=""
                            placeholder="Enter Confirm Email"
                            class="form-control form-control-lg"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                          />
                        </div>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}

                        <div class="pt-1 mb-4">
                          <button
                            class="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> :
        <h1>404 not found</h1>}
    </section>
  );
};

export default PasswordReset;