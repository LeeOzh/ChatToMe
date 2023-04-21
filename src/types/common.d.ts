export type MessageItem = {
  type: string;
  content: Content;
};

interface Content {
  text?: string;
  picUrl: string;
}
