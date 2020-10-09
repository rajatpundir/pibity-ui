import React from 'react';
import { FooterContainer, FooterInner } from '../../styles/main/HeaderAndFooter';

class Footer extends React.Component {
	render() {
		return (
			<FooterContainer>
				<FooterInner>
					<p>
						{' '}
						Copyright © 2020 Pibity<sup>®</sup> All Rights Reserved
					</p>
				</FooterInner>
			</FooterContainer>
		);
	}
}
export default Footer;
