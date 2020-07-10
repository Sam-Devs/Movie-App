import React from 'react';
import { Link } from '@reach/router';
import Logo from '../images/reactMovie_logo.png';
import SVGLogo from '../images/tmdb_logo.svg';
import { StyledHeader, StyledLogo, StyledSVGLogo } from '../styles/StyledHeader';

const Header = () => (
	<StyledHeader className="header-content">
		<div>
			<Link to="/">
				<StyledLogo src={Logo} alt="Logo" />
			</Link>
				<StyledSVGLogo src={SVGLogo} alt="SVGLogo" />
		</div>
	</StyledHeader>
);

export default Header;
