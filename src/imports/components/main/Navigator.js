// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { cloneDeep } from 'lodash';
// import { logout } from '../../redux/actions/auth';
// // import { getKinds } from '../../redux/actions/kinds';
// import { getProfile } from '../../redux/actions/profile';
// import { Container, Sidebar, Sidenav, Navbar, Icon, Dropdown, Nav, DOMHelper } from 'rsuite';
// import 'rsuite/dist/styles/rsuite-default.css';

// class Navigator extends React.Component {
// 	constructor(props: Props) {
// 		super(props);
// 		this.state = {
// 			windowHeight: DOMHelper.getHeight(window),
// 			expand: true,
// 			navItems: [
// 				{
// 					key: '3',
// 					icon: <Icon icon="cart-plus" />,
// 					text: 'Inventory',
// 					children: []
// 				}
// 			]
// 		};
// 	}

// 	componentDidMount() {
// 		this.props.getKinds();
// 		this.props.getProfile(this.props.username);
// 	}

// 	static getDerivedStateFromProps(nextProps, prevState) {
// 		const inventoryItems = [
// 			{
// 				key: '3-0',
// 				text: 'Categories',
// 				link: '/inventory/categories'
// 			}
// 		];
// 		nextProps.kinds.filter((kind) => kind.name !== '*').forEach((kind, i) => {
// 			inventoryItems.push({
// 				key: '3-' + (i + 1).toString(),
// 				text: kind.name,
// 				link: '/inventory/kind/' + kind.name
// 			});
// 		});
// 		const navItems = cloneDeep(prevState.navItems);
// 		navItems[0].children = inventoryItems;
// 		return {
// 			...prevState,
// 			navItems: navItems
// 		};
// 	}

// 	renderNavigationItems() {
// 		return this.state.navItems.map((item) => {
// 			if (item.children) {
// 				return (
// 					<Dropdown
// 						key={item.key}
// 						eventKey={item.key}
// 						placement="rightStart"
// 						trigger="hover"
// 						title={item.text}
// 						icon={item.icon}
// 					>
// 						{item.children.map((child) => {
// 							return (
// 								<Dropdown.Item
// 									key={child.key}
// 									eventKey={child.key}
// 									componentClass={Link}
// 									to={child.link}
// 								>
// 									{child.text}
// 								</Dropdown.Item>
// 							);
// 						})}
// 					</Dropdown>
// 				);
// 			}
// 			return (
// 				<Nav.Item key={item.key} eventKey={item.key} icon={item.icon} componentClass={Link} to={item.link}>
// 					{item.text}
// 				</Nav.Item>
// 			);
// 		});
// 	}

// 	render() {
// 		const { expand, windowHeight } = this.state;
// 		let navBodyStyle = null;
// 		if (expand) {
// 			navBodyStyle = {
// 				height: windowHeight - 112,
// 				overflow: 'auto'
// 			};
// 		}
// 		return (
// 			<div>
// 				<Container className="frame">
// 					<Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={expand ? 260 : 56} collapsible>
// 						<Sidenav.Header>
// 							<div>
// 								<Link to="/dashboard">
// 									<Icon icon="logo-analytics" size="4x" style={{ verticalAlign: 0 }} />
// 									<span style={{ marginLeft: 12 }}> PIBITY ERP</span>
// 								</Link>
// 							</div>
// 						</Sidenav.Header>
// 						<Sidenav expanded={expand} defaultOpenKeys={[ '4' ]} activeKey={[]} appearance="subtle">
// 							<Sidenav.Body style={navBodyStyle}>
// 								<Nav>
// 									<Nav.Item
// 										eventKey="0"
// 										componentClass={Link}
// 										to="/dashboard"
// 										icon={<Icon icon="dashboard" />}
// 									>
// 										Dashboard
// 									</Nav.Item>
// 									<Nav.Item
// 										eventKey="0"
// 										componentClass={Link}
// 										to="/inventory/createProduct"
// 										icon={<Icon icon="dashboard" />}
// 									>
// 										Create Product
// 									</Nav.Item>
// 									{this.props.userType ? null : (
// 										<Dropdown eventKey="1" title="Accounts" icon={<Icon icon="group" />}>
// 											<Dropdown.Item componentClass={Link} to="/users" eventKey="1-1">
// 												Users
// 											</Dropdown.Item>
// 										</Dropdown>
// 									)}
// 									{this.props.profile.userPermissions !==
// 									undefined ? this.props.profile.userPermissions.filter(
// 										(userPermission) =>
// 											userPermission.organizationPermission.module.name === 'Inventory'
// 									)[0].permissionLevel !== 0 ? (
// 										this.renderNavigationItems()
// 									) : (
// 										undefined
// 									) : null}
// 								</Nav>
// 							</Sidenav.Body>
// 						</Sidenav>
// 						<Navbar appearance="subtle">
// 							<Navbar.Body>
// 								<Nav>
// 									<Dropdown
// 										placement={expand ? 'topStart' : 'rightBottom'}
// 										trigger="click"
// 										renderTitle={(children) => {
// 											return (
// 												<Icon
// 													style={{
// 														width: 56,
// 														height: 56,
// 														lineHeight: '56px',
// 														textAlign: 'center'
// 													}}
// 													icon="cog"
// 												/>
// 											);
// 										}}
// 									>
// 										<Dropdown.Item componentClass={Link} to="/profile">
// 											Profile
// 										</Dropdown.Item>
// 										<Dropdown.Item onClick={this.props.logout.bind(this)}>Sign out</Dropdown.Item>
// 									</Dropdown>
// 								</Nav>
// 							</Navbar.Body>
// 						</Navbar>
// 					</Sidebar>
// 				</Container>
// 			</div>
// 		);
// 	}
// }

// Navigator.propTypes = {
// 	profile: PropTypes.object.isRequired,
// 	getProfile: PropTypes.func.isRequired,
// 	kinds: PropTypes.object.isRequired,
// 	getKinds: PropTypes.func.isRequired,
// };
// const mapStateToProps = (state, ownProps) => ({
// 	kinds: state.kinds,
// 	userType: state.auth.token.userType,
// 	username: state.auth.token.username,
// 	profile: state.profile
// });

// export default connect(mapStateToProps, {
// 	getKinds,
// 	getProfile,
// 	logout
// })(Navigator);
