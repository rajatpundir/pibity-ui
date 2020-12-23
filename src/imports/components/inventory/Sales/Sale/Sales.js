import React from 'react';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import SalesDetails from './SalesDetails';
import SimpleSalesOrder from './SimpleSalesOrder'

class Sales extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibleSection: 'quote1',
			variable: new Map([
				[
					'values',
					new Map([ [ 'quote1', [] ], [ 'invoice1', [] ], [ 'order1', [] ], [ 'pack', [] ], [ 'pick', [] ] ])
				]
			])
		};
	}

	render() {
		console.log(this.state);
		return (
			<Container>
				<PageWrapper>
					<PageBody>
						<SaveButtonContaier>
							<SaveButton>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<SalesDetails /> {/* // import from another page can say as a component */}
						<HorizontalistPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList style={{ justifyContent: 'space-evenly' }}>
										<HoizontalBlockListItems>
											<BlockListItemBUtton
												onClick={(e) => {
													this.setState({ visibleSection: 'quote1' });
												}}
											>
												Quote
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton
												onClick={(e) => {
													this.setState({ visibleSection: 'order1' });
												}}
											>
												Order
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton
												onClick={(e) => {
													this.setState({ visibleSection: 'pick' });
												}}
											>
												Pick
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton
												onClick={(e) => {
													this.setState({ visibleSection: 'pack' });
												}}
											>
												Pack
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton>Ship</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton
												onClick={(e) => {
													this.setState({ visibleSection: 'invoice1' });
												}}
											>
												Invoice
											</BlockListItemBUtton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemBUtton>Credit Note</BlockListItemBUtton>
										</HoizontalBlockListItems>

										<HoizontalBlockListItems>
											<BlockListItemBUtton>Restock</BlockListItemBUtton>
										</HoizontalBlockListItems>

										<HoizontalBlockListItems>
											<BlockListItemBUtton>Manual Journals</BlockListItemBUtton>
										</HoizontalBlockListItems>

										<HoizontalBlockListItems>
											<BlockListItemBUtton>Log and attributes</BlockListItemBUtton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>{' '}
								</HorizontalBlockListInnerWrapper>{' '}
							</HorizontalBlockListOuter>{' '}
						</HorizontalistPageBlock>{' '}
						{this.state.visibleSection === 'order1' && (
							<SimpleSalesOrder list={this.state.variable.get('values').get('order')} />
						)}
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}

export default Sales;

const Container = styled.div`
	padding: 0;
	width: 100%;
	margin-top: 65px;
	min-height: 100vh;
	min-width: 860px;
	border-radius: 6px;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	background-color: #e3e4e8;
	@media (max-width: 1200px) {
		flex-direction: column !important;
		padding: 20px 20px 0 20px !important;
	}
	// @media (min-width: 1440px) {
	//     max-width: 1200px;
	// }
`;

const PageWrapper = styled.div`
     flex: 1;
    overflow: hidden;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    @media (min-width: 1201px) {
        margin: 20px 20px 0 20px;
        width: 75%;
    }
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 90%;
	}
`;
const SaveButtonContaier = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	bottom: 37px;
	right: 37px;
	z-index: 300;
`;
const SaveButton = styled.button`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #05cbbf;
	border: 0;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.15s ease-in-out;
	outline: none;
`;
export const HorizontalistPageBlock = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px 10px;
	background: #fff;
	float: left;
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 20px !important;
`;

export const HorizontalBlockListOuter = styled.div`
	width: 100%;
	position: relative;
	display: block;
`;
export const HorizontalBlockListInnerWrapper = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
`;
export const HoizontalBlockList = styled.ul`
	width: 212px;
	height: 40px;
	padding-bottom: 0%;
	transform: translate3d(0px, 0px, 0px);
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
	z-index: 1;
	min-width: 100%;
	padding-left: 0;
	list-style: none outside none;
	transition: all 1s;
	transition-property: transform, height;
	justify-content: start;
	float: left;
`;

export const HoizontalBlockListItems = styled.li`
	margin-right: 0px;
	display: flex;
	white-space: nowrap;
	height: 40px;
	float: left;
	margin-right: 10px;
	text-align: -webkit-match-parent;
	list-style: none outside none;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

export const BlockListItemBUtton = styled.button`
	height: 40px;
	width: 100%;
	border-radius: 4px;
	font-size: 13px;
	font-size: 13px;
	font-weight: 600;
	color: #3b3b3b;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	vertical-align: middle;

	&:before,
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;
