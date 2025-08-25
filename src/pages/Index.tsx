import { useState } from "react";
import { TextInputBox } from "@/components/TextInputBox";
import { WeatherCard } from "@/components/WeatherCard";
import { CalendarStatus } from "@/components/CalendarStatus";
import { MeetingRecommendations } from "@/components/MeetingRecommendations";
import { MeetingTypeSelector } from "@/components/MeetingTypeSelector";
import { Cloud, Calendar, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-scheduling.jpg";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [meetingType, setMeetingType] = useState<"virtual" | "in-person">("in-person");

  // Mock data for demonstration
  const mockWeather = {
    temperature: 72,
    condition: "sunny" as const,
    description: "Perfect weather for outdoor meetings",
    location: "San Francisco, CA"
  };

  const mockRecommendations = [
    {
      id: "1",
      date: "Tomorrow",
      time: "2:00 PM",
      duration: "1 hour",
      weatherScore: 9,
      weatherCondition: "sunny" as const,
      location: "Downtown",
      confidence: "high" as const,
    },
    {
      id: "2", 
      date: "Thursday",
      time: "10:00 AM",
      duration: "45 mins",
      weatherScore: 8,
      weatherCondition: "cloudy" as const,
      confidence: "medium" as const,
    },
    {
      id: "3",
      date: "Friday",
      time: "3:30 PM", 
      duration: "30 mins",
      weatherScore: 7,
      weatherCondition: "sunny" as const,
      confidence: "high" as const,
    }
  ];

  const handleTextSubmit = async (text: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsAnalyzing(false);
    setShowRecommendations(true);
  };

  const handleCalendarConnect = () => {
    // In a real app, this would trigger OAuth flow
    setIsCalendarConnected(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'blur(1px)'
          }}
        />
        
        <div className="relative container mx-auto px-4 py-12 sm:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="p-3 rounded-full bg-primary/10 animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div className="p-3 rounded-full bg-primary/10 animate-float">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="p-3 rounded-full bg-primary/10 animate-pulse-glow">
                <Cloud className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Smart Meeting
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {" "}Scheduler
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
              Paste any message or email, and I'll find the perfect meeting times based on your calendar availability and weather conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Calendar Status */}
          <CalendarStatus 
            isConnected={isCalendarConnected}
            onConnect={handleCalendarConnect}
          />

          {/* Meeting Type Selector */}
          <MeetingTypeSelector 
            selectedType={meetingType}
            onTypeChange={setMeetingType}
          />

          {/* Weather Card - only show for in-person meetings */}
          {meetingType === "in-person" && (
            <WeatherCard weather={mockWeather} />
          )}

          {/* Text Input */}
          <TextInputBox 
            onTextSubmit={handleTextSubmit}
            isLoading={isAnalyzing}
          />

          {/* Meeting Recommendations */}
          {showRecommendations && (
            <MeetingRecommendations 
              recommendations={mockRecommendations}
              meetingType={meetingType}
              className="animate-slide-up"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
