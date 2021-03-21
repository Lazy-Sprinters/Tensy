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
export default function CardComponent1({onFinal,onCurrent,onDelete,flag,flag1,data,data1,Product,Unit,Price_Per_Unit,StartDate,EndDate,DeadlineDate,Total_Quantity,Total_Cost,Mode_Of_Delivery,Vendor,Vendor_Address}) {
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
         <b>Estimated Cost/Unit: </b> ₹{Price_Per_Unit} / {Unit}
         </Typography>
         
      {flag && 
        <Typography variant="body1" color="textPrimary" component="p"className={classes.head}>
         <b>Cost : </b> ₹{Total_Cost} 
        </Typography>
      }
      <CardContent>
      {flag &&
        <>
        <Typography  style={{color:"black"}} component="p">
          <b>Company Name: </b>{Vendor}
        </Typography>
        <Typography  style={{color:"black"}} component="p">
          <b>Address: </b>{Vendor_Address}
        </Typography>
        </>
      }
         <Typography  style={{color:"black"}} component="p">
          <b>Mode Of Delivery: </b>{Mode_Of_Delivery}
        </Typography>
        <Typography  style={{color:"black"}} component="p">
          <b>Duration Of RFP: </b>{StartDate} - {EndDate}
        </Typography>
        {!flag  &&
          <Typography  style={{color:"black"}} component="p">
            <b>Deadline Of RFP: </b>{DeadlineDate}
          </Typography>
        }
      </CardContent>
      <CardActions disableSpacing>
      {!flag && !flag1 &&
        <>
          <Button disabled={!data.flag} style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onCurrent(data)}>
            Current Bids
          </Button>
          <Button disabled={!data.flag} style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onDelete(data)}>
            Delete RFP
          </Button>
          <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onFinal(data)}>
            Finalized Bids
          </Button>
          </>
        }
        {!flag && flag1 &&
          <>

            {data.flag && <Button  style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onCurrent(data)}>
                          Negotiate
                        </Button>}
          <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onDelete(data)}>
            Cancel RFP
          </Button>
          {data.flag && <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => onFinal(data)}>
                        Accept
                      </Button>}
          {!data.flag && <Button disabled={true} style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success">
                        Waiting For Response
                      </Button>}
          </>
        }
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