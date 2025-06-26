import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ current_user, children }) => {
  if (current_user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  current_user: PropTypes.any,
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
