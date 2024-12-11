import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlusSquare, FaTicketAlt, FaChartBar, FaClipboardList, FaSignOutAlt, FaHome } from 'react-icons/fa';

// Styled components
const SidebarContainer = styled.div`
  width: 220px;
  background-color: #343434;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: #ecf0f1; /* Light text color */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Menu = styled.div`
  flex-grow: 1;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #17B169;
    color: #fff;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Menu>
        <Link to="/add-ticket" style={{ textDecoration: 'none', color: 'inherit'}}>
          <MenuItem style={{marginTop:'80px'}}>
            <Icon><FaPlusSquare /></Icon>
            Add Configuration
          </MenuItem>
        </Link>
        <Link to="/view-tickets" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Icon><FaTicketAlt /></Icon>
            All Configurations
          </MenuItem>
        </Link>

        <Link to="/logs" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Icon><FaClipboardList /></Icon>
            Ticket Logs
          </MenuItem>
        </Link>

        <Link to="/report" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Icon><FaChartBar /></Icon>
            Config Report
          </MenuItem>
        </Link>

        <Link to="/avilable-tickets" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Icon><FaClipboardList /></Icon>
            Buy Tickets
          </MenuItem>
        </Link>

      </Menu>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem>
            <Icon><FaHome /></Icon>
            Ticket Home 
          </MenuItem>
        </Link>

        <MenuItem>
          <Icon><FaSignOutAlt /></Icon>
          Sign Out
        </MenuItem>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
