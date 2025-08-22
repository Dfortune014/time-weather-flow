import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, MessageSquare } from "lucide-react";

interface TextInputBoxProps {
  onTextSubmit: (text: string) => void;
  isLoading?: boolean;
}

export const TextInputBox = ({ onTextSubmit, isLoading = false }: TextInputBoxProps) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (inputText.trim()) {
      onTextSubmit(inputText.trim());
    }
  };

  return (
    <Card className="glass-effect animate-slide-up p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary animate-pulse-glow">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Paste your message or email
          </h2>
        </div>
        
        <Textarea
          placeholder="Paste your email or message here... I'll analyze it to find the best meeting times based on your calendar and weather conditions."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[120px] resize-none border-border/50 focus:border-primary/50 transition-colors"
          disabled={isLoading}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!inputText.trim() || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 transition-all duration-300 hover:glow-effect group"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
              Find Perfect Meeting Times
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};