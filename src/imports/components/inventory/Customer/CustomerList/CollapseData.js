import styled from 'styled-components';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	StatusSpan,
	StatusBackgroundColor,
	TableData,
	TableHeaderInner,
	TableRow
} from '../../../../styles/inventory/Style';
const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class CollapseData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false,
			data: props.data,
			defaultContact: {
				typeName: 'CustomerAddress',
				values: {
					addressType: '',
					city: '',
					country: '',
					customer: '',
					isDefault: true,
					line1: '',
					line2: '',
					name: '',
					postCode: '',
					state: ''
				},
				variableName: ''
			},
			defaultAddress: {
				typeName: 'CustomerContact',
				values: {
					comment: '',
					customer: '',
					email: '',
					fax: '',
					isDefault: true,
					jobTitle: '',
					mobile: '',
					name: '',
					phone: '',
					website: ''
				},
				variableName: ''
			}
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		
		return {
			...prevState,
			data: nextProps.data,
			defaultContact:
				nextProps.variables !== undefined
					? nextProps.variables.CustomerContact !== undefined
						? nextProps.variables.CustomerContact.filter(
								(contact) =>
									contact.values.customer === nextProps.data.variableName &&
									contact.values.isDefault === true
							)[0]
						: prevState.defaultContact
					: prevState.defaultContact,
			defaultAddress:
				nextProps.variables !== undefined
					? nextProps.variables.CustomerAddress !== undefined
						? nextProps.variables.CustomerAddress.filter(
								(address) =>
									address.values.customer === nextProps.data.variableName &&
									address.values.isDefault === true
							)[0]
						: prevState.defaultAddress
					: prevState.defaultAddress
		};
	}

	render() {
		return (
			<TableRow onClick={this.handleRowClick} key={this.state.data.variableName}>
				<TableData width="5%" />
				{this.props.layout.get('name') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<Link to={'/customerList/' + encodeURIComponent(this.state.data.variableName)}>
								{this.state.data.variableName}
							</Link>
						</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('contact') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							{this.state.defaultContact.values.name}
						</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('phone') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<Anchor href={'tel:' + this.state.defaultContact.values.phone}>
								{this.state.defaultContact.values.phone}
							</Anchor>
						</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('email') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<Anchor href={'mailto:' + this.state.defaultContact.values.email} target="_blank">
								{this.state.defaultContact.values.email}
							</Anchor>
						</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('website') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<Anchor href={this.state.defaultContact.values.website} target="_blank">
								{this.state.defaultContact.values.website}
							</Anchor>
						</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('address') ? (
					<TableData width="20%">
						<TableHeaderInner overflow="hidden">{this.state.defaultAddress.values.line1} </TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('due') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.totalDue}</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
				{this.props.layout.get('status') ? (
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<StatusSpan
								backgroundColor={
									this.state.data.values.status === 'Active' ? (
										StatusBackgroundColor.active
									) : (
										StatusBackgroundColor.depricated
									)
								}
							>
								{this.state.data.values.status}
							</StatusSpan>
						</TableHeaderInner>
					</TableData>
				) : (
					undefined
				)}
			</TableRow>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, withStyles(styles))(CollapseData);

const Anchor = styled.a`
	text-decoration: none;
	color: #05cbbf;
`;
