import React, { Component } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const styles = () => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 600,
  },
})

class Help extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="profile-bg">
        <Container style={{ marginTop: '100px' }} className={classes.root}>
          <div className="faq-text">FAQ</div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                Question?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Answer
              </Typography>
            </AccordionDetails>
          </Accordion>
     
        
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(Help)
