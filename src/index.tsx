import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from 'history'
import { About } from './about'
import './site.css';

import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import EncounterBuilder from "./encounter/EncounterBuilder";
import { Menu, Header, Container } from "semantic-ui-react";

export const history = createBrowserHistory({ basename: '/pf2utils' });

const store = configureStore(history);

const Nav = (props: any) => (
	<NavLink
		exact
		{...props}
		activeClassName="active"
	/>
);
const Heading = () => (
    <Menu inverted size='large' fixed='top' style={{ margin: 0 }}>
        <Menu.Item>
            <Header inverted>Five Goblins Encounter Builder</Header>
        </Menu.Item>
        <Menu.Item as={Nav} to='/encounter' position='right'>Encounter Builder</Menu.Item>
        <Menu.Item as={Nav} to='/about'>About</Menu.Item>
    </Menu>
);

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Heading/>
            <Container fluid style={{ marginTop: '5rem' }}>
                <Switch>
                    <Route path="/" exact render={() => (<Redirect to="/encounter"/>)}/>
                    <Route path="/encounter" render={() => <EncounterBuilder />} />
                    <Route path="/about" render={() => <About />} />
                </Switch>
            </Container>
        </ConnectedRouter>
    </Provider>
);



render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
