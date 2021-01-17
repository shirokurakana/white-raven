import classNames from 'classnames';

export type ContactItemProps = {
  messageCount: number;
  selected?: boolean;
  avatar: string;
  username: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  onSelected?: () => void;
};

export default function ContactItem({
  messageCount,
  selected,
  avatar,
  username,
  lastMessage,
  lastMessageTimestamp,
  onSelected,
}: ContactItemProps) {
  const contactItemClass = classNames('contact-item', {
    'has-message': messageCount,
    selected,
  });

  return (
    <div className={contactItemClass} onClick={onSelected}>
      <span className="red-dot"></span>
      <img className="avatar" src={avatar} alt="avatar" />
      <span className="username">{username}</span>
      {/* TODO: converter to display string */}
      <span className="last-message-time">{lastMessageTimestamp}</span>
      <span className="last-message">{lastMessage}</span>
    </div>
  );
}
