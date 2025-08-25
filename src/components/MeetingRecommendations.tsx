import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Copy, Check, Sun, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeetingOption {
  id: string;
  date: string;
  time: string;
  duration: string;
  weatherScore: number;
  weatherCondition: "sunny" | "cloudy" | "rainy";
  location?: string;
  confidence: "high" | "medium" | "low";
}

interface MeetingRecommendationsProps {
  recommendations: MeetingOption[];
  meetingType: "virtual" | "in-person";
  className?: string;
}

export const MeetingRecommendations = ({ 
  recommendations, 
  meetingType,
  className = "" 
}: MeetingRecommendationsProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = async (option: MeetingOption) => {
    const textToCopy = `Meeting Time: ${option.date} at ${option.time} (${option.duration})`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(option.id);
      toast({
        title: "Copied to clipboard!",
        description: "Meeting time ready to paste into your scheduling tool.",
      });
      
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the meeting time manually.",
        variant: "destructive",
      });
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const WeatherIcon = ({ condition }: { condition: string }) => {
    return condition === "sunny" ? 
      <Sun className="w-4 h-4 text-yellow-500" /> : 
      <Cloud className="w-4 h-4 text-gray-500" />;
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Recommended Meeting Times
      </h2>
      
      {recommendations.map((option, index) => (
        <Card 
          key={option.id} 
          className="glass-effect p-4 animate-slide-up hover:glow-effect transition-all duration-300"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {option.date} at {option.time}
                  </span>
                </div>
                <Badge className={getConfidenceColor(option.confidence)}>
                  {option.confidence} confidence
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Duration: {option.duration}</span>
                {meetingType === "in-person" && (
                  <div className="flex items-center gap-1">
                    <WeatherIcon condition={option.weatherCondition} />
                    <span>Weather Score: {option.weatherScore}/10</span>
                  </div>
                )}
                {option.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{option.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              onClick={() => handleCopy(option)}
              variant="outline"
              size="sm"
              className="glass-effect border-primary/20 hover:bg-primary/10 transition-all duration-300"
            >
              {copiedId === option.id ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Time
                </>
              )}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};