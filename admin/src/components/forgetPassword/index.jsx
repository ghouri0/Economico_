import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ForgetPassword = (props) => {
  const [email1, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `/adminforget`;
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
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email1}
					required
					className={styles.input}
				/>
				{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgetPassword;
