// import Token from './../Redux/Reducer/index';
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Store from "../Store";

const Navbar = () => {
  
  const {dispatch} = useContext(Store)
  const history = useHistory();
  const LOGOUT = () => {
    dispatch({
      type:'RemoveToken'
    });
    history.push("/signup");
  };
  return (
    <>
      {localStorage.getItem('Token')===null ? (
        <>
          <nav
            className="navbar navbar-light "
            style={{ background: "#e3f2fd" }}
          >
            <form className="container-fluid justify-content-space-between">
              <button
                className="btn btn-outline-success me-2"
                type="button"
                onClick={() => history.push("/signup")}
              >
                Signup
              </button>
              <button
                className="btn btn-outline-success me-2"
                type="button"
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            </form>
          </nav>
        </>
      ) : (
        <>
          <nav
            className="navbar navbar-light "
            style={{ background: "#e3f2fd" }}
          >
            <form className="container-fluid justify-content-space-between">
              <button
                className="btn btn-outline-danger me-2"
                type="button"
                onClick={() => history.push("/")}
              >
                PokemonList
              </button>
              <button
                className="btn btn-outline-warning me-2"
                type="button"
                onClick={() => history.push("/faviourate")}
              >
                TotalFaviourate
              </button>
              <button
                className="btn btn-outline-success me-2"
                type="button"
                onClick={LOGOUT}
              >
                LOGOUT
              </button>
            </form>
          </nav>
        </>
      )}
    </>
  );
};
export default Navbar;
