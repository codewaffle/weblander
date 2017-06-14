// from https://github.com/kittykatattack/learningPixi#keyboard

function keyboard(keyCode) {
  var key = {
      code: keyCode,
      isDown: false,
      isUp: true,
      press: undefined,
      release: undefined,
      downHandler: function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
      },
      upHandler: function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
      }
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function buttonAction(keycodes : number[]) {
    let numPressed = 0;

    let action = {
        isDown: false
    };

    let onPress = () => {
        numPressed++;
        action.isDown = true;
    }

    let onRelease = () => {
        numPressed--;
        action.isDown = numPressed > 0;
        console.log(numPressed);
    }
    
    for(var keycode of keycodes) {
        let key = keyboard(keycode);
        key.press = onPress;
        key.release = onRelease;
    }

    return action;
}

let Thrust = buttonAction([40, 83]);
let Left = buttonAction([37, 65]);
let Right = buttonAction([39, 68]);

export {Thrust, Left, Right}
