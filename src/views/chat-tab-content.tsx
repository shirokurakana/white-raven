import { useEffect, useState } from 'react';
import { getSessions, IdType, Session } from 'api';
import { Switch } from 'components/switch';
import { useNavigator } from 'components/switch-host';
import { SWITCH_NAME } from './constants';
import GroupChatView from './group-chat-view';
import PrivateChatView from './private-chat-view';
import SessionListControl from './session-list-control';
import React from 'react';
import { useHttpApi } from 'hooks/use-async-value';

export default function ChatTabContent() {
  const sessionList = useHttpApi(getSessions, []);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    if (sessionList.length) {
      setSelectedSession(sessionList[0]);
    }
  }, [sessionList]);

  const chatAreaNavigator = useNavigator(SWITCH_NAME.CHAT_AREA);
  useEffect(() => {
    if (selectedSession) {
      chatAreaNavigator(selectedSession.contact.id, selectedSession);
    }
  }, [chatAreaNavigator, selectedSession]);

  return (
    <div className="ChatTabContent">
      <div className="ChatTabContent__sessionListArea">
        <SessionListControl
          selectedItem={selectedSession}
          setSelectedItem={setSelectedSession}
          items={sessionList}
        />
      </div>
      <div className="ChatTabContent__chatArea">
        <Switch<IdType>
          name={SWITCH_NAME.CHAT_AREA}
          contentProvider={{
            isValidLabel: (id) => sessionList.some((item) => item.contact.id === id),
            getRenderer: () => (props) => {
              const session = props as Session;
              switch (session.type) {
                case 'friend':
                case 'stranger':
                  return <PrivateChatView selectedItem={session} />;
                case 'group':
                  return <GroupChatView selectedItem={session} />;
              }
            },
          }}
          // animation={{ className: 'float-in-out-rtl', timeout: 200 }}
        />
      </div>
    </div>
  );
}