import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Main from './src/app_components/main';
import MyCamera from './src/app_components/my_camera';
import Results from './src/app_components/results';

export const App = StackNavigator({
  Main: { screen: Main },
  MyCamera: { screen: MyCamera },
  Results: { screen: Results }
});

AppRegistry.registerComponent('AgrichainMobile', () => App);
