import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Navbars from "./layouts/Navbars";
import { getAllCategory, getAllData, getCart } from "./redux/actions";
import routes from "./routes";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCart());
    }
    dispatch(getAllData());
    dispatch(getAllCategory());
  }, [auth, dispatch]);

  return (
    <div className="App">
      <Navbars>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
        </Switch>
      </Navbars>
    </div>
  );
}

export default App;
