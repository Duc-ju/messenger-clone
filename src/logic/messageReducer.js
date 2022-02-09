export function messageReducer(messages, room, uid) {
    if(!room) return []
    messages = messages.filter((message) => message && message.createAt);
    if (!messages || !messages.length) return [];
    let newMess = [];
    newMess = [
      {
        id: messages[0].id,
        uid: messages[0].uid,
        displayName: messages[0].displayName,
        photoURL: messages[0].photoURL,
        isOwnMess: messages[0].uid === uid,
        createAt: messages[0].createAt,
        contents: [
          {
            id: messages[0].id,
            message: messages[0].content,
            createAt: messages[0].createAt,
            love: messages[0].love.map(uid => room.members.filter(m => m.uid===uid)[0]),
            haha: messages[0].haha.map(uid => room.members.filter(m => m.uid===uid)[0]),
            wow: messages[0].wow.map(uid => room.members.filter(m => m.uid===uid)[0]),
            sad: messages[0].sad.map(uid => room.members.filter(m => m.uid===uid)[0]),
            angry: messages[0].angry.map(uid => room.members.filter(m => m.uid===uid)[0]),
            like: messages[0].like.map(uid => room.members.filter(m => m.uid===uid)[0]),
          },
        ],
      },
    ];
    let j = 1;
    for (let i = 1; i < messages.length; i++) {
      if (
        messages[i].uid === newMess[j - 1].uid &&
        Math.abs(messages[i].createAt.seconds - newMess[j - 1].createAt.seconds) <
          3600
      ) {
        newMess[j - 1].contents = [
          ...newMess[j - 1].contents,
          {
            id: messages[i].id,
            message: messages[i].content,
            createAt: messages[i].createAt,
            love: messages[i].love.map(uid => room.members.filter(m => m.uid===uid)[0]),
            haha: messages[i].haha.map(uid => room.members.filter(m => m.uid===uid)[0]),
            wow: messages[i].wow.map(uid => room.members.filter(m => m.uid===uid)[0]),
            sad: messages[i].sad.map(uid => room.members.filter(m => m.uid===uid)[0]),
            angry: messages[i].angry.map(uid => room.members.filter(m => m.uid===uid)[0]),
            like: messages[i].like.map(uid => room.members.filter(m => m.uid===uid)[0])
          },
        ];
      } else {
        newMess = [
          ...newMess,
          {
            id: messages[i].id,
            uid: messages[i].uid,
            displayName: messages[i].displayName,
            photoURL: messages[i].photoURL,
            isOwnMess: messages[i].uid === uid,
            createAt: messages[i].createAt,
            contents: [
              {
                id: messages[i].id,
                message: messages[i].content,
                createAt: messages[i].createAt,
                love: messages[i].love.map(uid => room.members.filter(m => m.uid===uid)[0]),
                haha: messages[i].haha.map(uid => room.members.filter(m => m.uid===uid)[0]),
                wow: messages[i].wow.map(uid => room.members.filter(m => m.uid===uid)[0]),
                sad: messages[i].sad.map(uid => room.members.filter(m => m.uid===uid)[0]),
                angry: messages[i].angry.map(uid => room.members.filter(m => m.uid===uid)[0]),
                like: messages[i].like.map(uid => room.members.filter(m => m.uid===uid)[0]),
              },
            ],
          },
        ];
        j++;
      }
    }
    return newMess;
  }