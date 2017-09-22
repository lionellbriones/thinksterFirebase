angular.module('angularfireSlackApp')
    .controller('MessagesCtrl', function(profile, messages, channelName){
        var messagesCtrl = this;

        messagesCtrl.messages = messages;
        messagesCtrl.channelName = channelName;

        messagesCtrl.message = '';

        messagesCtrl.sendMessage = function(){
            if(messagesCtrl.message.length > 0) {
                messagesCtrl.messages.$add({
                    uid: profile.$id,
                    body: messagesCtrl.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(function() {
                    messagesCtrl.message = '';
                })
            }
        }
    });