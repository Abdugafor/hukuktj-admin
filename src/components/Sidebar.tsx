import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { text: 'Аналитика', icon: <HomeIcon />, path: '/admin' },
    { text: 'Парвандахо', icon: <GavelIcon />, path: 'laws' },
    { text: 'Адвакатхо', icon: <PeopleIcon />, path: 'lawyers' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1F2937', // dark modern background
          color: '#F9FAFB',
          borderRight: 'none',
          borderRadius: '0 16px 16px 0',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        },
      }}
    >
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Админ Панель
      </div>

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: '12px',
                  mx: 1,
                  backgroundColor: active ? '#2563EB' : 'transparent',
                  color: active ? '#fff' : '#E5E7EB',
                  '&:hover': { backgroundColor: active ? '#1D4ED8' : '#374151' },
                }}
              >
                <ListItemIcon sx={{ color: active ? '#fff' : '#9CA3AF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
