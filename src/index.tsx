import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserHistory } from 'history'
import { About } from './about'
import './site.css';

import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter, NavLink } from "react-router-dom";
import { EncounterBuilder } from "./encounter/EncounterBuilder";
import { Menu, Header, Container } from "semantic-ui-react";

const Nav = (props: any) => (
	<NavLink
		{...props}
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
    <BrowserRouter>
        <Heading/>
        <Container fluid style={{ marginTop: '5rem' }}>
                <Routes>
                    <Route index element={<Navigate to="/encounter"/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/encounter" element={<EncounterBuilder />} />
                </Routes>
        </Container>
    </BrowserRouter>
);


const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Root />);
