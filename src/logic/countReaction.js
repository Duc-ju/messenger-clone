export function countReaction(message) {
  if (
    !message ||
    !message.love ||
    !message.haha ||
    !message.wow ||
    !message.sad ||
    !message.angry ||
    !message.like
  )
    return 0;
  else
    return (
      message.love.length +
      message.haha.length +
      message.wow.length +
      message.sad.length +
      message.angry.length +
      message.like.length
    );
}
