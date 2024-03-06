// import React, { useState } from "react";
// import RegisterForm from "./UserComponents/RegisterForm";
// import LoginForm from "./UserComponents/LoginForm";

// const AuthPage = () => {
//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);

//   const handleRegisterClick = () => {
//     setShowRegisterForm(true);
//     setShowLoginForm(false);
//   };

//   const handleLoginClick = () => {
//     setShowRegisterForm(false);
//     setShowLoginForm(true);
//   };

//   const handleGoToLoginClick = () => {
//     setShowRegisterForm(false);
//     setShowLoginForm(true);
//   };

//   const handleGoToRegisterClick = () => {
//     setShowRegisterForm(true);
//     setShowLoginForm(false);
//   };

//   return (
//     <div>
//       <div>
//         <p>Register or login to access the stock trading system.</p>
//         <button onClick={handleRegisterClick}>Register</button>
//         <button onClick={handleLoginClick}>Login</button>
//       </div>

//       {showRegisterForm && (
//         <div>
//           <h2>Register</h2>
//           <RegisterForm />
//           <p>
//             Already have an account?{" "}
//             <button onClick={handleGoToLoginClick}>Go to Login</button>
//           </p>
//         </div>
//       )}

//       {showLoginForm && (
//         <div>
//           <h2>Login</h2>
//           <LoginForm />
//           <p>
//             Don't have an account?{" "}
//             <button onClick={handleGoToRegisterClick}>Go to Register</button>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import LoginForm from "./UserComponents/LoginForm";
import RegisterForm from "./UserComponents/RegisterForm";

import CustomDialog from "./UserComponents/CustomDialog";

const HomePage = () => {
  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      const names = ["MSFT", "AAPL", "GOOG"];

      function createChart(series) {
        Highcharts.stockChart("container", {
          rangeSelector: {
            selected: 4,
          },
          yAxis: {
            labels: {
              format: "{#if (gt value 0)}+{/if}{value}%",
            },
            plotLines: [
              {
                value: 0,
                width: 2,
                color: "silver",
              },
            ],
          },
          plotOptions: {
            series: {
              compare: "percent",
              showInNavigator: true,
            },
          },
          tooltip: {
            pointFormat:
              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
            valueDecimals: 2,
            split: true,
          },
          series,
        });
      }

      const promises = names.map((name) =>
        fetch(
          `https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/${name.toLowerCase()}-c.json`
        )
          .then((response) => response.json())
          .then((data) => ({ name, data }))
      );

      const series = await Promise.all(promises);
      createChart(series);
    };

    fetchDataAndCreateChart();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return <div id="container" />;
};

export default HomePage;
