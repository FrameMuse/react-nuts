import { useState } from "react"
import Button from "../ui/Button"
import Input from "../ui/Input"

interface ChatSendProps {
  placeholder?: string;
  sumbitText: string;
  onSubmit: (message: string) => void;
}

export function ChatSend(props: ChatSendProps) {
  const [message, setMessage] = useState("")
  function submit() {
    setMessage("")
    props.onSubmit(message)
  }
  return (
    <div className="chat-send">
      <Input
        className="chat-send__message"
        placeholder={props.placeholder}
        width="100%"
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
      <Button className="chat-send__submit" onClick={submit}>{props.sumbitText}</Button>
    </div>
  )
}
