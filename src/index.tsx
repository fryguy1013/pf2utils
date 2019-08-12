import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'


import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router";
import EncounterBuilder from "./encounter/EncounterBuilder";
import { Message } from "semantic-ui-react";

export const history = createBrowserHistory({ basename: '/pf2utils' });

const store = configureStore(history);

const Root = () => (
    <div>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact render={() => (<Redirect to="/encounter"/>)}/>
                    <Route path="/encounter" render={() => <EncounterBuilder />} />
                </Switch>
            </ConnectedRouter>
        </Provider>
        <Message>This website uses trademarks and/or copyrights owned by Paizo Publishing, LLC, which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo Publishing. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Publishing and Paizo products, please visit paizo.com.</Message>
    </div>
);

render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
