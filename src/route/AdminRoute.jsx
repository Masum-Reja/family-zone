// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import Skeleton from "../viewer/common/Skeleton";

// const AdminRoute = ({ children, ...rest }) => {
//   const { user } = useAuth();
//   if (!user.email) {
//     return <Skeleton />;
//   }
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         user.email ? (
//           children
//         ) : (
//           <Navigate
//             to={{
//               pathname: "/sign-in",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default AdminRoute;
