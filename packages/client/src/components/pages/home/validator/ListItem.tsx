import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { get } from 'lodash';
import { durationInWords } from '@util/helper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow:
        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
      marginBottom: 16,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    inline: {
      display: 'inline',
    },
    subtitle2: {
      fontWeigth: '600 !important',
    },
  })
);

type FieldItemProps = {
  title: string;
  value: string | number;
};

const FieldItem: React.FC<FieldItemProps> = ({ title, value }) => {
  return (
    <div>
      <Typography variant="body2" color="textPrimary" style={{ fontSize: 16 }}>
        {value}
      </Typography>
      <Typography
        variant="subtitle2"
        color="primary"
        style={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
    </div>
  );
};

export type ListPanelProps = {
  node: any;
  handleChange: (
    panel: string
  ) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  expanded: string | boolean;
};

const ValidatorListItem = ({
  expanded,
  handleChange,
  node,
}: ListPanelProps) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      expanded={expanded === node.did}
      onChange={handleChange(node.did)}
      className={classes.root}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div>
            <Typography variant="h6" color="textPrimary">
              {node.name}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              DID: {node.did}
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '55%',
            }}
          >
            <FieldItem
              title={'Uptime'}
              value={durationInWords(node.uptime_seconds * 1000)}
            />
            <FieldItem
              title={'Indy Version'}
              value={get(node, 'indy_version', ' ')}
            />
            <FieldItem
              title={'Ledger Transactions'}
              value={get(node.transaction_count, 'ledger')}
            />
          </div>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ValidatorListItem;
