import { ChatSend } from "./ChatSend"
import { ChatMessage, ChatMessageProps } from "./ChatMessage"

interface ChatBoxProps {
  children?: any
  messages?: ChatMessageProps[]
  readonly?: boolean
  maxHeight?: string
  sumbitText: string
  onSubmit(message: string): void
}

export function ChatContainer({ children, messages, readonly, maxHeight, sumbitText, onSubmit }: ChatBoxProps) {
  return (
    <div className="chat">
      <div className="chat__field" style={{ maxHeight }}>
        {children ? children : messages?.map((message, index) => (
          <ChatMessage {...message} key={"message_" + index} />
        ))}
      </div>
      {!readonly && <ChatSend sumbitText={sumbitText} onSubmit={onSubmit} />}
    </div>
  )
}
