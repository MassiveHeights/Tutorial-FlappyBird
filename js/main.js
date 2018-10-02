import { 
  Black,
  CanvasDriver, 
  Input, 
  Arcade,
  MasterAudio,
  SplashScreen
} from 'black';

import { App } from './app';

// Creates new Back instance (containerElementId, gameClass, videoDriverClass, systemClasses)
var black = new Black('container', App, CanvasDriver, [Input, Arcade, MasterAudio]);
black.start();

SplashScreen.enabled = false;