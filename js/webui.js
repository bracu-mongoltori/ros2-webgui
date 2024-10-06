var twist;
var cmdVel;
var publishImmediately = true;
var robot_IP;
var manager;
var teleop;
var ros;
var isConnected = false; 

function moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
    } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
    }
    cmdVel.publish(twist);
}

function initVelocityPublisher() {
    // Init message with zero values.
    twist = new ROSLIB.Message({
        linear: {
            x: 0,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: 0
        }
    });
    // Init topic object
    cmdVel = new ROSLIB.Topic({
        ros: ros,
        name: '/turtle1/cmd_vel',
        messageType: 'geometry_msgs/Twist'
    });
    // Register publisher within ROS system
    cmdVel.advertise();
}

function initTeleopKeyboard() {
    // Use w, s, a, d keys to drive your robot

    // Check if keyboard controller was already created
    if (teleop == null) {
        // Initialize the teleop.
        teleop = new KEYBOARDTELEOP.Teleop({
            ros: ros,
            topic: '/turtle1/cmd_vel'
        });
    }

    // Add event listener for slider moves
    robotSpeedRange = document.getElementById("robot-speed");
    robotSpeedRange.oninput = function () {
        teleop.scale = robotSpeedRange.value / 100;
    };
}

function createJoystick() {
    // Check if joystick was already created
    if (manager == null) {
        joystickContainer = document.getElementById('joystick');
        // joystick configuration
        var options = {
            zone: joystickContainer,
            position: { left: 50 + '%', top: 105 + 'px' },
            mode: 'static',
            size: 200,
            color: '#0066ff',
            restJoystick: true
        };
        manager = nipplejs.create(options);

        // Interval ID for sending position data
        var sendInterval;

        // Event listener for joystick move
        manager.on('move', function (evt, nipple) {
            clearInterval(sendInterval); // Clear any existing interval

            // Start interval to continuously send position data
            sendInterval = setInterval(function () {
                var direction = nipple.angle.degree - 90;
                if (direction > 180) {
                    direction = -(450 - nipple.angle.degree);
                }
                if (direction <= 10 && direction >= -10 ){
                    direction = 0
                }
                else if (direction >= 170 && direction <= 180 || direction <= -170 && direction >= -180) {
                    direction = 180
                }
                else if (direction >= 80 && direction <= 100){
                    direction = 90
                }
                else if (direction <= -80 && direction >= -100){
                    direction = -90
                }
                console.log("direction= ",direction)
                var lin = Math.cos(direction / 57.29) * nipple.distance * 0.005;
                var ang = Math.sin(direction / 57.29) * nipple.distance * 0.005;
                moveAction(lin, ang);
            }, 50); // Adjust interval delay as needed
        });

        // Event listener for joystick release
        manager.on('end', function () {
            clearInterval(sendInterval); // Clear the interval
            moveAction(0, 0); // Send stop message
        });
    }
}

function updateConnectionStatus() {
  if (isConnected) {
    // Hide error card and connecting card, show success card
    document.querySelector('.bg-success').style.display = 'block';
    document.querySelector('.bg-danger').style.display = 'none';
    document.querySelector('.bg-warning').style.display = 'none';
  } else {
    // Hide success card and connecting card, show error card
    document.querySelector('.bg-success').style.display = 'none';
    document.querySelector('.bg-danger').style.display = 'block';
    document.querySelector('.bg-warning').style.display = 'none';
  }
}

window.onload = function () {
    // determine robot address automatically
    // robot_IP = location.hostname;
    // set robot address statically
    robot_IP = "127.0.0.1";

    // Init handle for rosbridge_websocket
    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":9090"
    });

    ros.on('error',function(error){
    console.log(error)
    document.querySelector('.bg-success').style.display = 'none';
    document.querySelector('.bg-danger').style.display = 'block';
    document.querySelector('.bg-warning').style.display = 'none';

  });

    ros.on('connection',function(){
    console.log('Connetion Made!')
    document.querySelector('.bg-success').style.display = 'block';
    document.querySelector('.bg-danger').style.display = 'none';
    document.querySelector('.bg-warning').style.display = 'none';
  });

    ros.on('closed',function(){
    console.log('Connection Closed')
    document.querySelector('.bg-success').style.display = 'none';
    document.querySelector('.bg-danger').style.display = 'block';
    document.querySelector('.bg-warning').style.display = 'none';
  });
    initVelocityPublisher();
    createJoystick();
    initTeleopKeyboard();
};
