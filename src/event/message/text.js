import { hasKey } from '../../haskey.js';
import { messageMap } from './text-map.js';
import { contextManage } from './context-manage.js';
import { chatEvent } from './chat.js';

// テキストメッセージの処理をする関数
export const textEvent = async (event, appContext) => {
  // contextが存在した場合は対応するメッセージが帰ってきて、存在しない場合はundefinedが帰ってくる
  const contextManageResult = await contextManage(event, appContext);
  if (contextManageResult) {
    return contextManageResult;
  }

  // ユーザーから送られてきたメッセージ
  const receivedMessage = event.message.text;

  // 送られてきたメッセージに応じて返信するメッセージを取得してreturn
  if (hasKey(messageMap, receivedMessage)) {
    return messageMap[receivedMessage](event);
  }
  return chatEvent(event, appContext);
};
