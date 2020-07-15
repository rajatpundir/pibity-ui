import styled from 'styled-components';
export {
	Container,
	Input,
	Table,
	TableBody,
	Title,
	Error,
	Form,
	Data,
	Row,
	ActionContainer
} from '../../accounts/Users';

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
	padding: 1rem;
	text-transform: uppercase;
	&:focus {
		outline: 1px solid gray;
	}
	& >a{
		color: inherit;
		text-decoration: none;
	}
	& >a:hover{
		color: inherit;
		text-decoration: none;
	}
`;

export const TableContainer = styled.div.attrs((props) => ({
	maxHeight: props.size || '300px'
}))`
	display: block;
	box-sizing: border-box;
	max-height: ${(props) => props.maxHeight};
	overflow: auto;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const Select = styled.select.attrs((props) => ({
	marginBottom: props.marginBottom || '1.4rem',
	padding: props.padding || 'none',
	paddingLeft: props.paddingLeft || props.padding
}))`
	font-size: 1.4rem;
	max-height: 4.5rem;
	font-family: Helvetica, Arial, sans-serif;
	margin-bottom:${(props) => props.marginBottom};
	padding: ${(props) => props.padding};
	padding-left:${(props) => props.paddingLeft}
	&:focus {
		outline: none;
	}
`;
