import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ForgetPassword = (props) => {
  const [email1, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [urls, seturls] = useState("")


  useEffect(() => {



    if (props.user === "customer") {
      seturls(`/userforget`);
    }
    else {
      seturls(`/sellerforget`);
    }


  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = urls;
      const { data } = await axios.post(url, { email1 });
      setMsg(data.message);
      setError("");
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
    <section class="vh-100" >
      <div class="container py-5 h-100" >
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
                          style={{ color: " #fa6219" }}
                        ></i>
                        <span class="h2 fw-bold mb-0">Forget Password?</span>
                      </div>



                      <div class="form-outline mb-4">
                        <input
                          type="mail"
                          id=""
                          placeholder="Enter your email"
                          class="form-control form-control-lg"
                          name="newPassword"
                          value={email1}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {error && <div className={styles.error_msg}>{error}</div>}
                      {msg && <div className={styles.success_msg}>{msg}</div>}

                      <div class="pt-1 mb-4">
                        <button
                          class="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Send Email
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
