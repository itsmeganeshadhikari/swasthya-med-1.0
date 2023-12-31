// project imports
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { GuardProps } from "../../types";
import { useEffect } from "react";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const RoleGuard = ({ children }: GuardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role != "admin") {
      navigate("login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default RoleGuard;
