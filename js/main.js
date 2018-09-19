import { 
  Black,
  CanvasDriver, 
  Input, 
  Arcade,
  MasterAudio
} from 'black';

import { App } from './app';

// Creates new Back instance (containerElementId, gameClass, videoDriverClass, systemClasses)
var black = new Black('container', App, CanvasDriver, [Input, Arcade, MasterAudio]);
black.start();