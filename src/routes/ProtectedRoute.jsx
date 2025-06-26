import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ current_user, children }) => {
  if (!current_user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  current_user: PropTypes.any,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
