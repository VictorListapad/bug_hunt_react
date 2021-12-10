import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";

import PostProvider from "./context/PostContext";
import CategoryProvider from "./context/CategoryContext";
import AuthProvider from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import CommentProvider from "./context/CommentContext";

ReactDOM.render(
  <React.StrictMode>
    <CommentProvider>
      <PostProvider>
        <CategoryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CategoryProvider>
      </PostProvider>
    </CommentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
