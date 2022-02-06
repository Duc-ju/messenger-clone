export function getRoomName(room, uid){
    if(room.members.length===2){
      return room.members.filter(member => member.uid!==uid)[0].displayName;
    }
    if(room.members.length>2&&room.displayName) return room.displayName;
    if(room.members.length > 2 && !room.displayName){
      const members = room.members.filter(member => {
        return member.uid !== uid;
      }).map(member => member.displayName.split(' ').slice(-1))
      let name = members.slice(0,2).join(', ')
      if(members.length > 2) name+=` và ${members.length-2} người khác`
      return name
    }
    
  }

