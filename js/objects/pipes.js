
import { GameObject, Sprite, RigidBody, MathEx, AssetManager, TilingInfo } from 'black'

export class Pipes extends GameObject {
  constructor() {
    super();
    this.passed = false;

    // Keep all rigid bodies to convenient collide checking
    this.rigidBodies = [];
    
    // anchor x 1 to convenient pass checking 
    this.alignAnchor(1, 0.5);
  }

  onAdded() {
    this.createPipe(-1); // Top pipes
    this.createPipe(); // Bottom pipes
  }
  
  createPipe(scaleYSign = 1) {
    const pipeTilingTexture = AssetManager.default.getTexture('pipe_tile');

    const pipe = new Sprite('pipe');
    pipe.scaleY *= scaleYSign;
    pipe.y = Pipes.DISTANCE_BETWEEN_PIPES * 0.5 * scaleYSign;
    
    pipe.rigidBody = pipe.addComponent(new RigidBody());
    pipe.rigidBody.isStatic = true;
    
    const tile = new Sprite('pipe_tile');
    tile.scaleY *= scaleYSign;
    tile.x = (pipe.width - tile.width) * 0.5;
    tile.y = pipe.height;
    
    tile.tiling = new TilingInfo(pipeTilingTexture.width, 650 * scaleYSign);
    
    tile.rigidBody = tile.addComponent(new RigidBody());
    tile.rigidBody.isStatic = true;

    this.rigidBodies.push(pipe.rigidBody, tile.rigidBody);

    pipe.addChild(tile);

    this.addChild(pipe);
  }

  reset() {
    this.y = this.stage.height * 0.5 + MathEx.randomBetween(-100, 100);
    this.passed = false;
  }

  removeRigidBodies() {
    this.rigidBodies.forEach((body) => {
      body.removeFromParent();
    });
  }
}

Pipes.DISTANCE_BETWEEN_PIPES = 150;