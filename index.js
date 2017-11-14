import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Main from './src/app_components/main';
import MyCamera from './src/app_components/my_camera';

export const App = StackNavigator({
  Main: { screen: Main },
  MyCamera: { screen: MyCamera }
});

AppRegistry.registerComponent('AgrichainMobile', () => App);
