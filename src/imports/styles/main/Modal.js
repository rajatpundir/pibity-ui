import styled from 'styled-components';
export {
	SelectWrapper,
	InputFieldContainer,
	InputLabel,
	FormControl,
	Input,
	InputRowWrapper,
	Required,
	TextAreaInput
} from '../inventory/Style';

export const ModalCustomStyles = {
	overlay: {
		zIndex: 9999,
		display: 'block',
		overflowX: 'hidden',
		overflowY: 'auto',
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: '100% ',
		outline: 0,
		margin: '0 !important',
		backgroundColor: '#12121275 '
	},
	content: {
		position: 'relative',
		padding: 0,
		maxWidth: '420px',
		minWidth: '35%',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		backgroundColor: '#fff',
		margin: '1.75rem auto',
		backgroundClip: 'padding-box',
		border: '1px solid rgba(0,0,0,0.2)',
		borderRadius: '10px',
		boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.2)',
		outline: 0
	}
};

export const ModalHeader = styled.div`
	display: flex;
	-ms-flex-align: start;
	align-items: flex-start;
	-ms-flex-pack: justify;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 18px 20px 18px 20px;
	height: 63px;
	border-bottom: 1px solid #e0e1e7;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

export const ModalTitle = styled.h4`
	margin-bottom: 0;
	color: #3b3b3b;
	line-height: 16px;
	font-weight: bold;
	font-size: 18px;
`;

export const ModalHeaderCloseButton = styled.button`
	padding: 0;
	opacity: 0.75;
	font-weight: 300;
	font-size: 1.8rem;
	background-color: transparent;
	border: 0;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	-webkit-transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export const ModalFooter = styled.div`
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	justify-content: flex-end;
	padding: 0 20px 20px 20px;
	width: 100%;
`;

export const ModalSubmitButton = styled.button`
	margin-right: 8px;
	min-width: 70px;
	background-color: #05cbbf;
	border-color: #05cbbf;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;

	&:active {
		background-color: #00afa5 !important;
		border-color: #00afa5 !important;
	}
	&:hover {
		outline: none;
		background-color: #04beb3;
		border-color: #04beb3;
		color: #fff;
	}
	&:focus {
		background-color: #04beb3;
		border-color: #04beb3;
		color: #fff;
		outline: none;
	}
`;

export const ModalCloseButton = styled.button`
	min-width: 70px;
	border-color: #b9bdce;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	color: #3b3b3b;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	outline: none;
`;

export const ModalBody = styled.div`
	width: 100%;
	position: relative;
	flex-direction: column;
	display: flex;
	padding: 20px;
	font-size: 13px;
	color: #3b3b3b;
`;

export const ModalBodyHeading = styled.h3`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	margin-top: 5px;
	margin-bottom: 5px;
`;
