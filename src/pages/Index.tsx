import { useState } from "react";
import { TextInputBox } from "@/components/TextInputBox";
import { WeatherCard } from "@/components/WeatherCard";
import { CalendarStatus } from "@/components/CalendarStatus";
import { MeetingRecommendations } from "@/components/MeetingRecommendations";
import { MeetingTypeSelector } from "@/components/MeetingTypeSelector";
import { LocationSelector } from "@/components/LocationSelector";
import { Cloud, Calendar, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-scheduling.jpg";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [meetingType, setMeetingType] = useState<"virtual" | "in-person">("in-person");
  const [userLocation, setUserLocation] = useState("San Francisco, CA");

  // Mock data for demonstration
  const mockWeather = {
    temperature: 72,
    condition: "sunny" as const,
    description: "Perfect weather for outdoor meetings",
    location: userLocation
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
        
        <div className="relative container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 rounded-full bg-primary/10 animate-pulse-glow">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="p-3 rounded-full bg-primary/10 animate-float">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="p-3 rounded-full bg-primary/10 animate-pulse-glow">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 animate-slide-up">
              Smart Meeting
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {" "}Scheduler
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto animate-slide-up">
              Paste any message or email, and I'll find the perfect meeting times based on your preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Settings Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Meeting Settings</h2>
                  <p className="text-sm text-muted-foreground">Configure your preferences</p>
                </div>
                
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

                {/* Location Selector - only show for in-person meetings */}
                {meetingType === "in-person" && (
                  <LocationSelector 
                    currentLocation={userLocation}
                    onLocationChange={setUserLocation}
                  />
                )}

                {/* Weather Card - only show for in-person meetings */}
                {meetingType === "in-person" && (
                  <WeatherCard weather={mockWeather} />
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
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
      </div>
    </div>
  );
};

export default Index;
