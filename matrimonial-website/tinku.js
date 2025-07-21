const button1 = document.querySelector(".button1");

button1.addEventListener("click", () => {
  const formContainer = document.createElement("div");
  formContainer.className = "formcontainer";

  formContainer.innerHTML = `
    <div class="forms-content">
      <span id="closeBtn" class="close">&times;</span>
      <div>
      <img  class="top-space" src = "Screenshot 2025-07-18 184959.png">
      </div>
      <h3>Welcome back! Please Login</h3>
      <br>
      <br>

      <label>Mobile No. / Email ID</label>
      <input type="text" placeholder="Enter Mobile no. / Email ID">

      <label>Password</label>
      <input type="password" placeholder="Enter password">

      <div class="extra-options">
        <label><input type="checkbox" checked> Stay Logged in</label>
        <a href="#" id="a1">Forgot Password?</a>
      </div>

      <button>Login</button>

      <div class="or-divider">OR</div>

      <button>Login with OTP</button>

      <div class="footer">
       <pre> New to Rastha?   <a href="#Login">Sign Up Free</a></pre>
      </div>
    </div>
  `;

  document.body.appendChild(formContainer);

  document.getElementById("closeBtn").addEventListener("click", () => {
    formContainer.remove();
  });
});
