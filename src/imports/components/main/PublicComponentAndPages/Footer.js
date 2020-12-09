/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import footerLinks from './footerLinks.json';
import {
	Footer,
	FooterNav,
	FooterNavContainer,
	FooterNavColums,
	FooterColumnHeadingContainer,
	FooterColumnHeading,
	FooterListContainer,
	FooterCoulumnList,
	FooterColumnListItem,
	FooterColumnListItemLink,
	FooterBottom,
	FooterBottomHeadind,
	FooterBottomInnerConatiner,
	FooterBottomOuterContainer,
	FootoerBootomSocialLinksContainer,
	FooterSocialLinks
} from '../../../styles/main/PublicComponents/Footer';

class PublicFooterComponent extends React.Component {
	constructor(props) {
		super();
		this.state = {};
	}

	renderFooterColumns(footerLinks) {
		return footerLinks.map((footerLink, index) => {
			return (
				<FooterNavColums key={index}>
					{footerLink.image ? (
						<FooterColumnHeadingContainer style={{ marginBottom: '31px' }}>
							<img src={footerLink.image} alt={footerLink.alt} />
						</FooterColumnHeadingContainer>
					) : (
						<FooterColumnHeadingContainer>
							<FooterColumnHeading>{footerLink.name}</FooterColumnHeading>
						</FooterColumnHeadingContainer>
					)}

					<FooterListContainer>
						<FooterCoulumnList>
							{footerLink.links.map((link, index) => {
								return (
									<FooterColumnListItem key={index}>
										<FooterColumnListItemLink to={link.url}>{link.name}</FooterColumnListItemLink>
									</FooterColumnListItem>
								);
							})}
						</FooterCoulumnList>
					</FooterListContainer>
				</FooterNavColums>
			);
		});
	}

	render() {
		return (
			<Footer>
				<FooterNavContainer>
					<FooterNav>{this.renderFooterColumns(footerLinks.data)}</FooterNav>
				</FooterNavContainer>
				<FooterBottomOuterContainer>
					<FooterBottomInnerConatiner>
						<FooterBottom>
							<FooterBottomHeadind>
								Copyright ©PIBITY Infotech 2020. All rights reserved.
							</FooterBottomHeadind>
							<FootoerBootomSocialLinksContainer>
								<FooterSocialLinks />
							</FootoerBootomSocialLinksContainer>
						</FooterBottom>
					</FooterBottomInnerConatiner>
				</FooterBottomOuterContainer>
			</Footer>
		);
	}
}

export default PublicFooterComponent;
