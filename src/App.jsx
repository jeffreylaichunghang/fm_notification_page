import { useCallback, useState } from 'react'

import './App.css'
import angelaAvatar from './assets/images/avatar-angela-gray.webp'
import annaAvatar from './assets/images/avatar-anna-kim.webp'
import jacobAvatar from './assets/images/avatar-jacob-thompson.webp'
import markAvatar from './assets/images/avatar-mark-webber.webp'
import rizkyAvatar from './assets/images/avatar-rizky-hasanuddin.webp'
import kimberlyAvatar from './assets/images/avatar-kimberly-smith.webp'
import nathanAvatar from './assets/images/avatar-nathan-peterson.webp'
import image from './assets/images/image-chess.webp'

const actions = {
  reactToPost: 'reacted to your recent post',
  following: 'followed you',
  joinAGroup: 'has joined your group',
  privateMessage: 'sent you a private message',
  comment: 'commented on your picture',
  leftGroup: 'left the group'
}

const data = [
  {
    user: {
      firstName: "Mark",
      lastName: "Webber",
      avatar: markAvatar
    },
    action: {
      type: actions.reactToPost,
      info: 'My first tournament today!',
      className: 'bold-text'
    },
    time: '1m',
    read: false
  },
  {
    user: {
      firstName: "Angela",
      lastName: "Gray",
      avatar: angelaAvatar
    },
    action: {
      type: actions.following,
      info: null,
      className: ''
    },
    time: '5m',
    read: false
  },
  {
    user: {
      firstName: "Jacob",
      lastName: "Thompson",
      avatar: jacobAvatar
    },
    action: {
      type: actions.joinAGroup,
      info: 'Chess Club',
      className: 'bold-text blue-text'
    },
    time: '1 day',
    read: false
  },
  {
    user: {
      firstName: "Rizky",
      lastName: "Hasanuddin",
      avatar: rizkyAvatar
    },
    action: {
      type: actions.privateMessage,
      info: 'Hello, thanks for setting up the Chess Club. I\'ve been a member for a few weeks now and I\'m already having lots of fun and improving my game.',
      className: 'message-box'
    },
    time: '5 days',
    read: true
  },
  {
    user: {
      firstName: "Kimberly",
      lastName: "Smith",
      avatar: kimberlyAvatar
    },
    action: {
      type: actions.comment,
      info: null,
      className: ''
    },
    time: '1 week',
    read: true
  },
  {
    user: {
      firstName: "Nathan",
      lastName: "Peterson",
      avatar: nathanAvatar
    },
    action: {
      type: actions.reactToPost,
      info: '5 end-game strategies to increase your win rate',
      className: 'bold-text'
    },
    time: '2 weeks',
    read: true
  },
  {
    user: {
      firstName: "Anna",
      lastName: "Kim",
      avatar: annaAvatar
    },
    action: {
      type: actions.leftGroup,
      info: 'Chess Club',
      className: 'bold-text blue text'
    },
    time: '2 weeks',
    read: true
  },
]

function App() {
  const [notifications, setNotifications] = useState(data)

  const unreadMessages = useCallback(() => {
    return notifications.filter(noti => !noti.read).length
  }, [notifications])

  const readMessage = (index) => {
    setNotifications(prev => prev.map((noti, i) => ({
      ...noti,
      read: i === index ? true : noti.read
    })))
  }

  return (
    <div className='background'>
      <div className='container'>
        {/* header */}
        <div className='header'>
          <span className='title'>Notifications</span>
          <span className='unread-number'>{unreadMessages()}</span>
          <button
            type='button'
            onClick={() => setNotifications(prev => prev.map(noti => ({ ...noti, read: true })))}
          >Mark all as read</button>
        </div>
        {/* notifications */}
        <div className='notification-list'>
          {
            notifications.map((noti, index) => (
              <div
                key={`notification_${index}`}
                className={`notification-container ${noti.read ? '' : 'unread'}`}
                onClick={() => !noti.read ? readMessage(index) : undefined}
              >
                <div>
                  <img src={noti.user.avatar} className='image' />
                </div>
                <div>
                  <span className='bold-text text'>{noti.user.firstName}{"  "}{noti.user.lastName}</span>
                  <span className='text'>{noti.action.type}</span>
                  {noti.action.info && noti.action.type !== actions.privateMessage ?
                    <span className={noti.action.className + ' text'}>{noti.action.info}</span> :
                    null
                  }
                  {!noti.read && <span className='red-dot'></span>}
                  <p className='time'>{noti.time + ' ago'}</p>
                  {
                    noti.action.type === actions.privateMessage ?
                      <div className={noti.action.className}>
                        {noti.action.info}
                      </div> :
                      null
                  }
                </div>
                {noti.action.type === actions.comment &&
                  <img src={image} className='image attachment' />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
