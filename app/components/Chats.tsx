import React from 'react'
import { Message } from '../page';
import ChatProjects from './ChatProjects';
import ChatSkills from './ChatSkills';
import ChatEducation from './ChatEducation';

const Chats = ({ messages }: { messages: Message[] }) => {

    return (
        <div className='w-full h-full pt-4'>
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex ${msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                        }`}
                >
                    {(() => {
                        switch (msg.type) {
                            case "text":
                                return <TextMsg message={msg} />
                            case "projects":
                                return <ChatProjects />;

                            case "skills":
                                return <ChatSkills />

                            case "education":
                                return <ChatEducation />

                            default:
                                return null;
                        }
                    })()}
                </div>
            ))}
        </div>
    )
}

const TextMsg = ({ message }: { message: Message }) => {
    return (
        <>
            {message.role === 'assistant' ? (
                <div>
                    hello manojlear

                </div>
            ) : (
                <span
                    className="
                        inline-block
                        max-w-[80%]
                        rounded-[20px]
                        rounded-br-[4px]
                        border
                        border-zinc-200/70
                        px-[18px]
                        py-[11px]
                        text-sm
                        leading-[1.55]
                        tracking-[-0.01em]
                        text-zinc-900
                        bg-zinc-100/60
                        font-normal
                        select-text
                    "
                >
                    {message.content}
                </span>
            )}
        </>
    )
}

export default Chats