import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useEffect } from 'react';

const LoadingBar = () => {

    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
      });
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    
    
    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
        }, 1);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    
    return ( 
        <div className={classes.root}>
            <LinearProgress className="VolumeBar" variant="determinate" value={progress} />
        </div>
     );
}
 
export default LoadingBar;