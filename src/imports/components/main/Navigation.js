import React from 'react';
import { Link } from 'react-router-dom';
import { updateToken, logout } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import Select from 'react-select';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import menuItems from './menuItems';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import { SelectWrapper, ToolbarItemContainer } from '../../styles/main/Navigation';

const drawerWidth = 240;
const styles = (theme) => ({
	'@global': {
		//styling scrollbar using material Ui
		'*::-webkit-scrollbar': {
			width: '0.5em'
		},
		'*::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			outline: '1px solid slategrey',
			borderRadius: '10%'
		}
	},

	root: {
		display: 'flex',
		fontSize: '16 px',
		background: '#3e525d'
	},

	links: {
		width: '100%',
		textDecoration: 'none',
		'&:hover,&:focus,&:active': { textDecoration: 'none' }
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	appBar: {
		background: '#3e525d',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},

	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},

	profileButton: {
		marginRight: '36px',
		marginLeft: '10px'
	},

	hide: {
		display: 'none'
	},

	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},

	drawerOpen: {
		width: drawerWidth,
		background: '#3e525d',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},

	drawerClose: {
		background: '#3e525d',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		}
	},

	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 1),
		margin: '0 15px',
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},

	toolbarExpanded: {
		justifyContent: 'flex-end'
	},

	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},

	itemText: {
		fontSize: '95%',
		fontWeight: '400',
		color: 'white',
		'&$textDense': {
			fontSize: '95%',
			fontWeight: '400',
			color: 'white'
		}
	},
	textDense: {},
	profileMenuItem: {
		height: '3rem',
		fontSize: '1.3rem'
	}
});

class MiniDrawer extends React.Component {
	constructor(props) {
		super();
		this.state = {
			anchorEl: null,
			open: true,
			openProfileMenu: false,
			organizations: JSON.parse(localStorage.getItem('organizations')) || [],
			selectedOrganization: props.auth.selectedOrganization
		};
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			selctedOrganization: nextProps.auth.selectedOrganization
		};
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleClose() {
		this.setState({
			anchorEl: null,
			openProfileMenu: false
		});
	}

	handleMenu(e) {
		console.log(e);
		this.setState({
			anchorEl: e.currentTarget,
			openProfileMenu: true
		});
	}

	handleDrawerOpen() {
		this.setState({ open: !this.state.open });
	}

	handleDrawerClose() {
		this.setState({ open: !this.state.open });
	}
	handleClick(item) {
		this.setState((prevState) => ({ [item]: !prevState[item] }));
	}
	// if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
	handler(children) {
		const { classes } = this.props;
		const { state } = this;
		return children.map((subOption) => {
			if (!subOption.children) {
				return (
					<Tooltip title={subOption.name} arrow placement="right" key={subOption.name} >
						<div key={subOption.name}>
							<ListItem button key={subOption.name}>
								<Icon style={{ color: 'white', fontSize: '28px' }}>{subOption.icon}</Icon>
								<Link to={subOption.url} className={classes.links}>
									<ListItemText
										inset //to align item within the list
										classes={{
											primary: classes.itemText
										}}
									>
										{subOption.name}
									</ListItemText>
								</Link>
							</ListItem>
						</div>
					</Tooltip>
				);
			}
			return (
				<div key={subOption.name}>
					<ListItem button onClick={() => this.handleClick(subOption.name)}>
						<Icon style={{ color: 'white', fontSize: '28px' }}>{subOption.icon}</Icon>
						<ListItemText
							inset //to align item within the list
							classes={{
								primary: classes.itemText
							}}
						>
							{subOption.name}
						</ListItemText>{' '}
						{state[subOption.name] ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={state[subOption.name]} timeout="auto" unmountOnExit>
						{this.handler(subOption.children)}
					</Collapse>
				</div>
			);
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				{/* page-top Navigation */}

				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: this.state.open
					})}
				>
					<Toolbar
						className={clsx(classes.toolbar, {
							[classes.toolbarExpanded]: this.state.open
						})}
					>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: this.state.open
							})}
						>
							<MenuIcon />
						</IconButton>
						<ToolbarItemContainer>
							<SelectWrapper
								minWidth="120px"
								style={{ height: 'max-content', marginRight: '10px', minHeight: 0 }}
							>
								<Select
									value={{
										value: this.props.auth.selectedOrganization,
										label: this.props.auth.selectedOrganization
									}}
									onChange={(option) => {
										this.onChange({
											target: { name: 'selectedOrganization', value: option.value }
										});
										this.props.updateToken(option.value);
										localStorage.setItem('selectedOrganization', option.value);
									}}
									options={this.state.organizations.map((variable) => {
										return {
											value: variable,
											label: variable
										};
									})}
								/>
							</SelectWrapper>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-haspopup="true"
								color="inherit"
								className={classes.profileButton}
								onClick={(e) => this.handleMenu(e)}
							>
								<AccountCircle fontSize="large" />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={this.state.anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={this.state.openProfileMenu}
								onClose={this.handleClose}
							>
								<MenuItem className={classes.profileMenuItem}>Profile</MenuItem>
								<MenuItem className={classes.profileMenuItem}>My account</MenuItem>
								<MenuItem className={classes.profileMenuItem} onClick={this.props.logout}>
									LogOut
								</MenuItem>
							</Menu>
						</ToolbarItemContainer>
					</Toolbar>
				</AppBar>
				{/* sideBar Navigation */}
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open
						})
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{this.state.open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>{this.handler(menuItems.data)}</List>
				</Drawer>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, {
	updateToken,
	logout
})(withStyles(styles)(MiniDrawer));
