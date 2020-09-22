import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Sidebar, Sidenav, Navbar, Icon, Dropdown, Nav, DOMHelper } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class Navigator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			windowHeight: DOMHelper.getHeight(window),
			expand: true
		};
	}

	render() {
		const { expand, windowHeight } = this.state;
		let navBodyStyle = null;
		if (expand) {
			navBodyStyle = {
				height: windowHeight - 112,
				overflow: 'auto'
			};
		}
		return (
			<div>
				<Container className="frame">
					<Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={expand ? 260 : 56} collapsible>
						<Sidenav.Header>
							<div>
								<Link to="/dashboard">
									<Icon icon="logo-analytics" size="4x" style={{ verticalAlign: 0 }} />
									<span style={{ marginLeft: 12 }}> PIBITY ERP</span>
								</Link>
							</div>
						</Sidenav.Header>
						<Sidenav expanded={expand} defaultOpenKeys={[ '4' ]} activeKey={[]} appearance="subtle">
							<Sidenav.Body style={navBodyStyle}>
								<Nav>
									<Nav.Item
										eventKey="0"
										componentClass={Link}
										to="/dashboard"
										icon={<Icon icon="dashboard" />}
									>
										Dashboard
									</Nav.Item>
								</Nav>
								<Dropdown eventKey="1" title="Product" icon={<Icon icon="magic" />}>
								    <Dropdown.Item componentClass={Link} to="/productList" eventKey="1-1">
										Products
									</Dropdown.Item>
									<Dropdown.Item componentClass={Link} to="/product" eventKey="1-2">
										Create Product
									</Dropdown.Item>
								</Dropdown>
								<Dropdown eventKey="2" title="Customer" icon={<Icon icon="magic" />}>
									<Dropdown.Item componentClass={Link} to="/customerList" eventKey="2-1">
										Customers 
									</Dropdown.Item>
									<Dropdown.Item componentClass={Link} to="/customer" eventKey="2-2">
										Create Customer
									</Dropdown.Item>
								</Dropdown>
								<Dropdown eventKey="3" title="Supplier" icon={<Icon icon="magic" />}>
								<Dropdown.Item componentClass={Link} to="/supplierList" eventKey="3-1">
										Suppliers
									</Dropdown.Item>
									<Dropdown.Item componentClass={Link} to="/supplier" eventKey="3-2">
										Create Supplier
									</Dropdown.Item>
								</Dropdown>
								<Dropdown eventKey="4" title="Purchase" icon={<Icon icon="magic" />}>
									<Dropdown.Item componentClass={Link} to="/purchaseList" eventKey="4-1">
										Purchase Orders
									</Dropdown.Item>
									<Dropdown.Item componentClass={Link} to="/purchase" eventKey="4-2">
										Create Purchase Order
									</Dropdown.Item>
								</Dropdown>
							</Sidenav.Body>
						</Sidenav>
						<Navbar appearance="subtle">
							<Navbar.Body>
								<Nav>
									<Dropdown
										placement={expand ? 'topStart' : 'rightBottom'}
										trigger="click"
										renderTitle={(children) => {
											return (
												<Icon
													style={{
														width: 56,
														height: 56,
														lineHeight: '56px',
														textAlign: 'center'
													}}
													icon="cog"
												/>
											);
										}}
									>
										<Dropdown.Item componentClass={Link} to="/profile">
											Profile
										</Dropdown.Item>
										<Dropdown.Item>Setting</Dropdown.Item>
									</Dropdown>
								</Nav>
							</Navbar.Body>
						</Navbar>
					</Sidebar>
				</Container>
			</div>
		);
	}
}

export default Navigator;
