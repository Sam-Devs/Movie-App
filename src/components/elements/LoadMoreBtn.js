import React from 'react';
import PropTypes from "prop-types";

import { StyledLoadMoreBtn } from '../styles/StyledLoadMoreBtn';

const LoadMoreButton = ({ text, callback }) => (
	<StyledLoadMoreBtn type="button" onClick={callback}>
		{text}
	</StyledLoadMoreBtn>
);

LoadMoreButton.propTypes = {
	text: PropTypes.string,
	callback: PropTypes.func
}
export default LoadMoreButton;
