import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";

interface DialogChatToBotProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogChatToBot({
  open,
  setOpen,
}: DialogChatToBotProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      text: string;
      sender: "user" | "bot";
    }[]
  >([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.data;
    },
    onSuccess: (data) => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (
          lastMessage &&
          lastMessage.sender === "user" &&
          lastMessage.text === message
        ) {
          return [...prevMessages, { text: data, sender: "bot" }];
        }
        return prevMessages;
      });
      setMessage("");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan yang tidak diketahui";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${errorMessage}`, sender: "bot" },
      ]);
    },
  });

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);
      mutate(message);
    }
  };

  useEffect(() => {
    setMessages([
      {
        text: "👋 Hai! Aku Vee, asisten virtual Vintagee 🌿. Aku di sini untuk membantu kamu menjual, membeli, atau menukar fashion preloved dengan mudah! 💚\n\nSelain itu, aku juga bisa berbagi tips tentang sustainable fashion dan cara mengurangi limbah fashion. ♻️✨ Yuk, tanyakan apa saja seputar Vintagee atau fashion ramah lingkungan! 🛍️💬",
        sender: "bot",
      },
    ]);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tanya Vee 💚</DialogTitle>
          <DialogDescription>
            Tanyakan apa saja tentang Vintagee dan fashion ramah lingkungan! ✨
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] md:h-[70vh]">
          <div>
            <div className="mb-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs space-y-4 rounded-xl px-4 py-3 text-sm ${
                        msg.sender === "user"
                          ? "bg-zinc-100 dark:bg-zinc-900"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i}>
                          {line
                            .split(/(\*.*?\*)/g)
                            .map((part, index) =>
                              part.startsWith("*") && part.endsWith("*") ? (
                                <strong key={index}>{part.slice(1, -1)}</strong>
                              ) : (
                                part
                              ),
                            )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <div className="flex w-full gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-md border"
            />
            <Button
              onClick={handleSend}
              disabled={isPending}
              size={"sm"}
              className="h-full"
            >
              <SendHorizonal className="h-8 w-8" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
