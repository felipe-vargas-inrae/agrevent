

import React from 'react';
import NotificationSystem from 'rc-notification';
import {BasicNotification} from '../../../../components/Notification';


class NotificationMessages {
    errorMessages(contentText){
        // success , warning, primary 
        this.messages(contentText,"danger","Error")
    }
    messages(contentText, colorType, title){

        const notification = <BasicNotification color={colorType} title={title}
                message={contentText}
        />
        this.notificationLU.notice({
            content: notification,
            duration: 5,
            closable: true,
            style: {top: 0, left: 240},
            className: 'left-up'
          });
    }
    
    constructor(){
        
        NotificationSystem.newInstance({}, (n) => this.notificationLU = n);
    }
    destroy(){
        this.notificationLU.destroy();
    }
}


export default NotificationMessages