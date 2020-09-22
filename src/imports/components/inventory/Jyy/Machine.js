import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables, createBidVariable } from '../../../redux/actions/variables';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { successMessage, customErrorMessage } from '../../main/Notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from 'react-modal';

const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		color: 'rgba(130, 130, 130, 0.5)',
		textAlign: 'center',
		boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
		background: 'none',
		backdropFilter: 'blur(5px)'

		// backgroundColor: 'rgba(255, 255, 255, 0.75)'
	},
	content: {
		width: '50%',
		height: '45%',
		position: 'absolute',
		top: '25%',
		left: '35%',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '10px',
		outline: 'none',
		padding: '20px'
	}
};

class Machine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			machines: [],
			user: 'shubham3480',
			bids: [],
			price: 0,
			quantity: 1,
			isOpen: false,
			activeVariableName: '',
			activeMachineUnit: '',
			dialogOpen: false,
			termsAgreed: false
		};
		this.onChange = this.onChange.bind(this);
		this.placeBid = this.placeBid.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
		this.props.getVariables('Machine');
		this.props.getVariables('BiddingList');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			machines:
				nextProps.variables !== undefined
					? nextProps.variables.Machine !== undefined ? nextProps.variables.Machine : []
					: [],
			bids:
				nextProps.variables !== undefined
					? nextProps.variables.BiddingList !== undefined
						? nextProps.variables.BiddingList
								.sort((a, b) => {
									return a.variableName > b.variableName ? 1 : b.variableName > a.variableName ? -1 : 0;
								})
								.map((x, i) => ({ ...x, Id: i }))
								.filter((bid) => bid.values.user === 'shubham3480')
						: []
					: []
		};
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	closeModal() {
		this.setState({ isOpen: false });
	}
	handleClose() {
		this.setState({ dialogOpen: false, isOpen: false });
	}
	placeBid(machineName) {
		const variable = {
			organization: 'zs',
			typeName: 'BiddingList',
			variableName: '',
			values: {
				user: 'shubham3480',
				price: this.state.price,
				quantity: this.state.quantity,
				machine: machineName
			}
		};
		if (this.state.price > 0 && this.state.quantity >= 1) {
			const list = this.state.bids.filter((bid) => bid.values.machine === machineName);
			if (this.state.termsAgreed) {
				if (list.length === 0) {
					this.props.createBidVariable(variable).then((status) => {
						if (status === 200) {
							successMessage('Bid Placed Sucessfully');
							this.setState({
								isOpen: false,
								dialogOpen: false,
								termsAgreed: false,
								price: 0,
								defaultBidPrice: 0,
								quantity: 1,
								activeMachine: {},
								activeMachineUnit: ''
							});
						}
					});
				} else {
					customErrorMessage('Can only place one bid on machine');
					this.setState({
						isOpen: false,
						dialogOpen: false,
						termsAgreed: false,
						price: 0,
						defaultBidPrice: 0,
						quantity: 1,
						activeMachine: {},
						activeMachineUnit: ''
					});
				}
			} else {
				customErrorMessage('Please Read and Agree with the Terms And Conditions');
			}
		} else {
			const errorMessage = ' Price to low  \n  Quantity cannot be less than 1';
			customErrorMessage(errorMessage);
		}
	}

	renderMachine() {
		const rows = [];
		this.state.machines.forEach((machine) => {
			rows.push(
				<DataContainer key={machine.variableName}>
					<ImageContainer>
						<Image
							id="main-image"
							src={machine.values.url}
							title="ASM SR 902"
							alt="Photo used ASM SR 902 for sale"
						/>
					</ImageContainer>
					<DescriptionContainer>
						<Span>
							ID#:
							<Detail>{machine.values.id}</Detail>
						</Span>
						<Info>
							<H2>Name:</H2>
							<Detail>{machine.values.name}</Detail>
						</Info>
						<Info>
							<H2>Manufacturer:</H2>
							<Detail>{machine.values.manufacturer}</Detail>
						</Info>
						<Info>
							<H2>Model:</H2>
							<Detail>{machine.values.model}</Detail>
						</Info>

						<Info>
							<H2>Category:</H2>
							<Detail>{machine.values.category}</Detail>
						</Info>
						<Info>
							<H2>Equipment Description:</H2>
						</Info>
						<Detail textTransform="none">{machine.values.description}</Detail>
						{machine.active ? (
							<InputFieldContainer>
								<FormControl paddingTop="20px">
									<Button
										onClick={(e) => {
											this.setState({
												activeMachine: machine,
												isOpen: !this.state.isOpen,
												price: machine.values.bidPrice,
												activeMachineUnit: machine.values.unitForMeasure
											});
										}}
									>
										PlaceBid
									</Button>
								</FormControl>
							</InputFieldContainer>
						) : (
							<Info>
								<H2>Currently Unavailable for Bidding</H2>
							</Info>
						)}
					</DescriptionContainer>
				</DataContainer>
			);
		});

		return rows;
	}

	render() {
		return (
			<PageBlock style={{ display: 'block' }} id="customer">
				<StyledContainer limit={2} />
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>New Customer</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<InputBody>
					<DataOuterContainer>{this.renderMachine()}</DataOuterContainer>
					<Modal
						isOpen={this.state.isOpen}
						contentLabel="Place Bid"
						onAfterOpen={() => this.refs.price.focus()}
						onRequestClose={this.closeModal.bind(this)}
						className="boxed-view__box"
						style={customStyles}
						ariaHideApp={false}
						overlayClassName="boxed-view boxed-view--modal"
					>
						<InputFieldContainer>
							<H2 padding="20px" fontSize="revert" fontWeight="400" color="black">
								Enter Bid Details
							</H2>
							<FormControl>
								<Input
									name="price"
									type="decimal"
									ref="price"
									placeholder="Price"
									value={this.state.price}
									onChange={this.onChange}
								/>
								<InputLabel>Price (Per {this.state.activeMachineUnit})</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="quantity"
									type="number"
									placeholder="Quantity"
									value={this.state.quantity}
									onChange={this.onChange}
								/>
								<InputLabel>Quantity</InputLabel>
							</FormControl>
							<FormControl>
								<Button
									backgroundColor="#5cc150"
									onClick={(e) => {
										this.setState({
											dialogOpen: true
										});
									}}
								>
									Apply
								</Button>
							</FormControl>
						</InputFieldContainer>
					</Modal>
					<Dialog
						open={this.state.dialogOpen}
						onClose={this.handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">{'Do You Confirm To Place Bid'}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								a) A quotation from a Supplier shall be irrevocable for a period of thirty (30) days
								after its receipt by Dialog, unless the request for a quotation stipulates a different
								period. b) Dialog shall be entitled at all times to terminate negotiations without
								giving reasons and without being liable to compensate the other party. c) An agreement
								shall be deemed to have been concluded as soon as Dialog accepts a written quotation by
								means of placing a written order. If, however, the order is sent after expiry of the
								period referred to in Article 3(1) or the order deviates significantly from the
								quotation, the agreement shall be deemed to have been concluded in accordance with the
								order, unless the Supplier rejects the order in writing within fourteen (14) days of the
								date of the order. The following items shall form an integral part of the agreement: 1.
								The (purchase) order from Dialog; 2. These General Terms and Conditions; 3. The
								quotation; 4. The request for a quotation; In the event of any contradiction between the
								provisions contained in two different documents, the documents shall prevail in their
								numerical order, with 1 taking precedence over 2 etc. d) If the Supplier has not made an
								offer or has made a verbal offer, the agreement shall be deemed to have been concluded
								by the Supplier accepting, in writing, a written order from Dialog within fourteen (14)
								days of the date of said order. e) Agreements may only be amended and/or supplemented in
								writing.
							</DialogContentText>
							<CheckBoxContainer>
								<CheckBoxInput
									type="checkbox"
									checked={this.state.termsAgreed}
									tabindex="55"
									onChange={(option) => {
										this.onChange({
											target: {
												name: 'termsAgreed',
												value: !this.state.termsAgreed
											}
										});
									}}
								/>
								<CheckBoxLabel>I Agree with the above Terms and Conditions</CheckBoxLabel>
							</CheckBoxContainer>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={(e) => {
									this.handleClose();
								}}
								backgroundColor="#f95959"
							>
								Cancel
							</Button>
							<Button
								onClick={(e) => {
									this.placeBid(this.state.activeMachine.variableName);
								}}
								backgroundColor="#5cc150"
								autoFocus
							>
								Submit
							</Button>
						</DialogActions>
					</Dialog>
				</InputBody>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {
	clearErrors,
	createBidVariable,
	getVariables
})(Machine);

const DataOuterContainer = styled.div`width: 100%;`;

const DataContainer = styled.div`
	display: flex;
	padding: 10px;
	flex-direction: row;
	border: 1px solid #e0e1e7;
	margin: 2px;
`;

const ImageContainer = styled.div`
	width: 50%;
	padding: 10px;
	background: #f5f5f5;
	overflow: hidden;
`;
// transform-origin: 50% 65%;
// transition: transform 5s, filter 3s ease-in-out;
// filter: brightness(150%);
// &:hover img {
// 	filter: brightness(100%);
// 	transform: scale(3);
// }
// width: 200px;
// height: 200px;
// margin: 0 auto;
const Image = styled.img`max-width: 100%;`;

const DescriptionContainer = styled.div`
	width: 50%;
	margin: 20px 0 10px 10px;
`;
const Span = styled.span`
	font-weight: bold;
	margin-bottom: 4px;
	text-transform: none;
`;
const Detail = styled.span.attrs((props) => ({
	textTransform: props.textTransform || 'uppercase'
}))`
	font-weight: normal;
	margin-left: 5px;
	text-transform: ${(props) => props.textTransform};
`;
const Info = styled.div`
	font-weight: bold;
	margin-bottom: 4px;
	text-transform: none;
	font-size: 1em;
	letter-spacing: 0;
`;
const H2 = styled.h2.attrs((props) => ({
	padding: props.padding || 'none',
	color: props.color,
	fontWeight: props.fontWeight || 'bold',
	fontSize: props.fontSize || '1em'
}))`
	padding: ${(props) => props.padding};
	color: ${(props) => props.color};
	font-weight:${(props) => props.fontWeight};
	text-transform: none;
	font-size: ${(props) => props.fontSize};
	letter-spacing: 0;
	line-height: 1.1;
	display: inline;
`;
const Button = styled.button.attrs((props) => ({
	marginleft: props.marginleft,
	backgroundColor: props.backgroundColor
}))`
	height: 40px;
	margin-left:${(props) => props.marginleft};
	background-color:${(props) => props.backgroundColor};
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #151617;
	padding: 10px;
`;

const InputFieldContainer = styled.div`
	height: -webkit-fill-available;
	width: -webkit-fill-available;
	display: flex;
	flex-direction: column;
	align-items: center;
	display: -ms-flexbox;
	justify-content: space-evenly;
	flex-wrap: wrap;
	width: 100%;
`;
// styling Toast container
const StyledContainer = styled(ToastContainer).attrs(
	{
		// custom props
	}
)`
	.Toastify__toast-container {}
	.Toastify__toast {}
	.Toastify__toast--error {
		margin: 0 0 6px;
		padding: 10px 15px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		background-repeat: no-repeat;
		background-color: #fd4a4a;
	}
	.Toastify__toast--success {
		margin: 0 0 6px;
		padding: 16px 42px 16px 55px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		background-repeat: no-repeat;
		background-color: rgb(7, 188, 12);
	}
	.Toastify__toast-body {
		white-space: pre-line;
	}
	.Toastify__progress-bar {}
  `;

const LeftItemH1 = styled.h1`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bold;
	padding-right: 20px;
	display: flex;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;

const InputRowWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || '100%'
}))`
flex-basis: ${(props) => props.flexBasis};`;

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;
const Required = styled.span`
	display: inline-block;
	padding: 0 !important;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	white-space: nowrap;
	color: #3b3b3b;
	user-select: none;
	pointer-events: none;
`;
const InputColumnWrapper = styled.div`
	flex-basis: calc(100% / 3 - 12px) !important;
	width: 30%;
	@media (max-width: 991px) {
		flex-basis: 100% !important;
		justify-content: space-between;
		display: flex;
		flex-flow: wrap;
	}
`;

//updated
const FormControl = styled.div.attrs((props) => ({
	paddingTop: props.paddingTop
}))`
	padding-bottom: 20px;
	padding-top:${(props) => props.paddingTop};
	min-height: 60px;
	position: relative;
	display: flex;
	align-items: center;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;
const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const SelectWrapper = styled.div`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const Input = styled.input`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const InputLabel = styled.label`
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	position: absolute;
	top: -6px;
	left: 7px;
	padding: 0 3px;
	background-color: #fff;
	white-space: nowrap;
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	&:before {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;

const PageBlock = styled.div`
	display: block;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
`;

const PageToolbar = styled.div`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 16px 20px;
`;
const CheckBoxWapper = styled.div`
	float: left;
	width: 16px;
`;
const CheckBoxTable = styled.table`
	width: 35% !important;
	table-layout: auto !important;
	border-collapse: inherit !important;
	border-spacing: 0;
`;

const TBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
	width: 100% !important;
	height: 16px;
	line-height: 1px;
	position: relative;
	font-weight: normal;
	overflow: hidden;
	cursor: pointer;
	vertical-align: top;
	// &:before {
	// 	border-width: 1px;
	// 	border-style: solid;
	// 	border-radius: 4px;
	// 	border-color: #b9bdce;
	// 	content: '';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	-webkit-transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
	// &:after {
	// 	content: '\e81a';
	// 	line-height: 18px;
	// 	font-style: normal;
	// 	color: transparent;
	// 	font-family: 'icons_2019';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
`;
const CheckBoxInput = styled.input`
	width: 16px;
	height: 16px;
	padding: 0;
	-webkit-appearance: button;
	cursor: pointer;
	font-size: 100%;
	outline: none;
	vertical-align: baseline;
	line-height: normal;
	color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
	background-color: -internal-light-dark-color(rgb(239, 239, 239), rgb(74, 74, 74));
	border-width: 2px;
	border-style: outset;
	border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
	border-image: initial;
	user-select: none;
	white-space: pre;
	align-items: flex-start;
	text-align: center;
`;

const CheckBoxLabel = styled.label`
	position: static;
	padding: 0 0 0 10px;
	pointer-events: all !important;
	cursor: pointer;
	top: -6px;
	left: 7px;
	background-color: #fff;
	white-space: nowrap;
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	z-index: 20;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
`;

const CheckBoxContainer = styled.div`
	margin: 5px 0px;
	align-items: center;
	margin-right: 10px !important;
	position: relative;
	display: flex;
`;
