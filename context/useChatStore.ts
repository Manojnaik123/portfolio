// import { useState } from "react";
// import { Conversation, Message, ComponentType } from "@/app/page";

// export function useChatStore() {
//     const [conversations, setConversations] = useState<Conversation[]>([]);
//     const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

//     const activeConversation = conversations.find(c => c.id === activeConversationId) ?? null;

//     function newChat() {
//         const conv: Conversation = {
//             id: crypto.randomUUID(),
//             title: "New Chat",
//             messages: [],
//             createdAt: new Date(),
//         };
//         setConversations(prev => [conv, ...prev]);
//         setActiveConversationId(conv.id);
//     }

//     function sendMessage(text: string) {
//         const userMsg: Message = {
//             id: crypto.randomUUID(),
//             role: "user",
//             content: text,
//         };

//         setConversations(prev =>
//             prev.map(c =>
//                 c.id === activeConversationId
//                     ? {
//                         ...c,
//                         title: c.messages.length === 0 ? text.slice(0, 40) : c.title,
//                         messages: [...c.messages, userMsg],
//                     }
//                     : c
//             )
//         );
//     }

//     function addAssistantMessage(content: string, componentType?: ComponentType): string {
//         const id = crypto.randomUUID(); // generate id first

//         const msg: Message = {
//             id,
//             role: "assistant",
//             content,
//             componentType,
//         };

//         setConversations(prev =>
//             prev.map(c =>
//                 c.id === activeConversationId
//                     ? { ...c, messages: [...c.messages, msg] }
//                     : c
//             )
//         );

//         return id; // ← return it
//     }

//     // replaces a message in place — used to swap loading → real response
//     function replaceMessage(id: string, updated: Partial<Message>) {
//         setConversations(prev =>
//             prev.map(c =>
//                 c.id === activeConversationId
//                     ? {
//                         ...c,
//                         messages: c.messages.map(m =>
//                             m.id === id ? { ...m, ...updated } : m
//                         ),
//                     }
//                     : c
//             )
//         );
//     }

//     return {
//         conversations,
//         activeConversation,
//         activeConversationId,
//         newChat,
//         sendMessage,
//         addAssistantMessage,
//         replaceMessage,
//         setActiveConversationId,
//     };
// }