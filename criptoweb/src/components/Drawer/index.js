import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

//icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles({
    list: {
     width: 250
    }
  });

export default function DrawerMenu({ stateAnchor, toggleDrawer }) {
    const classes = useStyles();

    const list = () => (
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={(event) => toggleDrawer(event)}
        onKeyDown={(event) => toggleDrawer(event)}
      >
        <List>
          {[
            { title: 'Teste 1',  icon: <AccountBoxIcon /> },
            { title: 'Fale Conosco', icon: <EmailIcon /> },
          ].map((text, index) => (
            <ListItem
              button
              key={index}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  
    return (
  
        <>
          <Drawer anchor='left' open={stateAnchor} onClose={(event) => toggleDrawer(event)}>
            {list('left')}
          </Drawer>
        </>
  
    );
  }
  