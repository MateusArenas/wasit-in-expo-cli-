import { PullToRefreshHeaderProps } from 'react-native-pull-to-refresh-custom';

import { ViewStyle, TextStyle, Text, StyleSheet, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Loading } from '../../pages/Contacts/styles';
 
    
const headerStyle =  {
    con: {
        height: 100,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.01)',
    } as ViewStyle,
    title: {
        fontSize: 22,
    } as TextStyle,
  }

interface ClassHeaderState extends PullToRefreshHeaderProps{
    pullDistance: number;
    percent: number;
}
  
const HeaderF: React.FC< ClassHeaderState> = (props: PullToRefreshHeaderProps) => {
    const { percentAnimatedValue, percent, refreshing } = props;
    const [pullDistance, setPullDistance] = useState(props.pullDistance)
    const [statepercent, setPercent] = useState(props.percent)
      
    useEffect(() => {
        setPercent(props.percent)
        setPullDistance(props.pullDistance)
  
    }, [statepercent, pullDistance])
  
  
    return (
      <Animated.View style={[headerStyle.con, { opacity: percentAnimatedValue as any }]}>
          <Loading 
          />
      </Animated.View>
      )
  }

  export default HeaderF

// class Header extends React.Component<PullToRefreshHeaderProps, ClassHeaderState> {
//     constructor(props: PullToRefreshHeaderProps) {
//         super(props);
//         this.state = {
//             pullDistance: props.pullDistance,
//             percent: props.percent,
//         };
//     }

//     setProgress({ pullDistance, percent }: { pullDistance: number; percent: number}) {
//         this.setState({
//             pullDistance,
//             percent,
//         });
//     }

//     componentWillReceiveProps(nextProps: Readonly<PullToRefreshHeaderProps>) {
//         this.setState({
//             pullDistance: nextProps.pullDistance,
//             percent: nextProps.percent,
//         });
//     }

//     render() {
//         const { percentAnimatedValue, percent, refreshing } = this.props;
//         const { percent: statePercent, pullDistance } = this.state;
//         // console.log('header props 2222 ', statePercent, percent, refreshing); 
//         let text = 'pull to refresh ';
//         if (statePercent >= 1) {
//             if (refreshing) {
//                 text = 'refreshing...';
//             } else {
//                 text = 'release to refresh  ';
//             }
//         }
//         text += pullDistance.toFixed(2);
//         return (
//             <Animated.View style={[headerStyle.con, { opacity: percentAnimatedValue as any }]}>
//                 <Text style={headerStyle.title}>{text}</Text>
                
//             </Animated.View>
//         );
//     }
// }
