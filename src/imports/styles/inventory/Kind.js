import styled from 'styled-components';
export { Container, Form, Input, Error, TableBody, TableHeader, ActionContainer } from '../accounts/Users';
export {Select} from './categories/Categories'
export const TypeHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: baseline;
	justify-content: space-evenly;
	width: 100%;
`;

export const Title = styled.h1`
	font-weight: 300;
	margin-bottom: 1.4rem;
	font-size: xx-large;
`;

export const Button = styled.button.attrs((props) => ({
	margin: props.margin || '0.7rem'
}))`
	background-color: #397ab1;
	border: none;
	color: white;
	cursor: pointer;
	font-size: 1.4rem;
	line-height: 1.2;
	margin: ${(props) => props.margin};
	margin-bottom: 1.4rem;
	margin-top: 1.4rem;
	padding: 1rem;
	text-transform: uppercase;
	&:focus {
		outline: 1px solid gray;
	}
`;

export const Table = styled.table`
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 75%;
`;

export const Row = styled.tr`
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
	&:nth-child(odd) {
		background-color: #dddddd;
	}
`;

export const Data = styled.td`
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
`;
export const H4 = styled.h4`font-size: 1.5rem;`;

export const TableContainer = styled.div`
	display: block;
	box-sizing: border-box;
	max-height: 300px;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
`;
