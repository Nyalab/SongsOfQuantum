var Angle = {
  getAngle: function(x1, y1, x2, y2){
    return Math.atan2(y2-y1, x2-x1);
  },

  getDistance: function(firstAngle, secondAngle)
  {

    var difference = secondAngle - firstAngle;

    while (difference < -180) 
      difference += 360;

    while (difference > 180) 
      difference -= 360;

    return difference;
  },

  toDegrees: function(angle){
    return (360 + 180 * angle / Math.PI) % 360;
  },
  
  toRadians: function(angle){
      return Math.PI * angle / 180;
  }
};