import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useLocation } from 'react-router';
import { FormControlLabel, InputBase, Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerm } from '../store/eventsSlice';
import { debounce } from '../utilis';
import type { RootState } from '../store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function AppHeader() {
  const searchTerm = useSelector((state: RootState) => state.events.searchTerm)
  const location = useLocation();
  const dispatch = useDispatch()
  
  const isHomePage = location.pathname === '/';

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(async () => {
      const searchTerm = event.target.value
      dispatch(updateSearchTerm(searchTerm))
    }, 300)();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none'
                }}
            >
                EVENTLY
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <NavLink to="/" style={({ isActive }) => ({
                ...{
                  textDecoration: 'none', 
                  color: 'inherit'
                },
                ...(isActive ? { color: 'blue' } : {})
              })}>
                <Button color="inherit">Events</Button>
              </NavLink>
              <NavLink to="/bookings" style={({ isActive }) => ({
                ...{
                  textDecoration: 'none', 
                  color: 'inherit'
                },
                ...(isActive ? { color: 'blue' } : {})
              })}>
                <Button color="inherit">My Bookings</Button>
              </NavLink>
            </Box>
            {isHomePage &&
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  defaultValue={searchTerm}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearch}
                />
            </Search>}
            <FormControlLabel control={<Switch defaultChecked />} label="Light" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}