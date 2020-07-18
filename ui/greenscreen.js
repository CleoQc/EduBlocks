function greenScreen() {

    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function(stream) {

            video.srcObject = stream;
            video.play();
        });
    }
}

function greenScreenOff() {
    var video = document.getElementById('video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function(stream) {

            video.srcObject = stream;
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            stream.getVideoTracks()[0].stop();
        });
    }
}