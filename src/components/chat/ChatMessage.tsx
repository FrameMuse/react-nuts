import { classWithModifiers } from "src/utils/utils"

export interface ChatMessageProps {
  isOwner: boolean
  message: string
  authorImage: string
  date: Date | string | number
}

export function ChatMessage({ isOwner, message, authorImage, date }: ChatMessageProps) {
  const modifiers: string[] = []
  if (isOwner) modifiers.push("owner")

  const time = new Date(date).toLocaleTimeString()

  return (
    <div className={classWithModifiers("chat-message", ...modifiers)}>
      <img src={authorImage} alt="avatar" className="chat-message__author-avatar" />
      <div className="chat-message__message">
        <p className="chat-message__text">{message}</p>
        <time className="chat-message__datetime" dateTime={date.toString()}>{time}</time>
      </div>
    </div>
  )
}
