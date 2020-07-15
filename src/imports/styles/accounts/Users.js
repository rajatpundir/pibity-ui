import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

export const StatusSwitch = withStyles({
	switchBase: {
		color: red[300],
		'& + $track': {
			color: red[200]
		},
		'&$checked': {
			color: green[300]
		},
		'&$checked + $track': {
			backgroundColor: green[300]
		}
	},
	checked: {},
	track: {}
})(Switch);

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: -webkit-center;
	width: 100%;
	background-color: #f7f7f7;
	padding: 20px 25px 30px;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	-moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	-webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h1`
	margin-bottom: 1.4rem;
	font-size: 2.5rem;
	line-height: unset;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 300px;
`;

export const Input = styled.input.attrs((props) => ({
	marginBottom: props.marginBottom || '1.4rem'
}))`
	font-size: 1.4rem;
	font-family: Helvetica, Arial, sans-serif;
	margin-bottom:  ${(props) => props.marginBottom};
	padding: 1rem;
	border: 1px solid;
	&:focus {
		outline: 2px solid #66afe9;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;
export const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Button = styled.button`
	background-color: #397ab1;
	border: none;
	color: white;
	cursor: pointer;
	font-size: 1.4rem;
	min-width: 140px;
	line-height: 1.2;
	margin: 0.7rem;
	margin-bottom: 1.4rem;
	padding: 1rem;
	text-transform: uppercase;
	&:focus {
		outline: 1px solid gray;
	}
`;

export const Error = styled.p`
	margin-top: 0.25rem;
	font-size: 90%;
	color: #dc3545;
`;

export const Table = styled.table`
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 75%;
`;

export const TableHeader = styled.thead`
	font-weight: bold;
	background-color: #dddddd;
`;

export const TableBody = styled.tbody``;

export const Row = styled.tr`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	border: 1px solid #dddddd;
	text-align: left;
	&:nth-child(even) {
		background-color: #dddddd;
	}
	@media (max-width: 860px) {
		flex-direction: column;
	}
`;

export const Data = styled.td.attrs((props) => ({
	width: props.width || '50%',
	fontWeight: props.fontWeight,
	JustifyContent: props.justifyContent || 'space-between'
}))`
	justify-content: ${(props) => props.JustifyContent};;
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
	font-weight:${(props) => props.fontWeight};
	width: ${(props) => props.width};
	display: flex;
	flex-direction: row;
	@media (max-width: 860px) {
		width: 100%;
	}
`;
