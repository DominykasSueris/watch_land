import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { SyncAuthMethods } from "../../../redux/actions/authActions";
import { updateConnections } from "../../../redux/reducers/auth";
import { AuthTarget, IProfile } from "../../../redux/specs/authSpecs";
import { RootState } from "../../../redux/store";
import { AuthSessions } from "../../../utils";
import Login from "../../Auth/Login";

const SESSION_KEY = "auth_methods";

const AwsAuth = (props: any) => {
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = useState(false);
  const auth = useSelector((state: RootState) => {
    const auths = state.auth.methods?.filter(
      (method: IProfile) => method.provider == AuthTarget.AWS
    );
    return auths.length > 0;
  });

  useEffect(() => {
    if (auth) return setIsAuth(true);

    const methods = AuthSessions.getMethods();
    if (methods.length > 0) {
      dispatch(updateConnections(SyncAuthMethods(methods)));
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [auth]);
  return isAuth ? <Outlet></Outlet> : <Login isAuth={isAuth} provider={AuthTarget.AWS} />;
};

export default AwsAuth;
