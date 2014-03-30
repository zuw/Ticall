/* AUDIO class 
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace AUDIO
 */

var AUDIO = (function() {

    var sound = {

        //Construct
        construct: function() {

            this.active = true;
            this.node = new Array();

            for (i in CONFIG.sounds) {
                this.node[i] = document.createElement('audio');
                this.node[i].setAttribute('id', 'sound_' + i);

                //check support for HTML5 audio
                if (this.node[i].canPlayType) {
                    var sourceel = document.createElement('source');

                    //attributes                        
                    sourceel.setAttribute('src', CONFIG.sounds[i]);
                    sourceel.setAttribute('type', "audio/mpeg");
                    this.node[i].appendChild(sourceel);

                    //inserting audio in Html body 
                    document.body.appendChild(this.node[i]);

                    //loading audio file
                    this.node[i].load();
                } else {
                    CONTROLLER.error("Your browser doesn't support HTML5 audio unfortunately.");
                }
            }

            this.play = function(sound) {
                if (!this.active) return false;
                if (this.node[sound]) {
                    this.node[sound].pause();
                    this.node[sound].play();
                }
            },

            //mute sounds
            this.mute = function() {
                this.active = false;
                this.stop();
            },

            //enable sounds
            this.enable = function() {
                this.active = true;
            },

            //mute the sounds
            this.stop = function() {
                for (i in this.node) {
                    this.node[i].stop();
                }
            }
        }
    };

    //return public methods
    return {
        construct: sound.construct
    };
})();