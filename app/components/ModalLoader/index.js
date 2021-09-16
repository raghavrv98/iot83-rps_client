/**
 *
 * ModalLoader
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class ModalLoader extends React.Component {
	render() {
		return (
			<div className="modalLoaderBox">
				<div className="sampleContainer">
					<div className="loader">
						<span className="dot dot_1" />
						<span className="dot dot_2" />
						<span className="dot dot_3" />
						<span className="dot dot_4" />
					</div>
				</div>
			</div>
		);
	}
}

ModalLoader.propTypes = {};

export default ModalLoader;
