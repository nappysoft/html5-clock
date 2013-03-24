function rads(x) { return Math.PI*x/180; }
/*
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is overwritten.
 * This function does not handle getters and setters or copy attributes.
 */
function extend(o, p) {
    for(prop in p) {                         // For all props in p.
        o[prop] = p[prop];                   // Add the property to o.
    }
    return o;
}

function LayerObject(opts) {
    this.info = {type:"layer-object"};
}
function Layer(opts) {
    this.info = {type:"layer"};
    var renderStack = [];

}
function shImage(opts) {
    var that = this;
    var defaults = {offX:0,offY:0,
                    strokeStyle:'',fillStyle:'',
                    font:"16px sans-serif",textAlign:"start",
                    lineWidth:1.5,
                    shadowBlur:0.0,
                    shadowColor:"rgba(0,0,0,1.0)",
                    shadowOffsetX:0,shadowOffsetY:0,
                    image: null};
    this.prototype = LayerObject;
    this.info = defaults;
    if (opts) {
        extend(this.info,opts);
    }
    this.draw = function(ctx)  {
        if(!ctx) {
            return false;
        }
        ctx.save();
            ctx.strokeStyle = this.info.strokeStyle;
            ctx.fillStyle = this.info.fillStyle;
            ctx.lineWidth = this.info.lineWidth;
            ctx.font = this.info.font;
            ctx.textAlign = this.info.textAlign;
            ctx.shadowBlur = this.info.shadowBlur;
            ctx.shadowColor = this.info.shadowColor;
            ctx.shadowOffsetX = this.info.shadowOffsetX;
            ctx.shadowOffsetY = this.info.shadowOffsetY;

            if (this.info.image) {
                ctx.drawImage(this.info.image,this.info.offX,this.info.offY);
            };
            if(this.info.fillStyle != '') {
                ctx.fill();
            }
            if(this.info.strokeStyle != '') {
                ctx.stroke();
            }
        ctx.restore();
        return true;
    }
    this.update = function (deltaTime,opts) {
        return true;
    };
}

function shCircle(opts) {
    var that = this;
    var defaults = {offX:0,offY:0,
                    strokeStyle:'black',fillStyle:'rgba(150,150,255,1.0)',
                    font:"16px sans-serif",textAlign:"start",
                    lineWidth:1.5,
                    shadowBlur:0.0,
                    shadowColor:"rgba(75,75,75,1.0)",
                    shadowOffsetX:0,shadowOffsetY:0,
                    radius:10};
    this.prototype = LayerObject;
    this.info = defaults;
    if (opts) {
        extend(this.info,opts);
    }
    this.draw = function(ctx)  {
        if(!ctx) {
            return false;
        }
        ctx.save();
            ctx.strokeStyle = this.info.strokeStyle;
            ctx.fillStyle = this.info.fillStyle;
            ctx.lineWidth = this.info.lineWidth;
            ctx.font = this.info.font;
            ctx.textAlign = this.info.textAlign;
            ctx.shadowBlur = this.info.shadowBlur;
            ctx.shadowColor = this.info.shadowColor;
            ctx.shadowOffsetX = this.info.shadowOffsetX;
            ctx.shadowOffsetY = this.info.shadowOffsetY;

            ctx.beginPath();
            ctx.arc(this.info.offX,this.info.offY,this.info.radius,0,2*Math.PI,false);
            ctx.closePath();
            if(this.info.fillStyle != '') {
                ctx.fill();
            }
            if(this.info.strokeStyle != '') {
                ctx.stroke();
            }

        ctx.restore();
        return true;
    }
    this.update = function (deltaTime,opts) {
        return true;
    };

}
function shText(opts) {
    var that = this;
    var defaults = {offX:0,offY:0,
                    strokeStyle:'',fillStyle:'rgba(200,200,0,1.0)',
                    font:"16px bold monospace,sans-serif",textAlign:"start",
                    lineWidth:1.5,
                    shadowBlur:0.0,
                    shadowColor:"rgba(75,75,75,1.0)",
                    shadowOffsetX:0,shadowOffsetY:0,
                    text:"text"};
    this.prototype = LayerObject;
    this.info = defaults;
    if (opts) {
        extend(this.info,opts);
    }
    this.draw = function(ctx)  {
        if(!ctx) {
            return false;
        }
        ctx.save();
            ctx.strokeStyle = this.info.strokeStyle;
            ctx.fillStyle = this.info.fillStyle;
            ctx.lineWidth = this.info.lineWidth;
            ctx.font = this.info.font;
            ctx.textAlign = this.info.textAlign;
            ctx.shadowBlur = this.info.shadowBlur;
            ctx.shadowColor = this.info.shadowColor;
            ctx.shadowOffsetX = this.info.shadowOffsetX;
            ctx.shadowOffsetY = this.info.shadowOffsetY;

            if(this.info.fillStyle != '') {
                ctx.fillText(this.info.text,this.info.offX,this.info.offY);
            }
            if(this.info.strokeStyle != '') {
                ctx.strokeText(this.info.text,this.info.offX,this.info.offY);
            }

            //ctx.fill();
            //ctx.stroke();
        ctx.restore();
        return true;
    }
    this.update = function (deltaTime,opts) {
        return true;
    };

}
function Layer_Pinwheel(opts) {
    var that = this;
    var defaults = {type:"layer",
                    offX:0,offY:0,
                    strokeStyle:'black',fillStyle:'rgba(150,150,255,1.0)',
                    font:"16px sans-serif",textAlign:"start",
                    lineWidth:1.5,
                    shadowBlur:0.0,
                    shadowColor:"rgba(75,75,75,1.0)",
                    shadowOffsetX:0,shadowOffsetY:0,
                    origins:[0,0],
                    radius:100};

    this.info = defaults;
    if (opts) {
        extend(this.info,opts);
    }
    var renderStack = [];

    var items = (2*Math.PI) / 12;

    for (var i = 0; i < (2*Math.PI); i += items) {
        renderStack.push(new shCircle({offX:Math.cos(i) * 100,
                                        offY:Math.sin(i) * 100,
                                        fillStyle:"rgb(230,230,230)",
                                        strokeStyle:"rgb(200,200,200)"}));
    }
    this.draw = function(ctx) {
        if(!ctx) {
            return false;
        }
        ctx.save();
            ctx.strokeStyle = this.info.strokeStyle;
            ctx.fillStyle = this.info.fillStyle;
            ctx.lineWidth = this.info.lineWidth;
            ctx.font = this.info.font;
            ctx.textAlign = this.info.textAlign;
            ctx.shadowBlur = this.info.shadowBlur;
            ctx.shadowColor = this.info.shadowColor;
            ctx.shadowOffsetX = this.info.shadowOffsetX;
            ctx.shadowOffsetY = this.info.shadowOffsetY;

        for (var i = 0; i < renderStack.length; i+=1) {
            if (renderStack[i].draw(ctx)) {
                continue;
            }
        };
        ctx.restore();
        return true;
    };
    this.update = function (deltaTime,opts) {
        for (var i = 0; i < renderStack.length; i+=1) {
            renderStack[i].update(deltaTime,opts);
        };
        return true;
    };
}

function shHand(opts) {
    var that = this;
    this.prototype = LayerObject;

    var defaults = {offX:0,offY:0,
                    strokeStyle:'black',fillStyle:'rgba(255,50,50,1.0)',
                    font:"16px sans-serif",textAlign:"start",
                    lineWidth:1,
                    shadowBlur:0.0,
                    shadowColor:"rgba(75,75,75,1.0)",
                    shadowOffsetX:0,shadowOffsetY:0,
                    length:100,
                    width:6,
                    pos:0,
                    transData:{
                        rotate:{
                            last:0,current:0,step:0
                            }
                        }
                    };

    this.info = defaults;
    if (opts) {
        extend(this.info,opts);
    }

    this.draw = function(ctx)  {
        if(!ctx) {
            return false;
        }
        ctx.save();
            ctx.strokeStyle = this.info.strokeStyle;
            ctx.fillStyle = this.info.fillStyle;
            ctx.lineWidth = this.info.lineWidth;
            ctx.font = this.info.font;
            ctx.textAlign = this.info.textAlign;
            ctx.shadowBlur = this.info.shadowBlur;
            ctx.shadowColor = this.info.shadowColor;
            ctx.shadowOffsetX = this.info.shadowOffsetX;
            ctx.shadowOffsetY = this.info.shadowOffsetY;
            ctx.rotate(this.info.transData.rotate.current);
            ctx.beginPath();
            ctx.rect(-(this.info.width/2),-this.info.length,this.info.width,this.info.length);
            ctx.closePath();
            if(this.info.fillStyle != '') {
                ctx.fill();
            }
            if(this.info.strokeStyle != '') {
                ctx.stroke();
            }
        ctx.restore();
        ctx.closePath();
        return true;
    }
    this.update = function (deltaTime,opts) {
        return true;
    };

}

function Application () {
    var that = this;
    var canvas=null;
    var context=null;
    var bkImg = null;
    var renderStack  = []; //put render functions in here.
    var origins = [0,0];
    var timerInfo = {id:null,enabled: false,last:0,current:0,trigger: 1000}
    var timeDisplay = null;
    var secondHand = null;
    var minuteHand = null;
    var hourHand = null;
    var clockFace = null;

    var secondHand_precision = 60; // in seconds. this is not a stop watch.

    this.load = function (elCanvas,opts) {
        that.canvas = elCanvas;
        that.context = that.canvas.getContext("2d");

        //origins defines the center of the canvas since
        // everything is bieng done on a cartisian coord system.
        origins[0] = that.canvas.width / 2;
        origins[1] = that.canvas.height /2;

        // add some stuff to the layerStack
        // the layers are rendered from 0..n
        // so the lowest on the stack gets rendered
        // first. I pushed the sHand onto the stack
        // because I having from problems with the
        // layers rendering correctly.

        // the hour hand
        hourHand = new shHand({width:12,transData:{rotate:{step:((2 * Math.PI)/12)}},
                              fillStyle:"rgba(0,200,200,0.8)"});
        hourHand.update = function(deltaTime,opts) {
            var now = new Date();
            hourHand.info.transData.rotate.current = (now.getHours() * hourHand.info.transData.rotate.step);
            hourHand.info.transData.rotate.current += now.getMinutes() / 120;
            return true;
        };

        // the minute hand
        minuteHand = new shHand({width:8,transData:{rotate:{step:((2 * Math.PI)/60)}},
                                fillStyle:"rgba(255,25,25,0.8)"});
        minuteHand.update = function(deltaTime,opts) {
            minuteHand.info.transData.rotate.current = new Date().getMinutes() * minuteHand.info.transData.rotate.step;
            return true;
        };

        //add the second hand.
        secondHand = new shHand({fillStyle:"rgba(200,200,0,1)",strokeStyle:"black",
                                width:4,transData:{rotate:{step:((2 * Math.PI)/secondHand_precision)}}});
        secondHand.update = function(deltaTime,opts) {
            secondHand.info.transData.rotate.current = new Date().getSeconds() * secondHand.info.transData.rotate.step;
            return true;
        };

        // add the digital time display
        timeDisplay = new shText({text:"",offY:-(2*20),font:"20px monospace,Helvetica",textAlign:"center",fillStyle:"rgba(0,0,0,1)"});
        timeDisplay.update = function(deltaTime,opts) {
            var now = new Date();
            timeDisplay.info.text = parseInt(now.getHours()) + ":" + parseInt(now.getMinutes()) + ":" + parseInt(now.getSeconds());
        };

        // add the clock face.. in this case a layer.
        clockFace = new Layer_Pinwheel({});

        var appTitle = new shText({text:"Not just a clock.",
                                  font:"bold 40pt Helvetica,Arial",
                                  lineWidth:2.0,
                                  fillStyle:"rgba(240,120,120,1.0)",
                                  strokeStyle:"rgb(150,150,150)",
                                  textAlign:"center",
                                  offY:-origins[1]+50});

        var appTitleSub = new shText({text:"An HTML5 clock.",
                          font:"bold 40pt Helvetica,Arial",
                          lineWidth:2.0,
                          fillStyle:"rgba(240,120,120,1.0)",
                          strokeStyle:"rgb(150,150,150)",
                          textAlign:"center",
                          offY:origins[1]-15});

        var centerLogo = new shImage({shadowOffsetX:3,shadowOffsetY:3,
                                     shadowBlur:8.0,shadowColor:"rgba(20,20,20,0.5)",
                                     image:HTML5Logo,offX:-HTML5Logo.width/2,offY:-HTML5Logo.height/2});

        renderStack.push(clockFace);
        renderStack.push(hourHand);
        renderStack.push(minuteHand);
        renderStack.push(secondHand);
        renderStack.push(timeDisplay);

        renderStack.push(appTitle);
        renderStack.push(appTitleSub);

         renderStack.push(centerLogo);


        this.canvasOut("Loaded");
    };
    this.canvasOut = function(text) {
        that.context.save();
        that.context.clearRect(0,0,50,200);
        that.context.fillText(text,10,10);
        that.context.restore();
    };
    this.refresh = function(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    };
    this.draw = function(ctx) {
        this.refresh(ctx);
        ctx.save();
        ctx.translate(origins[0],origins[1]);
        for (var i = 0; i < renderStack.length; i+=1) {
            renderStack[i].draw(ctx);
            ctx.closePath();
        };
    };


    this.action_start = function (event) {
        timerInfo.enabled = true;
        requestAnimationFrame(function () {
             that.timer(new Date().getTime());
        });
    };
    this.action_stop = function (event) {
        timerInfo.enabled = false;
    };

    this.update = function(timeDelta,opts) {
       for (var i = 0; i < renderStack.length; i+=1) {
            renderStack[i].update(timeDelta,opts);
        };
        return true;
    };

    this.timer = function (lastTime) {
        if(timerInfo.enabled) {
            var curTime = new Date().getSeconds();
            var timeDifference = curTime - lastTime;
            if (timeDifference > 0) {
                that.update(timeDifference,{});
                that.context.restore();
                that.draw(that.context);
            }
                requestAnimationFrame(function () {
                that.timer(curTime);
            });
        }
    };
};

var Timer = null;
var HTML5Logo = new Image();
HTML5Logo.src = "./img/HTML5_Badge_64.png";

var App = new Application();
//HTML5_Badge_32
window.onload = function (event) {
    // shim layer with setTimeout fallback
    window.requestAnimationFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

  App.load(document.getElementById("work-canvas"),{none:0});
  App.action_start(null);
  //document.getElementById('button-go').addEventListener("click",App.action_start,false);
  //document.getElementById('button-stop').addEventListener("click",App.action_stop,false);

};
