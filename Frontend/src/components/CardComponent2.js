import React from 'react';
import {Button} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Favorite,ExpandMore,MoreVert,Share} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import {Card , CardHeader , CardMedia , CardContent , CardActions , Collapse , Avatar , IconButton , Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:"bisque",
    maxWidth: '29.33%',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
    margin:'2% 2%',
  },
  media: {
    color:"black",
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    color:"black",
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  right: {
    color:"black",
    textAlign:'right',
    marginRight:'20px',
    marginTop:'-5',
    fontSize:'100%'
  },
  left: {
    color:"black",
    fontSize:'100%'
  },
  head:{
    color:"black",
    margin:'10px 10px'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));
export default function CardComponent2({onNego,onAcc,flag,data,data1,Product,Unit,Price_Per_Unit,StartDate,EndDate,DeadlineDate,Total_Quantity,Mode_Of_Delivery,Vendor,Vendor_Address}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root} >
       <Typography variant="body1" color="textPrimary" component="p"className={classes.head}>
         <b>Product Name: </b> {Product}
         </Typography>
         <Typography variant="body1" color="textPrimary" component="p"className={classes.head}>
         <b>Quantity : </b>{Total_Quantity} {Unit} 
         </Typography>
         <Typography variant="body1" color="textPrimary" component="p"className={classes.head}>
         <b>Proposed Cost/Unit: </b> ₹{Price_Per_Unit} / {Unit}
         </Typography>
      <CardContent>
        <Typography  style={{color:"black"}} component="p">
          <b>Company Name: </b>{Vendor}
        </Typography>
        <Typography  style={{color:"black"}} component="p">
          <b>Address: </b>{Vendor_Address}
        </Typography>
         <Typography  style={{color:"black"}} component="p">
          <b>Proposed Mode Of Delivery: </b>{Mode_Of_Delivery}
        </Typography>
        <Typography  style={{color:"black"}} component="p">
          <b>Duration Of RFP: </b>{StartDate} - {EndDate}
        </Typography>
        <Typography  style={{color:"black"}} component="p">
          <b>Deadline Of RFP: </b>{DeadlineDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <Button  style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onNego(data)}>
            Negotiate
          </Button>
          <Button  style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onAcc(data)}>
            Accept
          </Button>
        {/*
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        */}
        
        {/*<IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>*/}
      </CardActions>
      {/*<Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
              </CardContent>
            </Collapse>*/}
    </Card>
  );
}